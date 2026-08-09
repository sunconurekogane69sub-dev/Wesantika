import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_TC, Noto_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
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
    <html lang={locale} dir="ltr" className={FONT_CLASS[definition.font]}>
      <body className="overflow-x-hidden">
        {/* First focusable element in the document — it only works from here. */}
        <SkipLink label={t.a11y.skipToContent} />
        {children}
      </body>
    </html>
  );
}
