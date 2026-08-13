import Link from "next/link";
import { Nav } from "@/components/Nav";
import { NAV_ITEMS } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The branded 404, shared by the two routes that can produce one.
 *
 * There are two, because Next distinguishes them and this app's shape makes the
 * distinction matter:
 *
 *  - **`app/global-not-found.tsx`** — a URL that matches no route at all. This
 *    is the ordinary case: a typo, a stale link, a bad crawl. Next handles it
 *    at the routing layer, above any layout.
 *  - **`app/[locale]/not-found.tsx`** — `notFound()` thrown from inside a page,
 *    which here means an unknown service topic.
 *
 * Keeping the markup in one place is the point: the two entry points differ
 * only in how they come by a locale.
 *
 * No Footer. `[locale]/not-found.tsx` is a client component (it reads the
 * locale from context to avoid a request-time API — see `LocaleContext.tsx`),
 * and pulling the Footer in behind it would drag the largest block of strings
 * in the dictionary across the client boundary on every page of the site to
 * serve a route nobody should reach. A 404 carrying navigation, an explanation
 * and every destination on the site is not missing anything.
 */
export function NotFoundView({
  locale,
  nav,
  copy,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  copy: Dictionary["notFound"];
}) {
  const destinations = NAV_ITEMS.filter(
    (item): item is typeof item & { href: string } => Boolean(item.href),
  );

  return (
    <>
      <Nav locale={locale} nav={nav} alwaysSolid />

      <main id="main-content" className="canvas px-6 pt-[180px] pb-[140px] xl:px-[212px]">
        <p className="text-[16px] leading-[26px] font-bold tracking-wide text-brand-ink uppercase">
          404
        </p>
        <h1 className="mt-[16px] max-w-[760px] text-[36px] leading-[1.15] font-bold text-black sm:text-[48px] xl:text-[64px] xl:leading-[70px]">
          {copy.title}
        </h1>
        <p className="mt-[24px] max-w-[640px] text-[18px] leading-[28px] text-black/75 xl:text-[20px]">
          {copy.body}
        </p>

        <ul className="mt-[40px] flex flex-wrap gap-[12px]">
          <li>
            <Link
              href={`/${locale}`}
              className="inline-flex h-[46px] items-center rounded-btn bg-brand-btn px-[24px] text-[16px] leading-[26px] font-bold text-white transition-opacity hover:opacity-90"
            >
              {copy.home}
            </Link>
          </li>
          {/* No filter for the home link: NAV_ITEMS no longer contains one, and
              the "back to home" button above already covers it. */}
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
