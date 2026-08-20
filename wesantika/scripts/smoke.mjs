/**
 * Smoke test — is the thing that is supposed to be on the page actually on it?
 *
 *     npx next start -p 3000 &
 *     npm run smoke                     # or: npm run smoke -- http://host:port
 *
 * `tsc`, `next build`, `ink`, `fit` and `i18n` all passed on a footer whose
 * contact form had been deleted. Nothing was broken — a component had simply
 * stopped being rendered, and none of those checks looks at whether a component
 * is *there*. This does, by fetching the built pages and asserting the markers
 * that must be present.
 *
 * Keep the assertions to things whose absence is a real defect, not styling.
 */
const BASE = (process.argv[2] || process.env.SMOKE_URL || "http://localhost:3000")
  .replace(/\/$/, "");

/** Present on every page that carries the footer form panel. */
const FOOTER_FORM = [
  ['<form', "footer contact form"],
  ['id="cf-name"', "name field"],
  ['id="cf-email"', "email field"],
  ['id="cf-company"', "company field"],
  ['id="cf-message"', "message field"],
  ['type="submit"', "submit button"],
];

const COMMON = [
  ['id="main-content"', "main landmark"],
  ['href="#main-content"', "skip link"],
  ["Chaeng Wattana", "head office address"],
  ['type="application/ld+json"', "Organization schema"],
  ['rel="canonical"', "canonical link"],
  ['property="og:image"', "og:image"],
];

const ROUTES = [
  { path: "/en", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/en/about", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/en/services", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/en/technologies", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/en/our-work", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/en/services/mvp-development", must: [...COMMON, ...FOOTER_FORM] },
  {
    // The Contact page carries its own form and suppresses the footer panel, so
    // it asserts the opposite: its own fields present, the footer's absent.
    path: "/en/contact",
    must: [
      ...COMMON,
      ['id="page-name"', "page contact form"],
      ['id="page-message"', "page message field"],
      // Both offices, not one label: the previous marker was the literal
      // "Head office", so renaming the label broke the test while an office
      // quietly vanishing from the list would not have.
      ["250 Upper Thomson Road", "Singapore office"],
      ["Chaeng Wattana Road", "Thailand office"],
    ],
    mustNot: [['id="cf-name"', "duplicate footer form"]],
  },
  // One page per locale, so a broken dictionary shows up here too.
  { path: "/ja/about", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/zh-Hant-TW/services", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/th/our-work", must: [...COMMON, ...FOOTER_FORM] },
  { path: "/vi/technologies", must: [...COMMON, ...FOOTER_FORM] },
];

let failures = 0;

console.log(`Smoke test against ${BASE}\n`);

for (const route of ROUTES) {
  let html;
  try {
    const res = await fetch(`${BASE}${route.path}`);
    if (!res.ok) {
      console.log(`  FAIL ${route.path.padEnd(30)} HTTP ${res.status}`);
      failures++;
      continue;
    }
    html = await res.text();
  } catch (error) {
    console.log(`  FAIL ${route.path.padEnd(30)} ${error.message}`);
    console.log("       (is `next start` running on that port?)");
    failures++;
    continue;
  }

  const missing = route.must.filter(([needle]) => !html.includes(needle));
  const present = (route.mustNot ?? []).filter(([needle]) => html.includes(needle));

  if (missing.length === 0 && present.length === 0) {
    console.log(`  ok   ${route.path.padEnd(30)} ${route.must.length} markers`);
    continue;
  }

  failures++;
  console.log(`  FAIL ${route.path}`);
  for (const [, label] of missing) console.log(`         missing: ${label}`);
  for (const [, label] of present) console.log(`         unexpected: ${label}`);
}

/*
  The 404s.

  This block used to assert the status code and nothing else, and it passed for
  the entire life of the project while `/en/no-such-page` served Next's built-in
  error card — unstyled, no navigation, English on every locale. The status was
  right; the page was not the site's. Checking a status code tells you the
  server disliked the URL, not what the reader was shown.

  So each case now asserts the *body* as well, in the locale it was asked in:

    unmatched URL       -> app/global-not-found.tsx
    unknown topic       -> the same, via `dynamicParams = false`

  The Japanese and Thai strings are the check that matters. They come from the
  dictionaries, so they can only be present if the right page rendered *and* it
  resolved the locale from the request rather than falling back to English —
  the two things that were separately broken here.
*/
const NOT_FOUND = [
  { path: "/en/no-such-page", needle: "This page does not exist" },
  { path: "/ja/no-such-page", needle: "このページは存在しません" },
  { path: "/th/no-such-page", needle: "ไม่พบหน้านี้" },
  // Not a bad URL but a bad *topic* — a different route into the same page.
  { path: "/en/services/no-such-topic", needle: "This page does not exist" },
];

for (const { path, needle } of NOT_FOUND) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  const problems = [];
  if (res.status !== 404) problems.push(`HTTP ${res.status}, expected 404`);
  // Server-rendered, not deferred to the client: the marker has to be in the
  // HTML itself, which is what separates this page from an empty shell.
  if (!html.includes(needle)) problems.push("localised 404 copy missing from the HTML");
  if (!html.includes('href="#main-content"')) problems.push("skip link missing");

  if (problems.length === 0) {
    console.log(`  ok   ${path.padEnd(30)} 404, branded, localised`);
  } else {
    console.log(`  FAIL ${path.padEnd(30)} ${problems.join("; ")}`);
    failures++;
  }
}

console.log("");
if (failures) {
  console.error(`${failures} route(s) failed.`);
  process.exit(1);
}
console.log("All routes carry what they should.");
