import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyBrowser } from "@/components/CaseStudyBrowser";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { StickyContactRail } from "@/components/StickyContactRail";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/locales";
import { socialMetadata } from "@/lib/metadata";

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
    ...socialMetadata(locale, "/our-work"),
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

      <main id="main-content">

      <PageHero
        image="/images/work-hero.png"
        // The artwork's middle band is a dark code editor: black copy measures
        // 1.4:1 from 15% down, and 10.5:1 cropped from the top.
        objectPosition="50% 0%"
        title={t.work.heroTitle}
        body={t.work.heroBody}
      />

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

      </main>

      <Footer strings={t.footer} />
    </>
  );
}
