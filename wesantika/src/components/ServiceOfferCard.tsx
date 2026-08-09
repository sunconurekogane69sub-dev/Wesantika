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
 * Group 108 (405:2329). White wins: it is the ground the solid blue "DETAIL →"
 * button was designed against on the highlight cards, and it keeps the card
 * from competing with the button for attention.
 *
 * The card is taller than the 422px `min-h` now that the button is a 52px
 * block rather than a line of text. That is why the height is a minimum and
 * not fixed — all fourteen grow together, so the grid stays even.
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
        /* The same 52px solid blue button the two highlight cards above the
           grid use (586:806 / 586:808), so "DETAIL →" reads as one control
           across the whole page. It was a bare text link here, which is why it
           did not register as a button at all.

           The label is bold where the file sets it regular: white on #0f84fd
           measures 3.66:1, which only clears AA once the type counts as large,
           and 20px needs to be bold to qualify. */
        <Link
          href={detailHref}
          className="mt-[16px] ml-[26px] inline-flex h-[52px] min-w-[130px] w-fit items-center justify-center gap-[6px] self-start rounded-btn bg-brand px-[20px] text-[20px] leading-[24px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
        >
          {detailLabel}
          <span aria-hidden>→</span>
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
