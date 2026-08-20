/**
 * End-to-end proof that the two enquiry forms deliver — headers, bodies, and
 * attachment bytes.
 *
 * ## Why it works this way
 *
 * Reading the route handlers tells you what they intend to send. It does not
 * tell you what actually leaves the process, and the interesting failures live
 * in that gap: an attachment that arrives with the wrong filename, base64 that
 * loses a byte at a chunk boundary, a `Reply-To` that a hostile address has
 * split into two recipients, a size limit that is off by one.
 *
 * So this starts a **real SMTP server** on localhost, points the app's
 * `SMTP_HOST`/`USER`/`PASS` at it, and submits the forms over HTTP exactly as a
 * browser would. What the sink captures is the literal DATA payload — the same
 * bytes a production mail server would receive — and every assertion is made
 * against that, not against the handler's source.
 *
 * Pointing SMTP at the sink also means the **production code path** is the one
 * under test: `lib/mailer.ts` takes its `host && user && pass` branch, which is
 * what a deployment with real credentials uses. The Ethereal branch that
 * development falls back to is checked separately at the end, against the live
 * service, because that is what the site is running on right now.
 *
 * ## Rate limits
 *
 * `/api/contact` allows 5 an hour per client and `/api/rfp` allows 3, keyed off
 * `cf-connecting-ip`. Every case below sends a unique one so the cases cannot
 * starve each other — and two cases pin the header deliberately to prove the
 * limiter fires.
 *
 * Usage:  npm run mail
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";

/* ------------------------------------------------------------------ config */

const APP_PORT = Number(process.env.MAIL_CHECK_PORT ?? 4319);
const TO = "delivery-target@wesantika.test";
const RFP_TO = "rfp-target@wesantika.test";
const FROM = "no-reply@wesantika.test";
const SMTP_USER = "sink-user";
const SMTP_PASS = "sink-pass";

let passed = 0;
const failures = [];

function check(label, condition, detail = "") {
  if (condition) {
    passed++;
    console.log(`    ok   ${label}`);
  } else {
    failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
    console.log(`    FAIL ${label}${detail ? `  ${detail}` : ""}`);
  }
}

/* ------------------------------------------------------------- SMTP sink --
   Enough of RFC 5321 to be a credible destination: ESMTP greeting, AUTH
   PLAIN/LOGIN (the app supplies credentials and nodemailer will not send
   without a server that accepts them), envelope, and a DATA phase terminated
   by the dot sequence.

   Data is accumulated as bytes rather than a string: the payload carries a
   base64 attachment and a chunk boundary landing mid-multibyte-character
   would corrupt it in exactly the way this script exists to detect.        */

function startSink() {
  const messages = [];

  const server = createServer((socket) => {
    let mode = "command";
    let buffer = Buffer.alloc(0);
    let envelope = { from: null, to: [] };
    let expect = null; // pending AUTH LOGIN continuation

    const send = (line) => socket.write(`${line}\r\n`);
    send("220 sink.local ESMTP ready");

    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);

      for (;;) {
        if (mode === "data") {
          /* The terminator is CRLF "." CRLF. A payload may legitimately
             contain a line that begins with a dot, which the sender doubles
             (dot-stuffing); undo that before handing the message over. */
          const end = buffer.indexOf("\r\n.\r\n");
          if (end === -1) return;
          const raw = buffer.subarray(0, end + 2);
          buffer = buffer.subarray(end + 5);
          messages.push({
            from: envelope.from,
            to: envelope.to,
            raw: Buffer.from(
              raw.toString("binary").replace(/\r\n\.\./g, "\r\n."),
              "binary",
            ),
          });
          envelope = { from: null, to: [] };
          mode = "command";
          send("250 2.0.0 Ok: queued as sink-1");
          continue;
        }

        const nl = buffer.indexOf("\r\n");
        if (nl === -1) return;
        const line = buffer.subarray(0, nl).toString("utf8");
        buffer = buffer.subarray(nl + 2);

        if (expect) {
          // Second and third legs of AUTH LOGIN; contents are not validated,
          // only that the exchange completes.
          expect = expect === "user" ? "pass" : null;
          send(expect ? "334 UGFzc3dvcmQ6" : "235 2.7.0 Authentication successful");
          continue;
        }

        const upper = line.toUpperCase();
        if (upper.startsWith("EHLO") || upper.startsWith("HELO")) {
          send("250-sink.local");
          send("250-SIZE 52428800");
          send("250-8BITMIME");
          send("250-SMTPUTF8");
          send("250 AUTH PLAIN LOGIN");
        } else if (upper.startsWith("AUTH PLAIN")) {
          // With the credential inline it is a single round trip.
          if (line.trim().length > "AUTH PLAIN".length) {
            send("235 2.7.0 Authentication successful");
          } else {
            send("334 ");
            expect = "pass";
          }
        } else if (upper.startsWith("AUTH LOGIN")) {
          send("334 VXNlcm5hbWU6");
          expect = "user";
        } else if (upper.startsWith("MAIL FROM")) {
          envelope.from = (line.match(/<([^>]*)>/) ?? [])[1] ?? null;
          send("250 2.1.0 Ok");
        } else if (upper.startsWith("RCPT TO")) {
          const addr = (line.match(/<([^>]*)>/) ?? [])[1];
          if (addr) envelope.to.push(addr);
          send("250 2.1.5 Ok");
        } else if (upper.startsWith("DATA")) {
          mode = "data";
          send("354 End data with <CR><LF>.<CR><LF>");
        } else if (upper.startsWith("RSET")) {
          envelope = { from: null, to: [] };
          send("250 2.0.0 Ok");
        } else if (upper.startsWith("QUIT")) {
          send("221 2.0.0 Bye");
          socket.end();
          return;
        } else if (upper.startsWith("NOOP")) {
          send("250 2.0.0 Ok");
        } else {
          send("250 2.0.0 Ok");
        }
      }
    });

    socket.on("error", () => {});
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve({
        port: server.address().port,
        messages,
        close: () => new Promise((r) => server.close(r)),
      });
    });
  });
}

