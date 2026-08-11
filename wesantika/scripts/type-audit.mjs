/**
 * Typography audit.
 *
 *     npm run typography
 *
 * Two things are checked, because both were wrong and neither shows up in a
 * build:
 *
 * 1. **Line-height against size.** The scale lifted from Figma applied a single
 *    ratio to every step — 16/19, 20/24, 24/29, 32/39, 36/44, 48/58, 64/77, all
 *    of them 1.19-1.22. That is correct for a headline and far too tight for a
 *    paragraph, and it had propagated to 46 places. Line-height must fall as
 *    size rises; this fails if body copy drops below 1.40.
 *
 * 2. **Bold body copy.** A `<p>` set bold is not emphasis, it is noise, and a
 *    page where everything is bold has no hierarchy at all. Buttons, labels and
 *    nav items are legitimately bold, so this only reports the count — it is a
 *    number to keep an eye on rather than a hard gate.
 *
 * Sizes and leadings are paired only within the same responsive prefix, so
 * `text-[30px] ... xl:leading-[58px]` is not misread as a 1.93 ratio.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

/** Body copy below this reads cramped. */
const MIN_BODY_RATIO = 1.4;
/** Anything at or below this size is treated as body copy. */
const BODY_MAX_PX = 20;

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

const pairs = new Map();
const offenders = [];
let boldBody = 0;

for (const file of walk(ROOT)) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/(?:"|`)([^"`\n]*text-\[[^"`\n]*)(?:"|`)/g)) {
    const cls = m[1];
    const tokens = cls.split(/\s+/);

    const byPrefix = new Map();
    for (const tk of tokens) {
      const i = tk.lastIndexOf(":");
      const prefix = i === -1 ? "" : tk.slice(0, i);
      const bare = i === -1 ? tk : tk.slice(i + 1);
      if (!byPrefix.has(prefix)) byPrefix.set(prefix, []);
      byPrefix.get(prefix).push(bare);
    }

    // base values carry into larger breakpoints unless overridden
    let size = null, lead = null;
    for (const prefix of ["", "sm", "md", "lg", "xl"]) {
      const group = byPrefix.get(prefix) ?? [];
      const s = group.find((t) => /^text-\[\d/.test(t));
      const l = group.find((t) => /^leading-\[/.test(t));
      if (s) size = Number(s.match(/\d+(?:\.\d+)?/)[0]);
      if (l) {
        const raw = l.slice("leading-[".length, -1);
        lead = raw.endsWith("px") ? { px: Number(raw.slice(0, -2)) } : { rel: Number(raw) };
      }
      if ((!s && !l) || size == null || lead == null) continue;

      const ratio = lead.rel ?? lead.px / size;
      const key = `${size}|${ratio.toFixed(2)}`;
      pairs.set(key, (pairs.get(key) ?? 0) + 1);

      if (size <= BODY_MAX_PX && ratio < MIN_BODY_RATIO) {
        offenders.push({
          file: file.replace(ROOT, "src"),
          size,
          ratio,
          cls: cls.slice(0, 64),
        });
      }
    }

    if (tokens.some((t) => t.endsWith("font-bold"))) {
      const sizeTok = tokens.find((t) => /^text-\[\d/.test(t));
      if (sizeTok && Number(sizeTok.match(/\d+/)[0]) <= BODY_MAX_PX) boldBody++;
    }
  }
}

const rows = [...pairs]
  .map(([k, n]) => {
    const [size, ratio] = k.split("|").map(Number);
    return { size, ratio, n };
  })
  .sort((a, b) => a.size - b.size || a.ratio - b.ratio);

console.log("Line-height by size — body wants >= 1.40, display tightens as it grows\n");
let lastSize = null;
for (const r of rows) {
  if (r.size !== lastSize) {
    lastSize = r.size;
    console.log("");
  }
  const bad = r.size <= BODY_MAX_PX && r.ratio < MIN_BODY_RATIO;
  console.log(
    `  ${String(r.size).padStart(3)}px  ${r.ratio.toFixed(2)}  x${String(r.n).padStart(2)}${bad ? "   <-- CRAMPED" : ""}`,
  );
}

console.log(`\n  ${boldBody} usages of <=${BODY_MAX_PX}px set bold (buttons and labels included)`);

if (offenders.length) {
  console.log("\nCRAMPED BODY COPY");
  for (const o of offenders) {
    console.log(`  ${o.size}px @ ${o.ratio.toFixed(2)}  ${o.file}`);
    console.log(`      ${o.cls}`);
  }
  console.error(`\n${offenders.length} body-copy usages below ${MIN_BODY_RATIO} line-height.`);
  process.exit(1);
}

console.log("\nNo cramped body copy.");
