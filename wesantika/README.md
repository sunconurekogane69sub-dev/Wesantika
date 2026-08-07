# Wesantika

Implementation of the **Top**, **About Us**, **Services** and **Technologies**
pages from the Figma file
[Wesantika](https://www.figma.com/design/iexSBqWRZILgZ0R6SKKDgr/Wesantika)
(`file key: iexSBqWRZILgZ0R6SKKDgr`, artboards `211:1002`, `210:1001`,
`405:2302` and `508:66`), plus a **Blog** designed here — in five languages.

The Services page is reached from the **Solution** nav entry and from the Top
page's "See Service Details" button; the file has no separate "Services" nav
item. Technologies is reached from the **Technologies** nav entry, which
replaced Newsroom in the file.

> **Blog has no Figma artboard.** The file only contains the nav entry. Its
> layout, components and sample content are my design, built against the
> existing system — it needs design review in a way the four designed pages do
> not. See *Blog* below.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) |
| i18n | Hand-rolled: locale-segment routing + server-side catalogues |
| Mail | Nodemailer |
| Fonts | Inter · Noto Sans JP · Noto Sans TC · Noto Sans Thai |

## Running

```bash
npm install
npm run dev      # http://localhost:3000 -> redirects to a negotiated locale
npm run build
```

No configuration is needed to run the contact form — see below.

## Internationalisation

### Locales

| URL segment | Language | Font |
|---|---|---|
| `/en` | English | Inter |
| `/ja` | Japanese | Noto Sans JP |
| `/zh-Hant-TW` | Chinese (Traditional, Taiwan) | Noto Sans TC |
| `/th` | Thai | Noto Sans Thai |
| `/vi` | Vietnamese | Inter |

All five are BCP 47 language tags. `zh-Hant-TW` is the *maximal* canonical form;
`zh-TW` is its minimal equivalent (region `TW` already implies script `Hant`), so
both are correct. The explicit script subtag is used here because it documents
intent and leaves room for `zh-Hant-HK` or a Simplified `zh-Hans-CN` later
without any tag becoming ambiguous. `/zh-TW`, `/zh-tw` and `/zh-hant` all
redirect to the canonical `/zh-Hant-TW`.

### Fonts are not cosmetic here

Inter has **no CJK and no Thai glyphs**, so a single webfont cannot serve these
five locales. `src/app/[locale]/layout.tsx` loads four fonts that all expose the
same CSS variable (`--font-app`) and applies only the one matching the active
locale's script. Inter is loaded with the `vietnamese` subset so Vietnamese
diacritics render correctly. The CJK and Thai families use `preload: false` —
they are large and only ever needed on their own locales.

### Routing

`src/proxy.ts` (the Next.js 16 replacement for `middleware.ts`) puts every page
under a locale segment:

```
/               -> negotiates Accept-Language, honouring q-values   e.g. /ja
/about          -> /en/about
/zh-TW/about    -> /zh-Hant-TW/about   (alias -> canonical)
/ja-JP          -> /ja                 (falls back to the primary subtag)
/de             -> /en                 (unsupported -> default)
/ja/about       -> passes through
```

All ten pages (5 locales × 2 pages) are statically prerendered via
`generateStaticParams`. `<html lang>` is set per locale, and each page emits
absolute `hreflang` alternates plus `x-default`. Set `NEXT_PUBLIC_SITE_URL` in
production — crawlers ignore relative alternates.

`dir` is hardcoded to `ltr`; all five locales are left-to-right. That attribute
is where an RTL locale would hook in.

### Catalogues

`src/lib/content.ts` holds only locale-independent structure — coordinates, icon
paths, links — keyed by stable ids. Every string lives in
`src/lib/i18n/dictionaries/`.

English is the source catalogue and defines the `Dictionary` type. Every other
locale is a `PartialDictionary` deep-merged over English: objects merge key by
key, while arrays and strings replace wholesale, so a partly translated list can
never come out half English. An empty string counts as "not translated" and
falls back too.

