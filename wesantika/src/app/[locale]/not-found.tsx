"use client";

import { DEFAULT_LOCALE, useLocaleStrings } from "@/components/LocaleContext";
import { NotFoundView } from "@/components/NotFoundView";
import type { Dictionary } from "@/lib/i18n/types";

/**
 * `notFound()` thrown from inside the `[locale]` segment.
 *
 * In practice that is one case: an unknown service topic, `/en/services/nope`.
 * Every *other* 404 — a mistyped path, a stale link — matches no route at all
 * and is handled a layer above by `app/global-not-found.tsx`, which can render
 * server-side because it sits outside this segment. See the note there.
 *
 * ---------------------------------------------------------------------------
 * Why this one is a client component
 *
 * A not-found boundary receives no route params, so the locale has to come from
 * somewhere. It used to come from `headers()` — and because the boundary is
 * part of every route's render tree, that single call opted **all 122 pages**
 * out of static rendering. Nobody chose that; it was a side effect of one line,
 * and it cost a CDN-cacheable marketing site its entire cache.
 *
 * The locale now arrives through context, published by the layout, which does
 * get `params.locale`. No request-time API, so the pages stay static.
 * ---------------------------------------------------------------------------
 */

/** Copied verbatim from `notFound` and `nav` in `dictionaries/en.ts`.
 *
 *  A literal rather than `getDictionary(DEFAULT_LOCALE)`: that helper statically
 *  imports all five catalogues, so calling it from a client component would ship
 *  every translation on the site to serve a fallback. Only reached if this
 *  renders above the provider, which means there was no valid locale segment to
 *  be in the reader's language anyway. */
const FLOOR: Pick<Dictionary, "notFound" | "nav"> = {
  notFound: {
    metaTitle: "Page not found",
    title: "This page does not exist",
    body: "The link may be out of date, or the page may have moved. These are the places worth trying.",
    home: "Back to home",
  },
  nav: {
    solution: "Solution",
    about: "About Us",
    work: "Our Work",
    technologies: "Technologies",
    contact: "Contact Us",
    openMenu: "Toggle navigation",
    languageLabel: "Change language",
    comingSoon: "Coming soon",
  },
};

export default function NotFound() {
  const ctx = useLocaleStrings();

  return (
    <NotFoundView
      locale={ctx?.locale ?? DEFAULT_LOCALE}
      nav={ctx?.nav ?? FLOOR.nav}
      copy={ctx?.notFound ?? FLOOR.notFound}
    />
  );
}
