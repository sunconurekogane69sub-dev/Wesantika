# Wesantika

Implementation of the **Top**, **About Us**, **Services** and **Technologies**
pages from the Figma file
[Wesantika](https://www.figma.com/design/iexSBqWRZILgZ0R6SKKDgr/Wesantika)
(`file key: iexSBqWRZILgZ0R6SKKDgr`, artboards `211:1002`, `210:1001`,
`405:2302` and `508:66`), in five languages.

The Services page is reached from the **Solution** nav entry and from the Top
page's "See Service Details" button; the file has no separate "Services" nav
item. Technologies is reached from the **Technologies** nav entry, which
replaced Newsroom in the file.

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

All 117 routes (5 locales × 5 pages, plus 17 service write-ups per locale) are
prerendered via `generateStaticParams`, and `<html lang>` is set per locale.

`dir` is hardcoded to `ltr`; all five locales are left-to-right. That attribute
is where an RTL locale would hook in.

### Metadata is built from one helper, on purpose

`src/lib/metadata.ts` → `socialMetadata(locale, path)` returns `alternates`,
`openGraph` and `twitter` together, and every page spreads it.

That is not tidiness. **Next merges metadata shallowly**: a page that sets
`alternates` replaces the layout's `alternates` outright, nested keys and all.
A page declaring just a canonical URL therefore drops every `hreflang` link the
layout set up — which is exactly what five pages here were doing. `openGraph`
has the same trap.

The helper deliberately omits `openGraph.title` and `openGraph.description`.
When they are absent Next fills them from each page's own resolved title and
description, then fills the Twitter card from the Open Graph values — so all 117
pages get their own share card from one declaration. Setting them in the layout
would instead stamp the site-level title onto every page.

`src/lib/site.ts` resolves the absolute origin those tags need. `og:image` is
`public/images/og.png`, 1200×630, rebuilt by `npm run og` from the brand logo
over the navy gradient — no baked-in text, so it does not need five localised
variants.

Verify after any change to metadata:

```
curl -s localhost:3000/ja/about | grep -o '<meta[^>]*og:[^>]*>'
```

### Catalogues

`src/lib/content.ts` holds only locale-independent structure — coordinates, icon
paths, links — keyed by stable ids. Every string lives in
`src/lib/i18n/dictionaries/`.

English is the source catalogue and defines the `Dictionary` type. Every other
locale is a `PartialDictionary` deep-merged over English: objects merge key by
key, while arrays and strings replace wholesale, so a partly translated list can
never come out half English. An empty string counts as "not translated" and
falls back too.

**Translation status — measured, not remembered**

```
npm run i18n
```

An earlier hand-written table here claimed three locales were complete bar one
section. They were at 47%. `scripts/i18n-coverage.mjs` walks the English
catalogue and applies the same test `getDictionary` applies at runtime, so the
number cannot drift from the truth again. It fails the build if a locale drops
below its recorded floor, which stops a newly added English key from quietly
diluting a locale.

At the last run:

| Locale | Covered | Falls back to English |
|---|---|---|
| `en` | source | — |
| `ja` | 90.2% | 15 service write-ups (intro + cards), `about.blocks` |
| `zh-Hant-TW` | 61.1% | 17 service write-ups, `about.blocks` |
| `th` · `vi` | 60.8% | 17 service write-ups, `about.blocks` |

Two gaps, both deliberate:

- **`about.blocks`** — the five long-form narrative sections on About Us. These
  need transcreation rather than translation; shipping unreviewed machine output
  as a company's mission statement is worse than shipping English.
- **`serviceDetails`** — the seventeen long-form service write-ups behind the
  "DETAIL →" buttons, roughly 500 words each. That is ~25,000 words per locale
  and the single largest remaining translation job. The card grids that link to
  them *are* translated, so navigation is fully localised; only the write-ups
  themselves fall back.

Drop strings into the matching key of the relevant file and they take effect
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

**Our Full-Range Services rail** — `src/components/ServiceTabs.tsx`

The five category labels are a tab list, not a static list: clicking one swaps
the card grid beside it. `custom` shows the 11-card grid drawn inside the Top
frame (`180:630-709`); the other four sets were designed off-canvas around
x ≈ -1007 (`578:472-607`) and are matched to the rail label sitting above each
cluster.

| Category | Cards |
|---|---|
| Custom Software Development | 11 |
| Offshore & Outsourcing | 2 |
| AI Development | 2 |
| QA Testing | 1 |
| Infrastructure | 3 |

Semantics are `role="tablist"` with `aria-orientation="vertical"` and a roving
`tabindex`, so Up/Down move between tabs and Home/End jump to the ends. Left and
Right are deliberately left alone — the rail is vertical. Activation follows
focus, safe here because all five panels are already in the document.

Panels stay mounted and toggle with a **conditional display utility**, not just
the `hidden` attribute: Preflight's `[hidden]` rule and `.grid` have equal
specificity, and utilities come later in the sheet, so `.grid` would win and the
"hidden" panels would all render at once.

Colours are ours; Figma only ever draws the selected state. Idle labels are 55%
black — 4.74:1 on white, which clears AA as body text rather than scraping by on
the large-text allowance — and hover and selection both go to full black. The
5px marker is black too, not the brand blue of the Figma line (`180:710`), so
that a selected item reads as *completely* black.

`Hire Developers` (`180:629`) was dropped on request. **The node is still in the
Figma file**, so anything that re-syncs the rail from Figma will bring it back;
`SERVICE_CATEGORY_IDS` in `src/lib/content.ts` is the authority.

**Services We Offer grid** — `src/components/ServiceOfferCard.tsx`

All seventeen cards are authored now; the empty placeholder slots are gone.
Titles and hover copy come from `586:802` (Group 108), which lays the seventeen
out off-canvas in the same 3-column reading order as the grid itself, so they
map by position.

Hovering a card fades the illustration out and the description in over the same
area. The "DETAIL →" link is a real focusable child, so tabbing to it opens the
card's copy on the way past.

Two of the seventeen illustrations are **vector groups, not image fills**
(`405:2002`, `405:2120`). Figma's render endpoint was rate limiting, so they are
rebuilt as SVG from the file's own `fillGeometry` path data
(`/v1/files/:key/nodes?geometry=paths`, which is on the generous file-endpoint
limit rather than the image one). Both come out with identity transforms, so a
plain translate per leaf is exact.

Those two then hit a second wall: **Next's image optimizer answers 400 for SVG**
unless `dangerouslyAllowSVG` is set. They pass `unoptimized` instead, which
serves them from `/public` untouched — there is nothing to optimize in a vector,
and the flag stays off for every other image on the site.

**Service write-ups** — `src/app/[locale]/services/[topic]/page.tsx`

Two long-form pages behind the "DETAIL →" buttons: `/services/ai-development`
(`586:813`, 7 cards) and `/services/custom-software` (`586:1081`, 14 cards).

**No hero.** The brief is that the hero must not follow the reader into the
detail content, so these pages open on the heading. That leaves nothing behind
the nav bar but white page, where white type is invisible — hence `alwaysSolid`
on `Nav`, which skips the transparent-over-hero state entirely.

`**…**` in a dictionary string marks an emphasised run. The file styles those
runs differently in each context — brand blue at normal weight in the intro
(`PoC → MVP → production`), bold in the same grey as the sentence inside a card
— so `Emphasis` takes the class from the call site and a translator only has to
keep the asterisks around the equivalent phrase.

Card titles are normalised to near-black. Figma paints them blue on 12 of 14
Custom cards and 1 of 7 AI cards with no pattern to it; the heading and the CTA
already carry the brand colour, and 21 blue headings over grey body copy is a
wash.

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

## Our Work

The case-study browser exists in Figma as **seven pasted pages** (`554:855`,
`554:1457`, `554:1467`, `554:1746`, `555:2084`, `556:2395`, `556:2714`) rather
than a 1672px artboard — they carry no nav, hero or footer, and their widths run
1290–1655px. So the browser is reproduced faithfully and the page shell follows
the system the four designed pages establish.

**83 case studies** across 7 pages of 12, matching the "1 2 3 … 7" control in the
artboard. `src/lib/our-work.ts` is generated from the artboards, not
transcribed — one of the seven containers is not a top-level frame, and listing
them by hand missed 12 cards, so the extractor scans every `Article` frame in the
document.

| | |
|---|---|
| Search | keyword match on the title |
| Service filters | 12, all populated |
| Industry filters | 14 defined, **0 populated** |
| Grid | 3 columns, card 409×333 with a 407×220 image band |
| Pagination | 12 per page |

**Chips are derived from the data.** A category with nothing behind it is never
rendered, so no filter can dead-end. That is why the industry band is currently
absent: the artboard defines fourteen industries but none of the 83 cards carry
an industry tag. Fill `industries` in `src/lib/our-work.ts` and the band appears
on its own — no code change.

### Brand unification

Five partner product brands were unified under Wesantika at the client's
instruction, applied during extraction so the mapping is reproducible:

| Figma | Shipped |
|---|---|
| `SotaVision` | Wesantika Vision |
| `Sotabox` | Wesantika Box |
| `SotaAgents` | Wesantika Agents |
| `SOTA Finance` | Wesantika Finance |
| `Wesang` | Wesantika |

Client and partner company names in the titles (LG Innotek, Decathlon, Q CELLS
and so on) are left as authored — the client confirmed these are partner
companies and the projects were jointly developed. Verified: no `Sota`,
`Saigon` or bare `Wesang` string reaches any rendered page.

## Text colour over imagery

**Ink is decided by measurement, not by the Figma value.** The file has
specified white type over near-white artwork four times now (`210:995`,
`250:1106`, `250:1107`, `423:2388`), so rather than correct each one as it
appears, every text-over-image region is declared and measured:

```bash
npm run ink        # exits non-zero if any region fails
```

`scripts/ink-audit.mjs` decodes the real PNGs, composites any scrim per pixel,
and takes the **worst 10% of samples** rather than the average — an average
hides a bright patch that swallows part of a headline. It applies WCAG
thresholds (4.5:1 body, 3:1 large text and graphics) and reports what the
opposite ink would have scored.

That worst-case view caught something averaging had missed: the Technologies
hero body ran from the pale left of the photo into the blue right-hand side, so
**neither** ink cleared the whole line. It is now narrowed to 700px.

**The rule**

| Ground | Ink | Scrim |
|---|---|---|
| Pale artwork (About, Services, Technologies heroes; Vision and Global bands) | black | none |
| Dark artwork (Top hero, AI panel) | white | only where the artwork is mixed |
| Brand blue on a light ground | `--color-brand-ink` `#0b62bd` | — |

`#0f84fd` reaches only 3.3:1 on the near-white bands it was used over, which
fails AA under 24px. `--color-brand-ink` measures 5.4:1 on the same grounds and
is used for the "Our Vision" label and the Services "It requires" points. The
primary is unchanged everywhere it sits on a solid fill.

Two navy washes are gone: About Us and Services previously carried one purely to
force white type to work. Black scores 17.5:1 and 6.1–8.3:1 on those grounds
unaided, so the photographs are no longer obscured.

**The nav is the exception.** It spans the full width, so it crosses both pale
and dark parts of every hero, and its type stays white per the brief. Its
gradient is held flat at 55% across the bar and only fades below it — the
previous gradient started fading immediately and reached just 27% at the text
row, which was the actual failure. It now measures 5.1–8.4:1 on all five heroes.

> If you would rather keep the heroes completely clean, **dark nav type needs no
> gradient at all** — it measures 5.5:1 on the Top hero and 11–12:1 on the other
> three. Say the word and I will switch
> it; white type was your brief, so it stays until you decide otherwise.

Re-run `npm run ink` after any image or layout change. The regions are declared
in the CSS coordinates that actually ship, not in Figma coordinates.

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

## RFP modal

Figma `572:98` (976 × 700, 29px radius, photographic background). Opens from the
"Send Your RFP" button on the Top, Services and Technologies pages — three
server-rendered pages each drop in one `<RfpDialog>`, which carries both the
trigger and the dialog.

`src/components/RfpDialog.tsx` → `POST /api/rfp` → `src/lib/mailer.ts`

| | |
|---|---|
| Fields | Name, Business Phone, Company Name, Email, Project Brief — all required |
| Spam | Cloudflare Turnstile, verified server-side before any other work |
| Attachment | optional, 10 MB cap, emailed as a real attachment |
| Dialog | `aria-modal`, Escape, backdrop click, focus trap, scroll lock, focus returned to the trigger |

**Turnstile** renders explicitly rather than via the script's automatic pass:
the widget is created when the modal opens, which is after the script has
already scanned the document. A spent token is reset on failure so a retry gets
a fresh one.

With the keys unset the app uses Cloudflare's documented **test keys**
(`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`). The widget
renders and the server-side `siteverify` call runs exactly as it will in
production — only the key values change. Create a site at
[dash.cloudflare.com → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

**`RFP_TO_EMAIL` is not set yet** — the address was cut off in the brief, so
submissions currently fall back to `CONTACT_TO_EMAIL`, which is still the
`.example` placeholder. Set it before launch.

Verified end to end:

```
no captcha token          -> 400  {"error":"captcha_missing"}
valid submission          -> 200  {"ok":true,"previewUrl":"https://ethereal.email/…"}
missing required field    -> 422  {"error":"Company name is required."}
invalid email             -> 422  {"error":"That email address looks invalid."}
.pdf attachment           -> 200  (delivered as an attachment)
disallowed type (.exe)    -> 415  {"error":"file_type"}
11 MB file                -> 413  {"error":"file_too_large"}
CRLF injected into a name -> 200  (stripped before it reaches a mail header)
```

### Figma image adjustments are not in the export

The modal's background carries adjustments and a crop that live on the **fill**,
not in the asset:

```
filters        { exposure .52, contrast .30, saturation .19, highlights .06 }
imageTransform [[1, 0, 0.0018], [0, 0.48839, 0.45606]]
```

Downloading the `imageRef` gives the raw 429×630 photo — darker, flatter and
uncropped. Both are reproduced in CSS from the fill's own numbers: the transform
says full width and the vertical band from 45.6% to 94.4%, which is `height:
204.756%` at `top: -93.380%`; the filters become
`brightness(1.52) contrast(1.3) saturate(1.19)`.

The filter values are Figma's own numbers mapped to their CSS equivalents.
Figma does not publish its formulas, so this is close rather than exact — **if
pixel-exactness matters, export the background flattened** (adjustments applied)
and drop it in; the CSS filter can then come off.

### The heading is two-tone

`572:321` has a base fill of white, which is why it first shipped all-white and
looked wrong. The colour is actually per-character:

| Characters | Colour | Weight |
|---|---|---|
| `Your RFP, reviewed by expertsin` | `#000000` | 600 |
| `24 hours` | `#ffffff` | 800 |

Measured on the adjusted background, black scores 5.4–6.1:1 across the heading
and the white emphasis 3.4:1, which clears AA for 32px/800. The body and
checklist are black at 7.6:1 and 10.8:1; the form sits over the deep blue on the
right, where white scores 6.9:1.

`heading` is split into `lead` / `emphasis` / `trail` so each locale decides
where the emphasis falls — Japanese needs it mid-sentence.

The source reads `expertsin` (a missing space). Corrected to `experts in`.

### One trap worth knowing about

`.env.example` declares every key with a blank value and `.env.local` is copied
from it, so an unfilled key is `""` — not `undefined`. `??` keeps the empty
string, which sent a **blank secret** to Cloudflare (every verification 400'd)
and would have addressed mail to nobody. `src/lib/env.ts` now treats blank as
unset, and every optional config read goes through it — the contact route and
the mailer had the same latent bug, including `Number(SMTP_PORT ?? 587)`
evaluating to port `0`.

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

## Before launch

Everything below is a placeholder that will ship broken. None of it can be
filled in from the design file — each needs a real value from Wesantika.

| What | Where | Why it can't be guessed |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel env, **all** environments | `NEXT_PUBLIC_*` is inlined at *build* time. Unset, canonical/`hreflang`/`og:image` fall back to `VERCEL_PROJECT_PRODUCTION_URL`, and failing that to `localhost:3000`. |
| ~~Four contact-rail links~~ | done | Real accounts supplied and in place — see below. |
| ~~`CONTACT_TO_EMAIL`~~ | done | `lh.smartcoding@gmail.com`, and it is the code-level fallback too. |
| SMTP credentials | `.env` | **The one thing still missing.** Without them the API provisions a disposable Ethereal mailbox — real SMTP, and the send genuinely succeeds, but the mail lands in a throwaway inbox nobody at Wesantika reads. |
| Turnstile key pair | `.env` | Cloudflare's "always passes" test keys are in use, so the RFP form has no actual spam protection. |
| Privacy Policy | `src/components/Footer.tsx` | A legal document about how this company handles data. Held back rather than shipped pointing at `#`; restoring it is one `Link` once the text exists. |
| "within one business day" | `contact.next.steps.reply` in all 5 dictionaries | A **response-time commitment** written into the Contact page. One business day is the ordinary B2B default, but nobody at Wesantika has confirmed Wesantika can meet it. Confirm or reword. |

## Still to do on the Services page

- **The three "It requires" icons** (`405:2296`, `405:2297`, `405:2300`) are not
  exported — Figma's image API was rate limiting throughout. A neutral brand-blue
  marker stands in for them. They need one export run to replace.

## Typography — `npm run typography`

### The scale had one line-height ratio for every size

That is the whole story. Figma's scale read:

```
16/19 = 1.19   20/24 = 1.20   24/29 = 1.21   32/39 = 1.22
36/44 = 1.22   48/58 = 1.21   64/77 = 1.20
```

Seven steps, one number. But line-height has to **fall as size rises** — a long
line of 16px text needs air between the lines for the eye to find the next one;
a 64px headline does not, and looks unglued if it gets it. A single ratio cannot
be right at both ends, and here it was tuned for the headline, so **46 separate
places set body copy at a headline's line-height.** `16px / leading-[19px]`
alone appeared 26 times.

The scale in `globals.css` now descends: 1.63 at 16px down to 1.09 at 64px.
Every one of the 46 usages was corrected. `npm run typography` pairs sizes with
leadings *within the same breakpoint* — so `text-[30px] … xl:leading-[58px]` is
not misread as a 1.93 ratio — and fails if body copy drops below 1.40 again.

Worth knowing: the old ratio was not only ugly. At 1.19, **Thai clips** — มี and
ที่ stack up to two marks above the base letter and one below, and they touched
the line above.

### A display face

Headings are set in **Manrope**, body in Inter. Inter is a fine text face and a
slightly anonymous display one; at 48–68px its neutrality reads as absence
rather than restraint. Manrope is geometric with humanist detailing, so it gives
the headings a voice without fighting Inter underneath them.

One stack covers all five locales — `--font-heading, --font-app, …`. Manrope
carries Latin and Vietnamese; Japanese, Chinese and Thai fall through it to
their Noto face automatically, because it has no glyphs for them.

**To revert to a single family:** drop `--font-heading` from `--font-display` in
`globals.css`. Nothing else changes.

### Everything else in the base layer

- **Optical tracking, Latin only.** −0.02em on `h1`–`h3`, −0.025em on `h1`.
  There was none anywhere before, and default spacing is drawn for text sizes,
  so it reads loose above ~28px. It is scoped with `:lang()` because negative
  tracking is *wrong* for the other three scripts — CJK is already set on a
  tight em box, and pulling Thai in makes its stacked marks collide.
- **Thai gets more leading** (1.75), for the same reason it must not be tracked.
- `text-wrap: balance` on headings, `pretty` on paragraphs — no stranded last
  words. Both degrade to normal wrapping, so there is nothing to guard.
- `font-optical-sizing: auto` — both faces are variable with an optical size
  axis, and without this the browser never uses it.
- `font-feature-settings: "cv11", "ss01"` and `-moz-osx-font-smoothing`.

### The copyright line

`src/components/Copyright.tsx`. It was 15px of `text-white/70` in the corner of
a navy bar — the last thing on the page and the least considered thing on it.
Which is what makes it the right place for a flourish: nothing depends on it, so
it can carry decoration that would be noise anywhere else.

**The typeface is the site's own** — Inter for English, Noto Sans JP for
Japanese, each locale's existing face for the rest, at weight 500. A pair of
decorative display faces (Unbounded and Shippori Mincho) were tried here and
taken back out: they made the line a separate object on the page rather than the
end of it.

The decoration is carried by everything *except* the typeface, which is the more
durable way to do it — nothing here depends on a font loading, and it costs no
extra bytes. Removing the two faces took **254 `@font-face` declarations** out of
the stylesheet.

**Tracking does most of the work**, per script:

| | tracking | |
|---|---|---|
| `en` | 0.22em, uppercase | Opens Latin caps out into something deliberate |
| `vi` | 0.16em | |
| `ja` | 0.16em | Already set on a full em box; 0.22em would pull the line apart |
| `zh-Hant-TW` | 0.14em | |
| `th` | 0.08em | Least of all — Thai marks belong to the letter they sit on |

Weight 500, not 400: at 11–13px with this much tracking the strokes thin out and
the line starts to look faded rather than fine.

**The colour is a sheen, and it is measured.** A gradient sweeps the line over
14s: `#e8f2ff → #7dd3fc → #ffffff → #7dd3fc → #e8f2ff`. Every stop was checked
against the `#041d38` bar — 15.0:1, 10.2:1, 17.0:1 — so no frame of the
animation drops under AA. That matters more than usual here: this is legal text,
and it has to stay readable at the moment it is least eye-catching.

The gradient lives inside `@supports (background-clip: text)`. That rule needs
`color: transparent` to show at all, and a browser with one and not the other
would render an **invisible copyright notice**. `#e8f2ff` is the base state; the
gradient only ever replaces it where it is known to work.

**Ornaments.** A hairline fades in from each edge and closes on a small brand
diamond with a soft glow, centring the line instead of leaving it stranded
against a margin. Above the bar, a brand hairline marks the seam between the two
navies — `#062a52` and `#041d38` are close enough that the join read as a
printing error rather than an edge.

Tracking opens up only from `sm`: flat 0.22em across 38 uppercase characters
needs ~374px, and a 360px phone offers 312px inside the gutter. There is no
`whitespace-nowrap` either — tracked type is wide, and a line that cannot wrap
can only overflow.

**The copyright was also English in all five locales.** It is localised now:
`無断転載を禁じます`, `版權所有`, `สงวนลิขสิทธิ์`, `Đã đăng ký bản quyền` — which is
what gave the Japanese decorative treatment anything to decorate.

### Bold was doing the work of hierarchy

69 usages of `font-bold` against 19 of `font-normal`. Where everything is bold,
nothing is emphasised. Seven genuine paragraphs — the RFP pitch and its
checklist on three pages, and the Services sub-head — are now regular weight at
85% black. Buttons, nav items, labels and pull quotes stay bold, because there
the weight is doing a job.

The Services sub-head also came down from a **1209px measure** to 860px.

## Is it actually on the page? `npm run smoke`

```
npx next start -p 3000 &
npm run smoke                      # or: npm run smoke -- http://host:port
```

Every other check here passed on a footer whose **contact form had been
deleted**. Nothing was broken: `tsc` was clean, `next build` produced 122 pages,
`ink`, `fit` and `i18n` were green. A component had simply stopped being
rendered, and not one of those checks looks at whether a component is *there*.

`scripts/smoke.mjs` fetches the built pages and asserts the markers that must be
present — the form and its five fields, the `main` landmark, the skip-link
target, the head office, the canonical link, `og:image`, the Organization
schema — plus, on the Contact page, that the footer form is *absent*, since that
page carries its own.

It found a second defect on its first run: `/[locale]/services/[topic]` had a
`<main>` but no `id`, so "Skip to content" did nothing on all 85 of those pages.

## Does the copy fit? `npm run fit`

A hero is a box with a fixed height, and the copy inside it is five different
lengths, because there are five locales — and the longest is never the one the
layout was eyeballed against.

That is exactly how the About Us hero came to overflow. `heroLead` is a
240-character paragraph (272 in Vietnamese) set at the *heading* size. It fitted
while the hero was 942px tall; at the 560px every interior hero now shares, nine
lines of 48px type overran the section and spilled onto the content below.

`scripts/fit-check.mjs` estimates rendered height per locale and fails if a
block does not fit. It is deliberately pessimistic — average advance widths per
script, no hyphenation, Thai combining marks counted as if they advanced (they
do not) — so it over-predicts and complains before the browser does, which is
the useful direction to be wrong in.

It immediately found a second overflow nobody had reported: the **Technologies
hero in Vietnamese**, at 480px in a 465px box, with English and Thai inside 15px
of the same edge.

| | worst locale, before | after |
|---|---|---|
| About | 465px+ (overflowing) | 225px of 465px |
| Services | 420px | 270px |
| Technologies | **480px (overflowing)** | 330px |

### What changed

**About Us.** `heroLead` is body copy, so it is set as body copy, and the page
title moved up into the hero to be its heading. That also removed a real
oddity: the hero used to hold a paragraph and the actual `h1` arrived *after*
it, 64px and centred. The page now has one `h1`, in the hero, like the other
four.

Two more things on that page were the same fixed-pixel thinking:

- The narrative blocks ran **16px across a 1273px measure** — about 160
  characters a line, twice what is comfortable — at `leading-[19px]` (1.19) with
  4px between paragraphs, so five paragraphs ran together into one grey mass.
  Now 720px, 17/28, real spacing, and the pull quote looks like a pull quote.
- The Vision band was a fixed 941px with its three parts pinned at `top-[123px]`
  / `[211px]` / `[606px]`. Those numbers hold for exactly one string length. It
  is normal flow now, so it cannot overflow and it sizes to whatever the longest
  locale needs — and the ~240px of dead space at its foot is gone.

**Services and Technologies.** Their heroes carried a whole paragraph as the
sub-head — 334 and 466 characters — on top of a heading *and* a CTA button. Each
is split at its first sentence: the hero keeps the opening claim, and the rest
becomes `hero.bodyMore`, rendered as a lead paragraph directly beneath. No copy
was lost and no new translation was needed. Thai has no sentence terminator, so
its two break points are given explicitly in the split, each matching where the
English sentence ends.

## The polish pass

Three things looked unfinished. None was a taste problem; all three were
measurable, and the measurements are what drove the fixes.

### Heroes: `src/components/PageHero.tsx`

The six heroes were authored independently and had drifted apart in every
dimension a reader notices:

| | Top | About | Services | Tech | Our Work | Contact |
|---|---|---|---|---|---|---|
| height | 941 | 942 | 950 | 952 | 620 | 560 |
| heading | 64 | 48 | 48 | 48 | 64 | 58 |
| gutter | 212 | 213 | 207 | 217 | 212 | 212 |

Technologies also positioned its copy with `xl:absolute top-[333px]
left-[217px]` — a different mechanism from the other five. None of that was a
decision; it accumulated. There are now **two** sizes: 760px for the landing
page, 560px for every interior page. 941px was taller than the viewport of a
1440×900 laptop, so an interior page opened on a photograph and nothing else.

`objectPosition` is per-image and load-bearing. The six photographs all put the
subject right and leave the left pale, but they disagree on where vertically,
and the Figma exports (~1.8 aspect) crop very differently from the
client-supplied art (1.50). Our Work is the clearest case — black copy measures
**1.4:1** at `50% 50%` and **10.5:1** at `50% 0%`, because the artwork's middle
band is a dark code editor. `npm run ink` models the exact crop, so a bad
`objectPosition` fails the audit rather than shipping.

#### One ground for all five interior heroes

Unifying the CSS was not enough — the five still looked unrelated, because the
*ground under the copy* was different on every one:

| | what the copy actually sat on | black measured |
|---|---|---|
| About | sunset skyline, warm, balcony rail through it | 19.6:1 |
| Services | clean pale blue | 17.2:1 |
| Technologies | clean pale blue | 15.7:1 |
| Our Work | **a browser mockup and a phone** | 10.0:1 |
| Contact | clean pale blue | 19.2:1 |

Contrast passed everywhere, so the audit was happy. That was never the problem:
five different backdrops was, and the 10–20:1 spread is that difference in
numbers. One page was warm-toned on a site whose other four are cool blue, and
one had type sitting on UI furniture.

So the copy always gets the same ground now. A white wash holds ~90% across the
copy column and releases by 80% of the frame, so the photograph still arrives at
full strength on the right — which is where all five put their subject. Black
type, one ink, one field, every page. The five now measure **19.4–20.8:1**, a
band tight enough that they read as one design.

About also moved to `objectPosition: 50% 0%` — the sky rather than the skyline,
which removes the one warm-toned hero.

Below `xl` the copy runs the full width, where a left-to-right ramp would leave
its right-hand end unwashed, so that breakpoint gets a flat wash instead.

The wash is duplicated in `scripts/ink-audit.mjs` as the `pageWash` scrim so the
audit measures what ships. **If you change one, change both.**

One caveat worth knowing: `work-hero.png` is centre-weighted — its subject runs
across the full frame — while the other four leave the left third empty. It is
the one image the layout has to fight, and the wash is what makes it work. A
right-weighted replacement would sit better.

Two things that read as amateur are also gone: the Top hero's sub-head was
**bold** purely so 24px would qualify as large text at 3.6:1 (a soft wash now
buys the margin, so it is regular weight), and the Technologies heading and RFP
body copy carried **hardcoded line breaks** from Figma, which broke at the wrong
place in four of five languages.

Hero images now render at `quality={90}`. They were being served at 75 —
`quality` was silently coerced, because **Next 16 narrowed
`images.qualities` from "anything" to `[75]`** and does not warn. On wide smooth
gradients 75 bands visibly. Cost: 44KB → 62KB on one above-the-fold image.

### The footer contact panel

958px tall — taller than a 1440×900 viewport, for a footer. Now ~520px:

- padding `156/100` → `88/88`
- heading `36/44` → `30/38`; sub-head `20/24` → `17/26` (1.2 leading was cramped)
- **fields pair up** — name/email and phone/company side by side from 640px, so
  five stacked rows became two
- input type `24px` → `16px`; 24px inputs read as display type, and they were
  what forced the 52px rows and the 276px textarea
- **labels are now visible.** They were `sr-only`, so the placeholder carried
  the whole meaning: the moment you typed, the field stopped saying what it was,
  and nothing marked which four were required
- copyright line `24px` → `15px` — it was competing with page headings

### The RFP modal

- **It now opens.** It was `{open && <Modal/>}` — the panel appeared at full
  size with no transition. It fades and lifts 8px over 200ms, and stays mounted
  through the close so the exit animates too. `motion-reduce` drops to a fade.
- **The background was a 52KB JPEG stretched to 204.756% height** at -93.380%
  top with `brightness(1.52) contrast(1.3) saturate(1.19)` over it — Figma's
  fill transform, reproduced faithfully. A photograph blown past 2× and pushed a
  stop and a half brighter is soft, banded and washed out. It is a gradient now:
  sharper at any size, no bytes, and *computable*, so the black pitch copy can
  be checked arithmetically (15–19:1) instead of sampled off a photo.
- Field borders were `#eaecf0` — **1.18:1**, so the inputs effectively had no
  edge. WCAG 1.4.11 wants 3:1 for a control boundary; `#667085` gives 4.97:1.
- Status messages sat directly on the artwork (white for success, pale salmon
  for failure). They are chips now, readable regardless of what is behind them.
- Columns were pinned at `439px + 389px` — numbers that added up to the old
  976px panel and nothing else. The pitch column is fluid.

### Primary buttons, site-wide

White on `--color-brand` (`#0f84fd`) measures **3.66:1**. That clears AA only
for large text — 24px, or 18.66px bold — and every primary button here is 16px
bold, which is *under* the bold threshold. So every CTA on the site was
technically short of AA. 18 fills moved to a new `--color-brand-btn`
(`#0b62bd`, 6.01:1): the same hue one step down, which holds at any label size.
Decorative uses of the brand blue are untouched.

**To revert:** point `--color-brand-btn` at `--color-brand` in `globals.css`.
Nothing else needs to change.

## Contact page

No Figma artboard exists for it; it was designed around one observation. The six
"Contact Us" buttons scattered across the site all scrolled to the same footer
form, so a company arriving with a signed-off RFP and a founder with an unnamed
problem were funnelled into the same five fields. The page opens with **two
front doors** and lets the visitor self-select — the RFP route reuses
`RfpDialog` rather than duplicating its upload and Turnstile handling.

All six CTAs now route to `/{locale}/contact` instead of `#contact`. The footer
form stays on every other page and keeps its `id="contact"` anchor.

Two things are suppressed on this page and both are deliberate:

- **The footer form** (`<Footer withForm={false} />`) — two identical forms on
  one page makes "Send Message" ambiguous in a screen reader's form list.
- **`StickyContactRail`** — the four channels it hides behind hover are spelled
  out in the sidebar, so the rail would only cover them up.

`ContactForm` gained a `tone` prop rather than being forked: the footer sits on
navy, this page on white. Field rhythm is identical in both, which is what keeps
them reading as one form in two places.

### The channel icons were invisible, twice over

Under "Or reach us directly" the four icons rendered as nothing at all, for two
independent reasons:

1. They were served through **`next/image`, which refuses SVG** unless
   `dangerouslyAllowSVG` is set. `src/components/Icon.tsx` exists precisely
   because of that, and the rest of the site uses it.
2. All four are authored **`fill="white"`** — they were drawn for the brand-blue
   sticky rail. Even once loading, they were white on a white card.

They now get the rail's own treatment: white glyph on a `brand-btn` disc
(6.01:1, well past the 3:1 a graphic needs). The two places a visitor can reach
these channels look like the same thing, because they are.

### Contact channels

The four real accounts, in `src/lib/content.ts` → `CONTACT_CHANNELS`, replacing
the placeholders (one of which, `wa.me/00000000000`, resolved to a WhatsApp
error page):

| | |
|---|---|
| Email | `lh.smartcoding@gmail.com` |
| Telegram | `t.me/senior_engineer1` |
| WhatsApp | `+81 90-3035-4697` |
| LINE | `lin.ee/xINWk75` |

The WhatsApp entry carries **two** forms and needs to: `wa.me` takes E.164 with
no `+`, spaces or dashes — `819030354697` — and fails silently on anything else,
so the human-readable `+81 90-3035-4697` lives in `display` for the one place it
is shown as text.

Enquiries deliver to the same address, and it is now the *code-level* fallback in
both API routes as well as the env default. That inverts the old behaviour on
purpose: while no real mailbox existed, `.example` made an unconfigured
deployment fail loudly, which was right. Now one exists, a deployment that
forgets `CONTACT_TO_EMAIL` should still deliver rather than drop enquiries.

**Verified end to end**, not assumed:

```
POST /api/contact  (JSON)         -> {"ok":true,"previewUrl":…}
POST /api/rfp      (multipart)    -> {"ok":true,"previewUrl":…}
```

and the delivered RFP message was fetched back and checked to contain the
attachment filename, the form fields, and the real recipient. The guards were
tested by trying to break them:

| attempt | response |
|---|---|
| 11 MB file (10 MB limit) | `file_too_large` |
| `.exe` attachment | `file_type` |
| no captcha token | `captcha_missing` |
| malformed email | rejected with a message |

### The head office

`99/9 Moo 2, Chaeng Wattana Road, Bang Talat, Pak Kret District, Nonthaburi
11120` lives in `src/lib/content.ts` as `HEAD_OFFICE`, in three places:

- the **Contact page sidebar**, with a Google Maps link, next to the other ways
  to reach the company;
- the **footer**, so it is on every page that carries the form panel — a postal
  address is how a B2B visitor checks a supplier is a real company in a real
  place, and it was the one piece of contact information missing everywhere;
- **`Organization` JSON-LD** as a `PostalAddress`, which is what a search engine
  actually reads and what a knowledge panel is built from. Three lines of text
  tell it nothing.

Both renderings use `<address>`, which is not a styling choice: it marks the
block as contact information for assistive tech, where a `<div>` would not.

**It is deliberately not translated.** An address is what someone writes on an
envelope or reads out to a driver, and a transliterated address is a
misdelivered one — so the same Latin transcription ships in all five locales.
Only the label above it (`contact.office.heading`) is translated.

The JSON-LD omits `contactPoint` while the address is still on `.example`:
publishing a structured contact that cannot receive mail is worse than
publishing none. It appears on its own once the real address is set.

### Brand colours on this page

`--color-brand-tint` (`#eef5ff`, brand blue at ~7% over white) was added to the
token set. The page had been reaching for an ad-hoc `#f4f8fd` because the
palette had no tinted surface — every other page had been solving the same
problem the same ad-hoc way. Black measures 19.1:1 on it and `brand-ink` 5.5:1.

The "Send a message" card now sits on that tint with a brand border, so the two
routes are not a coin toss, and the three section gutters moved from 160px to
the 212px the hero and the rest of the site use.

## Not built

Not designed yet, so not implemented. The nav lists only pages that exist — an
entry with no destination is removed rather than rendered inert, because
`Nav` builds every `href` from the locale segment and a null one produced
`/ennull`.

- Hover/focus/active states beyond the two specified interactions

## Known content issues in the source file

- The Services hero (`405:1998`) reads *"At **Saigon Technology**, we specialize
  in…"* — a competitor's name. **Corrected to "Wesantika" in the implementation**
  so it does not ship, but it still needs fixing in Figma.
- `405:2292` reads *"Seamless **Colloboration**"*. Corrected to "Collaboration"
  here; also needs fixing in Figma.
- **"SaaS Application Development" (`586:791`) names the competitor again** —
  *"**Saigon Technology's** seasoned engineers…"*. Corrected to "Wesantika"
  here; needs fixing in Figma.
- **White on brand blue is 3.66:1.** Every solid `bg-brand` button with a white
  label is below the 4.5:1 that normal-weight text needs; it only passes because
  the label is large enough to count as large text (≥24px, or ≥18.66px bold).
  The two new buttons ("DETAIL →" and the write-up CTA) are set bold for exactly
  that reason, against the file's regular weight. **Pre-existing buttons at 16px
  bold do not qualify** — 16px bold is under the 18.66px threshold — so the
  Services hero CTA, the RFP button and the Top-page CTA are all technically
  short of AA. `scripts/ink-audit.mjs` does not catch this: it measures text
  over *imagery*, not over solid fills. Fixing it means either darkening the
  button fill to `brand-ink` (5.62:1, passes at any size) or raising those
  labels to 20px. Not changed here — it is a site-wide visual decision.
- **"DevOps Development Services" (`578:607`) has the wrong body.** It repeats
  "AI Development Services" (`578:482`) word for word — *"By combining
  cutting-edge AI with machine learning…"* — which says nothing about DevOps.
  Shipped verbatim because the copy is the design's call, not ours, but it reads
  as a paste error and wants replacing in Figma. It is currently duplicated into
  the English and Japanese dictionaries.
- Two sections are flat bitmaps with text baked in, set in a non-Inter geometric
  sans: the core-values hexagons (`210:997`, implemented as an image) and a
  "How We Deliver" comparison table (`238:1069`, parked off-canvas and not
  implemented). **Text inside a bitmap cannot be translated**, so with five
  locales live these are now the biggest blocker to a genuinely localised site.
  Rebuilding them as real markup is the recommended next step.
