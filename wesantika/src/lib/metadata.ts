import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getLocaleDefinition,
  LOCALES,
  LOCALE_CODES,
  type Locale,
} from "@/lib/i18n/locales";

/**
 * Metadata that has to be re-stated on every page rather than inherited.
 *
 * Next merges metadata *shallowly*: a page that sets `alternates` replaces the
 * layout's `alternates` outright, nested keys and all. So a page declaring only
 * a canonical URL silently drops every hreflang link the layout set up — which
 * is exactly what was happening on all five inner pages. Same trap for
 * `openGraph`. Building the whole block from one helper keeps the two in step.
 *
 * `title` and `description` are deliberately absent from `openGraph`: when they
 * are missing, Next fills them from the page's own resolved title/description,
 * and then fills the Twitter card from the Open Graph values. Setting them here
 * would instead stamp the site-level title onto all 117 pages.
 *
 * @param path route below the locale segment, "" for the locale home
 */
export function socialMetadata(
  locale: Locale,
  path: string,
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const definition = getLocaleDefinition(locale);

  return {
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(
          LOCALE_CODES.map((code) => [code, `/${code}${path}`]),
        ),
        "x-default": `/${DEFAULT_LOCALE}${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Wesantika",
      // og:locale is language_TERRITORY, not the BCP 47 tag used in the URL.
      locale: definition.ogLocale,
      alternateLocale: LOCALES.filter((l) => l.code !== locale).map(
        (l) => l.ogLocale,
      ),
      url: `/${locale}${path}`,
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          alt: "Wesantika",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
