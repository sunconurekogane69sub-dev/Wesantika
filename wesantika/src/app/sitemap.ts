import type { MetadataRoute } from "next";
import { SERVICE_DETAIL_TOPICS } from "@/lib/content";
import { DEFAULT_LOCALE, LOCALE_CODES } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/site";

/**
 * Every page, in every locale, with its translations declared as alternates.
 *
 * The site is 110 URLs behind a locale segment, and `/` only exists as a
 * redirect, so there is nothing for a crawler to walk in from. Without this
 * file the deeper service write-ups are reachable only by following the grid.
 *
 * `alternates.languages` mirrors the `hreflang` tags each page already emits —
 * stating the relationship in both places is what search engines expect.
 */
const BASE = SITE_URL;

/** Locale-independent paths, relative to the locale segment. */
const PATHS = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/technologies", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/our-work", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ...SERVICE_DETAIL_TOPICS.map((topic) => ({
    path: `/services/${topic.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, priority, changeFrequency }) =>
    LOCALE_CODES.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALE_CODES.map((code) => [code, `${BASE}/${code}${path}`]),
          ),
          "x-default": `${BASE}/${DEFAULT_LOCALE}${path}`,
        },
      },
    })),
  );
}
