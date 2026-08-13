"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

/**
 * The active locale and the handful of strings `not-found.tsx` needs, published
 * by `[locale]/layout.tsx`.
 *
 * ---------------------------------------------------------------------------
 * This exists to make the whole site static.
 *
 * `not-found.tsx` used to read the locale from an `x-locale` header that
 * `proxy.ts` sets, because a not-found boundary receives no route params. That
 * one `headers()` call opted **every page under `[locale]` out of static
 * rendering** — the boundary is part of every route's render tree, so a dynamic
 * API anywhere in it makes all 122 pages render on demand. Nobody chose that;
 * it was a side effect of one line, and it cost a CDN-cacheable marketing site
 * its entire cache.
 *
 * The layout, unlike the boundary, *does* get `params.locale`. Publishing it
 * from there gives the 404 the right locale with no request-time API, so the
 * pages go back to being files.
 *
 * Only `nav` and `notFound` travel. `nav` was already crossing the client
 * boundary for `<Nav>`, so the marginal cost is `notFound` — three strings, on
 * the order of a couple of hundred bytes a page. The Footer's strings are not
 * here on purpose: they are the largest block in the dictionary (seventeen
 * service names among them) and putting them in context would push all of that
 * into every page's payload to serve one route that is meant never to be seen.
 * ---------------------------------------------------------------------------
 */
export type LocaleContextValue = {
  locale: Locale;
  nav: Dictionary["nav"];
  notFound: Dictionary["notFound"];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  value,
  children,
}: {
  value: LocaleContextValue;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/**
 * Never throws. A not-found boundary can render above this provider — Next's
 * *root* 404, for a path with no locale segment at all, is one such case — and a
 * 404 page that crashes because it could not find its own strings is a worse
 * failure than a 404 page in English.
 */
export function useLocaleStrings(): LocaleContextValue | null {
  return useContext(LocaleContext);
}

export { DEFAULT_LOCALE };
