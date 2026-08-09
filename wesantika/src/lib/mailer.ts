import nodemailer, { type Transporter } from "nodemailer";
import { env, envInt } from "./env";

type Mailer = { transporter: Transporter; isTestAccount: boolean };

let cached: Promise<Mailer> | null = null;

async function create(): Promise<Mailer> {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");

  if (host && user && pass) {
    return {
      transporter: nodemailer.createTransport({
        host,
        port: envInt("SMTP_PORT", 587),
        secure: env("SMTP_SECURE") === "true",
        auth: { user, pass },
      }),
      isTestAccount: false,
    };
  }

  // Nothing configured: provision a disposable Ethereal mailbox. The message is
  // genuinely delivered over SMTP, and the response carries a URL where the
  // delivered mail can be read — so the form is verifiably working without any
  // real credentials or a real recipient.
  const account = await nodemailer.createTestAccount();
  return {
    transporter: nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: { user: account.user, pass: account.pass },
    }),
    isTestAccount: true,
  };
}

export function getMailer(): Promise<Mailer> {
  cached ??= create().catch((error: unknown) => {
    cached = null; // allow the next request to retry provisioning
    throw error;
  });
  return cached;
}
