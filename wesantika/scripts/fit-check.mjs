/**
 * Fit check — will the copy still fit at every locale?
 *
 *     npm run fit
 *
 * A hero is a box with a fixed height. The copy inside it is five different
 * lengths, because there are five locales, and the longest is not the one the
 * layout was eyeballed against. That is how the About Us hero came to overflow:
 * `heroLead` is 240 characters in English and 272 in Vietnamese, set at the
 * heading size, in a box that had just been shortened from 942px to 560px.
 *
 * This estimates rendered height per locale and fails if a block does not fit.
 *
 * It is an estimate, deliberately pessimistic: average advance widths per
 * script, no hyphenation, and Thai combining marks counted as if they advanced
 * (they do not). So it over-predicts height and will complain before the
 * browser does — which is the useful direction to be wrong in.
 */
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = `${ROOT}/src/lib/i18n/dictionaries`;

/** Mean advance width as a fraction of font size, per script. */
const ADVANCE = { latin: 0.55, jp: 1.0, tc: 1.0, thai: 0.62 };

const LOCALES = [
  { code: "en", script: "latin" },
  { code: "ja", script: "jp" },
  { code: "zh-Hant-TW", script: "tc" },
  { code: "th", script: "thai" },
  { code: "vi", script: "latin" },
];

/**
 * The constrained regions. Geometry mirrors PageHero's `SIZE` table at xl,
 * minus the 95px the fixed nav occupies.
 *
 *   home  760px tall, 680px measure
 *   page  560px tall, 620px measure
 */
const HOME = { height: 760 - 95, measure: 680 };
const PAGE = { height: 560 - 95, measure: 620 };

const REGIONS = [
  {
    page: "Top", box: HOME,
    parts: [
      { path: "hero.title", size: 60, leading: 66 },
      { path: "hero.subtitle", size: 22, leading: 32, marginTop: 26 },
    ],
  },
  {
    page: "About", box: PAGE,
    parts: [
      { path: "about.title", size: 48, leading: 55 },
      { path: "about.heroLead", size: 19, leading: 30, marginTop: 20 },
    ],
  },
  {
    page: "Services", box: PAGE,
    parts: [
      { path: "servicesPage.hero.title", size: 48, leading: 55 },
      { path: "servicesPage.hero.body", size: 19, leading: 30, marginTop: 20 },
      { fixed: 80, label: "CTA button + margin" },
    ],
  },
  {
    page: "Technologies", box: PAGE,
    parts: [
      { path: "technologies.hero.title", size: 48, leading: 55 },
      { path: "technologies.hero.body", size: 19, leading: 30, marginTop: 20 },
      { fixed: 80, label: "CTA button + margin" },
    ],
  },
  {
    page: "Our Work", box: PAGE,
    parts: [
      { path: "work.heroTitle", size: 48, leading: 55 },
      { path: "work.heroBody", size: 19, leading: 30, marginTop: 20 },
    ],
  },
  {
    page: "Contact", box: PAGE,
    parts: [
      { path: "contact.heroTitle", size: 48, leading: 55 },
      { path: "contact.heroBody", size: 19, leading: 30, marginTop: 20 },
    ],
  },
];

/** The export name varies (`en`, `ja`, `zhHantTW`…), so take the sole export. */
async function load(name) {
  const mod = await import(pathToFileURL(`${DICT_DIR}/${name}.ts`).href);
  const found = Object.values(mod).find((v) => v && typeof v === "object");
  if (!found) throw new Error(`no dictionary object exported from ${name}.ts`);
  return found;
}

const at = (obj, path) =>
  path.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

const en = await load("en");

let failures = 0;
console.log("Estimated copy height against the box it has to fit in.\n");

for (const region of REGIONS) {
  const rows = [];
  let worst = 0;

  for (const { code, script } of LOCALES) {
    const dict = await load(code);
    let total = 0;
    let missing = false;

    for (const part of region.parts) {
      if (part.fixed) {
        total += part.fixed;
        continue;
      }
      // Locales fall back to English key by key, so resolve the same way.
      const text = at(dict, part.path) || at(en, part.path);
      if (typeof text !== "string") {
        missing = true;
        continue;
      }
      const charW = part.size * ADVANCE[script];
      const lines = Math.max(1, Math.ceil((text.length * charW) / region.box.measure));
      total += lines * part.leading + (part.marginTop ?? 0);
    }

    if (missing) {
      console.log(`  !! ${region.page}: a path in this region does not resolve`);
      failures++;
      break;
    }
    worst = Math.max(worst, total);
    rows.push({ code, total });
  }

  const fits = worst <= region.box.height;
  if (!fits) failures++;
  console.log(
    `  ${fits ? "ok  " : "FAIL"} ${region.page.padEnd(13)} worst ${String(Math.round(worst)).padStart(4)}px of ${region.box.height}px`,
  );
  for (const r of rows) {
    const flag = r.total > region.box.height ? "  <-- overflows" : "";
    console.log(`         ${r.code.padEnd(11)} ${String(Math.round(r.total)).padStart(4)}px${flag}`);
  }
  console.log("");
}

if (failures) {
  console.error("Copy does not fit its box in at least one locale.");
  process.exit(1);
}
