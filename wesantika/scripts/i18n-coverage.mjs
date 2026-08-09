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
const paths = leaves(en);

console.log(`English catalogue: ${paths.length} leaf keys\n`);

let failed = false;

for (const [code, floor] of Object.entries(FLOORS)) {
  const dict = await load(code);
  const missing = paths.filter((p) => !filled(at(dict, p)));
  const pct = ((paths.length - missing.length) / paths.length) * 100;
  const ok = pct >= floor;
  if (!ok) failed = true;

  console.log(
    `${ok ? "  ok  " : "  FAIL"} ${code.padEnd(11)} ${pct.toFixed(1).padStart(5)}%` +
      `  ${String(missing.length).padStart(3)} fall back   (floor ${floor}%)`,
  );

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
  console.log("");
}

if (failed) {
  console.error("A locale fell below its floor — translations regressed.");
  process.exit(1);
}
