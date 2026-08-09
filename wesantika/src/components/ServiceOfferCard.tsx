import Image from "next/image";
import Link from "next/link";

/**
 * "Services We Offer" card — Figma 405:2322 and siblings, with the title and
 * hover copy from 586:802 (Group 108).
 *
 * The reveal is pure CSS: on hover the image fades out and the description
 * fades in over the same area. `tabIndex` + `focus-within` gives keyboard users
 * the same access, and a tap focuses the card on touch devices where there is
 * no hover at all. Transition durations collapse under prefers-reduced-motion
 * via the global rule in globals.css. The "DETAIL →" link is a real focusable
 * child, so tabbing to it opens the card's copy on the way past.
 *
 * `min-h` rather than a fixed 422px: translated titles run longer than the
 * English one and would otherwise push the image out of the card.
 *
 * Figma fills this slot #f7f7f7 (405:1986) but paints the same card white in
 * Group 108 (405:2329). White wins: the "DETAIL →" link measures 6.01:1 on it
 * against 4.67:1 on #f7f7f7, which only just clears the 4.5:1 that 20px
 * normal-weight text needs. The link is brand-ink rather than the file's
 * #036ae5 (5.00:1) for the same reason — same blue family, more headroom.
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
  return (
    <article
      tabIndex={0}
      className="group relative flex min-h-[422px] w-full flex-col rounded-[16px] border-[3px] border-brand bg-white outline-none"
    >
      <h3 className="px-[26px] pt-[47px] text-[20px] leading-[24px] font-bold text-black">
        {title}
      </h3>

      {detailHref ? (
        <Link
          href={detailHref}
          className="mt-[12px] self-start px-[26px] text-[20px] leading-[24px] font-normal whitespace-nowrap text-brand-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {detailLabel}
          <span aria-hidden> →</span>
        </Link>
      ) : null}

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
          className="rounded-[8px] object-cover shadow-[0_4px_4px_rgb(0_0_0/0.25)] transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-within:opacity-0"
        />
        <p className="absolute inset-0 flex items-center overflow-y-auto px-[31px] text-[16px] leading-[22px] font-medium text-black opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
          {body}
        </p>
      </div>
    </article>
  );
}
