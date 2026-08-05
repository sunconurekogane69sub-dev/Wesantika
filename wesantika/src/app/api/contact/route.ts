import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getMailer } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO_EMAIL ?? "contact@wesantika.example";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "no-reply@wesantika.example";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
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
