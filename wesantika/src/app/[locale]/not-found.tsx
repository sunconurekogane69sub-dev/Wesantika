import Link from "next/link";
import { headers } from "next/headers";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NAV_ITEMS } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/locales";

/**
 * Next's default 404 is an unstyled black-on-white error card with no nav — a
 * dead end on a site whose pages all live behind a locale segment, where a typo
 * in the segment is the most likely way to arrive here.
 *
 * `not-found.tsx` cannot read route params, so the locale comes from the
 * `x-locale` header that `src/proxy.ts` sets on every locale-prefixed request.
 */
export default async function NotFound() {
  const header = (await headers()).get("x-locale");
  const locale: Locale = header && isLocale(header) ? header : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  const destinations = NAV_ITEMS.filter(
    (item): item is typeof item & { href: string } => Boolean(item.href),
  );

  return (
    <>
      <Nav locale={locale} nav={t.nav} alwaysSolid />

      <main id="main-content" className="canvas px-6 pt-[180px] pb-[120px] xl:px-[212px]">
        <p className="text-[16px] leading-[26px] font-bold tracking-wide text-brand-ink uppercase">
          404
        </p>
        <h1 className="mt-[16px] max-w-[760px] text-[36px] leading-[1.15] font-bold text-black sm:text-[48px] xl:text-[64px] xl:leading-[70px]">
          {t.notFound.title}
        </h1>
        <p className="mt-[24px] max-w-[640px] text-[18px] leading-[28px] text-black/75 xl:text-[20px]">
          {t.notFound.body}
        </p>

        <ul className="mt-[40px] flex flex-wrap gap-[12px]">
          <li>
            <Link
              href={`/${locale}`}
              className="inline-flex h-[46px] items-center rounded-btn bg-brand-btn px-[24px] text-[16px] leading-[26px] font-bold text-white transition-opacity hover:opacity-90"
            >
              {t.notFound.home}
            </Link>
          </li>
          {/* No filter for the home link any more: NAV_ITEMS no longer contains
              one, and the "back to home" button above already covers it. */}
          {destinations.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="inline-flex h-[46px] items-center rounded-btn border border-hairline bg-white px-[24px] text-[16px] leading-[26px] font-bold text-black transition-colors hover:border-brand hover:text-brand"
                >
                  {t.nav[item.id]}
                </Link>
              </li>
            ))}
        </ul>
      </main>

      <Footer
        strings={t.footer}
        office={t.contact.office}
        nav={t.nav}
        serviceNames={t.servicesPage.offer.cards}
        locale={locale}
      />
    </>
  );
}
