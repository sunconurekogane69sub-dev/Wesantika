"use client";

import { useId, useRef, useState } from "react";
import { ServiceCard } from "./ServiceCard";

export type ServiceTabCategory = {
  id: string;
  label: string;
  cards: ReadonlyArray<{
    id: string;
    icon: string;
    title: string;
    body: string;
  }>;
};

/**
 * The "Our Full-Range Services" rail — Figma 180:624-628 plus the four card
 * sets at 578:472-607.
 *
 * The rail is an ARIA tab list rather than a list of links: nothing navigates,
 * clicking swaps the grid beside it. Vertical orientation, so Up/Down move
 * between tabs (Left/Right are left alone) and Home/End jump to the ends.
 * Activation follows focus, which is the APG default and is safe here because
 * every panel is already in memory.
 *
 * Colour states are ours, not Figma's — Figma only ever draws the selected
 * item. Idle labels sit at 55% black (4.7:1 on white, so they clear AA as body
 * text, not just as large text); hover and selected go to full black, and the
 * 5px marker is black too rather than the brand blue the Figma line uses, per
 * "completely black on hover and when selected".
 */
export function ServiceTabs({
  categories,
}: {
  categories: ReadonlyArray<ServiceTabCategory>;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + categories.length) % categories.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number | undefined> = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: categories.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusTab(target);
  };

  return (
    <div className="mt-[40px] flex flex-col gap-[40px] xl:mt-[59px] xl:flex-row xl:gap-0 xl:pl-[212px]">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="flex flex-col items-start gap-[27px] xl:w-[363px] xl:shrink-0"
      >
        {categories.map((category, index) => {
          const selected = index === active;
          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-controls={`${baseId}-panel-${category.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`relative cursor-pointer pl-[12px] text-left text-[20px] leading-[24px] font-bold transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
                selected ? "text-black" : "text-black/55"
              }`}
            >
              {/* Selection marker — Figma 180:710, a 5px rule */}
              <span
                aria-hidden
                className={`absolute top-[-2px] left-0 h-[27px] w-[5px] bg-black transition-opacity ${
                  selected ? "opacity-100" : "opacity-0"
                }`}
              />
              {category.label}
            </button>
          );
        })}
      </div>

      {categories.map((category, index) => (
        <div
          key={category.id}
          role="tabpanel"
          id={`${baseId}-panel-${category.id}`}
          aria-labelledby={`${baseId}-tab-${category.id}`}
          hidden={index !== active}
          /* The `hidden` attribute alone would lose to `.grid` on specificity,
             so the display utility is conditional too. */
          className={`${
            index === active ? "grid" : "hidden"
          } gap-x-[11px] gap-y-[12px] sm:grid-cols-2 xl:w-[891px]`}
        >
          {category.cards.map((card) => (
            <ServiceCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
