import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import { getMailer } from "@/lib/mailer";
import { clientKey, hit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Three RFPs an hour from one address.
 *
 * Turnstile already stops a bot that cannot solve a challenge, but it bounds
 * how *hard* a request is to make, not how many are made — a solved token in a
 * loop is still a loop, and this endpoint accepts a 10MB attachment per call.
 * Lower than the contact limit because sending three genuine RFPs in an hour is
 * already an unusual thing to do.
 */
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

/**
 * Fallbacks are the real mailbox, not a `.example` placeholder.
 *
 * The placeholder was deliberate while no real address existed: it made an
 * unconfigured deployment fail loudly. Now that one exists, the safer default is
 * the opposite — a deployment that forgets `CONTACT_TO_EMAIL` should still
 * deliver, rather than drop enquiries into a domain that cannot receive them.
 */
const TO = env("RFP_TO_EMAIL") ?? env("CONTACT_TO_EMAIL") ?? "lh.smartcoding@gmail.com";
const FROM = env("CONTACT_FROM_EMAIL") ?? "lh.smartcoding@gmail.com";

/**
 * Cloudflare's documented "always passes" test secret. Real deployments set
 * TURNSTILE_SECRET_KEY; the verification call itself is identical either way, so
 * the production path is exercised in development too.
 */
const TURNSTILE_SECRET =
  env("TURNSTILE_SECRET_KEY") ?? "1x0000000000000000000000000000000AA";
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".zip", ".txt", ".md",
];

/** Excludes address-list punctuation as well as whitespace — see the note in
 *  `api/contact/route.ts` on `Reply-To` injection through `x>,<evil@host`. */
const EMAIL_RE = /^[^\s@<>,;:"()[\]\\]+@[^\s@<>,;:"()[\]\\]+\.[^\s@<>,;:"()[\]\\]+$/;
const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
/** Strip CR/LF and quotes so user input can never forge a mail header. */
const header = (v: string) => v.replace(/["\r\n]+/g, " ").trim();
const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

async function verifyTurnstile(token: string, ip: string | null) {
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET, response: token });
  if (ip) body.set("remoteip", ip);

  const res = await fetch(VERIFY_URL, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (!res.ok) return { ok: false, codes: [`http_${res.status}`] };
  const json = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  return { ok: json.success === true, codes: json["error-codes"] ?? [] };
}

export async function POST(request: Request) {
  // Before `formData()`, so a flood is refused without first buffering a 10MB
  // upload per request.
  const limit = hit(`rfp:${clientKey(request)}`, LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ---- spam check first: never spend work on unverified submissions --------
  const token = text(form.get("turnstileToken"));
  if (!token) {
    return NextResponse.json({ error: "captcha_missing" }, { status: 400 });
  }
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;
  const verdict = await verifyTurnstile(token, ip);
  if (!verdict.ok) {
    console.warn("[rfp] turnstile rejected:", verdict.codes.join(", "));
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }

  // ---- fields --------------------------------------------------------------
  const name = text(form.get("name"));
  const phone = text(form.get("phone"));
  const company = text(form.get("company"));
  const email = text(form.get("email"));
  const brief = text(form.get("brief"));

  const errors: string[] = [];
  if (!name) errors.push("Name is required.");
  if (!phone) errors.push("Business phone is required.");
  if (!company) errors.push("Company name is required.");
  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("That email address looks invalid.");
  if (!brief) errors.push("A project brief is required.");
  if (
    name.length > 200 || phone.length > 60 || company.length > 200 ||
    email.length > 200 || brief.length > 20000
  ) {
    errors.push("One of the fields is longer than we can accept.");
  }
  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  // ---- optional attachment -------------------------------------------------
  const attachments: { filename: string; content: Buffer }[] = [];
  const upload = form.get("file");
  if (upload && typeof upload !== "string" && upload.size > 0) {
    if (upload.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "file_too_large" }, { status: 413 });
    }
    const lower = upload.name.toLowerCase();
    if (!ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
      return NextResponse.json({ error: "file_type" }, { status: 415 });
    }
    attachments.push({
      // strip any path component the browser may have supplied
      filename: header(upload.name.replace(/^.*[\\/]/, "")).slice(0, 180),
      content: Buffer.from(await upload.arrayBuffer()),
    });
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Business phone", phone],
    ["Company", company],
    ["Email", email],
    ["Attachment", attachments[0]?.filename ?? "—"],
  ];

  try {
    const { transporter, isTestAccount } = await getMailer();

    const info = await transporter.sendMail({
      from: `"Wesantika RFP" <${FROM}>`,
      to: TO,
      replyTo: `"${header(name)}" <${email}>`,
      subject: `RFP from ${header(name)} (${header(company)})`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        "",
        "Project brief:",
        brief,
      ].join("\n"),
      html: `
        <table style="font:14px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#5b6b7d">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <h3 style="font:600 15px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;margin:20px 0 6px">Project brief</h3>
        <p style="font:14px/1.7 -apple-system,Segoe UI,Roboto,sans-serif;white-space:pre-wrap;margin:0">${escapeHtml(brief)}</p>
      `,
      attachments,
    });

    return NextResponse.json({
      ok: true,
      previewUrl: isTestAccount ? (nodemailer.getTestMessageUrl(info) || null) : null,
    });
  } catch (error) {
    console.error("[rfp] send failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your RFP. Please try again shortly." },
      { status: 502 },
    );
  }
}