**Translation status**

| Locale | Status |
|---|---|
| `en` | Complete (source) |
| `ja` | Complete |
| `zh-Hant-TW` · `th` · `vi` | Complete **except `about.blocks`** |

`about.blocks` is the five long-form narrative sections on the About Us page.
Those deliberately fall back to English: they are the copy that needs a human
transcreation rather than a translation, and shipping unreviewed machine output
as a company's mission statement is worse than shipping English. Drop the
strings into the `about.blocks` key of the relevant file and they take effect
immediately — no code changes.

**All non-English copy in this repo is machine-drafted and needs a native
review before launch**, including Japanese.

### Switcher

`src/components/LocaleSwitcher.tsx` replaces the design's static "EN" display
(Figma `180:591`), whose chevron implied a menu that was never designed. Each
entry is a real `<Link>` to the same page under a different prefix — so the
choice is a URL, shareable and crawlable — with `hrefLang`, `aria-haspopup`,
outside-click and Escape handling.

## Interactions

**Sticky contact rail** — `src/components/StickyContactRail.tsx`

Four pills fixed to the right edge, vertically centred. At rest only the 58px
round cap is on screen; hover or keyboard focus slides the pill left to reveal
its label. This is what the Figma file encodes: the pills are drawn in their open
state, overhanging the artboard's right edge by ~79px.

Each pill is sized to its own label (Email 136, Telegram 156, WhatsApp 156, LINE
136 in the design). This needs `items-end` on the column: a flex column defaults
to `align-items: stretch`, which makes every pill as wide as the longest label
and gives all four an identical slide-out length.

Hidden below `md` — the rail would cover content on a phone and no mobile
treatment exists in the design.

**AI Innovation proximity magnification** — `src/components/AiProximityPanel.tsx`

The nine labels sit on a 1564 × 1006 stage scaled to fit the viewport, so every
coordinate and font size is exactly as authored. On `pointermove` the distance
from the cursor to each label's centre is measured in panel design space; labels
within `INFLUENCE_RADIUS` (300px) scale up to `MAX_SCALE` (1.6) along a
smoothstep curve. Updates are `requestAnimationFrame`-throttled and applied
imperatively, so no React re-render happens while the cursor moves.

Labels are positioned by their centre and each line is `nowrap`, with the lines
supplied explicitly by the catalogue as a string array. Wrapping is therefore
decided by the catalogue rather than by font metrics — which is what had pushed
"Advanced AI Engineering" onto three lines instead of two, and which keeps the
layout predictable across five languages.

`advanced` (lower-left) carries `fixed: true` in `src/lib/content.ts` and never
reacts to the cursor — it reads as the section's own label rather than one of the
capabilities.

**Services card reveal** — `src/components/ServiceOfferCard.tsx`

On hover the card's image fades out and its description fades in over the same
area. Pure CSS — no client component. `tabIndex` plus `focus-within` gives
keyboard users the same access, and a tap focuses the card on touch devices,
where there is no hover at all.

**Nav crossfade** — `src/components/Nav.tsx`

The bar starts transparent over the hero with white type and crosses to the
drawn white/black treatment once 30% of the first viewport has scrolled past
(`SOLID_AT`). Two logo files crossfade rather than one being filtered: see
*Logos* below.

All of these respect `prefers-reduced-motion`.

## Technologies

Figma `508:66`. Six stack sections holding **59 logo tiles**, each a 167×88 white
card at 8px radius with the logo at its authored dimensions — which is what keeps
marks of very different proportions (140×79 down to 140×23) at a consistent
optical size.

`src/lib/tech-stack.ts` is **generated from the artboard, not transcribed**: a
script walks the frame, picks up every image-filled rectangle in the tile band,
and assigns each to the section heading above it. Regenerating after a Figma
change is a re-run, not a re-type.

