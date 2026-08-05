import { en } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";
import { th } from "./dictionaries/th";
import { vi } from "./dictionaries/vi";
import { zhHantTW } from "./dictionaries/zh-Hant-TW";
import { DEFAULT_LOCALE, type Locale } from "./locales";
import type { Dictionary, PartialDictionary } from "./types";

export type { Dictionary } from "./types";

const CATALOGUES: Record<Locale, PartialDictionary> = {
  en: en as unknown as PartialDictionary,
  ja,
  "zh-Hant-TW": zhHantTW,
  th,
  vi,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge a partial catalogue over English. Objects merge key by key; arrays
 * and strings replace wholesale, so a partially translated list can never come
 * out half English. An empty string is treated as "not translated" and falls
 * back too — that is what keeps the unused `pullQuote` slots from rendering.
 */
function merge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    if (override === undefined || override === "") return base;
    return override as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(base)) {
    if (key in override) {
      out[key] = merge((base as Record<string, unknown>)[key], override[key]);
    }
  }
  return out as T;
}

const cache = new Map<Locale, Dictionary>();

export function getDictionary(locale: Locale): Dictionary {
  const cached = cache.get(locale);
  if (cached) return cached;

  const catalogue = CATALOGUES[locale] ?? CATALOGUES[DEFAULT_LOCALE];
  const dictionary = merge(en as unknown as Dictionary, catalogue);
  cache.set(locale, dictionary);
  return dictionary;
}
