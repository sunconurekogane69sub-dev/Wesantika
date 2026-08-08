import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyBrowser } from "@/components/CaseStudyBrowser";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StickyContactRail } from "@/components/StickyContactRail";
import { getDictionary } from "@/lib/i18n";
import { isLocale, LOCALE_CODES } from "@/lib/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: t.work.metaTitle,
    description: t.work.metaDescription,
    alternates: {
      canonical: `/${locale}/our-work`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/our-work`]),
      ),
    },
  };
}

/**
 * Our Work — Figma has the case-study browser pasted in as seven paginated
 * pages but no page shell, so the hero follows the treatment the four designed
 * pages share: full-bleed image, no wash, ink chosen by measurement.
 * `vision-bg.png` is pale where the type sits, so the type is black — the same
 * ground the About Us vision band uses, which measures 16-19:1 there.
 */
export default async function OurWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <section className="relative h-[460px] sm:h-[560px] xl:h-[620px]">
        <Image
          src="/images/vision-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="canvas relative flex h-full flex-col justify-center px-6 pt-[95px] xl:px-0 xl:pl-[212px]">
          <h1 className="max-w-[760px] text-[36px] leading-[1.15] font-bold text-black sm:text-[48px] xl:text-[64px] xl:leading-[77px]">
            {t.work.heroTitle}
          </h1>
          <p className="mt-[24px] max-w-[700px] text-[18px] leading-[28px] font-normal text-black xl:text-[20px]">
            {t.work.heroBody}
          </p>
        </div>
      </section>

      <CaseStudyBrowser
        copy={{
          searchPlaceholder: t.work.searchPlaceholder,
          searchLabel: t.work.searchLabel,
          all: t.work.all,
          servicesLabel: t.work.servicesLabel,
          industriesLabel: t.work.industriesLabel,
          empty: t.work.empty,
          resultCount: t.work.resultCount,
          pagination: t.work.pagination,
          previous: t.work.previous,
          next: t.work.next,
        }}
      />

      <Footer strings={t.footer} />
    </>
  );
}
