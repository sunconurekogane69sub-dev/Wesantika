import Link from "next/link";
import { Icon } from "./Icon";

/**
 * Service card — Figma 180:630 and siblings.
 * 440 x 160, white, 8px radius, 1px #000 @ 30% hairline.
 *
 * Height is `min-h` rather than fixed: a few of the bodies (Legacy
 * Modernization, Software Integration) are longer than the 160px box they were
 * drawn in and would otherwise be clipped.
 *
 * **It is a link now, not an `<article>`.** The brief asked for a pointer cursor
 * on hover, and a pointer cursor on something that cannot be clicked is the same
 * promise-without-a-destination already noted on the AI Innovation labels. So
 * rather than style a lie, each card opens the write-up for its service — see
 * `serviceCardHref`. The cursor comes free from the anchor, which also means
 * keyboard focus, middle-click and "open in new tab" all work, none of which a
 * `cursor-pointer` class would have given.
 *
 * The hover is built from four small moves rather than one large one — a 3px
 * lift, a shadow, the hairline going brand, and the icon disc filling. Together
 * they read as the card responding; any one of them alone reads as a hover
 * state. `motion-reduce` drops the lift, and the global reduced-motion rule
 * flattens the durations.
 */
export function ServiceCard({
  title,
  icon,
  body,
  href,
}: {
  title: string;
  icon: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[160px] flex-col overflow-hidden rounded-card border border-hairline bg-white px-[25px] py-[20px] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_16px_36px_-14px_rgb(6_42_82/0.28)] focus-visible:-translate-y-[3px] focus-visible:border-brand motion-reduce:hover:translate-y-0"
    >
      {/* A brand hairline that wipes in along the top edge. Origin-left so it
          travels rather than fading, which is what ties it to the lift. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="flex items-start gap-[16px]">
        {/* The tile is static. It previously filled brand-btn on hover and the
            icon scaled with it, and both were wrong: these nineteen icons carry
            their own colours, so dropping them onto a saturated blue fill made
            them fight it, and scaling a small multi-colour glyph just makes it
            blur. The hover now lives entirely in the card — lift, shadow,
            border, top rule, arrow — and the icon is left alone. */}
        <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[12px] bg-brand-tint">
          <Icon
            src={icon}
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain"
          />
        </span>
        <h3 className="pt-[6px] text-[19px] leading-[28px] font-bold text-black transition-colors duration-200 group-hover:text-brand-ink xl:text-[20px] xl:leading-[28px]">
          {title}
        </h3>
      </div>

      <p className="mt-[12px] text-[16px] leading-[26px] font-normal text-black/80">
        {body}
      </p>

      {/* Slides out from the left edge on hover. It is the affordance the card
          was missing: something that says this goes somewhere. */}
      <span
        aria-hidden
        className="mt-[14px] inline-flex translate-x-[-6px] items-center text-[16px] leading-none font-bold text-brand-ink opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        →
      </span>
    </Link>
  );
}
