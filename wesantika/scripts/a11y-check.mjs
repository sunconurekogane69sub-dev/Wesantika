/**
 * Structural accessibility, in the rendered page.
 *
 * `npm run ink` measures contrast on the heroes and nothing else looks at
 * accessibility at all — so the failures it cannot see are the ones nobody was
 * checking: a control with no accessible name, a heading level skipped, an id
 * used twice because a component got rendered in two places on one page.
 *
 * These are exactly the checks worth automating, because each is a yes/no
 * question about the DOM. What is deliberately *not* here is anything requiring
 * judgement — whether alt text is any good, whether focus order makes sense,
 * whether a colour combination is readable in context. A green run means the
 * structural floor holds, not that the site is accessible.
 *
 * Everything is evaluated against the accessibility tree where one exists, so
 * an `aria-label`, a `title`, or visually-hidden text all count as a name — the
 * naive "does it have text content" version of this check reports every icon
 * button on the site and is worth nothing.
 *
 * Usage:  npm run a11y            (needs a server; PORT, default 4310)
 */
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

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
  console.error("No Chrome found. Set CHROME_PATH.");
  process.exit(1);
}

const ORIGIN = `http://127.0.0.1:${process.env.PORT ?? 4310}`;
const PATHS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "/en", "/en/about", "/en/services", "/en/technologies",
      "/en/our-work", "/en/contact", "/en/services/ai-development",
      "/ja/contact", "/th/services",
    ];

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let problems = 0;
let checked = 0;

for (const path of PATHS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle0", timeout: 60_000 });

  const found = await page.evaluate(() => {
    const issues = [];
    const label = (el) =>
      `<${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? ` class="${el.className.slice(0, 50)}"` : ""}>`;

    /* An element is "named" if anything reaches the accessibility tree: its own
       text, aria-label, aria-labelledby, title, or an image's alt inside it. */
    const named = (el) => {
      if ((el.getAttribute("aria-label") ?? "").trim()) return true;
      if ((el.getAttribute("title") ?? "").trim()) return true;
      const by = el.getAttribute("aria-labelledby");
      if (by && by.split(/\s+/).some((id) => document.getElementById(id)?.textContent?.trim()))
        return true;
      if ((el.innerText ?? "").trim()) return true;
      return [...el.querySelectorAll("img,svg")].some(
        (g) => (g.getAttribute("alt") ?? "").trim() || (g.querySelector("title")?.textContent ?? "").trim(),
      );
    };

    const visible = (el) => {
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden") return false;
      return !el.closest("[aria-hidden='true'],[hidden]");
    };

    /* ---- 1. duplicate ids. Breaks label/for, aria-labelledby and anchors. */
    const seen = new Map();
    for (const el of document.querySelectorAll("[id]")) {
      seen.set(el.id, (seen.get(el.id) ?? 0) + 1);
    }
    for (const [id, n] of seen) {
      if (n > 1) issues.push(`duplicate id "${id}" x${n}`);
    }

    /* ---- 2. controls with no accessible name. */
    for (const el of document.querySelectorAll("a[href],button,[role='button']")) {
      if (!visible(el)) continue;
      if (!named(el)) issues.push(`unnamed control ${label(el)}`);
    }

    /* ---- 3. form fields with no label. */
    for (const el of document.querySelectorAll("input,select,textarea")) {
      if (el.type === "hidden" || !visible(el)) continue;
      const hasLabel =
        (el.getAttribute("aria-label") ?? "").trim() ||
        (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) ||
        el.closest("label") ||
        el.getAttribute("aria-labelledby");
      if (!hasLabel) issues.push(`unlabelled field <${el.tagName.toLowerCase()} name="${el.name}">`);
    }

    /* ---- 4. images with no alt attribute at all. `alt=""` is correct for
              decoration; a *missing* attribute makes a screen reader read the
              filename. */
    for (const el of document.querySelectorAll("img")) {
      if (!el.hasAttribute("alt")) issues.push(`img with no alt: ${el.getAttribute("src")?.slice(0, 60)}`);
    }

    /* ---- 5. heading structure. Exactly one h1, and no level skipped. */
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible);
    const h1s = headings.filter((h) => h.tagName === "H1");
    if (h1s.length === 0) issues.push("no <h1>");
    if (h1s.length > 1) issues.push(`${h1s.length} <h1> elements`);
    let previous = 0;
    for (const h of headings) {
      const level = Number(h.tagName[1]);
      if (previous && level > previous + 1) {
        issues.push(
          `heading jumps h${previous} -> h${level}: "${(h.innerText ?? "").trim().slice(0, 40)}"`,
        );
      }
      previous = level;
    }

    /* ---- 6. landmarks. */
    if (!document.querySelector("main")) issues.push("no <main>");
    if (document.querySelectorAll("main").length > 1) issues.push("more than one <main>");

    /* ---- 7. the document must declare its language. */
    if (!document.documentElement.lang) issues.push("<html> has no lang");

    /* ---- 8. a positive tabindex overrides natural order and is almost always
              a mistake. */
    for (const el of document.querySelectorAll("[tabindex]")) {
      if (Number(el.getAttribute("tabindex")) > 0)
        issues.push(`positive tabindex on ${label(el)}`);
    }

    /* ---- 9. target=_blank without rel: a tabnapping vector, and older
              browsers do not imply noopener. */
    for (const el of document.querySelectorAll('a[target="_blank"]')) {
      const rel = el.getAttribute("rel") ?? "";
      if (!/noopener|noreferrer/.test(rel))
        issues.push(`target=_blank with no rel=noopener: ${el.getAttribute("href")?.slice(0, 50)}`);
    }

    return issues;
  });

  checked++;
  if (found.length === 0) {
    console.log(`  ok   ${path}`);
  } else {
    problems += found.length;
    console.log(`  FAIL ${path}`);
    for (const f of found) console.log(`         ${f}`);
  }
  await page.close();
}

await browser.close();
console.log(`\n${checked} pages checked, ${problems} structural issue(s).`);
process.exit(problems ? 1 : 0);
