import { chromium } from "playwright-core";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = "http://localhost:3000";
const PATHS = process.argv.slice(2);

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

for (const path of PATHS) {
  await page.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(900);

  const rows = await page.evaluate(() => {
    const out = [];
    const seen = new Set();
    for (const el of document.querySelectorAll("main h1, main h2, main h3, main p, main li")) {
      const text = (el.textContent || "").trim();
      if (!text || text.length < 12) continue;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width < 20) continue;
      const key = el.tagName + cs.fontSize + cs.lineHeight + Math.round(r.width);
      if (seen.has(key)) continue;
      seen.add(key);
      // characters per line at this measure — the readability number
      const size = parseFloat(cs.fontSize);
      out.push({
        tag: el.tagName,
        size,
        lh: parseFloat(cs.lineHeight),
        w: Math.round(r.width),
        cpl: Math.round(r.width / (size * 0.5)),
        colour: cs.color,
        text: text.slice(0, 40).replace(/\s+/g, " "),
      });
    }
    return out;
  });

  console.log(`\n${path}`);
  console.log("  tag  size  lh   ratio  width  ch/line  colour                 text");
  for (const r of rows) {
    const flag =
      r.tag === "P" && r.cpl > 90 ? "  <- long measure"
      : r.tag === "P" && r.size < 15 ? "  <- small body"
      : "";
    console.log(
      `  ${r.tag.padEnd(4)} ${String(r.size).padStart(4)} ${String(r.lh).padStart(4)} ` +
        `${(r.lh / r.size).toFixed(2)}  ${String(r.w).padStart(5)}  ${String(r.cpl).padStart(6)}  ` +
        `${r.colour.padEnd(22)} ${r.text}${flag}`,
    );
  }
}

await browser.close();
