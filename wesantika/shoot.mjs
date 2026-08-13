import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const OUT = process.env.CLAUDE_JOB_DIR + "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = "http://localhost:3000";

const PAGES = [
  ["home", "/en"],
  ["services", "/en/services"],
  ["technologies", "/en/technologies"],
  ["work", "/en/our-work"],
  ["about", "/en/about"],
  ["contact", "/en/contact"],
  ["detail", "/en/services/mvp-development"],
  ["404", "/en/no-such-page"],
];

const VIEWPORTS = [
  ["desk", 1440, 900],
  ["mob", 390, 844],
];

const browser = await chromium.launch({ executablePath: EDGE, headless: true });

for (const [vpName, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce", // freeze video/transitions so shots are stable
  });
  const page = await ctx.newPage();

  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
    // Trigger every lazy image before capturing, or the shot shows empty boxes
    // that look exactly like broken images and are not.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.evaluate(() => Promise.all(
      [...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; }))
    ));
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `${OUT}/${vpName}-${name}.png`,
      fullPage: true,
    });
    const h = await page.evaluate(() => document.body.scrollHeight);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    console.log(`  ${vpName.padEnd(5)} ${name.padEnd(14)} ${String(h).padStart(6)}px tall  ${overflow ? "H-OVERFLOW" : ""}`);
  }
  await ctx.close();
}

await browser.close();
console.log("shots in " + OUT);
