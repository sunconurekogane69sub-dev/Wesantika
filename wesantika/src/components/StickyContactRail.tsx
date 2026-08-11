"use client";

import { CONTACT_CHANNELS } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { Icon } from "./Icon";

/**
 * Sticky contact rail — Figma 180:600-622.
 *
 * In the file the four pills are drawn in their *open* state, overhanging the
 * right edge of the artboard by ~79px. That overhang is the interaction: at rest
 * only the round cap (58px) is on screen, and hover/focus slides the pill left
 * to reveal its label.
 *
 * `items-end` matters. A column flex container defaults to `align-items:
 * stretch`, which made every pill as wide as the longest label — so all four
 * slid out to the same length. Sizing each pill to its own content restores the
 * per-label widths from the design (Email 136, Telegram 156, WhatsApp 156,
 * LINE 136) and keeps the collapsed cap at a constant 58px.
 *
 * Hidden below md — the rail would sit on top of content on a phone, and no
 * mobile treatment exists in the design.
 */
export function StickyContactRail({ labels }: { labels: Dictionary["rail"] }) {
  return (
    <div className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col items-end gap-[12px] md:flex">
      {CONTACT_CHANNELS.map((channel) => {
        const external = !channel.href.startsWith("mailto:");
        const label = labels[channel.id];

        return (
          <a
            key={channel.id}
            href={channel.href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            aria-label={label}
            // border-2 is inside the 55px box (border-box), so the cap stays 58px.
            className="group flex h-[55px] w-auto translate-x-[calc(100%-58px)] items-center rounded-l-full border-2 border-white bg-brand-btn pr-[24px] pl-[15px] text-white shadow-[0_2px_10px_rgb(0_0_0/0.15)] transition-transform duration-300 ease-out hover:translate-x-0 focus-visible:translate-x-0"
          >
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center">
              <Icon
                src={channel.icon}
                width={34}
                height={34}
                className="h-[34px] w-[34px]"
              />
            </span>
            <span className="ml-[11px] whitespace-nowrap text-[16px] leading-[26px] font-bold">
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
