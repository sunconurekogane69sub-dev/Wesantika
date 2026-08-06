import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CategoryChip, PageHero } from "@/components/PageHero";
import { StickyContactRail } from "@/components/StickyContactRail";
import { NEWSROOM_ITEMS } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { getDictionary } from "@/lib/i18n";
import { isLocale, LOCALE_CODES } from "@/lib/i18n/locales";

type ArticleCopy = { title: string; excerpt: string; body: string[] };

export function generateStaticParams() {
  return LOCALE_CODES.flatMap((locale) =>
    NEWSROOM_ITEMS.map((item) => ({ locale, slug: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const copy = (t.newsroom.items as Record<string, ArticleCopy>)[slug];
  if (!copy) return {};

  return {
    title: copy.title,
    description: copy.excerpt,
    alternates: {
      canonical: `/${locale}/newsroom/${slug}`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/newsroom/${slug}`]),
      ),
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const item = NEWSROOM_ITEMS.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const t = getDictionary(locale);
  const copy = (t.newsroom.items as Record<string, ArticleCopy>)[slug];
  if (!copy) notFound();

  const categoryLabels = t.newsroom.categories as Record<string, string>;

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <PageHero
        compact
        image={item.image}
        title={copy.title}
        eyebrow={
          <>
            <CategoryChip label={categoryLabels[item.category] ?? item.category} />
            <span className="text-[15px] leading-none text-white/80">
              {formatDate(item.date, locale)}
            </span>
          </>
        }
      />

      <article className="canvas px-6 py-[72px] xl:px-[150px] xl:py-[100px]">
        <div className="max-w-[760px]">
          <p className="text-[20px] leading-[32px] font-medium text-black">
            {copy.excerpt}
          </p>
          <div className="mt-[36px] flex flex-col gap-[24px]">
            {copy.body.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[30px] text-black/80">
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href={`/${locale}/newsroom`}
            className="mt-[56px] inline-flex items-center gap-[8px] text-[16px] leading-none font-bold text-brand hover:underline underline-offset-4"
          >
            <span aria-hidden>←</span>
            {t.newsroom.back}
          </Link>
        </div>
      </article>

      <Footer strings={t.footer} />
    </>
  );
}
