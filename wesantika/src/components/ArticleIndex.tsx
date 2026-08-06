"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CategoryChip } from "./PageHero";

export type ArticleEntry = {
  slug: string;
  href: string;
  image: string;
  category: string;
  categoryLabel: string;
  /** already formatted on the server, so no Intl runs on the client */
  dateLabel: string;
  title: string;
  excerpt: string;
  /** e.g. "6 min read" — blog only */
  metaLabel?: string;
};

/**
 * Listing for Newsroom and Blog.
 *
 * `variant` picks the reading pattern: announcements read better as a dated
 * list, articles as a card grid. The featured entry and the category filter are
 * shared. Filtering is client state rather than a URL param — with this many
 * entries a shareable filtered URL is not worth the extra navigation.
 */
export function ArticleIndex({
  entries,
  categories,
  allLabel,
  featuredLabel,
  readMore,
  emptyLabel,
  variant,
}: {
  entries: ArticleEntry[];
  categories: { id: string; label: string }[];
  allLabel: string;
  featuredLabel: string;
  readMore: string;
  emptyLabel: string;
  variant: "list" | "grid";
}) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? entries.filter((e) => e.category === active) : entries;
  const [featured, ...rest] = filtered;

  return (
    <div className="canvas px-6 py-[80px] xl:px-[150px] xl:py-[110px]">
      {/* ---- filter ------------------------------------------------- */}
      <div className="flex flex-wrap gap-[12px]">
        <FilterChip
          label={allLabel}
          active={active === null}
          onClick={() => setActive(null)}
        />
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.label}
            active={active === category.id}
            onClick={() => setActive(category.id)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-[60px] text-[20px] leading-[28px] text-black/60">{emptyLabel}</p>
      ) : (
        <>
          <FeaturedCard entry={featured} label={featuredLabel} readMore={readMore} />

          {rest.length > 0 &&
            (variant === "grid" ? (
              <div className="mt-[56px] grid gap-x-[32px] gap-y-[48px] sm:grid-cols-2 xl:grid-cols-3">
                {rest.map((entry) => (
                  <GridCard key={entry.slug} entry={entry} />
                ))}
              </div>
            ) : (
              <ul className="mt-[56px] border-t border-hairline/40">
                {rest.map((entry) => (
                  <ListRow key={entry.slug} entry={entry} />
                ))}
              </ul>
            ))}
        </>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-[40px] cursor-pointer rounded-full px-[20px] text-[15px] leading-none font-bold transition-colors ${
        active
          ? "bg-brand text-white"
          : "border border-hairline bg-white text-black hover:border-brand hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}

function FeaturedCard({
  entry,
  label,
  readMore,
}: {
  entry: ArticleEntry;
  label: string;
  readMore: string;
}) {
  return (
    <Link
      href={entry.href}
      className="group mt-[40px] flex flex-col overflow-hidden rounded-[16px] border-[3px] border-brand bg-white transition-shadow hover:shadow-[0_18px_44px_rgb(15_132_253/0.18)] xl:flex-row"
    >
      <div className="relative h-[240px] w-full sm:h-[320px] xl:h-auto xl:w-[560px] xl:shrink-0 xl:self-stretch">
        <Image
          src={entry.image}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 560px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-[32px] xl:p-[48px]">
        <div className="flex flex-wrap items-center gap-[12px]">
          <span className="text-[13px] leading-none font-bold tracking-wide text-brand uppercase">
            {label}
          </span>
          <CategoryChip label={entry.categoryLabel} tone="dark" />
          <span className="text-[15px] leading-none text-black/55">{entry.dateLabel}</span>
        </div>
        <h2 className="mt-[20px] text-[28px] leading-[1.25] font-bold text-black transition-colors group-hover:text-brand xl:text-[36px] xl:leading-[44px]">
          {entry.title}
        </h2>
        <p className="mt-[16px] max-w-[640px] text-[16px] leading-[26px] text-black/75">
          {entry.excerpt}
        </p>
        <span className="mt-[24px] inline-flex items-center gap-[8px] text-[16px] leading-none font-bold text-brand">
          {readMore}
          <span aria-hidden className="transition-transform group-hover:translate-x-[4px]">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function GridCard({ entry }: { entry: ArticleEntry }) {
  return (
    <Link
      href={entry.href}
      className="group flex flex-col overflow-hidden rounded-[16px] border border-hairline bg-white transition-shadow hover:shadow-[0_14px_32px_rgb(0_0_0/0.12)]"
    >
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={entry.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-[24px]">
        <div className="flex flex-wrap items-center gap-[10px]">
          <CategoryChip label={entry.categoryLabel} tone="dark" />
          <span className="text-[14px] leading-none text-black/55">{entry.dateLabel}</span>
        </div>
        <h3 className="mt-[16px] text-[20px] leading-[27px] font-bold text-black transition-colors group-hover:text-brand">
          {entry.title}
        </h3>
        <p className="mt-[12px] flex-1 text-[15px] leading-[24px] text-black/70">
          {entry.excerpt}
        </p>
        {entry.metaLabel && (
          <span className="mt-[18px] text-[14px] leading-none font-medium text-black/50">
            {entry.metaLabel}
          </span>
        )}
      </div>
    </Link>
  );
}

function ListRow({ entry }: { entry: ArticleEntry }) {
  return (
    <li className="border-b border-hairline/40">
      <Link
        href={entry.href}
        className="group flex flex-col gap-[12px] py-[32px] xl:flex-row xl:items-baseline xl:gap-[40px]"
      >
        <div className="flex shrink-0 flex-wrap items-center gap-[12px] xl:w-[300px]">
          <span className="text-[15px] leading-none text-black/55">{entry.dateLabel}</span>
          <CategoryChip label={entry.categoryLabel} tone="dark" />
        </div>
        <div className="flex-1">
          <h3 className="text-[22px] leading-[30px] font-bold text-black transition-colors group-hover:text-brand xl:text-[24px]">
            {entry.title}
          </h3>
          <p className="mt-[10px] max-w-[820px] text-[16px] leading-[26px] text-black/70">
            {entry.excerpt}
          </p>
        </div>
      </Link>
    </li>
  );
}