/* -------------------------------------------------------------- MIME parse */

const decodeWord = (s) =>
  s.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, charset, enc, payload) => {
    if (enc.toUpperCase() === "B") {
      return Buffer.from(payload, "base64").toString(charset.toLowerCase());
    }
    return Buffer.from(
      payload.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (__, h) =>
        String.fromCharCode(parseInt(h, 16)),
      ),
      "binary",
    ).toString(charset.toLowerCase());
  });

function splitHeaders(buf) {
  const text = buf.toString("binary");
  const blank = text.indexOf("\r\n\r\n");
  const head = blank === -1 ? text : text.slice(0, blank);
  const body = blank === -1 ? Buffer.alloc(0) : buf.subarray(blank + 4);

  const headers = {};
  // Unfold: a header value continues while the next line is indented.
  for (const line of head.replace(/\r\n[ \t]+/g, " ").split("\r\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).toLowerCase();
    const value = line.slice(i + 1).trim();
    headers[key] = headers[key] ? `${headers[key]}, ${value}` : value;
  }
  return { headers, body };
}

function decodeBody(headers, body) {
  const enc = (headers["content-transfer-encoding"] ?? "7bit").toLowerCase();
  if (enc === "base64") {
    return Buffer.from(body.toString("binary").replace(/[\r\n]/g, ""), "base64");
  }
  if (enc === "quoted-printable") {
    const s = body
      .toString("binary")
      .replace(/=\r\n/g, "")
      .replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    return Buffer.from(s, "binary");
  }
  return body;
}

/** Flatten a message into a list of leaf parts, each with headers and bytes. */
function parseMime(raw) {
  const root = splitHeaders(raw);
  const parts = [];

  const walk = ({ headers, body }) => {
    const ct = headers["content-type"] ?? "text/plain";
    const boundary = (ct.match(/boundary="?([^";]+)"?/i) ?? [])[1];
    if (!/^multipart\//i.test(ct) || !boundary) {
      parts.push({ headers, content: decodeBody(headers, body) });
      return;
    }
    const text = body.toString("binary");
    const marker = `--${boundary}`;
    let index = text.indexOf(marker);
    while (index !== -1) {
      const afterMarker = index + marker.length;
      if (text.startsWith("--", afterMarker)) break; // closing delimiter
      const start = text.indexOf("\r\n", afterMarker) + 2;
      const next = text.indexOf(marker, start);
      const end = next === -1 ? text.length : next - 2; // trim the CRLF before it
      walk(splitHeaders(Buffer.from(text.slice(start, end), "binary")));
      index = next;
    }
  };

  walk(root);
  return { headers: root.headers, parts };
}

const findPart = (mime, type) =>
  mime.parts.find((p) => (p.headers["content-type"] ?? "").toLowerCase().includes(type));

const attachmentOf = (mime) =>
  mime.parts.find((p) =>
    (p.headers["content-disposition"] ?? "").toLowerCase().startsWith("attachment"),
  );

/**
 * Filename from Content-Disposition.
 *
 * Three encodings have to be handled, because nodemailer chooses between them
 * by what the name contains. A plain ASCII name is a quoted string; a non-ASCII
 * or long one becomes RFC 2231 percent-encoding; and a long *encoded* one is
 * split across numbered continuations — `filename*0*`, `filename*1*`, … — which
 * must be reassembled in order before decoding. Reading only the first
 * parameter silently truncates the name, which looks exactly like a bug in the
 * route. It is not; it was a bug in this parser.
 */
function filenameOf(part) {
  const cd = part.headers["content-disposition"] ?? "";

  const continuations = [...cd.matchAll(/filename\*(\d+)\*?=([^;]*)/gi)];
  if (continuations.length > 0) {
    const joined = continuations
      .sort((a, b) => Number(a[1]) - Number(b[1]))
      .map((m) => m[2].trim())
      .join("");
    return decodeURIComponent(joined.replace(/^[\w-]*'[^']*'/, ""));
  }

  const single = cd.match(/filename\*=([^;]+)/i);
  if (single) {
    return decodeURIComponent(single[1].trim().replace(/^[\w-]*'[^']*'/, ""));
  }

  const plain = cd.match(/filename="?([^";]+)"?/i);
  return plain ? decodeWord(plain[1]) : null;
}

/**
 * Split a single-mailbox header into its display name and address.
 *
 * Asserting on the literal header text was wrong: nodemailer quotes a display
 * name only when it has to, so `"Wesantika website" <a@b>` goes out as
 * `Wesantika website <a@b>` — correct per RFC 5322, and a string comparison
 * against the quoted form fails on working code. What matters is that the name
 * and the address are right and that there is exactly **one** address, which is
 * the property the Reply-To injection guard exists to hold.
 */
function mailbox(value) {
  const raw = value ?? "";
  const angled = [...raw.matchAll(/<([^>]*)>/g)].map((m) => m[1]);
  const name = decodeWord(
    raw.replace(/<[^>]*>/g, "").trim().replace(/^"|"$/g, ""),
  ).trim();
  return {
    name,
    address: angled[0] ?? raw.trim(),
    count: angled.length === 0 ? (raw.trim() ? 1 : 0) : angled.length,
    raw,
  };
}

/* ------------------------------------------------------------- app process */

function startApp(extraEnv) {
  const nextBin = "node_modules/next/dist/bin/next";
  if (!existsSync(nextBin)) throw new Error(`missing ${nextBin} — run a build first`);

  const child = spawn(
    process.execPath,
    [nextBin, "start", "-p", String(APP_PORT)],
    {
      env: { ...process.env, ...extraEnv },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  const log = [];
  child.stdout.on("data", (d) => log.push(d.toString()));
  child.stderr.on("data", (d) => log.push(d.toString()));

  const ready = (async () => {
    for (let i = 0; i < 90; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${APP_PORT}/en/contact`);
        if (res.ok) return;
      } catch {
        /* not listening yet */
      }
      await new Promise((r) => setTimeout(r, 500));
    }
    throw new Error(`app did not start:\n${log.join("")}`);
  })();

  return {
    ready,
    log,
    origin: `http://127.0.0.1:${APP_PORT}`,
    stop: () =>
      new Promise((resolve) => {
        child.once("exit", resolve);
        child.kill();
        setTimeout(resolve, 4000);
      }),
  };
}

/* ------------------------------------------------------------------ fixtures */

/** Deterministic bytes — a real attachment has no compressible structure, and
    a fixed sequence makes a byte mismatch reproducible rather than a one-off. */
function bytes(n, seed = 1) {
  const out = Buffer.alloc(n);
  let x = seed;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    out[i] = (x >>> 16) & 0xff;
  }
  return out;
}

/** A file that starts with the PDF magic number, so it is a plausible upload. */
function pdfLike(size, seed) {
  const head = Buffer.from("%PDF-1.7\n");
  return Buffer.concat([head, bytes(size - head.length, seed)]);
}

const sha = (b) => createHash("sha256").update(b).digest("hex").slice(0, 16);

const postJson = (origin, ip, body) =>
  fetch(`${origin}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

async function postRfp(origin, ip, fields, file) {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.set(k, v);
  if (file) {
    form.set("file", new File([file.content], file.name, { type: file.type ?? "application/octet-stream" }));
  }
  return fetch(`${origin}/api/rfp`, {
    method: "POST",
    headers: { "cf-connecting-ip": ip },
    body: form,
  });
}

const VALID_RFP = {
  name: "Aiko Tanaka",
  phone: "+81 3 1234 5678",
  company: "Tanaka Manufacturing KK",
  email: "aiko@tanaka-mfg.example",
  brief: "We need a warehouse control system.\nTwo sites, 40 users, Japanese and English.",
  turnstileToken: "test-token",
};

/* ==================================================================== run */

const sink = await startSink();
console.log(`SMTP sink listening on 127.0.0.1:${sink.port}\n`);

const app = startApp({
  SMTP_HOST: "127.0.0.1",
  SMTP_PORT: String(sink.port),
  SMTP_SECURE: "false",
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO_EMAIL: TO,
  RFP_TO_EMAIL: RFP_TO,
  CONTACT_FROM_EMAIL: FROM,
});

try {
  await app.ready;
  const { origin } = app;

  /* ---------------------------------------------------- 1. contact, happy */
  console.log("1. Contact form — a complete enquiry");
  {
    const before = sink.messages.length;
    const res = await postJson(origin, "10.0.0.1", {
      name: "Somchai Wattana",
      email: "somchai@example.co.th",
      phone: "+66 2 123 4567",
      company: "Wattana Logistics",
      message: "We are evaluating partners for a driver app.\nCan we talk next week?",
    });
    const json = await res.json();
    check("HTTP 200", res.status === 200, `got ${res.status}`);
    check("responds ok:true", json.ok === true, JSON.stringify(json));
    check(
      "no previewUrl when real SMTP is configured",
      json.previewUrl === null,
      String(json.previewUrl),
    );
    check("exactly one message reached the SMTP server", sink.messages.length === before + 1);

    const msg = sink.messages[before];
    if (msg) {
      const mime = parseMime(msg.raw);
      check("SMTP envelope recipient is CONTACT_TO_EMAIL", msg.to.join() === TO, msg.to.join());
      check("envelope sender is CONTACT_FROM_EMAIL", msg.from === FROM, String(msg.from));
      const from = mailbox(mime.headers.from);
      check("From address is CONTACT_FROM_EMAIL", from.address === FROM, from.raw);
      check("From display name is the site", from.name === "Wesantika website", from.raw);

      const replyTo = mailbox(mime.headers["reply-to"]);
      check(
        "Reply-To address is the enquirer, so a reply reaches them",
        replyTo.address === "somchai@example.co.th",
        replyTo.raw,
      );
      check("Reply-To names the enquirer", replyTo.name === "Somchai Wattana", replyTo.raw);
      check("Reply-To holds exactly one address", replyTo.count === 1, replyTo.raw);
      check(
        "Subject names sender and company",
        decodeWord(mime.headers.subject ?? "") ===
          "New enquiry from Somchai Wattana (Wattana Logistics)",
        decodeWord(mime.headers.subject ?? ""),
      );
      check("has a Message-ID", Boolean(mime.headers["message-id"]));
      check("has a Date header", Boolean(mime.headers.date));

      const plain = findPart(mime, "text/plain")?.content.toString("utf8") ?? "";
      const html = findPart(mime, "text/html")?.content.toString("utf8") ?? "";
      check("both text and HTML alternatives present", Boolean(plain && html));
      for (const value of [
        "Somchai Wattana",
        "somchai@example.co.th",
        "+66 2 123 4567",
        "Wattana Logistics",
        "driver app",
        "next week?",
      ]) {
        check(`text part carries "${value}"`, plain.includes(value));
        check(`HTML part carries "${value}"`, html.includes(value));
      }
      /* Normalised to CRLF before comparing. SMTP line endings are CRLF by
         specification, so the `\n` the browser posted is *supposed* to arrive
         as `\r\n`; asserting on the raw `\n` fails on correct behaviour. What
         matters is that the break is still there and did not collapse. */
      check(
        "the line break inside the message survives",
        plain.replace(/\r\n/g, "\n").includes("driver app.\nCan we talk next week?"),
        JSON.stringify(plain.slice(-90)),
      );
    }
  }

  /* -------------------------------------------- 2. contact, phone omitted */
  console.log("\n2. Contact form — optional phone left blank");
  {
    const before = sink.messages.length;
    const res = await postJson(origin, "10.0.0.2", {
      name: "Le Van Minh",
      email: "minh@example.vn",
      company: "Minh Digital",
      message: "Interested in the RFP-in-24-hours offer.",
    });
    check("HTTP 200", res.status === 200, `got ${res.status}`);
    check("mail sent", sink.messages.length === before + 1);
    const plain =
      findPart(parseMime(sink.messages[before]?.raw ?? Buffer.alloc(0)), "text/plain")
        ?.content.toString("utf8") ?? "";
    check("blank phone renders as an em dash, not an empty row", plain.includes("Phone: —"));
  }

  /* -------------------------------------------------- 3. contact honeypot */
  console.log("\n3. Contact form — honeypot filled (a bot)");
  {
    const before = sink.messages.length;
    const res = await postJson(origin, "10.0.0.3", {
      name: "Bot", email: "bot@example.com", company: "Bot Co",
      message: "buy cheap things", company_url: "http://spam.example",
    });
    const json = await res.json();
    check("answers 200 so the bot learns nothing", res.status === 200);
    check("claims success", json.ok === true);
    check("but NO mail was sent", sink.messages.length === before, `sent ${sink.messages.length - before}`);
  }

  /* ------------------------------------------- 4. contact input rejection */
  console.log("\n4. Contact form — rejections");
  {
    const cases = [
      ["missing everything", {}, 422],
      ["invalid email", { name: "A", email: "not-an-email", company: "C", message: "M" }, 422],
      [
        "Reply-To injection via address punctuation",
        { name: "A", email: "victim@example.com>,<evil@attacker.example", company: "C", message: "M" },
        422,
      ],
      [
        "message over the 5000 character cap",
        { name: "A", email: "a@example.com", company: "C", message: "x".repeat(5001) },
        422,
      ],
      ["body that is not JSON", "<<not json>>", 400],
    ];
    let ip = 20;
    for (const [label, body, expected] of cases) {
      const before = sink.messages.length;
      const res = await postJson(origin, `10.0.1.${ip++}`, body);
      check(`${label} → ${expected}`, res.status === expected, `got ${res.status}`);
      check(`${label} sends no mail`, sink.messages.length === before);
    }
  }

  /* --------------------------------------- 5. contact header sanitisation */
  console.log("\n5. Contact form — CRLF in a name cannot forge a header");
  {
    const before = sink.messages.length;
    const res = await postJson(origin, "10.0.0.4", {
      name: "Eve\r\nBcc: leak@attacker.example",
      email: "eve@example.com",
      company: "Eve Ltd",
      message: "hello",
    });
    check("accepted", res.status === 200, `got ${res.status}`);
    if (sink.messages.length === before + 1) {
      const mime = parseMime(sink.messages[before].raw);
      check("no Bcc header was injected", !("bcc" in mime.headers), Object.keys(mime.headers).join(","));
      check(
        "recipients are still only the configured mailbox",
        sink.messages[before].to.join() === TO,
        sink.messages[before].to.join(),
      );
      check(
        "the newline is gone from Reply-To",
        !/[\r\n]/.test(mime.headers["reply-to"] ?? ""),
        mime.headers["reply-to"],
      );
    } else {
      check("mail sent", false, "no message captured");
    }
  }

  /* ---------------------------------------------- 6. contact rate limiter */
  console.log("\n6. Contact form — 5 an hour, then refused");
  {
    const ip = "10.9.9.9";
    const statuses = [];
    for (let i = 0; i < 6; i++) {
      const res = await postJson(origin, ip, {
        name: `Flood ${i}`, email: "flood@example.com", company: "F", message: "m",
      });
      statuses.push(res.status);
      if (i === 5) {
        check("6th request is 429", res.status === 429, `got ${res.status}`);
        check("carries Retry-After", Boolean(res.headers.get("retry-after")));
      }
    }
    check(
      "first five all accepted",
      statuses.slice(0, 5).every((s) => s === 200),
      statuses.join(","),
    );
  }

  /* ------------------------------------------ 7. RFP with an attachment */
  console.log("\n7. RFP form — with an attachment");
  {
    const before = sink.messages.length;
    const content = pdfLike(250 * 1024, 7);
    const res = await postRfp(origin, "10.1.0.1", VALID_RFP, {
      name: "wattana-rfp.pdf",
      content,
      type: "application/pdf",
    });
    const json = await res.json();
    check("HTTP 200", res.status === 200, `got ${res.status} ${JSON.stringify(json)}`);
    check("mail sent", sink.messages.length === before + 1);

    const msg = sink.messages[before];
    if (msg) {
      const mime = parseMime(msg.raw);
      check("goes to RFP_TO_EMAIL, not the contact mailbox", msg.to.join() === RFP_TO, msg.to.join());
      const from = mailbox(mime.headers.from);
      check("From address is CONTACT_FROM_EMAIL", from.address === FROM, from.raw);
      check("From display name marks it as an RFP", from.name === "Wesantika RFP", from.raw);

      const replyTo = mailbox(mime.headers["reply-to"]);
      check("Reply-To address is the enquirer", replyTo.address === VALID_RFP.email, replyTo.raw);
      check("Reply-To names the enquirer", replyTo.name === VALID_RFP.name, replyTo.raw);
      check("Reply-To holds exactly one address", replyTo.count === 1, replyTo.raw);
      check(
        "Subject names sender and company",
        decodeWord(mime.headers.subject ?? "") === "RFP from Aiko Tanaka (Tanaka Manufacturing KK)",
        decodeWord(mime.headers.subject ?? ""),
      );

      const plain = findPart(mime, "text/plain")?.content.toString("utf8") ?? "";
      for (const value of [VALID_RFP.name, VALID_RFP.phone, VALID_RFP.company, VALID_RFP.email]) {
        check(`text part carries "${value}"`, plain.includes(value));
      }
      check("brief is included in full", plain.includes("40 users, Japanese and English"));
      check("the filename is listed in the body", plain.includes("wattana-rfp.pdf"));

      const att = attachmentOf(mime);
      check("an attachment part exists", Boolean(att));
      if (att) {
        check("filename preserved", filenameOf(att) === "wattana-rfp.pdf", String(filenameOf(att)));
        check(
          "declared as PDF",
          (att.headers["content-type"] ?? "").includes("application/pdf"),
          att.headers["content-type"],
        );
        check(
          "transferred as base64",
          (att.headers["content-transfer-encoding"] ?? "").toLowerCase() === "base64",
          att.headers["content-transfer-encoding"],
        );
        check(
          `attachment is byte-identical (${content.length} bytes)`,
          att.content.length === content.length && att.content.equals(content),
          `sent ${content.length}/${sha(content)}, received ${att.content.length}/${sha(att.content)}`,
        );
        check(
          "still begins with the PDF magic number",
          att.content.subarray(0, 8).toString() === "%PDF-1.7",
          att.content.subarray(0, 8).toString(),
        );
      }
    }
  }

  /* ------------------------------------------ 8. RFP with no attachment */
  console.log("\n8. RFP form — attachment is optional");
  {
    const before = sink.messages.length;
    const res = await postRfp(origin, "10.1.0.2", VALID_RFP, null);
    check("HTTP 200", res.status === 200, `got ${res.status}`);
    check("mail sent", sink.messages.length === before + 1);
    if (sink.messages.length === before + 1) {
      const mime = parseMime(sink.messages[before].raw);
      check("no attachment part", !attachmentOf(mime));
      const plain = findPart(mime, "text/plain")?.content.toString("utf8") ?? "";
      check("body says there is none", plain.includes("Attachment: —"));
    }
  }

  /* ------------------------------------- 8b. RFP, phone left blank ------- */
  console.log("\n8b. RFP form — the phone number is optional");
  {
    /* Phone used to be required on this form and is not any more, so the
       interesting case is not that a blank one is *accepted* — it is that the
       mail still reads properly without it. A missing optional field that
       renders as an empty row looks like a delivery fault to whoever opens the
       enquiry, which is why the contact route has always written an em dash. */
    const before = sink.messages.length;
    const res = await postRfp(origin, "10.3.0.1", { ...VALID_RFP, phone: "" }, null);
    check("HTTP 200 with no phone", res.status === 200, `got ${res.status}`);
    check("mail sent", sink.messages.length === before + 1);
    if (sink.messages.length === before + 1) {
      const mime = parseMime(sink.messages[before].raw);
      const plain = findPart(mime, "text/plain")?.content.toString("utf8") ?? "";
      const html = findPart(mime, "text/html")?.content.toString("utf8") ?? "";
      check("body shows an em dash, not a blank row", plain.includes("Business phone: —"));
      check("the HTML table keeps the row too", html.includes("Business phone"));
      check("every other field still arrived", plain.includes(VALID_RFP.company));
    }

    /* Omitted entirely rather than sent empty — a hand-built request, or a
       browser that drops a blank input, must behave the same way. */
    const absent = { ...VALID_RFP };
    delete absent.phone;
    const res2 = await postRfp(origin, "10.3.0.2", absent, null);
    check("HTTP 200 with the field absent from the form data", res2.status === 200, `got ${res2.status}`);

    /* Still capped when it *is* supplied — optional is not unvalidated. */
    const tooLong = await postRfp(
      origin, "10.3.0.3", { ...VALID_RFP, phone: "9".repeat(61) }, null,
    );
    check("a 61-character phone is still refused with 422", tooLong.status === 422, `got ${tooLong.status}`);
  }

  /* -------------------------------- 9. RFP filename handling and unicode */
  console.log("\n9. RFP form — filename handling");
  {
    /* The separator is constructed, not typed. Written as a literal it has to
       survive this file, a shell heredoc and JSON escaping, and losing it on
       the way in makes the route look broken when it is not — which is exactly
       what happened the first time this case was written. */
    const BS = String.fromCharCode(92);
    const cases = [
      ["a Japanese filename survives intact", "要件定義書.docx", "要件定義書.docx"],
      ["a spaced ASCII name survives", "Q3 brief final.pdf", "Q3 brief final.pdf"],
      ["a forward-slash path is stripped", "../../etc/secret.pdf", "secret.pdf"],
      [
        "a Windows path is stripped",
        `..${BS}..${BS}Windows${BS}System32${BS}config.pdf`,
        "config.pdf",
      ],
      ["a single backslash is stripped", `folder${BS}brief.pdf`, "brief.pdf"],
      ["a quote in the name cannot break the header", 'weird".pdf', "weird .pdf"],
    ];

    let ip = 30;
    for (const [label, sent, expected] of cases) {
      const before = sink.messages.length;
      const res = await postRfp(origin, `10.2.0.${ip++}`, VALID_RFP, {
        name: sent,
        content: pdfLike(4096, ip),
        type: "application/pdf",
      });
      if (res.status !== 200 || sink.messages.length !== before + 1) {
        check(label, false, `HTTP ${res.status}, ${sink.messages.length - before} messages`);
        continue;
      }
      const att = attachmentOf(parseMime(sink.messages[before].raw));
      const got = att ? filenameOf(att) : null;
      check(label, got === expected, `sent ${JSON.stringify(sent)} → got ${JSON.stringify(got)}`);
      check("  …and no path separator survives", !/[\\/]/.test(got ?? ""), JSON.stringify(got));
    }

    /* The route caps the name at 180 characters, which is what stops a hostile
       upload pushing a multi-kilobyte parameter into the header block. */
    const before = sink.messages.length;
    const res = await postRfp(origin, "10.2.1.1", VALID_RFP, {
      name: `${"x".repeat(216)}.pdf`,
      content: pdfLike(4096, 99),
      type: "application/pdf",
    });
    check("a 220-character filename is accepted", res.status === 200, `got ${res.status}`);
    if (sink.messages.length === before + 1) {
      const att = attachmentOf(parseMime(sink.messages[before].raw));
      const got = att ? filenameOf(att) : null;
      check("truncated to exactly 180 characters", got?.length === 180, `length ${got?.length}`);
    }
  }

  /* ------------------------------------------------ 10. RFP size limits */
  console.log("\n10. RFP form — the 10MB limit, on both sides of the line");
  {
    const MB = 1024 * 1024;
    const before = sink.messages.length;
    const res = await postRfp(origin, "10.1.0.4", VALID_RFP, {
      name: "exactly-10mb.zip", content: bytes(10 * MB, 3), type: "application/zip",
    });
    check("exactly 10MB is accepted", res.status === 200, `got ${res.status}`);
    if (sink.messages.length === before + 1) {
      const att = attachmentOf(parseMime(sink.messages[before].raw));
      check(
        "all 10MB arrived intact",
        att && att.content.length === 10 * MB,
        `received ${att?.content.length}`,
      );
    }

    const over = await postRfp(origin, "10.1.0.5", VALID_RFP, {
      name: "too-big.zip", content: bytes(10 * MB + 1, 4), type: "application/zip",
    });
    check("10MB + 1 byte is refused with 413", over.status === 413, `got ${over.status}`);
    check("error code the dialog can translate", (await over.json()).error === "file_too_large");
  }

  /* --------------------------------------------- 11. RFP other rejections */
  console.log("\n11. RFP form — rejections");
  {
    const before = sink.messages.length;

    const badType = await postRfp(origin, "10.1.1.1", VALID_RFP, {
      name: "payload.exe", content: bytes(2048, 5), type: "application/octet-stream",
    });
    check("disallowed extension → 415", badType.status === 415, `got ${badType.status}`);
    check("error code file_type", (await badType.json()).error === "file_type");

    const noToken = await postRfp(
      origin, "10.1.1.2", { ...VALID_RFP, turnstileToken: "" }, null,
    );
    check("missing captcha token → 400", noToken.status === 400, `got ${noToken.status}`);
    check("error code captcha_missing", (await noToken.json()).error === "captcha_missing");

    const noBrief = await postRfp(origin, "10.1.1.3", { ...VALID_RFP, brief: "" }, null);
    check("missing brief → 422", noBrief.status === 422, `got ${noBrief.status}`);

    const badEmail = await postRfp(
      origin, "10.1.1.4", { ...VALID_RFP, email: "a>,<b@evil.example" }, null,
    );
    check("Reply-To injection → 422", badEmail.status === 422, `got ${badEmail.status}`);

    const notForm = await fetch(`${origin}/api/rfp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "cf-connecting-ip": "10.1.1.5" },
      body: "{}",
    });
    check("non-multipart body → 400", notForm.status === 400, `got ${notForm.status}`);

    check("none of the rejections sent mail", sink.messages.length === before,
      `sent ${sink.messages.length - before}`);
  }

  /* -------------------------------------------------- 12. RFP rate limit */
  console.log("\n12. RFP form — 3 an hour, then refused");
  {
    const ip = "10.8.8.8";
    const statuses = [];
    for (let i = 0; i < 4; i++) {
      const res = await postRfp(origin, ip, VALID_RFP, null);
      statuses.push(res.status);
      if (i === 3) {
        check("4th request is 429", res.status === 429, `got ${res.status}`);
        check("carries Retry-After", Boolean(res.headers.get("retry-after")));
      }
    }
    check("first three accepted", statuses.slice(0, 3).every((s) => s === 200), statuses.join(","));
  }

  console.log(`\n${sink.messages.length} messages captured by the SMTP sink.`);
} finally {
  await app.stop();
  await sink.close();
}

/* ================================================ 13. the Ethereal branch
   What the site is actually running on today: no SMTP configured, so
   `lib/mailer.ts` provisions a disposable mailbox and returns a URL where the
   delivered message can be read. Checked against the live service, because a
   `previewUrl` that 404s is the failure mode that matters here.            */

console.log("\n13. Development fallback — Ethereal, no SMTP configured");
const dev = startApp({
  SMTP_HOST: "", SMTP_PORT: "", SMTP_USER: "", SMTP_PASS: "",
  CONTACT_TO_EMAIL: TO, RFP_TO_EMAIL: RFP_TO, CONTACT_FROM_EMAIL: FROM,
});

try {
  await dev.ready;
  const res = await postJson(dev.origin, "10.7.7.7", {
    name: "Ethereal Check", email: "check@example.com", company: "Check Co",
    message: "Verifying the development mail fallback.",
  });
  const json = await res.json();
  check("HTTP 200", res.status === 200, `got ${res.status} ${JSON.stringify(json)}`);
  check("previewUrl returned", typeof json.previewUrl === "string", String(json.previewUrl));

  if (typeof json.previewUrl === "string") {
    console.log(`         ${json.previewUrl}`);
    const page = await fetch(json.previewUrl);
    check("the preview page loads", page.ok, `HTTP ${page.status}`);
    const html = await page.text();
    check("it shows this message's subject", html.includes("Ethereal Check"));
  }

  const rfp = await postRfp(dev.origin, "10.7.7.8", VALID_RFP, {
    name: "ethereal-attachment.pdf", content: pdfLike(64 * 1024, 13), type: "application/pdf",
  });
  const rjson = await rfp.json();
  check("RFP with attachment sends", rfp.status === 200, `got ${rfp.status} ${JSON.stringify(rjson)}`);
  check("previewUrl returned", typeof rjson.previewUrl === "string", String(rjson.previewUrl));
  if (typeof rjson.previewUrl === "string") {
    console.log(`         ${rjson.previewUrl}`);
    const page = await fetch(rjson.previewUrl);
    check("the preview page loads", page.ok, `HTTP ${page.status}`);
    const html = await page.text();
    check("the attachment is listed on it", html.includes("ethereal-attachment.pdf"));
  }
} catch (error) {
  check("Ethereal fallback reachable", false, String(error.message ?? error));
} finally {
  await dev.stop();
}

/* -------------------------------------------------------------- summary */

console.log(`\n${"-".repeat(64)}`);
if (failures.length === 0) {
  console.log(`${passed} checks passed, 0 failed.`);
  process.exit(0);
}
console.log(`${passed} checks passed, ${failures.length} FAILED:`);
for (const f of failures) console.log(`  - ${f}`);
process.exit(1);
