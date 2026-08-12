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
 * **The whole card is the link now.** It used to be a `tabIndex={0}` `<article>`
 * with a small "DETAIL →" anchor inside it — so the large obvious target did
 * nothing, the small one did the work, and the card took focus without being
 * operable. One anchor wrapping the whole thing fixes all three, and the pointer
 * cursor it brings is honest rather than painted on.
 *
 * The hover is deliberately the same four moves as `ServiceCard`: a 3px lift, a
 * shadow, the border going brand, and a rule wiping in along the top edge. Two
 * card types that behave identically read as one system.
 *
 * `min-h` rather than a fixed 422px: translated titles run longer than the
 * English one and would otherwise push the image out of the card.
 *
 * Figma fills this slot #f7f7f7 (405:1986) but paints the same card white in
 * Group 108 (405:2329). White wins: the "DETAIL →" label measures 6.01:1 on it
 * against 4.67:1 on #f7f7f7, which only just clears the 4.5:1 that 20px
 * normal-weight text needs.
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
      {/* Only on the linked variant, where the lift has somewhere to go. */}
      {detailHref && (
        <span
          aria-hidden
          className="absolute inset-x-[-3px] top-[-3px] h-[4px] origin-left scale-x-0 rounded-t-[16px] bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      )}

      <h3 className="px-[26px] pt-[47px] text-[20px] leading-[30px] font-bold text-black transition-colors duration-200 group-hover:text-brand-ink">
        {title}
      </h3>

      {detailHref && (
        <span
          aria-hidden
          className="mt-[12px] self-start px-[26px] text-[18px] leading-[28px] font-bold whitespace-nowrap text-brand-ink"
        >
          {detailLabel}
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[5px]">
            {" →"}
          </span>
        </span>
      )}

      <div className="relative mx-[3px] mt-[27px] h-[273px] flex-1">
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
          className="rounded-[8px] object-cover shadow-[0_4px_4px_rgb(0_0_0/0.25)] transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-within:opacity-0 group-focus-visible:opacity-0"
        />
        <p className="absolute inset-0 flex items-center overflow-y-auto px-[31px] text-[16px] leading-[26px] font-normal text-black/85 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100 group-focus-visible:opacity-100">
          {body}
        </p>
      </div>
    </>
  );

  const shell =
    "group relative flex min-h-[422px] w-full flex-col overflow-hidden rounded-[16px] border-[3px] border-brand bg-white";

  // Two of the seventeen have no write-up yet. Those stay a plain article — a
  // card that looks clickable and is not is worse than one that looks static.
  if (!detailHref) {
    return <article className={shell}>{inner}</article>;
  }

  return (
    <Link
      href={detailHref}
      className={`${shell} outline-none transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-16px_rgb(6_42_82/0.30)] focus-visible:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-ink motion-reduce:hover:translate-y-0`}
    >
      {inner}
    </Link>
  );
}
