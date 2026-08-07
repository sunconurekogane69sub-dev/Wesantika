/**
 * Ink audit — decides text colour over imagery by measurement, not by the
 * Figma value.
 *
 * The source file has repeatedly specified white type over near-white artwork
 * (About Us 210:995, Services 250:1106/1107, Technologies 423:2388). Rather than
 * correct those one at a time, every text-over-image region on the site is
 * declared below and measured against the real pixels, including any scrim that
 * sits between them.
 *
 *   node scripts/ink-audit.mjs
 *
 * Rules applied:
 *   - body text          >= 4.5:1   (WCAG AA)
 *   - large text >=24px  >= 3.0:1   (AA large)
 *   - graphics / UI      >= 3.0:1
 * A region passes if its declared ink clears its threshold. The script also
 * reports the alternative ink so a better choice is obvious when one exists.
 *
 * JPEG sources are skipped — there is no JPEG decoder here. The two affected
 * regions (Services highlight cards) sit on the white upper area of their
 * photos and were checked by eye.
 */
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- PNG ---------------------------------------------------------- */
function decodePng(file) {
  const buf = readFileSync(file);
  let p = 8, w = 0, h = 0, ct = 0;
  const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    if (type === "IHDR") { w = buf.readUInt32BE(p + 8); h = buf.readUInt32BE(p + 12); ct = buf[p + 17]; }
    else if (type === "IDAT") idat.push(buf.subarray(p + 8, p + 8 + len));
    else if (type === "IEND") break;
    p += 12 + len;
  }
  const bpp = ct === 6 ? 4 : 3;
  const stride = w * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const out = Buffer.alloc(h * stride);
  const paeth = (a, b, c) => {
    const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < h; y++) {
    const ft = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0, b = prev ? prev[i] : 0, c = prev && i >= bpp ? prev[i - bpp] : 0;
      let v = src[i];
      if (ft === 1) v += a; else if (ft === 2) v += b;
      else if (ft === 3) v += (a + b) >> 1; else if (ft === 4) v += paeth(a, b, c);
      cur[i] = v & 0xff;
    }
  }
  return { w, h, bpp, data: out };
}

/* ---------- colour ------------------------------------------------------- */
const srgb = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const hex = (c) => "#" + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const parse = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));

const INK = { white: [255, 255, 255], black: [0, 0, 0] };
const NAVY = parse("#062a52");

/* ---------- scrim models -------------------------------------------------
   Each returns {colour, alpha} for a point in section coordinates.        */
const scrims = {
  /** The nav's own gradient: black 40% -> transparent over the top 140px. */
  nav: (x, y) => ({
    colour: [0, 0, 0],
    // held flat across the 95px bar, then faded out by 190px
    alpha: y <= 95 ? 0.55 : y >= 190 ? 0 : 0.55 * (1 - (y - 95) / 95),
  }),
  /** Left-to-right navy wash used on the About Us hero. */
  aboutHero: (x, y, w) => ({ colour: NAVY, alpha: lerp3(x / w, 0.75, 0.45, 0.1) }),
  /** Slightly lighter variant on the Services hero. */
  servicesHero: (x, y, w) => ({ colour: NAVY, alpha: lerp3(x / w, 0.7, 0.4, 0.05) }),
  /** Stronger wash on the designed-here Blog heroes. */
  pageHero: (x, y, w) => ({ colour: NAVY, alpha: lerp3(x / w, 0.85, 0.6, 0.3) }),
  none: () => ({ colour: [0, 0, 0], alpha: 0 }),
};
const lerp3 = (t, a, b, c) => (t < 0.5 ? a + (b - a) * (t / 0.5) : b + (c - b) * ((t - 0.5) / 0.5));

/* ---------- regions ------------------------------------------------------
   Declared in the CSS section coordinates actually used at xl, not in Figma
   coordinates — this measures what ships.                                  */
