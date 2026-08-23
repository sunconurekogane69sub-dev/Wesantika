/**
 * Translation coverage, measured rather than remembered.
 *
 *     npm run i18n
 *
 * A hand-maintained "translation status" table in the README went stale the
 * first time a page was added: it claimed three locales were complete bar one
 * section, when they were at 47%. This walks the English catalogue — the source
 * of truth, since it defines the `Dictionary` type — and asks each locale
 * whether it supplies a usable value at the same path, applying exactly the
 * test `getDictionary` applies at runtime:
 *
 *   - objects merge key by key, so a nested gap still counts as a gap
 *   - arrays and strings replace wholesale, so they are single leaves
 *   - an empty string means "not translated" and falls back
 *
 * Pure Node, no dependencies: Node strips the TypeScript annotations itself.
 * Exits non-zero if any locale regresses below its recorded floor, so a new
 * English key cannot quietly dilute a locale without someone noticing.
 */
import { pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = `${ROOT}/src/lib/i18n/dictionaries`;

/**
 * Coverage floors. Raise these as translations land — never lower them to make
 * the script pass. `about.blocks` is deliberately English in every locale (see
 * README: it is the copy that needs transcreation, not translation), so 100%
 * is not the target for anyone.
 */
const FLOORS = {
  ja: 90,
  "zh-Hant-TW": 61,
  th: 60,
  vi: 60,
};

/**
 * Gaps that are a decision rather than a backlog.
 *
 * A single floor conflates two very different things — work not done yet, and
 * work deliberately not being done — and the second kind hides the first: once
 * a locale sits permanently below its floor for a known reason, a *real*
 * regression changes nothing anyone will notice. A permanently red check is
 * worse than no check. These are counted and reported separately so the floor
 * keeps meaning "did we go backwards".
 *
 * Japanese: the fifteen service write-ups added after the first translation
 * pass carry translated title, meta and CTA, with `intro` and `cards` left in
 * English. `cards` is an array, and arrays replace wholesale rather than
 * merging, so there is no way to translate one card — it is all fifteen
 * write-ups or none. That is a content commission, not a missing string, and
 * the note in ja.ts says so at the point a reader would wonder.
 *
 * Delete an entry when the work lands; the score rises on its own.
 */
const ACKNOWLEDGED = {
  ja: ["serviceDetails."],
};

const isAcknowledged = (code, path) =>
  (ACKNOWLEDGED[code] ?? []).some((prefix) => path.join(".").startsWith(prefix)) &&
  // Only the two long-form fields; a missing title or CTA is still a gap.
  (path.at(-1) === "intro" || path.at(-1) === "cards");

/** The export name varies (`en`, `ja`, `zhHantTW`…), so take the sole export. */
async function load(name) {
  const mod = await import(pathToFileURL(`${DICT_DIR}/${name}.ts`).href);
  const found = Object.values(mod).find((v) => v && typeof v === "object");
  if (!found) throw new Error(`no dictionary object exported from ${name}.ts`);
  return found;
}

/** Every leaf path in the catalogue. Arrays are leaves — they never merge. */
function leaves(node, prefix = []) {
  if (node == null) return [];
  if (typeof node === "string" || Array.isArray(node)) return [prefix];
  if (typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => leaves(v, [...prefix, k]));
  }
  return [];
}

const at = (obj, path) =>
  path.reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

const filled = (v) => {
  if (typeof v === "string") return v.trim() !== "";
  if (Array.isArray(v)) return v.length > 0 && v.some((x) => String(x).trim() !== "");
  return v != null;
};

const en = await load("en");

/**
 * Five English keys are empty strings — four `about.blocks.*.pullQuote` (only
 * one of the five blocks carries a pull quote) and `rfpModal.heading.trail`
 * (the emphasis lands at the end of the English sentence, so nothing follows).
 *
 * They were in the denominator, which made the score unreachable: there is
 * nothing to translate, so no locale could ever supply a value, so every locale
 * carried a permanent deficit no amount of work could close. Japanese was being
 * marked down for four quotations that do not exist in any language.
 *
 * A key with no source text is not untranslated. It is excluded, and the count
 * is printed so the exclusion is visible rather than silent.
 */
const allPaths = leaves(en);
const paths = allPaths.filter((p) => filled(at(en, p)));
const emptyInSource = allPaths.length - paths.length;

console.log(
  `English catalogue: ${paths.length} translatable leaf keys` +
    (emptyInSource ? ` (${emptyInSource} empty in the source, excluded)` : "") +
    "\n",
);

let failed = false;

for (const [code, floor] of Object.entries(FLOORS)) {
  const dict = await load(code);
  const gaps = paths.filter((p) => !filled(at(dict, p)));
  const known = gaps.filter((p) => isAcknowledged(code, p));
  const missing = gaps.filter((p) => !isAcknowledged(code, p));

  /* Scored against what the locale is actually committed to. The acknowledged
     set gets its own line rather than being folded into the percentage. */
  const scored = paths.length - known.length;
  const pct = ((scored - missing.length) / scored) * 100;
  const ok = pct >= floor;
  if (!ok) failed = true;

  console.log(
    `${ok ? "  ok  " : "  FAIL"} ${code.padEnd(11)} ${pct.toFixed(1).padStart(5)}%` +
      `  ${String(missing.length).padStart(3)} fall back   (floor ${floor}%)`,
  );
  if (known.length > 0) {
    console.log(
      `         + ${known.length} deliberately English (ACKNOWLEDGED in this file)`,
    );
  }

  // Group gaps by their first two segments so the report stays readable.
  const groups = new Map();
  for (const p of missing) {
    const key = p.slice(0, 2).join(".");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const ranked = [...groups].sort((a, b) => b[1] - a[1]);
  for (const [group, n] of ranked.slice(0, 6)) {
    console.log(`         ${group.padEnd(28)} x${n}`);
  }
  if (ranked.length > 6) console.log(`         …and ${ranked.length - 6} more groups`);

  /* The grouped summary is right for a pass/fail run, but it cannot be acted
     on — closing a gap needs the key paths. `--list` prints them, optionally
     filtered to one locale: `npm run i18n -- --list ja`. */
  if (process.argv.includes("--list")) {
    const only = process.argv[process.argv.indexOf("--list") + 1];
    if (!only || only === code) {
      for (const path of missing) console.log(`           ${path.join(".")}`);
    }
  }
  console.log("");
}

if (failed) {
  console.error("A locale fell below its floor — translations regressed.");
  process.exit(1);
}
