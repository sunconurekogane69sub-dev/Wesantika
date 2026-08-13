"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS, type NavId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./LocaleSwitcher";

/** Fraction of the first viewport that must be scrolled before the bar goes solid. */
const SOLID_AT = 0.3;

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
export function Nav({
  locale,
  nav,
  alwaysSolid = false,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  /**
   * Skip the transparent-over-hero state. Pages without a hero image have
   * nothing behind the bar but the white page, where white type is invisible,
   * so those render solid from the first frame.
   */
  alwaysSolid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (alwaysSolid) return;
    const update = () => setScrolled(window.scrollY >= window.innerHeight * SOLID_AT);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [alwaysSolid]);

  /* Escape closes the compact menu, and any navigation closes it too.
     The `onClick` on each link covered the common case but not a browser back
     or forward, which changes the route without the panel hearing about it and
     left an open menu over the new page. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // An open mobile panel always needs a solid backdrop to stay readable.
  const solid = alwaysSolid || scrolled || open;

  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const label = (id: NavId) => nav[id];

  /**
   * Which nav item the reader is currently inside.
   *
   * The bar had no current state at all: six links, all identical, on every one
   * of six pages. `aria-current="page"` is the part a screen reader announces —
   * without it the nav gives no orientation whatsoever — and the underline is
   * the sighted half of the same information. Colour alone would not do it
   * (WCAG 1.4.1), hence a rule under the label rather than a tint.
   *
   * Prefix rather than equality, so `/en/services/mvp-development` keeps
   * Services marked. Trailing `/` guards the boundary — otherwise `/en/work`
   * would light up for `/en/workshops`.
   */
  const isCurrent = (path: string) => {
    const target = href(path);
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
        solid ? "bg-white" : "bg-transparent"
      }`}
    >
      {/* White 16px type needs 4.5:1, and three of the four heroes are near-white
          where the bar sits. The gradient is held flat at 55% across the bar and
          only fades below it — a gradient that starts fading immediately reached
          just 27% at the text row, which was the actual failure. Measured
          5.1-8.4:1 on every hero by `node scripts/ink-audit.mjs`. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[190px] bg-gradient-to-b from-black/55 via-black/55 to-transparent transition-opacity duration-300 ease-out ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      <nav className="canvas relative flex h-[95px] items-center px-6 xl:pr-[64px] xl:pl-[52px]">
        {/* Two logos crossfade rather than one being filtered white. Both are
            cropped to their artwork, and their aspect ratios match to within
            0.3%, so they sit exactly on top of one another. 109x27 is the size
            the artwork actually occupies inside the design's 130x54 slot. */}
        <Link
          href={href("/")}
          className="relative block h-[27px] w-[109px] shrink-0"
          aria-label="Wesantika"
        >
          <Image
            src="/images/logo-bright.png"
            alt="Wesantika"
            fill
            sizes="109px"
            priority
            className={`object-contain transition-opacity duration-300 ease-out ${
              solid ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/images/logo.png"
            alt=""
            aria-hidden
            fill
            sizes="109px"
            priority
            className={`object-contain transition-opacity duration-300 ease-out ${
              solid ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <ul className="ml-[67px] hidden items-center gap-[73px] xl:flex">
          {NAV_ITEMS.map((item) => {
            const current = isCurrent(item.href);
            return (
              <li key={item.id}>
                {/* Every nav destination now exists, so there is no inert state. */}
                <Link
                  href={href(item.href)}
                  aria-current={current ? "page" : undefined}
                  className={`relative text-[16px] leading-[26px] font-bold whitespace-nowrap transition-colors duration-300 ease-out ${
                    solid ? "text-black hover:text-brand" : "text-white hover:opacity-70"
                  }`}
                >
                  {label(item.id)}
                  {current && (
                    <span
                      aria-hidden
                      className={`absolute -bottom-[7px] left-0 h-[2px] w-full rounded-full ${
                        solid ? "bg-brand" : "bg-white"
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
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
          <Link
            href={href("/contact")}
            className={`flex h-[35px] min-w-[115px] items-center justify-center rounded-pill-nav border bg-brand-cta px-[14px] text-[16px] leading-[26px] font-normal whitespace-nowrap text-white transition-all duration-300 ease-out hover:opacity-90 ${
              solid ? "border-transparent" : "border-white"
            }`}
          >
            {nav.contact}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-compact"
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
        <div
          id="nav-compact"
          className="canvas relative border-t border-black/10 bg-white px-6 pb-4 xl:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.id} className="py-2">
                  <Link
                    href={href(item.href)}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "page" : undefined}
                    // A left rule rather than an underline: in a stacked list an
                    // underline reads as a divider between rows.
                    className={`-ml-[10px] border-l-[3px] pl-[7px] text-[16px] leading-[26px] font-bold ${
                      current
                        ? "border-brand text-brand-ink"
                        : "border-transparent text-black"
                    }`}
                  >
                    {label(item.id)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 border-t border-black/10 pt-3">
            <LocaleSwitcher locale={locale} label={nav.languageLabel} solid />
          </div>
        </div>
      )}
    </header>
  );
}