| Section | Logos |
|---|---|
| Core Technologies Powering AI Development | 30 |
| Key Back-end technologies | 8 |
| Key Front-end technologies | 5 |
| App development | 5 |
| DevOps | 8 |
| Cloud Computing | 3 |

This page carries its own variant of the RFP card ("Pick Your Stack…",
`507:131`) rather than the shared one.

**Logo alt text is empty.** The tiles are third-party marks and the file gives
them machine-generated names, so there is nothing to caption them with. The
section heading carries the meaning. `TechLogo` has room for a `name` field —
filling those in is the one accessibility gap left on this page.

## Blog

The page does not exist in Figma. It is built from the system the four designed
pages establish — same type scale, same brand blue, same card radii and
hairlines, same hero treatment (full-bleed image, navy scrim, white type at the
212px inset) at a shorter height suited to a listing page.

| | |
|---|---|
| Index | `/[locale]/blog` |
| Article | `/[locale]/blog/[slug]` |
| Listing | featured post + 3-column card grid |
| Categories | Engineering · AI · Design · Business |

`ArticleIndex` handles the featured entry, category filter and listing; its
`variant` prop also supports a dated list layout, which is what a newsroom-style
page would use.

**Content**

`BLOG_POSTS` in `src/lib/content.ts` holds only structure — slug, category, ISO
date, image, read time. Every string lives in the dictionaries keyed by slug, so
that array is the only thing a CMS would need to replace.

**The 6 posts are sample content that I wrote.** They are plausible and on-topic,
but they are not real articles and must be replaced before launch. Cover images
are reused from the Figma exports rather than invented.

Translation follows the pattern already in place: UI, categories and filters are
translated for all five locales; article titles and excerpts are translated for
Japanese; article bodies fall back to English everywhere. Translating sample
copy further would be thrown away with the copy.

**Dates** are formatted server-side with `Intl.DateTimeFormat` and passed to the
client as strings, so no formatting runs during hydration. Note that Thai
renders in the Buddhist era by default — `28 กรกฎาคม 2569` for 2026-07-28. That
is locale-correct; `src/lib/date.ts` documents how to force Gregorian.

**Not built:** pagination (unnecessary at 5–6 entries, and the filter is client
state rather than a URL param for the same reason), author bylines, related
articles, RSS, and a sitemap. The last two are worth adding now that there are 80
URLs.

## Logos

Two assets, crossfaded by the nav:

| File | Used when | Wordmark | W mark |
|---|---|---|---|
| `logo.png` | bar is solid white | `#000117` | `#0067FF → #00B9FF` |
| `logo-bright.png` | bar is transparent over the hero | `#FBFFFF` | `#00BAFF → #6AFFFF` |

Measured against the scrimmed hero (`#094F98`), the bright variant scores
**3.66:1** on the mark and **8.07:1** on the wordmark — both clear of the 3:1
minimum for a graphical object. The dark variant scores 1.00:1 on the mark
against the raw hero, i.e. it is literally the same blue as the background,
which is why a second asset was needed rather than a background tweak.

Both files are cropped to the tight bounding box of their artwork
(`aspect 4.065` vs `4.076`, a 0.3% difference), so they sit exactly on top of
one another during the crossfade. `109 x 27` is the size the artwork actually
occupies inside the design's `130 x 54` slot.

A white `brightness(0) invert(1)` knockout was used before this and is gone: the
original `logo.png` had a fully opaque white background, so the filter produced a
white rectangle rather than a white logo.

### Icons

| File | Size | Background |
|---|---|---|
| `src/app/favicon.ico` | 32×32 | transparent |
| `src/app/icon.png` | 512×512 | transparent |
| `src/app/apple-icon.png` | 180×180 | white |

All three are the **W mark only** — the wordmark is illegible at 32px. They are
generated from the full-resolution logo, not hand-cropped.

