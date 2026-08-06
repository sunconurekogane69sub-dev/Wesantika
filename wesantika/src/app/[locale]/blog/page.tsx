import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleIndex, type ArticleEntry } from "@/components/ArticleIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { StickyContactRail } from "@/components/StickyContactRail";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/content";
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
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/blog`]),
      ),
    },
  };
}

/** Blog index. No Figma artboard — designed against the existing system. */
export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const copy = t.blog.items as Record<string, { title: string; excerpt: string }>;
  const categoryLabels = t.blog.categories as Record<string, string>;

  const entries: ArticleEntry[] = BLOG_POSTS.map((post) => ({
    slug: post.slug,
    href: `/${locale}/blog/${post.slug}`,
    image: post.image,
    category: post.category,
    categoryLabel: categoryLabels[post.category] ?? post.category,
    dateLabel: formatDate(post.date, locale),
    title: copy[post.slug]?.title ?? post.slug,
    excerpt: copy[post.slug]?.excerpt ?? "",
    metaLabel: post.readMinutes
      ? t.blog.readTime.replace("{minutes}", String(post.readMinutes))
      : undefined,
  }));

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <PageHero
        image="/images/ai-panel.png"
        title={t.blog.heroTitle}
        body={t.blog.heroBody}
      />

      <ArticleIndex
        entries={entries}
        categories={BLOG_CATEGORIES.map((id) => ({ id, label: categoryLabels[id] ?? id }))}
        allLabel={t.blog.allCategories}
        featuredLabel={t.blog.featuredLabel}
        readMore={t.blog.readMore}
        emptyLabel={t.blog.empty}
        variant="grid"
      />

      <Footer strings={t.footer} />
    </>
  );
}
