import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Emphasis } from "@/components/Emphasis";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StickyContactRail } from "@/components/StickyContactRail";
import { SERVICE_DETAIL_TOPICS, type ServiceDetailId } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale, LOCALE_CODES } from "@/lib/i18n/locales";
import { socialMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return LOCALE_CODES.flatMap((locale) =>
    SERVICE_DETAIL_TOPICS.map((topic) => ({ locale, topic: topic.slug })),
  );
}

const resolve = (slug: string): ServiceDetailId | undefined =>
  SERVICE_DETAIL_TOPICS.find((topic) => topic.slug === slug)?.id;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const id = resolve(topic);
  if (!isLocale(locale) || !id) return {};
  const d = getDictionary(locale).serviceDetails[id];

  return {
    title: d.metaTitle,
    description: d.metaDescription,
    ...socialMetadata(locale, `/services/${topic}`),
  };
}

/**
 * Long-form service write-up — Figma 586:813 (AI) and 586:1081 (Custom).
 *
 * **No hero.** This is what the "DETAIL →" buttons open, and the brief is that
 * the hero must not follow the reader in; the page opens on the heading. That
 * leaves nothing behind the nav bar but white page, so it renders solid rather
 * than in its transparent-over-hero state.
 *
 * The file paints card titles blue on some cards and near-black on others with
 * no pattern to it — 12 of 14 blue on the Custom page, 1 of 7 on the AI page.
 * They are normalised to near-black here: the heading and the CTA already carry
 * the brand colour, and 21 blue headings over grey body copy is a wash.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  const id = resolve(topic);
  if (!isLocale(locale) || !id) notFound();
  const t = getDictionary(locale);
  const d = t.serviceDetails[id];

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} alwaysSolid />

      {/* The id is what the skip link targets. This page had the landmark but
          not the id, so "Skip to content" did nothing on all 85 of these. */}
      <main id="main-content" className="canvas px-6 pt-[95px] xl:px-0">
        <div className="mx-auto max-w-[1140px] pt-[56px] xl:pt-[88px]">
          <Link
            href={`/${locale}/services`}
            className="text-[16px] leading-[26px] font-bold text-brand-ink underline-offset-4 hover:underline"
          >
            <span aria-hidden>← </span>
            {d.eyebrow}
          </Link>

          <h1 className="mt-[20px] max-w-[750px] text-[30px] leading-[1.2] font-semibold text-black sm:text-[36px] xl:text-[40px] xl:leading-[46px]">
            {d.title}
          </h1>

          {d.intro.map((paragraph, index) => (
            <p
              key={index}
              className="mt-[24px] max-w-[750px] text-[16px] leading-[26px] font-normal text-black/85 xl:text-[18px] xl:leading-[28px]"
            >
              <Emphasis text={paragraph} className="font-normal text-brand-ink" />
            </p>
          ))}

          {/* 364px columns with a 24px gutter — 586:815 / 586:1083 */}
          <div className="mt-[48px] grid gap-[24px] sm:grid-cols-2 xl:mt-[64px] xl:grid-cols-3">
            {d.cards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-[8px] border border-hairline bg-white px-[26px] py-[28px]"
              >
                <h2 className="text-[18px] leading-[28px] font-semibold text-[#212529]">
                  {card.title}
                </h2>
                <p className="mt-[16px] text-[16px] leading-[24px] font-normal text-[#525252]">
                  <Emphasis text={card.body} className="font-bold" />
                </p>
              </article>
            ))}
          </div>

          <div className="mt-[56px] mb-[80px] flex justify-center xl:mt-[72px] xl:mb-[120px]">
            {/* Same reasoning as the DETAIL button: 18px white on #0f84fd is
                3.66:1, so the label is bold to qualify as large text. */}
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-[48px] items-center justify-center rounded-[8px] bg-brand-btn px-[24px] text-[18px] leading-[28px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
              {d.cta}
            </Link>
          </div>
        </div>
      </main>

      <Footer strings={t.footer} office={t.contact.office} locale={locale} />
    </>
  );
}
