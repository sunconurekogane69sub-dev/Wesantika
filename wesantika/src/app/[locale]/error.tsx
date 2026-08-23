"use client";

import { useEffect } from "react";
import { DEFAULT_LOCALE, useLocaleStrings } from "@/components/LocaleContext";
import { ErrorView } from "@/components/ErrorView";
import type { Dictionary } from "@/lib/i18n/types";

/**
 * Anything that throws while rendering a page under `[locale]`.
 *
 * Without this file that case reached Next's built-in error card — unbranded,
 * English, and on a production build stripped to "Application error: a
 * client-side exception has occurred". The site had a considered 404 in five
 * languages and no equivalent for the failure a visitor is more likely to be
 * annoyed by.
 *
 * Client component for the same reason `not-found.tsx` is one, and it is worth
 * repeating because getting it wrong is expensive: an error boundary receives
 * no route params, so the locale has to come from somewhere, and taking it from
 * `headers()` would opt **all 122 pages** out of static rendering — the
 * boundary sits in every route's tree. It comes from context, published by the
 * layout, which does get `params.locale`.
 *
 * A boundary here does not catch a throw in `[locale]/layout.tsx` itself; that
 * is what `app/global-error.tsx` is for.
 */

/** Same floor idea as `not-found.tsx`: a literal, not `getDictionary()`, which
 *  statically imports all five catalogues and would ship every translation on
 *  the site into this bundle. Only reached above the provider. */
const FLOOR: Pick<Dictionary, "error" | "nav"> = {
  error: {
    title: "Something went wrong",
    body: "This page failed to load. That is usually temporary — try again, or head somewhere else on the site.",
    retry: "Try again",
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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const ctx = useLocaleStrings();

  useEffect(() => {
    /*
      The only record there is.

      A production build replaces the message with an opaque `digest`, so this
      is what ties what the visitor saw to the entry in the server log. Logging
      it is not optional noise — without it a client-side crash is invisible to
      everyone except the person it happened to.
    */
    console.error("[error boundary]", error.digest ?? error.message, error);
  }, [error]);

  return (
    <ErrorView
      locale={ctx?.locale ?? DEFAULT_LOCALE}
      nav={ctx?.nav ?? FLOOR.nav}
      copy={ctx?.error ?? FLOOR.error}
      reset={reset}
    />
  );
}
