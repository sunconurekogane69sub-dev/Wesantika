import Link from "next/link";

/**
 * The call to action that sits inside a hero.
 *
 * It replaces a class string that was duplicated on the Services and
 * Technologies heroes and whose entire interaction was `hover:opacity-90`.
 * Fading a filled button on hover is the one hover state that reads as the
 * button becoming *less* available — it is what a disabled control looks like.
 * Everything else on this site already speaks a different language: the service
 * cards lift, take a shadow, turn their hairline brand and slide an arrow out.
 * The most important control on each page was the only one not doing that.
 *
 * ## Why there is a ring
 *
 * Not decoration. WCAG 1.4.11 wants a control to be distinguishable from what
 * is behind it at 3:1, and the fill alone does not manage that everywhere:
 *
 *   ground                fill vs ground    white ring vs ground
 *   pale hero (#e7effb)         5.19:1              1.14:1
 *   pale hero (#d4e4f9)         4.65:1              1.26:1
 *   mid blue-grey (#9dbae2)     3.02:1              1.87:1
 *   saturated blue (#0f84fd)  → 1.64:1 ←            3.24:1
 *   navy scrim (#1b4a7a)      → 1.52:1 ←            7.72:1
 *
 * The fill carries every pale ground on its own; the ring is what rescues the
 * blue and navy ones, where a blue button on blue video all but loses its edge.
 * One or the other clears 3:1 on every ground the heroes actually use, which is
 * the requirement — they do not both have to.
 *
 * The label is white on `#0b62bd`: 6.01:1, comfortably past the 4.5:1 that 16px
 * bold needs. `#0f84fd` would have been 3.66:1 and is why the button token is
 * the darker blue.
 *
 * ## Why the height is not fixed
 *
 * `min-h` and padding, not `h-[48px]`. A fixed height with `whitespace-nowrap`
 * is exactly what clipped "Send Your RFP" earlier in this project, and the
 * labels here run through five locales — Thai and Vietnamese are consistently
 * the longest. The button grows instead of cropping.
 *
 * ## Focus
 *
 * The global `:focus-visible` rule paints a brand-blue outline, which on a
 * brand-blue button is invisible. This paints its own: a white ring with a navy
 * ring outside it, so the indicator survives a white hero frame and a dark one
 * without knowing which it is on.
 */

type Variant = "primary" | "secondary";

const BASE =
  "group/cta relative inline-flex min-h-[52px] w-fit max-w-full items-center justify-center gap-[10px] " +
  "rounded-btn px-[30px] py-[14px] text-center text-[16px] leading-[24px] font-bold " +
  "transition-[transform,box-shadow,background-color] duration-200 ease-out " +
  "hover:-translate-y-[2px] active:translate-y-0 active:duration-75 " +
  "motion-reduce:hover:translate-y-0 " +
  // Suppress the global brand outline and paint a two-tone ring instead.
  "focus-visible:outline-none focus-visible:-translate-y-[2px]";

const VARIANT: Record<Variant, string> = {
  /** Filled. The default for a hero's single action. */
  primary:
    "bg-brand-btn text-white ring-1 ring-white/90 " +
    // Shadow is tinted navy rather than black: a black shadow greys the
    // photograph under it, a navy one sits in the same family as the artwork.
    "shadow-[0_6px_18px_-6px_rgb(4_29_56/0.55)] " +
    "hover:bg-brand-ink hover:shadow-[0_16px_34px_-10px_rgb(4_29_56/0.65)] " +
    "active:shadow-[0_4px_12px_-6px_rgb(4_29_56/0.6)] " +
    "focus-visible:shadow-[0_0_0_3px_#fff,0_0_0_6px_#041d38,0_16px_34px_-10px_rgb(4_29_56/0.65)]",

  /**
   * White fill, brand-ink label — 6.01:1. For a second, lower-commitment action
   * beside the primary. White holds its edge on every hero ground the primary
   * struggles with, so it needs no ring of its own.
   */
  secondary:
    "bg-white text-brand-ink " +
    "shadow-[0_6px_18px_-6px_rgb(4_29_56/0.45)] " +
    "hover:bg-brand-tint hover:shadow-[0_16px_34px_-10px_rgb(4_29_56/0.55)] " +
    "active:shadow-[0_4px_12px_-6px_rgb(4_29_56/0.5)] " +
    "focus-visible:shadow-[0_0_0_3px_#041d38,0_0_0_6px_#fff,0_16px_34px_-10px_rgb(4_29_56/0.55)]",
};

/** The class string on its own, for triggers that render their own element. */
export function heroCtaClass(variant: Variant = "primary", className = "") {
  return `${BASE} ${VARIANT[variant]} ${className}`.trim();
}

export function HeroCta({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={heroCtaClass(variant, className)}>
      {children}
      <CtaArrow />
    </Link>
  );
}

/**
 * The same arrow the service cards use, so the two read as one vocabulary.
 * It nudges rather than travels — a hero button is already the largest target
 * on the page and does not need to announce itself twice.
 */
export function CtaArrow() {
  return (
    <span
      aria-hidden
      className="translate-x-0 text-[17px] leading-none transition-transform duration-200 ease-out group-hover/cta:translate-x-[4px] group-focus-visible/cta:translate-x-[4px] motion-reduce:group-hover/cta:translate-x-0"
    >
      →
    </span>
  );
}
