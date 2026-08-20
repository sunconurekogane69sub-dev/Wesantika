/**
 * Reports which Turnstile keys this environment is really using, and what that
 * means for the RFP form.
 *
 * ## Why this needs a script
 *
 * Turnstile is configured by a **pair** of keys that live in different places
 * and fail in different directions, and three of the four combinations are
 * broken in a way you cannot see by looking at the page:
 *
 *   site key   secret     what actually happens
 *   ---------  ---------  --------------------------------------------------
 *   test       test       widget shows the red "for testing only" band, and
 *                         every token is accepted. Visibly wrong — the good
 *                         case, because you find out.
 *   REAL       test       band disappears, and every token is still accepted.
 *                         **No spam protection, and nothing on screen says so.**
 *                         This is where you land if you fix only the visible
 *                         key, which is the natural thing to do first.
 *   test       REAL       the test widget issues a dummy token, which a real
 *                         secret rejects. Every RFP submission fails with
 *                         captcha_failed. The form is simply down.
 *   REAL       REAL       correct.
 *
 * The second row is the dangerous one and the third is an outage, so "the badge
 * went away" is not evidence that this is configured. This asks Cloudflare.
 *
 * ## How the secret is classified
 *
 * Not by string-matching Cloudflare's published test values — those can change
 * and a match tells you nothing about whether the key still works. Instead the
 * secret is used to verify a token that is definitely not real. A secret that
 * accepts it is an always-passes test secret; a real one returns
 * `invalid-input-response`; a wrong one returns `invalid-input-secret`.
 *
 * Usage:
 *   npm run turnstile                       # checks .env.local
 *   TURNSTILE_SECRET_KEY=0x... npm run turnstile
 */
import { readFileSync, existsSync } from "node:fs";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Cloudflare's dummy sitekeys all use these prefixes. */
const DUMMY_SITEKEY = /^[123]x0{20}AA$/;

/* Read .env.local the way Next does — the real process env wins over the file,
   so `VAR=... npm run turnstile` checks what you are about to deploy. */
function config() {
  const file = {};
  if (existsSync(".env.local")) {
    for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      if (!line.trim() || line.trimStart().startsWith("#")) continue;
      const i = line.indexOf("=");
      if (i === -1) continue;
      file[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  const pick = (name) => {
    const fromEnv = process.env[name];
    const value = (fromEnv && fromEnv.trim()) || file[name] || "";
    return { value, source: fromEnv && fromEnv.trim() ? "environment" : ".env.local" };
  };
  return {
    siteKey: pick("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
    secret: pick("TURNSTILE_SECRET_KEY"),
  };
}

async function classifySecret(secret) {
  if (!secret) return { kind: "test", why: "unset — the route falls back to the test secret" };

  const body = new URLSearchParams({
    secret,
    // Deliberately not a real token. What matters is how the secret reacts.
    response: "not-a-real-token",
  });

  let json;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    json = await res.json();
  } catch (error) {
    return { kind: "unknown", why: `could not reach Cloudflare: ${error.message}` };
  }

  const codes = json["error-codes"] ?? [];
  if (json.success === true) {
    return { kind: "test", why: "Cloudflare accepted a token that is not real — always-passes secret" };
  }
  if (codes.includes("invalid-input-secret")) {
    return { kind: "invalid", why: "Cloudflare does not recognise this secret" };
  }
  if (codes.includes("invalid-input-response")) {
    return { kind: "real", why: "rejected a fake token, which is what a real secret does" };
  }
  return { kind: "unknown", why: `unexpected response: ${JSON.stringify(json)}` };
}

/* ------------------------------------------------------------------- run */

const { siteKey, secret } = config();

const siteKind = !siteKey.value
  ? "test"
  : DUMMY_SITEKEY.test(siteKey.value)
    ? "test"
    : "real";

const secretResult = await classifySecret(secret.value);

const show = (v) => (v ? `${v.slice(0, 10)}${v.length > 10 ? "…" : ""}` : "(unset)");

console.log("Cloudflare Turnstile\n");
console.log(`  site key   ${show(siteKey.value).padEnd(14)} ${siteKind.toUpperCase().padEnd(8)} from ${siteKey.source}`);
console.log(`             ${siteKind === "test" ? "the widget shows the red \"for testing only\" band" : "no testing band on the widget"}`);
console.log(`  secret     ${show(secret.value).padEnd(14)} ${secretResult.kind.toUpperCase().padEnd(8)} from ${secret.source}`);
console.log(`             ${secretResult.why}`);
console.log();

let exit = 0;

if (siteKind === "test" && secretResult.kind === "test") {
  console.log("  STATE  Both keys are test keys.");
  console.log("         The RFP form works, but it accepts every submission — there is no");
  console.log("         spam protection — and visitors see the red testing band.");
  console.log("         Create a site at https://dash.cloudflare.com/?to=/:account/turnstile");
  console.log("         and set BOTH keys. Setting only one is worse than setting neither.");
  exit = 1;
} else if (siteKind === "real" && secretResult.kind === "test") {
  console.log("  STATE  DANGEROUS — real site key, test secret.");
  console.log("         The testing band is gone, so this looks fixed. It is not: the server");
  console.log("         still accepts any token, so the form has no spam protection at all");
  console.log("         and nothing on the page reveals it. Set TURNSTILE_SECRET_KEY.");
  exit = 1;
} else if (siteKind === "test" && secretResult.kind === "real") {
  console.log("  STATE  BROKEN — test site key, real secret.");
  console.log("         The test widget issues a dummy token and the real secret rejects it,");
  console.log("         so every RFP submission fails with captcha_failed. The form is down.");
  console.log("         NEXT_PUBLIC_TURNSTILE_SITE_KEY is inlined at BUILD time — if you set");
  console.log("         it on the host but did not redeploy, this is exactly what you get.");
  exit = 1;
} else if (secretResult.kind === "invalid") {
  console.log("  STATE  BROKEN — Cloudflare does not recognise the secret.");
  console.log("         Check it was copied whole, and that it is the secret key rather than");
  console.log("         a second copy of the site key.");
  exit = 1;
} else if (siteKind === "real" && secretResult.kind === "real") {
  console.log("  STATE  Configured correctly. Both keys are real and Cloudflare accepts the");
  console.log("         secret. Confirm the domain is on the site's allowed hostname list.");
} else {
  console.log(`  STATE  Could not determine — ${secretResult.why}`);
  exit = 1;
}

process.exit(exit);