const REGIONS = [
  // --- Top page hero (211:1002) -----------------------------------------
  { page: "Top", what: "nav strip", image: "images/top-hero.png", section: [1672, 941],
    box: [0, 0, 1672, 95], ink: "white", scrim: "nav", size: 16, bold: true },
  { page: "Top", what: "H1", image: "images/top-hero.png", section: [1672, 941],
    box: [212, 255, 701, 154], ink: "white", scrim: "none", size: 64 },
  { page: "Top", what: "subhead", image: "images/top-hero.png", section: [1672, 941],
    box: [212, 422, 703, 87], ink: "white", scrim: "none", size: 24, bold: true },

  // --- About Us hero (210:1001) -----------------------------------------
  { page: "About", what: "nav strip", image: "images/about-hero.png", section: [1672, 942],
    box: [0, 0, 1672, 95], ink: "white", scrim: "nav", size: 16, bold: true },
  { page: "About", what: "lead", image: "images/about-hero.png", section: [1672, 942],
    box: [213, 286, 800, 290], ink: "black", scrim: "none", size: 48 },

  // --- About Us vision band (210:978) -----------------------------------
  { page: "About", what: "vision label", image: "images/vision-bg.png", section: [1672, 941],
    box: [213, 123, 98, 24], ink: "brandInk", scrim: "none", size: 20 },
  { page: "About", what: "vision statement", image: "images/vision-bg.png", section: [1672, 941],
    box: [213, 211, 655, 232], ink: "black", scrim: "none", size: 48 },
  { page: "About", what: "vision body", image: "images/vision-bg.png", section: [1672, 941],
    box: [213, 606, 551, 90], ink: "black", scrim: "none", size: 24 },

  // --- Services hero (405:1949) -----------------------------------------
  { page: "Services", what: "nav strip", image: "images/services-hero.png", section: [1672, 950],
    box: [0, 0, 1672, 95], ink: "white", scrim: "nav", size: 16, bold: true },
  { page: "Services", what: "H1", image: "images/services-hero.png", section: [1672, 950],
    box: [207, 356, 755, 58], ink: "black", scrim: "none", size: 48 },
  { page: "Services", what: "body", image: "images/services-hero.png", section: [1672, 950],
    box: [207, 454, 748, 96], ink: "black", scrim: "none", size: 20 },

  // --- Services global band (405:2287) ----------------------------------
  { page: "Services", what: "global heading", image: "images/svc-global.png", section: [1672, 917],
    box: [150, 111, 623, 116], ink: "black", scrim: "none", size: 48 },
  { page: "Services", what: "global body", image: "images/svc-global.png", section: [1672, 917],
    box: [150, 258, 695, 96], ink: "black", scrim: "none", size: 20 },
  { page: "Services", what: "global points", image: "images/svc-global.png", section: [1672, 917],
    box: [241, 502, 372, 180], ink: "brandInk", scrim: "none", size: 32 },

  // --- Technologies hero (477:33) ---------------------------------------
  { page: "Technologies", what: "nav strip", image: "images/tech-hero.png", section: [1672, 952],
    box: [0, 0, 1672, 95], ink: "white", scrim: "nav", size: 16, bold: true },
  { page: "Technologies", what: "H1", image: "images/tech-hero.png", section: [1672, 952],
    box: [217, 333, 568, 116], ink: "black", scrim: "none", size: 48 },
  { page: "Technologies", what: "body", image: "images/tech-hero.png", section: [1672, 952],
    box: [217, 506, 700, 120], ink: "black", scrim: "none", size: 20 },

  // --- AI Innovation panel (180:752) ------------------------------------
  { page: "Top", what: "AI labels", image: "images/ai-panel.png", section: [1564, 1006],
    box: [130, 100, 1200, 800], ink: "white", scrim: "none", size: 20, bold: true },

  // --- Blog hero (designed here) ----------------------------------------
  { page: "Blog", what: "nav strip", image: "images/ai-panel.png", section: [1672, 720],
    box: [0, 0, 1672, 95], ink: "white", scrim: "nav", size: 16, bold: true },
  { page: "Blog", what: "title", image: "images/ai-panel.png", section: [1672, 720],
    box: [212, 250, 900, 90], ink: "white", scrim: "pageHero", size: 64 },
  { page: "Blog", what: "body", image: "images/ai-panel.png", section: [1672, 720],
    box: [212, 380, 720, 60], ink: "white", scrim: "pageHero", size: 20 },

  // --- Blog article heroes: the widest-ranging covers -------------------
  { page: "Blog article", what: "title / rfp-visual", image: "images/rfp-visual.png", section: [1672, 600],
    box: [212, 240, 900, 90], ink: "white", scrim: "pageHero", size: 64 },
  { page: "Blog article", what: "title / core-values", image: "images/core-values.png", section: [1672, 600],
    box: [212, 240, 900, 90], ink: "white", scrim: "pageHero", size: 64 },
  { page: "Blog article", what: "title / svc-global", image: "images/svc-global.png", section: [1672, 600],
    box: [212, 240, 900, 90], ink: "white", scrim: "pageHero", size: 64 },
];

