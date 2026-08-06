import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleIndex, type ArticleEntry } from "@/components/ArticleIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { StickyContactRail } from "@/components/StickyContactRail";
import { NEWS_CATEGORIES, NEWSROOM_ITEMS } from "@/lib/content";
import { formatDate } from "@/lib/date";
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
    title: t.newsroom.metaTitle,
    description: t.newsroom.metaDescription,
    alternates: {
      canonical: `/${locale}/newsroom`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/newsroom`]),
      ),
    },
  };
}

/** Newsroom index. No Figma artboard — designed against the existing system. */
export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const copy = t.newsroom.items as Record<string, { title: string; excerpt: string }>;
  const categoryLabels = t.newsroom.categories as Record<string, string>;

  const entries: ArticleEntry[] = NEWSROOM_ITEMS.map((item) => ({
    slug: item.slug,
    href: `/${locale}/newsroom/${item.slug}`,
    image: item.image,
    category: item.category,
    categoryLabel: categoryLabels[item.category] ?? item.category,
    dateLabel: formatDate(item.date, locale),
    title: copy[item.slug]?.title ?? item.slug,
    excerpt: copy[item.slug]?.excerpt ?? "",
  }));

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <PageHero
        image="/images/svc-global.png"
        title={t.newsroom.heroTitle}
        body={t.newsroom.heroBody}
      />

      <ArticleIndex
        entries={entries}
        categories={NEWS_CATEGORIES.map((id) => ({ id, label: categoryLabels[id] ?? id }))}
        allLabel={t.newsroom.allCategories}
        featuredLabel={t.newsroom.featuredLabel}
        readMore={t.newsroom.readMore}
        emptyLabel={t.newsroom.empty}
        variant="list"
      />

      <Footer strings={t.footer} />
    </>
  );
}
