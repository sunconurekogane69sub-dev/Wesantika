"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { NAV_ITEMS } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The branded runtime-error page.
 *
 * The site had a considered 404 in five languages and **nothing at all** for a
 * render that throws — that case fell through to Next's built-in error card:
 * unstyled, unbranded, English only, and on a production build reduced to the
 * words "Application error: a client-side exception has occurred". A visitor
 * who hits it has no way back to the site and no idea whose site it was.
 *
 * Deliberately shaped like `NotFoundView`, because to the reader the two are
 * the same event — the page they wanted is not there — and the difference
 * between "no such page" and "this page broke" is ours, not theirs. What
 * differs is the one thing that is actually different: a 404 cannot be retried
 * and this can, so `reset()` leads.
 *
 * `reset()` re-renders the boundary's subtree without a full navigation, which
 * is the right first move for the failure this most often is: one chunk that
 * did not arrive, or an API that was briefly unreachable. If it throws again
 * the boundary simply catches it again, and the destinations below are the way
 * out.
 */
export function ErrorView({
  locale,
  nav,
  copy,
  reset,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  copy: Dictionary["error"];
  /** Absent on the global boundary, where there is no subtree left to retry. */
  reset?: () => void;
}) {
  const destinations = NAV_ITEMS.filter(
    (item): item is typeof item & { href: string } => Boolean(item.href),
  );

  return (
    <>
      <Nav locale={locale} nav={nav} alwaysSolid />

      <main id="main-content" className="canvas gutter pt-[180px] pb-[140px]">
        <p className="text-[16px] leading-[26px] font-bold tracking-wide text-brand-ink uppercase">
          {/* Not a status code: a render that throws inside an already-delivered
              page is not an HTTP status, and printing "500" would be a claim
              about the response that is usually false. */}
          Error
        </p>
        <h1 className="display-2 mt-4 max-w-[20ch] text-black">
          {copy.title}
        </h1>
        <p className="mt-[24px] max-w-[640px] text-[18px] leading-[28px] text-black/75 xl:text-[20px]">
          {copy.body}
        </p>

        <ul className="mt-[40px] flex flex-wrap gap-[12px]">
          {reset && (
            <li>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-[46px] cursor-pointer items-center rounded-btn bg-brand-btn px-[24px] text-[16px] leading-[26px] font-bold text-white transition-opacity hover:opacity-90"
              >
                {copy.retry}
              </button>
            </li>
          )}
          {destinations.map((item) => (
            <li key={item.id}>
              <Link
                href={`/${locale}${item.href}`}
                className="inline-flex h-[46px] items-center rounded-btn border border-hairline bg-white px-[24px] text-[16px] leading-[26px] font-bold text-black transition-colors hover:border-brand hover:text-brand"
              >
                {nav[item.id]}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
