import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import { getMailer } from "@/lib/mailer";
import { clientKey, hit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Five messages an hour from one address.
 *
 * This form is in the footer of every page, so it is the most reachable thing
 * on the site, and it had no limit of any kind. Five is well above what a real
 * enquiry needs — a person who sends a second message because they forgot
 * something, and a third because they are unsure the first two arrived, is
 * still comfortably inside it — and far below what makes an endpoint worth
 * abusing. See the caveats at the top of `lib/rate-limit.ts`.
 */
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

/**
 * Fallbacks are the real mailbox, not a `.example` placeholder.
 *
 * The placeholder was deliberate while no real address existed: it made an
 * unconfigured deployment fail loudly. Now that one exists, the safer default is
 * the opposite — a deployment that forgets `CONTACT_TO_EMAIL` should still
 * deliver, rather than drop enquiries into a domain that cannot receive them.
 */
const TO = env("CONTACT_TO_EMAIL") ?? "lh.smartcoding@gmail.com";
const FROM = env("CONTACT_FROM_EMAIL") ?? "lh.smartcoding@gmail.com";

/**
 * Deliberately stricter than "has an @ in it".
 *
 * The previous pattern was `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, which excludes
 * whitespace — so it does stop the classic CRLF header injection — but permits
 * `<`, `>`, `,` and `;`. This value is interpolated into a `Reply-To` address
 * list, and `x>,<attacker@example.com` satisfies that pattern while parsing as
 * *two* addresses once it lands in the header. Excluding the address-list
 * punctuation closes it at the point of validation rather than relying on the
 * mail library to re-escape.
 */
const EMAIL_RE = /^[^\s@<>,;:"()[\]\\]+@[^\s@<>,;:"()[\]\\]+\.[^\s@<>,;:"()[\]\\]+$/;

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Strip CR/LF and quotes so user input can never forge a mail header. */
const header = (value: string) => value.replace(/["\r\n]+/g, " ").trim();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  const limit = hit(`contact:${clientKey(request)}`, LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  /*
    Honeypot.

    `company_url` is rendered off-screen, unlabelled and `tabIndex={-1}` — a
    person filling in this form has no way to reach it, so anything in it came
    from something that parsed the DOM and filled every input it found. That is
    most of the automated traffic a public contact form gets, and it costs one
    hidden field rather than a captcha on every page of the site.

    The response is a plain 200 with no mail sent. Telling a bot *why* it was
    rejected is how it learns to skip the field next time.
  */
  if (text(body.company_url)) {
    return NextResponse.json({ ok: true, previewUrl: null });
  }

  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone);
  const company = text(body.company);
  const message = text(body.message);

  const errors: string[] = [];
  if (!name) errors.push("Name is required.");
  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("That email address looks invalid.");
  if (!company) errors.push("Company is required.");
  if (!message) errors.push("Please tell us how we can help.");
  if (
    name.length > 200 ||
    email.length > 200 ||
    company.length > 200 ||
    phone.length > 60 ||
    message.length > 5000
  ) {
    errors.push("One of the fields is longer than we can accept.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company],
  ];

  try {
    const { transporter, isTestAccount } = await getMailer();

    const info = await transporter.sendMail({
      from: `"Wesantika website" <${FROM}>`,
      to: TO,
      replyTo: `"${header(name)}" <${email}>`,
      subject: `New enquiry from ${header(name)} (${header(company)})`,
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        "",
        "How can we help:",
        message,
      ].join("\n"),
      html: `
        <table style="font:14px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#5b6b7d">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <h3 style="font:600 15px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;margin:20px 0 6px">How can we help</h3>
        <p style="font:14px/1.7 -apple-system,Segoe UI,Roboto,sans-serif;white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({
      ok: true,
      previewUrl: isTestAccount ? (nodemailer.getTestMessageUrl(info) || null) : null,
    });
  } catch (error) {
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 },
    );
  }
}
