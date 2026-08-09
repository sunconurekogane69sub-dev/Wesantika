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
 * The "DETAIL →" button is not in the Figma file — the file draws these cards
 * as flat tiles with nowhere to go. It is added because every one of these
 * services now has a long-form write-up, and this grid is where most visitors
 * meet them first.
 *
 * It is an outlined button rather than the solid one the services-page grid
 * uses. Two reasons: a 160px card cannot carry a solid 52px block without the
 * button outweighing the copy, and the outline keeps the homepage grid reading
 * as an overview while the services page stays the primary call to action.
 * brand-ink on white measures 6.01:1 and white on brand-ink the same, so the
 * label clears AA in both the idle and hover states at 16px.
 *
 * `detailHref` is optional: five of the seventeen cards have no write-up yet
 * and render without a button rather than with a dead one.
 */
export function ServiceCard({
  title,
  icon,
  body,
  detailHref,
  detailLabel,
}: {
  title: string;
  icon: string;
  body: string;
  detailHref?: string;
  detailLabel: string;
}) {
  return (
    <article className="flex min-h-[160px] flex-col rounded-card border border-hairline bg-white px-[25px] py-[20px] transition-colors duration-200 ease-out hover:border-brand">
      <div className="flex items-start gap-[16px]">
        <Icon
          src={icon}
          width={30}
          height={30}
          className="mt-[3px] h-[30px] w-[30px] shrink-0 object-contain"
        />
        <h3 className="text-[20px] leading-[24px] font-bold text-black">{title}</h3>
      </div>
      <p className="mt-[11px] text-[16px] leading-[19px] font-medium text-black">{body}</p>

      {detailHref ? (
        /* `mt-auto` on the wrapper pins the button to the bottom edge, so a row
           of cards with different body lengths still lines its buttons up; the
           padding is what keeps it clear of the copy above. */
        <div className="mt-auto pt-[16px]">
          <Link
            href={detailHref}
            className="inline-flex h-[36px] items-center justify-center gap-[6px] rounded-btn border border-brand bg-white px-[16px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-brand-ink transition-colors duration-200 ease-out hover:bg-brand-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {detailLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}
    </article>
  );
}
