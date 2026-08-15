/**
 * Finds horizontal overflow — the sideways scroll a phone gets when one element
 * is wider than the viewport.
 *
 * This is not a thing you can grep for. The offending element is usually not
 * the one with the suspicious class: a fixed width, a `whitespace-nowrap`, a
 * negative offset or an absolutely-positioned decoration pushes its *ancestor's*
 * scroll width out, and the ancestor looks innocent. So this loads the real page
 * in a real browser at real phone widths and asks every element where its right
 * edge actually is.
 *
 * `position: fixed` elements are skipped — they scroll with the viewport rather
 * than the document and cannot create document overflow.
 *
 * Usage:
 *   npm run overflow                      # every page, default widths
 *   npm run overflow -- /en/contact       # one path
 *
 * Requires a server already running on PORT (default 4310) — `next start`, or
 * `next dev` if you want to check work in progress.
 */
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

/* Chrome, wherever this machine keeps it. Puppeteer's own download is not a
   dependency here — the browser is only needed for this audit. */
const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const executablePath =
  process.env.CHROME_PATH ?? CANDIDATES.find((p) => existsSync(p));

if (!executablePath) {
  console.error("No Chrome found. Set CHROME_PATH to a browser executable.");
  process.exit(1);
}

const PORT = process.env.PORT ?? 4310;
const ORIGIN = `http://127.0.0.1:${PORT}`;

/* The narrow end of the range that matters. 320 is an iPhone SE in portrait and
   is the width every layout has to survive; 430 is a Pro Max. */
const WIDTHS = [320, 360, 375, 390, 414, 430];

const DEFAULT_PATHS = [
  "/en",
  "/en/about",
  "/en/services",
  "/en/technologies",
  "/en/our-work",
  "/en/contact",
  /* Thai and Vietnamese set the longest strings on the site, so they are the
     locales that overflow first. */
  "/th/contact",
  "/vi/contact",
];

const paths = process.argv.slice(2).length
  ? process.argv.slice(2)
  : DEFAULT_PATHS;

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let failures = 0;
let checks = 0;

for (const path of paths) {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({
      width,
      height: 780,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    try {
      await page.goto(`${ORIGIN}${path}`, {
        waitUntil: "networkidle0",
        timeout: 60_000,
      });
    } catch (err) {
      console.error(`  ERROR ${path} @${width}  ${err.message}`);
      await page.close();
      failures++;
      continue;
    }

    const result = await page.evaluate((vw) => {
      const doc = document.documentElement;
      const offenders = [];

      for (const el of document.querySelectorAll("*")) {
        const box = el.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) continue;
        if (getComputedStyle(el).position === "fixed") continue;

        const right = box.right + window.scrollX;
        if (right <= vw + 0.5) continue;

        let depth = 0;
        for (let n = el; (n = n.parentElement); ) depth++;

        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute("class") ?? "").slice(0, 96),
          right: Math.round(right * 10) / 10,
          left: Math.round((box.left + window.scrollX) * 10) / 10,
          width: Math.round(box.width * 10) / 10,
          depth,
        });
      }

      /* Widest first, then shallowest — the first line is usually the real
         cause and the rest are its ancestors reporting the same overflow. */
      offenders.sort((a, b) => b.right - a.right || a.depth - b.depth);

      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        offenders: offenders.slice(0, 10),
      };
    }, width);

    checks++;
    const over = result.scrollWidth - result.clientWidth;

    if (over > 0) {
      failures++;
      console.log(`\n  FAIL ${path} @${width}  +${over}px sideways`);
      for (const o of result.offenders) {
        console.log(
          `        right=${o.right} (left=${o.left} w=${o.width}) <${o.tag}> ${o.cls}`,
        );
      }
    } else {
      console.log(`  ok   ${path} @${width}`);
    }

    await page.close();
  }
}

await browser.close();

console.log(
  `\n${checks} viewports checked, ${failures} with horizontal overflow.`,
);
process.exit(failures ? 1 : 0);
