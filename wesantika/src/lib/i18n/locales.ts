/**
 * Locale registry.
 *
 * Codes are BCP 47 language tags:
 *   en          English
 *   ja          Japanese
 *   zh-Hant-TW  Chinese, Traditional script, Taiwan
 *   th          Thai
 *   vi          Vietnamese
 *
 * `zh-Hant-TW` is the maximal canonical form. `zh-TW` is its minimal canonical
 * equivalent (TW already implies Hant), but the explicit script subtag is
 * preferred here: it documents intent, and it leaves room for `zh-Hant-HK` or a
 * Simplified `zh-Hans-CN` later without any of the tags becoming ambiguous.
 * `resolveLocale()` accepts the common aliases and redirects to the canonical
 * form, so /zh-TW and /zh-tw still work.
 */

export type FontKey = "latin" | "jp" | "tc" | "thai";

export type LocaleDefinition = {
  /** canonical BCP 47 tag, also the URL segment */
  code: string;
  /** English name, for aria labels */
  englishName: string;
  /** endonym, shown in the switcher */
  nativeName: string;
  /** compact form shown in the nav, matching the design's "EN" */
  short: string;
  /** which webfont carries this script — Inter has no CJK or Thai glyphs */
  font: FontKey;
  /** aliases accepted in the URL and in Accept-Language */
  aliases: readonly string[];
};

export const LOCALES = [
  {
    code: "en",
    englishName: "English",
    nativeName: "English",
    short: "EN",
    font: "latin",
    aliases: ["en", "en-us", "en-gb"],
  },
  {
    code: "ja",
    englishName: "Japanese",
    nativeName: "日本語",
    short: "日本語",
    font: "jp",
    aliases: ["ja", "ja-jp"],
  },
  {
    code: "zh-Hant-TW",
    englishName: "Chinese (Traditional, Taiwan)",
    nativeName: "繁體中文",
    short: "繁中",
    font: "tc",
    aliases: ["zh-hant-tw", "zh-tw", "zh-hant", "zh"],
  },
  {
    code: "th",
    englishName: "Thai",
    nativeName: "ไทย",
    short: "ไทย",
    font: "thai",
    aliases: ["th", "th-th"],
  },
  {
    code: "vi",
    englishName: "Vietnamese",
    nativeName: "Tiếng Việt",
    short: "VI",
    font: "latin",
    aliases: ["vi", "vi-vn"],
  },
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_CODES: readonly Locale[] = LOCALES.map((l) => l.code);

export function isLocale(value: string): value is Locale {
  return LOCALE_CODES.includes(value as Locale);
}

export function getLocaleDefinition(locale: Locale): LocaleDefinition {
  const found = LOCALES.find((l) => l.code === locale);
  if (!found) throw new Error(`Unknown locale: ${locale}`);
  return found;
}

/**
 * Map any user-supplied tag onto a canonical locale, or null if unsupported.
 * Matching is case-insensitive and falls back from the most specific alias to
 * the bare language subtag (so `zh-Hant-MO` still lands on Traditional).
 */
export function resolveLocale(input: string): Locale | null {
  const needle = input.trim().toLowerCase();
  if (!needle) return null;

  for (const locale of LOCALES) {
    if (locale.aliases.includes(needle as never)) return locale.code;
  }
  // fall back to the primary language subtag
  const primary = needle.split("-")[0];
  for (const locale of LOCALES) {
    if (locale.aliases.some((alias) => alias === primary)) return locale.code;
  }
  return null;
}

/**
 * Pick the best locale from an Accept-Language header, honouring q-values.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim(), q: q === undefined ? 1 : Number(q) || 0 };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === "*") return DEFAULT_LOCALE;
    const match = resolveLocale(tag);
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

/** Swap the locale segment of a pathname, e.g. /ja/about -> /th/about */
export function localizePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}
