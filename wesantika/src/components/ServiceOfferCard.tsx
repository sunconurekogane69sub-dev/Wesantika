import Image from "next/image";

/**
 * "Services We Offer" card — Figma 405:2322.
 * 370 x 422, white, 16px radius, 3px brand border. Title at +47, image at +146.
 *
 * The reveal is pure CSS: on hover the image fades out and the description
 * fades in over the same area. `tabIndex` + `focus-within` gives keyboard users
 * the same access, and a tap focuses the card on touch devices where there is
 * no hover at all. Transition durations collapse under prefers-reduced-motion
 * via the global rule in globals.css.
 *
 * `min-h` rather than a fixed 422px: translated titles run longer than the
 * English one and would otherwise push the image out of the card.
 */
export function ServiceOfferCard({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image: string;
}) {
  return (
    <article
      tabIndex={0}
      className="group relative flex min-h-[422px] w-full flex-col rounded-[16px] border-[3px] border-brand bg-white outline-none"
    >
      <h3 className="px-[37px] pt-[47px] text-[20px] leading-[24px] font-normal text-black">
        {title}
      </h3>

      <div className="relative mx-[3px] mt-[51px] h-[273px] flex-1">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 364px"
          className="rounded-[8px] object-cover shadow-[0_4px_4px_rgb(0_0_0/0.25)] transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-within:opacity-0"
        />
        <p className="absolute inset-0 flex items-center px-[34px] text-[16px] leading-[22px] font-medium text-black opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
          {body}
        </p>
      </div>
    </article>
  );
}

/** An unauthored slot in the 3 x 6 grid — Figma 405:1987 and siblings. */
export function ServiceOfferPlaceholder() {
  return (
    <div
      aria-hidden
      className="min-h-[422px] w-full rounded-[16px] border-[3px] border-brand bg-white"
    />
  );
}
