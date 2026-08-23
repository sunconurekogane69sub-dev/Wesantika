/**
 * Everything, in one command.
 *
 * There are a dozen audit scripts in this directory and no single entry point,
 * which meant the honest answer to "is the site healthy?" was a dozen commands
 * that nobody remembers in full — so in practice some were never run, and a
 * regression could sit in one of them indefinitely. That is the whole problem
 * this file solves.
 *
 * Two groups, because they cost very different things:
 *
 *   static   typecheck, i18n coverage, typography, colour, layout fit, media.
 *            No browser, no server, a few seconds. Always run.
 *   live     the smoke test, the overflow sweep, the accessibility sweep and
 *            the mail harness. These
 *            need a built app; the first two need a server and Chrome, and the
 *            mail harness starts its own. Skipped with `--static`.
 *
 * The server is started here, once, and reused — `next start` takes a few
 * seconds and three scripts each spinning up their own was most of the runtime.
 * It is always stopped, including on Ctrl-C, so a failed run does not leave a
 * port held.
 *
 * Usage:
 *   npm run check              # everything (builds first)
 *   npm run check -- --static  # no browser, no server, no build
 *   npm run check -- --skip-mail
 */
import { spawn } from "node:child_process";

const args = new Set(process.argv.slice(2));
const STATIC_ONLY = args.has("--static");
const SKIP_MAIL = args.has("--skip-mail") || STATIC_ONLY;
const PORT = Number(process.env.CHECK_PORT ?? 4390);

const run = (command, argv, env = {}) =>
  new Promise((resolve) => {
    const child = spawn(command, argv, {
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
      env: { ...process.env, ...env },
    });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("exit", (code) => resolve({ code: code ?? 1, out }));
    child.on("error", (e) => resolve({ code: 1, out: String(e) }));
  });

const results = [];

async function step(name, command, argv, env) {
  process.stdout.write(`  ${name.padEnd(14)} `);
  const started = process.hrtime.bigint();
  const { code, out } = await run(command, argv, env);
  const secs = Number(process.hrtime.bigint() - started) / 1e9;
  results.push({ name, code, out });
  console.log(`${code === 0 ? "ok  " : "FAIL"}  ${secs.toFixed(1)}s`);
  return code === 0;
}

/* ---------------------------------------------------------------- static */

console.log("\nStatic checks\n");
await step("typecheck", "npx", ["tsc", "--noEmit"]);
await step("i18n", "node", ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/i18n-coverage.mjs"]);
await step("typography", "node", ["scripts/type-audit.mjs"]);
await step("ink", "node", ["scripts/ink-audit.mjs"]);
await step("fit", "node", ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/fit-check.mjs"]);
await step("media", "node", ["scripts/media-check.mjs"]);
await step("mp4", "node", ["scripts/mp4-verify.mjs"]);
await step("turnstile", "node", ["scripts/turnstile-check.mjs"]);

/* ------------------------------------------------------------------ live */

let server = null;
const stopServer = () => {
  if (server && !server.killed) server.kill();
  server = null;
};
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopServer();
    process.exit(130);
  });
}
/* Covers a throw anywhere below. Without it the server outlives the run and
   the next one inherits the problem described above. */
process.on("exit", stopServer);

if (!STATIC_ONLY) {
  console.log("\nBuild\n");
  await step("build", "npx", ["next", "build"]);

  console.log("\nLive checks\n");
  process.stdout.write(`  ${"server".padEnd(14)} `);
  /*
    Refuse to run if the port is already taken.

    This cost an hour. An earlier version stopped the server with `kill()` on a
    `shell: true` child, which on Windows kills the cmd wrapper and leaves
    `next start` orphaned. The next run's `next start` then failed to bind, the
    readiness probe took its 200 from the **orphan still serving an older
    build**, and the suite reported 30 layout failures that did not exist in the
    working tree. A harness that silently tests the wrong build is worse than no
    harness — it produces false failures and, far worse, false passes.

    So the port is checked rather than trusted.
  */
  try {
    const stale = await fetch(`http://127.0.0.1:${PORT}/en`, {
      signal: AbortSignal.timeout(1500),
    });
    if (stale.ok) {
      console.log(`FAIL  something is already serving :${PORT}`);
      console.log(
        `\n  Port ${PORT} is in use, and whatever answers there is probably a stale` +
          `\n  server from an interrupted run. Stop it, or set CHECK_PORT.\n`,
      );
      process.exit(1);
    }
  } catch {
    /* Nothing listening, which is what we want. */
  }

  /* No `shell: true`, and node directly rather than `npx`. Both matter: a
     shell wrapper means `kill()` reaches the wrapper and not the server, and
     `npx` puts a second process in between. This way the handle held here is
     the server itself, so stopping it stops it. */
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
    { stdio: "ignore" },
  );

  let up = false;
  for (let i = 0; i < 120 && !up; i++) {
    try {
      up = (await fetch(`http://127.0.0.1:${PORT}/en`)).ok;
    } catch {
      /* not listening yet */
    }
    if (!up) await new Promise((r) => setTimeout(r, 500));
  }
  console.log(up ? `ok    :${PORT}` : "FAIL  did not start");

  if (up) {
    await step("smoke", "node", ["scripts/smoke.mjs"], {
      SMOKE_URL: `http://127.0.0.1:${PORT}`,
    });
    await step("overflow", "node", ["scripts/overflow-check.mjs"], {
      PORT: String(PORT),
    });
    await step("a11y", "node", ["scripts/a11y-check.mjs"], {
      PORT: String(PORT),
    });
  } else {
    results.push({ name: "server", code: 1, out: "next start never became ready" });
  }

  stopServer();

  /* Last, and on its own port: it starts and stops the app twice with its own
     SMTP configuration, so it cannot share the server above. */
  if (!SKIP_MAIL) await step("mail", "node", ["scripts/mail-check.mjs"]);
}

/* --------------------------------------------------------------- summary */

const failed = results.filter((r) => r.code !== 0);

console.log(`\n${"-".repeat(66)}`);
if (failed.length === 0) {
  console.log(`${results.length} checks passed.\n`);
  process.exit(0);
}

console.log(`${results.length - failed.length} passed, ${failed.length} FAILED\n`);
for (const f of failed) {
  console.log(`--- ${f.name} ${"-".repeat(Math.max(0, 60 - f.name.length))}`);
  // The tail is where these scripts put their verdict.
  console.log(f.out.trimEnd().split("\n").slice(-14).join("\n"));
  console.log();
}
process.exit(1);
