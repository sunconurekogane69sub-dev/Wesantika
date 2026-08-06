"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS, type NavId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";

/** Fraction of the first viewport that must be scrolled before the bar goes solid. */
const SOLID_AT = 0.3;

/** White knockout for the logo and the dark Material icons. */
const KNOCKOUT = "[filter:brightness(0)_invert(1)]";

/**
 * Nav bar — Figma 180:579 / 210:956.
 *
 * The design draws it as an opaque white 95px bar. It now starts transparent
 * over the hero with white type and crosses over to the drawn white/black
 * treatment once 30% of the first viewport has scrolled past. That only makes
 * sense if the bar stays put, so it is `fixed` rather than the non-sticky bar
 * the file describes.
 *
 * Gaps between the six items are uneven in Figma (67/75/75/87/62px). The even
 * 73px used here preserves the overall footprint while removing the drift.
 *
 * The compact menu below 1280px is not in the design — there are no mobile
 * artboards — but without it small viewports would have no navigation at all.
 */
export function Nav({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY >= window.innerHeight * SOLID_AT);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // An open mobile panel always needs a solid backdrop to stay readable.
  const solid = scrolled || open;

  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const label = (id: NavId) => nav[id];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
        solid ? "bg-white" : "bg-transparent"
      }`}
    >
      {/* Not in the design, but a genuinely transparent bar puts white 16px type
          over the hero at roughly 3:1 — below AA. This scrim keeps the image
          visible through the bar while carrying the type to ~6:1, and fades out
          as the solid state takes over. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-300 ease-out ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      <nav className="canvas relative flex h-[95px] items-center px-6 xl:pr-[64px] xl:pl-[52px]">
        <Link href={href("/")} className="shrink-0" aria-label="Wesantika">
          <Image
            src="/images/logo.png"
            alt="Wesantika"
            width={130}
            height={54}
            priority
            className={`h-[54px] w-[130px] object-contain transition-[filter] duration-300 ease-out ${
              solid ? "" : KNOCKOUT
            }`}
          />
        </Link>

        <ul className="ml-[67px] hidden items-center gap-[73px] xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <Link
                  href={href(item.href)}
                  className={`text-[16px] leading-[19px] font-bold whitespace-nowrap transition-colors duration-300 ease-out ${
                    solid ? "text-black hover:text-brand" : "text-white hover:opacity-70"
                  }`}
                >
                  {label(item.id)}
                </Link>
              ) : (
                // Page not designed yet — rendered identically, but inert
                // rather than a link that goes nowhere.
                <span
                  className={`cursor-default text-[16px] leading-[19px] font-bold whitespace-nowrap transition-colors duration-300 ease-out ${
                    solid ? "text-black" : "text-white"
                  }`}
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
            solid={solid}
            className="hidden xl:block"
          />
          {/* The cyan pill sits on a blue hero in the transparent state, so it
              gains a white edge there. The border is always present and merely
              turns transparent when solid, keeping the geometry stable. */}
          <a
            href="#contact"
            className={`flex h-[35px] min-w-[115px] items-center justify-center rounded-pill-nav border bg-brand-cta px-[14px] text-[16px] leading-[19px] font-normal whitespace-nowrap text-white transition-all duration-300 ease-out hover:opacity-90 ${
              solid ? "border-transparent" : "border-white"
            }`}
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
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-[2px] w-5 transition-colors duration-300 ease-out ${
                  solid ? "bg-black" : "bg-white"
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {open && (
        <div className="canvas relative border-t border-black/10 bg-white px-6 pb-4 xl:hidden">
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
            <LocaleSwitcher locale={locale} label={nav.languageLabel} solid />
          </div>
        </div>
      )}
    </header>
  );
}
