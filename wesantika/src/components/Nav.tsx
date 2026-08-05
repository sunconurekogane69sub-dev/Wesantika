"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS, type NavId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * Nav bar — Figma 180:579 / 210:956.
 * 95px white bar sitting on top of the hero image (the hero's top 95px is
 * covered by it, exactly as in the source file).
 *
 * Gaps between the six items are uneven in Figma (67/75/75/87/62px). The even
 * 73px used here preserves the overall footprint while removing the drift.
 *
 * The compact menu below 1280px is not in the design — there are no mobile
 * artboards — but without it small viewports would have no navigation at all.
 */
export function Nav({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);

  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const label = (id: NavId) => nav[id];

  return (
    <header className="absolute inset-x-0 top-0 z-30 bg-white">
      <nav className="canvas flex h-[95px] items-center px-6 xl:pr-[64px] xl:pl-[52px]">
        <Link href={href("/")} className="shrink-0" aria-label="Wesantika">
          <Image
            src="/images/logo.png"
            alt="Wesantika"
            width={130}
            height={54}
            priority
            className="h-[54px] w-[130px] object-contain"
          />
        </Link>

        <ul className="ml-[67px] hidden items-center gap-[73px] xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <Link
                  href={href(item.href)}
                  className="text-[16px] leading-[19px] font-bold whitespace-nowrap text-black transition-colors hover:text-brand"
                >
                  {label(item.id)}
                </Link>
              ) : (
                // Page not designed yet — rendered identically, but inert
                // rather than a link that goes nowhere.
                <span
                  className="cursor-default text-[16px] leading-[19px] font-bold whitespace-nowrap text-black"
                  title={nav.comingSoon}
                >
                  {label(item.id)}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-4 xl:gap-[42px]">
          <LocaleSwitcher
            locale={locale}
            label={nav.languageLabel}
            className="hidden xl:block"
          />
          <a
            href="#contact"
            className="flex h-[35px] min-w-[115px] items-center justify-center rounded-pill-nav bg-brand-cta px-[14px] text-[16px] leading-[19px] font-normal whitespace-nowrap text-white transition-opacity hover:opacity-90"
          >
            {nav.contact}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={nav.openMenu}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] xl:hidden"
          >
            <span className="block h-[2px] w-5 bg-black" />
            <span className="block h-[2px] w-5 bg-black" />
            <span className="block h-[2px] w-5 bg-black" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="canvas border-t border-black/10 px-6 pb-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="py-2">
                {item.href ? (
                  <Link
                    href={href(item.href)}
                    onClick={() => setOpen(false)}
                    className="text-[16px] leading-[19px] font-bold text-black"
                  >
                    {label(item.id)}
                  </Link>
                ) : (
                  <span className="text-[16px] leading-[19px] font-bold text-black/40">
                    {label(item.id)}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-black/10 pt-3">
            <LocaleSwitcher locale={locale} label={nav.languageLabel} />
          </div>
        </div>
      )}
    </header>
  );
}
