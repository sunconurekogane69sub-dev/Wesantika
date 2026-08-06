import Image from "next/image";

/**
 * Hero for interior pages (Newsroom, Blog and their articles).
 *
 * No Figma artboard exists for these pages. This follows the treatment the
 * three designed heroes share — full-bleed image, navy scrim, white type on the
 * left at the 212px inset — at a shorter height suited to a listing page.
 */
export function PageHero({
  image,
  title,
  body,
  eyebrow,
  meta,
  compact = false,
}: {
  image: string;
  title: string;
  body?: string;
  eyebrow?: React.ReactNode;
  meta?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={
        compact
          ? "relative h-[460px] sm:h-[520px] xl:h-[600px]"
          : "relative h-[520px] sm:h-[600px] xl:h-[720px]"
      }
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/30"
      />
      <div className="canvas relative flex h-full flex-col justify-center px-6 pt-[95px] xl:px-0 xl:pl-[212px]">
        {eyebrow && <div className="mb-[20px] flex items-center gap-[12px]">{eyebrow}</div>}
        <h1 className="max-w-[900px] text-[36px] leading-[1.15] font-bold text-white sm:text-[48px] xl:text-[64px] xl:leading-[77px]">
          {title}
        </h1>
        {body && (
          <p className="mt-[24px] max-w-[720px] text-[18px] leading-[28px] font-normal text-white/90 xl:text-[20px]">
            {body}
          </p>
        )}
        {meta && <div className="mt-[28px] flex flex-wrap items-center gap-[16px]">{meta}</div>}
      </div>
    </section>
  );
}

/** Small category pill, used in heroes and on cards. */
export function CategoryChip({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex h-[28px] items-center rounded-full px-[14px] text-[13px] leading-none font-bold tracking-wide uppercase ${
        tone === "light"
          ? "bg-white/15 text-white ring-1 ring-white/40"
          : "bg-brand/10 text-brand ring-1 ring-brand/30"
      }`}
    >
      {label}
    </span>
  );
}
