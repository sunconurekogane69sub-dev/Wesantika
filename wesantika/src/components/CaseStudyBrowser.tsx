"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CASE_STUDIES,
  WORK_INDUSTRIES,
  WORK_PAGE_SIZE,
  WORK_SERVICES,
  type CaseStudy,
} from "@/lib/our-work";

export type BrowserCopy = {
  searchPlaceholder: string;
  searchLabel: string;
  all: string;
  servicesLabel: string;
  industriesLabel: string;
  empty: string;
  resultCount: string;
  pagination: string;
  previous: string;
  next: string;
};

/**
 * Our Work browser — Figma 554:855 and the six sibling pages.
 *
 * Search, two filter bands, a three-column grid and pagination at 12 per page,
 * which is what the "1 2 3 … 7" control in the artboard describes.
 *
 * Chips are derived from the data: a category with no case studies behind it is
 * never rendered, so no filter can dead-end. That is why the industry band is
 * currently absent — the artboard defines fourteen industries but none of the
 * 83 cards carry an industry tag. Populate `industries` in
 * `src/lib/our-work.ts` and the band appears on its own.
 */
export function CaseStudyBrowser({ copy }: { copy: BrowserCopy }) {
  const [query, setQuery] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Which chips have anything behind them.
  const { liveServices, liveIndustries } = useMemo(() => {
    const s = new Set<string>();
    const i = new Set<string>();
    for (const c of CASE_STUDIES) {
      c.tags.forEach((t) => s.add(t));
      c.industries.forEach((t) => i.add(t));
    }
    return {
      liveServices: WORK_SERVICES.filter((t) => s.has(t)),
      liveIndustries: WORK_INDUSTRIES.filter((t) => i.has(t)),
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CASE_STUDIES.filter((c) => {
      if (service && !c.tags.includes(service)) return false;
      if (industry && !c.industries.includes(industry)) return false;
      // Search covers the description too, not only the title. With 70 cards,
      // most of what a visitor would search for — "warehouse", "wallet",
      // "migration", "valuation" — is in the prose rather than the name.
      if (q && !`${c.title} ${c.description}`.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [query, service, industry]);

  const pageCount = Math.max(1, Math.ceil(results.length / WORK_PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const shown = results.slice((current - 1) * WORK_PAGE_SIZE, current * WORK_PAGE_SIZE);

  const reset = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="canvas px-6 py-[70px] xl:px-[150px] xl:py-[90px]">
      {/* ---- search ------------------------------------------------- */}
      <label className="sr-only" htmlFor="work-search">
        {copy.searchLabel}
      </label>
      <input
        id="work-search"
        type="search"
        value={query}
        onChange={(e) => reset(setQuery)(e.target.value)}
        placeholder={copy.searchPlaceholder}
        className="h-[52px] w-full max-w-[560px] rounded-full border border-hairline bg-white px-[24px] text-[16px] leading-[26px] text-black outline-none transition-colors placeholder:text-black/45 focus:border-brand"
      />

      {/* ---- filters ------------------------------------------------ */}
      <FilterBand
        label={copy.servicesLabel}
        all={copy.all}
        options={liveServices}
        active={service}
        onChange={reset(setService)}
      />
      {liveIndustries.length > 0 && (
        <FilterBand
          label={copy.industriesLabel}
          all={copy.all}
          options={liveIndustries}
          active={industry}
          onChange={reset(setIndustry)}
        />
      )}

      <p className="mt-[28px] text-[15px] leading-none text-black/55">
        {copy.resultCount.replace("{count}", String(results.length))}
      </p>

      {/* ---- grid --------------------------------------------------- */}
      {shown.length === 0 ? (
        <p className="mt-[48px] text-[20px] leading-[28px] text-black/60">{copy.empty}</p>
      ) : (
        <div className="mt-[28px] grid gap-x-[31px] gap-y-[40px] sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((c) => (
            <Card key={c.id} study={c} />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <Pagination
          page={current}
          pageCount={pageCount}
          onChange={setPage}
          copy={copy}
        />
      )}
    </div>
  );
}

function FilterBand({
  label,
  all,
  options,
  active,
  onChange,
}: {
  label: string;
  all: string;
  options: readonly string[];
  active: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="mt-[28px]">
      <p className="sr-only">{label}</p>
      <div className="flex flex-wrap gap-[10px]">
        <Chip label={all} active={active === null} onClick={() => onChange(null)} />
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            active={active === option}
            onClick={() => onChange(active === option ? null : option)}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
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
      className={`h-[36px] cursor-pointer rounded-full px-[16px] text-[14px] leading-none font-semibold transition-colors ${
        active
          ? "bg-brand-btn text-white"
          : "bg-[#e5e7ef] text-[#565c69] hover:bg-[#d8dbe6] hover:text-black"
      }`}
    >
      {label}
    </button>
  );
}

function Card({ study }: { study: CaseStudy }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[16px] border border-hairline bg-white transition-shadow hover:shadow-[0_14px_32px_rgb(0_0_0/0.12)]">
      <div className="relative aspect-[407/220] w-full bg-[#f6f7fc]">
        <Image
          src={study.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 409px"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-[17px]">
        <div className="flex flex-wrap gap-[8px]">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-[27px] items-center rounded-full bg-[#e5e7ef] px-[12px] text-[12px] leading-none text-[#565c69]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-[12px] text-[16px] leading-[24px] font-semibold text-[#101624]">
          {study.title}
        </h3>
        {/* The card was a title and nothing else — 70 of them, which read as a
            list rather than a body of work. The description is what makes the
            grid worth scanning. It is written from the title and the tags, so it
            never claims more than the card already carried. */}
        <p className="mt-[10px] text-[14px] leading-[23px] font-normal text-[#4a5163]">
          {study.description}
        </p>
      </div>
    </article>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
  copy,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
  copy: BrowserCopy;
}) {
  // 1 … n-1 n n+1 … last
  const pages: (number | "gap")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "gap") pages.push("gap");
  }

  return (
    <nav
      aria-label={copy.pagination}
      className="mt-[48px] flex flex-wrap items-center justify-center gap-[8px]"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="h-[40px] cursor-pointer rounded-full px-[16px] text-[14px] leading-none font-semibold text-black transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
      >
        {copy.previous}
      </button>
      {pages.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="px-[4px] text-black/45">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`h-[40px] min-w-[40px] cursor-pointer rounded-full text-[14px] leading-none font-semibold transition-colors ${
              p === page ? "bg-brand-btn text-white" : "text-black hover:bg-black/[0.06]"
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="h-[40px] cursor-pointer rounded-full px-[16px] text-[14px] leading-none font-semibold text-black transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
      >
        {copy.next}
      </button>
    </nav>
  );
}