const BRAND = parse("#0f84fd");
const BRAND_INK = parse("#0b62bd");
const inkColour = (name) =>
  name === "brand" ? BRAND : name === "brandInk" ? BRAND_INK : INK[name];

/** object-cover mapping from section coordinates to source pixels. */
function sampler(img, sectionW, sectionH) {
  const scale = Math.max(sectionW / img.w, sectionH / img.h);
  const dispW = img.w * scale, dispH = img.h * scale;
  const offX = (dispW - sectionW) / 2, offY = (dispH - sectionH) / 2;
  return (sx, sy) => {
    const px = Math.round(((sx + offX) / dispW) * img.w);
    const py = Math.round(((sy + offY) / dispH) * img.h);
    if (px < 0 || py < 0 || px >= img.w || py >= img.h) return null;
    const o = (py * img.w + px) * img.bpp;
    return [img.data[o], img.data[o + 1], img.data[o + 2]];
  };
}

const threshold = (r) => (r.size >= 24 || (r.size >= 18.66 && r.bold) ? 3.0 : 4.5);

const cache = new Map();
let failures = 0, checked = 0, skipped = 0;
let currentPage = "";

for (const r of REGIONS) {
  if (r.image.endsWith(".jpg")) { skipped++; continue; }
  const path = join(ROOT, "public", r.image);
  if (!cache.has(path)) cache.set(path, decodePng(path));
  const img = cache.get(path);

  const [sw, sh] = r.section;
  const at = sampler(img, sw, sh);
  const scrim = scrims[r.scrim];

  // Composite the scrim per pixel, then take the worst 10% of samples — an
  // average hides a bright patch that swallows part of a headline.
  const samples = [];
  const [bx, by, bw, bh] = r.box;
  for (let y = by; y < by + bh; y += 3) {
    for (let x = bx; x < bx + bw; x += 3) {
      const base = at(x, y);
      if (!base) continue;
      const { colour, alpha } = scrim(x, y, sw, sh);
      samples.push(base.map((v, i) => v * (1 - alpha) + colour[i] * alpha));
    }
  }
  if (samples.length === 0) continue;

  const ink = inkColour(r.ink);
  samples.sort((a, b) => contrast(ink, a) - contrast(ink, b));
  const worst = samples[Math.floor(samples.length * 0.1)];
  const mean = samples
    .reduce((acc, s) => acc.map((v, i) => v + s[i] / samples.length), [0, 0, 0]);

  const got = contrast(ink, worst);
  const need = threshold(r);
  const pass = got >= need;
  checked++;
  if (!pass) failures++;

  // what the other ink would score on the same ground
  const alt = r.ink === "white" ? "black" : "white";
  const altGot = contrast(inkColour(alt), worst);

  if (r.page !== currentPage) { console.log(`\n${r.page}`); currentPage = r.page; }
  console.log(
    `  ${pass ? "ok  " : "FAIL"} ${r.what.padEnd(20)} ink=${r.ink.padEnd(5)} ` +
    `scrim=${r.scrim.padEnd(13)} bg~${hex(mean)} worst10%=${hex(worst)} ` +
    `${got.toFixed(2).padStart(6)}:1 (need ${need.toFixed(1)})` +
    (pass ? "" : `   -> ${alt} would score ${altGot.toFixed(2)}:1`),
  );
}

console.log(`\n${checked} regions checked, ${failures} failing, ${skipped} skipped (JPEG).`);
process.exit(failures > 0 ? 1 : 0);
