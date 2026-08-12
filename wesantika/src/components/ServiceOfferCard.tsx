import Image from "next/image";
import Link from "next/link";

/**
 * "Services We Offer" card — Figma 405:2322 and siblings, with the title and
 * hover copy from 586:802 (Group 108).
 *
 * The reveal is pure CSS: on hover the image fades out and the description fades
 * in over the same area. Transition durations collapse under
 * prefers-reduced-motion via the global rule in globals.css.
 *
 * The whole card is the link. It used to be a `tabIndex={0}` `<article>` with a
 * small "DETAIL →" anchor inside it, so the large obvious target did nothing,
 * the small one did the work, and the card took focus without being operable.
 *
 * ---------------------------------------------------------------------------
 * Colour and style, second pass. Three things were dating it:
 *
 * 1. **A 3px `border-brand` on every card.** Seventeen of them, each ringed in
 *    3px of saturated #0f84fd — about 5,000px of bright blue outline on one
 *    page. Saturated heavy borders are the most reliable way to make a card grid
 *    look like 2014. It is a 1px hairline now that goes brand on hover, which is
 *    also exactly what the Top page's `ServiceCard` does: the two card types
 *    already share their hover moves, and now they share their resting state.
 * 2. **`shadow-[0_4px_4px_rgb(0_0_0/0.25)]` on the image** — 4px offset, 4px
 *    blur, 25% black. A shadow with no spread reads as a hard edge rather than
 *    depth, and it sat inside a card that carries its own elevation, so it was
 *    shadow on shadow. Gone.
 * 3. **The illustration floated.** These are 364x273 PNGs on white grounds
 *    sitting on a white card, so there was no boundary — the artwork just ended.
 *    It sits on `brand-tint` now, which gives it an edge, ties the card to the
 *    palette, and gives the hover copy a panel to appear on instead of leaving
 *    it floating in the same white as the title.
 *
 * The image box aspect is 364/273 — identical to every source file — so
 * `object-cover` crops nothing.
 * ---------------------------------------------------------------------------
 */
export function ServiceOfferCard({
  title,
  body,
  image,
  detailHref,
  detailLabel,
}: {
  title: string;
  body: string;
  image: string;
  detailHref?: string;
  detailLabel: string;
}) {
  const inner = (
    <>
      {/* Only on the linked variant, where the lift has somewhere to go. The
          offsets track the 1px border, not the old 3px one. */}
      {detailHref && (
        <span
          aria-hidden
          className="absolute inset-x-[-1px] top-[-1px] h-[3px] origin-left scale-x-0 rounded-t-[16px] bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      )}

      <div className="px-[26px] pt-[30px]">
        <h3 className="text-[19px] leading-[28px] font-bold text-black transition-colors duration-200 group-hover:text-brand-ink xl:text-[20px] xl:leading-[30px]">
          {title}
        </h3>

        {detailHref && (
          <span
            aria-hidden
            className="mt-[10px] inline-flex items-baseline text-[15px] leading-[24px] font-bold text-brand-ink"
          >
            <span className="border-b border-brand-ink/0 transition-colors duration-200 group-hover:border-brand-ink/60">
              {detailLabel}
            </span>
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[5px]">
              {" →"}
            </span>
          </span>
        )}
      </div>

      <div className="relative mx-[14px] mt-[22px] mb-[14px] h-[273px] flex-1 overflow-hidden rounded-[10px] bg-brand-tint">
        {/* Two of the seventeen slots are vector, and Next's image optimizer
            answers 400 for SVG unless `dangerouslyAllowSVG` is set globally.
            Serving them straight from /public sidesteps that without loosening
            the setting for every image on the site — and there is nothing to
            optimize in a vector anyway. */}
        <Image
          src={image}
          alt=""
          fill
          unoptimized={image.endsWith(".svg")}
          sizes="(max-width: 1280px) 100vw, 364px"
          className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-within:opacity-0 group-focus-visible:opacity-0"
        />
        {/* Black on brand-tint measures 19.1:1, so the copy is fully legible on
            the panel the image leaves behind. */}
        <p className="absolute inset-0 flex items-center overflow-y-auto px-[26px] text-[16px] leading-[26px] font-normal text-black/85 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100 group-focus-visible:opacity-100">
          {body}
        </p>
      </div>
    </>
  );

  const shell =
    "group relative flex min-h-[422px] w-full flex-col overflow-hidden rounded-[16px] border border-hairline bg-white";

  // Two of the seventeen have no write-up yet. Those stay a plain article — a
  // card that looks clickable and is not is worse than one that looks static.
  if (!detailHref) {
    return <article className={shell}>{inner}</article>;
  }

  return (
    <Link
      href={detailHref}
      className={`${shell} outline-none transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_18px_40px_-16px_rgb(6_42_82/0.28)] focus-visible:-translate-y-[3px] focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-ink motion-reduce:hover:translate-y-0`}
    >
      {inner}
    </Link>
  );
}
