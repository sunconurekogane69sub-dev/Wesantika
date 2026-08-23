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
    /** Where the card opens — see serviceCardHref. */
    href: string;
  }>;
};

/**
 * The service browser: five categories, one grid.
 *
 * ## What was wrong with it
 *
 * The rail was **vertical**, in a 363px column, beside an 891px panel, inside
 * a 212px left padding — three widths lifted straight from a 1672px Figma
 * artboard and hard-coded. Two consequences, both visible:
 *
 *  - Five labels are about 180px of content in a 363px column that runs the
 *    full height of eleven cards. On the home page that left a **column of
 *    empty white roughly 360 x 1400px** next to the grid, which is what made
 *    the section look broken rather than airy.
 *  - The panel was locked to 891px, so it fitted two cards at any viewport.
 *    Eleven cards in two columns is a very long section for no reason: at
 *    1440px there is room for three.
 *
 * Together those cost the home page around 1500px of height.
 *
 * ## What it is now
 *
 * A horizontal tab bar over a three-column grid — the ordinary shape for
 * "filter a set of things", and the one a reader already knows. The rail's
 * width problem disappears because it no longer has a width: the tabs sit on
 * one line and the grid gets the whole canvas.
 *
 * On a phone the bar scrolls sideways inside its own container rather than
 * wrapping to four lines. That is a deliberate exception to "no horizontal
 * scroll": the page must not scroll, a tab strip may, and it is bounded by
 * `overflow-x-auto` so it cannot leak into the document.
 *
 * ## Keyboard
 *
 * Still an APG tab list, but horizontal now, so the arrow keys swap: Left/Right
 * move between tabs and Up/Down are left to the page. Getting this wrong is the
 * usual bug when a tab list is rotated — the visual orientation and the key
 * bindings have to agree, or a screen-reader user is told "tab 2 of 5" and then
 * finds the arrow that matches the layout does nothing.
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
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: categories.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusTab(target);
  };

  return (
    <div className="mt-10">
      {/*
        The hairline runs the full width and the selected tab sits on it, so the
        bar reads as a set of tabs rather than a row of buttons. `-mb-px` pulls
        the tabs down onto the line so the active marker replaces it rather than
        stacking under it.
      */}
      <div className="overflow-x-auto border-b border-black/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="-mb-px flex w-max min-w-full gap-1"
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
                className={`relative cursor-pointer whitespace-nowrap border-b-2 px-4 py-3 text-[15px] leading-6 font-bold transition-colors focus-visible:rounded-t-[6px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:px-5 sm:text-[16px] ${
                  selected
                    ? "border-brand-btn text-black"
                    : /* 55% black is 4.7:1 on white, so an idle tab is still
                         body-copy legible rather than a grey hint. */
                      "border-transparent text-black/55 hover:border-black/25 hover:text-black"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
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
          } mt-8 gap-4 sm:grid-cols-2 lg:grid-cols-3`}
        >
          {category.cards.map((card) => (
            <ServiceCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              body={card.body}
              href={card.href}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
