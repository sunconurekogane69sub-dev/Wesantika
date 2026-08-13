import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Inter,
  Manrope,
  Noto_Sans_JP,
  Noto_Sans_TC,
  Noto_Sans_Thai,
} from "next/font/google";
import "./globals.css";
import { NotFoundView } from "@/components/NotFoundView";
import { SkipLink } from "@/components/SkipLink";
import { getDictionary } from "@/lib/i18n";
import {
  DEFAULT_LOCALE,
  getLocaleDefinition,
  isLocale,
  type FontKey,
  type Locale,
} from "@/lib/i18n/locales";

/**
 * The 404 for every URL that matches no route.
 *
 * ---------------------------------------------------------------------------
 * Why this file exists rather than just `app/not-found.tsx`
 *
 * `not-found.tsx` only handles `notFound()` thrown *inside* a segment. A URL
 * matching nothing never reaches a segment, so it fell through to Next's
 * built-in error card — unstyled, no navigation, English, "404: This page could
 * not be found." That was the site's 404 for the most common way of getting
 * one, while the designed page sat in the tree handling only unknown service
 * topics.
 *
 * A catch-all route under `[locale]` gets the branded page back in reach, but
 * not cleanly: this app's root layout is `app/[locale]/layout.tsx`, a top-level
 * dynamic segment, and Next's own docs name that shape as the case
 * `global-not-found` exists for. Composing a 404 through a dynamic root layout
 * leaves the initial HTML body empty and defers the whole page to the client —
 * a blank flash on every mistyped URL.
 *
 * Handled at the routing layer instead, this renders server-side, complete, in
 * one response, with a real 404 status.
 * ---------------------------------------------------------------------------
 *
 * The trade this file makes: it bypasses the layout, so fonts and global styles
 * have to be re-declared here. That duplication is deliberate and load-bearing
 * — without it the page renders unstyled.
 *
 * `headers()` is safe *here* in a way it was not in `[locale]/not-found.tsx`.
 * There, the not-found boundary is part of every route's render tree, so a
 * request-time API in it opted all 122 pages out of static rendering. This file
 * is a sibling of `[locale]`, not inside it, and is only ever rendered on
 * demand — which is correct, since the set of URLs that do not exist cannot be
 * enumerated at build time.
 */

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "700"],
  variable: "--font-app",
  display: "swap",
});
const notoJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-app",
  display: "swap",
  preload: false,
});
const notoTC = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  variable: "--font-app",
  display: "swap",
  preload: false,
});
const notoThai = Noto_Sans_Thai({
  weight: ["400", "500", "700"],
  variable: "--font-app",
  display: "swap",
  preload: false,
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const FONT_CLASS: Record<FontKey, string> = {
  latin: inter.variable,
  jp: notoJP.variable,
  tc: notoTC.variable,
  thai: notoThai.variable,
};

export const metadata: Metadata = {
  title: "Page not found | Wesantika",
  robots: { index: false, follow: true },
};

export default async function GlobalNotFound() {
  /**
   * `proxy.ts` sets `x-locale` on every request whose first segment is a valid
   * locale, which is what makes a 404 at `/ja/nope` Japanese rather than
   * English. A path with no locale segment is redirected by the proxy before it
   * can arrive here, so the fallback is genuinely a floor.
   */
  const header = (await headers()).get("x-locale");
  const locale: Locale = header && isLocale(header) ? header : DEFAULT_LOCALE;
  const definition = getLocaleDefinition(locale);
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${manrope.variable} ${FONT_CLASS[definition.font]}`}
    >
      <body className="overflow-x-hidden">
        {/* Bypassing the layout means bypassing everything in it, and the skip
            link is in it. Without this the 404 is the one page on the site
            where a keyboard user tabs the logo, six nav items, the locale
            switcher and the CTA before reaching any content — on the page whose
            entire job is to get them somewhere else. `npm run smoke` asserts it
            on all four 404 routes. */}
        <SkipLink label={t.a11y.skipToContent} />
        <NotFoundView locale={locale} nav={t.nav} copy={t.notFound} />
      </body>
    </html>
  );
}
