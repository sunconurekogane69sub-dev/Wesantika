import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const OUT = process.env.CLAUDE_JOB_DIR + "/tmp/shots";
mkdirSync(OUT, { recursive: true });
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = "http://localhost:3000";

/** name, url, css selector to clip to */
const TARGETS = JSON.parse(process.argv[2]);

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

for (const [name, path, selector] of TARGETS) {
  await page.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(1800);
  const el = await page.$(selector);
  if (!el) {
    console.log(`  MISS ${name}  (${selector})`);
    continue;
  }
  await el.screenshot({ path: `${OUT}/z-${name}.png` });
  const box = await el.boundingBox();
  console.log(`  ok   ${name.padEnd(20)} ${Math.round(box.width)}x${Math.round(box.height)}`);
}

await browser.close();