Isolating the mark is not a simple vertical cut: the mark's trailing pixel
squares sit high and reach past the wordmark's first letter, which sits low, so
the two overlap horizontally. The generator separates them on both axes — the
wordmark is the only near-black artwork in the file, which gives an exact left
edge, and its cap height gives the top edge; everything below-and-right of that
corner is masked away.

`apple-icon.png` is the one with a background: iOS composites transparency onto
black, which would lose the dark part of the gradient.

`favicon.ico` is a PNG wrapped in an ICO container (supported since IE11) rather
than a legacy BMP-based icon.

## Contact form

`src/components/ContactForm.tsx` → `POST /api/contact` → `src/lib/mailer.ts`

Server-side validation, header-injection guarding on anything that reaches a mail
header, and HTML escaping on the body.

**With no SMTP configured** the route provisions a disposable
[Ethereal](https://ethereal.email) mailbox at runtime. The message is genuinely
delivered over SMTP, and the JSON response carries a `previewUrl` that the form
surfaces as a link to the delivered mail. So the form is verifiably working
without real credentials and without a real inbox.

Verified:

```
POST /api/contact  (empty fields)  -> 422  {"error":"Name is required. …"}
POST /api/contact  (valid)         -> 200  {"ok":true,"previewUrl":"https://ethereal.email/message/…"}
```

The first send takes ~5s while the mailbox is provisioned; the transporter is
then cached for the process lifetime.

For production, fill in `SMTP_*` in `.env.local` (see `.env.example`) and the
same code path switches over. The recipient defaults to
`contact@wesantika.example` — `.example` is an RFC 2606 reserved TLD, so the
placeholder can never reach a real inbox by accident. **Replace it before
launch.**

## Assets

Everything under `public/` came straight out of the Figma REST API, not from
screenshots:

- `public/images/*.png` — the 7 image fills at original resolution, pulled via
  `GET /v1/files/:key/images` (`imageRef` → CDN URL)
- `public/icons/*.svg` — 17 icons exported as real vectors via
  `GET /v1/images/:key?format=svg`

Design tokens are transcribed in `src/app/globals.css` under `@theme`, and Figma
node ids appear in comments throughout so anything can be traced back to source.

## Deviations from the file

Everything below is a deliberate change. Nothing else was altered.

**Bugs fixed**

1. **Footer heading was invisible.** `#000000` on the `#062a52` navy panel
   (`180:730` / `210:934`). Now white.
2. **About Us hero headline was unreadable.** White 48px type over the near-white
   left half of the hero photo, ~1.3:1. A navy left-to-right scrim preserves the
   intended white type and makes it legible.
3. **"Send Your RFP" was cut off — vertically.** The RFP card (`180:711`) is
   435px tall and clips its overflow. That height only works in Figma because the
   heading (`180:714`, 710px wide) overlaps 161px into the image to stay on one
   line. Laid out honestly the text column is ~549px, the heading takes two
   lines, and the stack exceeds 435px — cutting the bottom off the button.
   Translated copy overruns it further. The card is now `min-h-[435px]` and grows
   with its content, so clipping is structurally impossible; the image column
   uses `self-stretch` to take its height from the flex row. The text column is
   pinned to 631px (58 padding + the authored 549px measure + a 24px gap) so the
   checklist keeps its line breaks and no longer runs under the image.

   Separately, the button's own box was a fixed 140.8px, leaving ~8px of side
   padding once rendered. It is now `min-width: 141px` plus real padding and
   `nowrap` — the designed width as a floor, growing rather than clipping. Same
   treatment applied pre-emptively to "Contact Us", "See Service Details" and
   "Send Message".
4. **Duplicate brand blue.** `#0e84fe` appears once (`180:618`) and is `#0f84fd`
   with a one-unit copy/paste drift. Normalised to the primary.
5. **Uneven nav spacing.** Gaps were 67/75/75/87/62px. An even 73px preserves the
   overall footprint.
6. **Card grid drift.** Column gutters were 55 and 52px, row gaps 65×4 then 68px.
   Now uniform.
7. **Technologies hero body was white on near-white.** `423:2388` is authored
   `#ffffff`, but it sits on the pale left side of the hero — measured 1.3:1. The
   headline directly above it (`423:2389`) is authored black and measures 18:1 on
   the same ground, so the body is black here too. This hero therefore gets **no
   scrim**, unlike About Us and Services; the nav's own 140px gradient still
   carries the white nav type at 5.1:1 over it.

**Judgment calls**

- **Responsive behaviour is invented.** The file has no mobile or tablet
  artboards and no auto-layout anywhere — only absolute coordinates on a 1672px
  canvas. Desktop (`xl`, ≥1280px) is faithful to the measurements; below that the
  layout is my own reasonable collapse and needs design review. The compact nav
  menu below `xl` does not exist in the design either, but without it small
  viewports would have no navigation.
- **Text laid out in flow, not absolutely.** Several About Us text boxes overlap
  in Figma (e.g. `210:987` runs into the `210:980` heading) because heights were
  never fitted. Reproducing the coordinates literally would reproduce overlapping
  text, so those blocks use normal flow with the authored type and spacing
  rhythm.
- **Service cards use `min-height`.** A few bodies (Legacy Modernization,
  Software Integration) are longer than the 160px box they were drawn in and
  would otherwise clip — more so once translated.
- **Core values graphic left oversized.** `210:997` is 1976px wide inside a
  1672px page, bleeding ~152px past each edge. Reproduced as authored: oversized
  and clipped at `xl`, scaled to fit below.
- **Nav is not sticky.** The design shows it only at the top of the page. One
  class on the `<header>` in `src/components/Nav.tsx` changes this if you want it.
- **Omitted:** `180:623` ("Arrow 1", a 2px decorative rule whose intent is
  unclear and which overlaps the sticky rail) and `180:762` (an empty 48×48 frame
  with no contents).

## Not built

Not designed yet, so not implemented. Nav entries for these render as inert text
rather than links that go nowhere.

- Solution, Our Work, Newsroom, Blog, Contact pages
- Service 1…N pages (the third artboard is still loose on the canvas, unframed)
- Hover/focus/active states beyond the two specified interactions
- Privacy Policy page (footer link is a placeholder)
- `sitemap.xml` / `robots.txt` — worth adding now that there are ten localised
  URLs

## Still to do on the Services page

- **Only the first of the 18 grid cards is authored** in the file, as instructed.
  The other 17 render as the empty cards they are drawn as. Add entries to
  `SERVICE_OFFER_CARDS` in `src/lib/content.ts` plus copy under
  `servicesPage.offer.cards` and they fill in; set
  `SERVICE_OFFER_PLACEHOLDERS` to `0` to hide the empty slots instead.
- **The three "It requires" icons** (`405:2296`, `405:2297`, `405:2300`) are not
  exported — Figma's image API was rate limiting throughout. A neutral brand-blue
  marker stands in for them. They need one export run to replace.

## Known content issues in the source file

- The Services hero (`405:1998`) reads *"At **Saigon Technology**, we specialize
  in…"* — a competitor's name. **Corrected to "Wesantika" in the implementation**
  so it does not ship, but it still needs fixing in Figma.
- `405:2292` reads *"Seamless **Colloboration**"*. Corrected to "Collaboration"
  here; also needs fixing in Figma.
- Two sections are flat bitmaps with text baked in, set in a non-Inter geometric
  sans: the core-values hexagons (`210:997`, implemented as an image) and a
  "How We Deliver" comparison table (`238:1069`, parked off-canvas and not
  implemented). **Text inside a bitmap cannot be translated**, so with five
  locales live these are now the biggest blocker to a genuinely localised site.
  Rebuilding them as real markup is the recommended next step.
