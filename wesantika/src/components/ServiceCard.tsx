import { Icon } from "./Icon";

/**
 * Service card — Figma 180:630 and siblings.
 * 440 x 160, white, 8px radius, 1px #000 @ 30% hairline.
 *
 * Height is `min-h` rather than fixed: a few of the bodies (Legacy
 * Modernization, Software Integration) are longer than the 160px box they were
 * drawn in and would otherwise be clipped.
 */
export function ServiceCard({
  title,
  icon,
  body,
}: {
  title: string;
  icon: string;
  body: string;
}) {
  return (
    <article className="flex min-h-[160px] flex-col rounded-card border border-hairline bg-white px-[25px] py-[20px]">
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
    </article>
  );
}
