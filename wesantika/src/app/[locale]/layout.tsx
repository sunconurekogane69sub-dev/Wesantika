import type { Metadata } from "next";
import {
  Inter,
  Manrope,
  Noto_Sans_JP,
  Noto_Sans_TC,
  Noto_Sans_Thai,
  Shippori_Mincho,
  Unbounded,
} from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { SkipLink } from "@/components/SkipLink";
import { getDictionary } from "@/lib/i18n";
import {
  getLocaleDefinition,
  isLocale,
  LOCALE_CODES,
  type FontKey,
} from "@/lib/i18n/locales";
import { socialMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

/**
 * One CSS variable, four fonts. Only the class for the active locale's script is
 * applied, so `--font-app` resolves to a font that actually has the glyphs —
 * Inter covers Latin and Vietnamese but has no CJK or Thai coverage at all.
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

/**
 * Display face for headings.
 *
 * Inter is a fine text face and a slightly anonymous display one — at 48-68px
 * its neutrality reads as absence rather than restraint. Manrope is geometric
 * with humanist detailing, which gives the headings a voice without fighting
 * Inter underneath them, and it carries Latin and Vietnamese. Japanese, Chinese
 * and Thai fall through it to their Noto face automatically, because it has no
 * glyphs for them.
 *
 * Loaded on every locale so the variable is always defined; the three CJK/Thai
 * locales simply never resolve a glyph from it. To revert to a single family,
 * drop `--font-heading` from `--font-display` in globals.css.
 */
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

/**
 * Decorative faces, used for exactly one line: the copyright.
 *
 * A copyright notice is the last thing on the page and usually the least
 * considered — which is what makes it the right place for a flourish. Neither
 * face is used anywhere else, so neither can leak into the reading experience.
 *
 * Unbounded is a contemporary geometric display face: wide, confident, and at
 * small sizes with open tracking it reads as deliberate rather than loud. It
 * carries Latin *and Vietnamese*, so English and Vietnamese both get it.
 *
 * Shippori Mincho is a mincho — a Japanese serif. Setting one line of mincho in
 * a wholly sans-serif site is the strongest decorative contrast available in
 * Japanese, and unmistakably Japanese in a way a gothic face is not.
 *
 * Chinese and Thai keep their Noto face and take the ornaments only: there is no
 * decorative face for either that would not look like a costume.
 */
const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400"],
  variable: "--font-deco-latin",
  display: "swap",
  preload: false,
});
const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-deco-jp",
  display: "swap",
  preload: false,
});

const FONT_CLASS: Record<FontKey, string> = {
  latin: inter.variable,
  jp: notoJP.variable,
  tc: notoTC.variable,
  thai: notoThai.variable,
};

export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    // hreflang, canonical and og:image must be absolute URLs to be honoured.
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.siteTitle, template: "%s | Wesantika" },
    description: dict.meta.siteDescription,
    ...socialMetadata(locale, ""),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const definition = getLocaleDefinition(locale);

  const t = getDictionary(locale);

  return (
    // All five locales are left-to-right; `dir` is where an RTL locale would hook in.
    <html lang={locale} dir="ltr" className={`${manrope.variable} ${unbounded.variable} ${shippori.variable} ${FONT_CLASS[definition.font]}`}>
      <body className="overflow-x-hidden">
        {/* First focusable element in the document — it only works from here. */}
        <SkipLink label={t.a11y.skipToContent} />
        <OrganizationSchema locale={locale} />
        {children}
      </body>
    </html>
  );
}
