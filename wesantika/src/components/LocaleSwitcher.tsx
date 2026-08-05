"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getLocaleDefinition,
  LOCALES,
  localizePath,
  type Locale,
} from "@/lib/i18n/locales";
import { Icon } from "./Icon";

/**
 * Replaces the design's static "EN" display (Figma 180:591) with a working
 * control. The chevron there implied a menu that was never designed, so this is
 * built to match the nav's type and hairline rather than invent a new style.
 *
 * Each entry links to the same page under a different locale prefix, so the
 * choice survives as a real URL and is crawlable.
 */
export function LocaleSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapper = useRef<HTMLDivElement>(null);
  const current = getLocaleDefinition(locale);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (wrapper.current && !wrapper.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapper} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        className="flex h-[26px] cursor-pointer items-center gap-[7px]"
      >
        <Icon src="/icons/icon-language.svg" width={24} height={24} />
        <span className="text-[16px] leading-[19px] font-bold whitespace-nowrap text-black">
          {current.short}
        </span>
        <Icon
          src="/icons/icon-chevron.svg"
          width={12}
          height={8}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute top-[calc(100%+14px)] right-0 z-50 min-w-[236px] overflow-hidden rounded-card border border-hairline bg-white py-1 shadow-[0_10px_30px_rgb(0_0_0/0.16)]"
        >
          {LOCALES.map((entry) => {
            const active = entry.code === locale;
            return (
              <li key={entry.code} role="none">
                <Link
                  role="menuitem"
                  href={localizePath(pathname, entry.code)}
                  hrefLang={entry.code}
                  lang={entry.code}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-2 px-4 py-[9px] text-[16px] leading-[24px] transition-colors ${
                    active
                      ? "font-bold text-brand"
                      : "font-medium text-black hover:bg-black/[0.04]"
                  }`}
                >
                  <span className="whitespace-nowrap">{entry.nativeName}</span>
                  <span className="text-[13px] whitespace-nowrap text-black/45">
                    {entry.englishName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
