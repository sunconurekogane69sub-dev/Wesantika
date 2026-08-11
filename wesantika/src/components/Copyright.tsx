import type { Locale } from "@/lib/i18n/locales";

/**
 * The copyright line, treated as an ornament rather than as small print.
 *
 * It was 15px of `text-white/70` in the corner of a navy bar — the last thing
 * on the page and the least considered thing on it. That is exactly what makes
 * it the right place for a flourish: nothing depends on it, so it can carry
 * decoration that would be noise anywhere else.
 *
 * Three parts:
 *
 * 1. **Rules that fade in from the edges**, each ending in a small brand
 *    diamond. They centre the line and give it somewhere to sit, instead of
 *    leaving it stranded against a margin.
 * 2. **A decorative face, per script.** English and Vietnamese get Unbounded, a
 *    wide geometric display face. Japanese gets Shippori Mincho — a *mincho*,
 *    a Japanese serif, which in a wholly sans-serif site is the strongest
 *    contrast the script offers, and unmistakably Japanese in a way a gothic
 *    face is not. Chinese and Thai keep their Noto face and take the ornaments
 *    only: neither has a decorative option here that would not read as costume.
 * 3. **A slow sheen** sweeping the text left to right, in colours measured
 *    against the bar so no frame of it drops under AA.
 *
 * Tracking is per script and not a detail: 0.22em opens Latin caps out into
 * something deliberate, but Japanese is already set on a full em box and the
 * same value would pull the line apart, so it takes 0.16em.
 */
const LATIN = "font-[family-name:var(--font-deco-latin)]";
const JP = "font-[family-name:var(--font-deco-jp)]";

/**
 * Tracking opens up only from `sm`. Set flat, 0.22em on 38 uppercase characters
 * needs about 374px, and a 360px phone offers 312px inside the gutter — the
 * line would have overflowed the viewport on the narrowest common device.
 */
const DECO: Record<Locale, { font: string; tracking: string; caps: boolean }> = {
  en: { font: LATIN, tracking: "tracking-[0.12em] sm:tracking-[0.22em]", caps: true },
  vi: { font: LATIN, tracking: "tracking-[0.08em] sm:tracking-[0.16em]", caps: false },
  ja: { font: JP, tracking: "tracking-[0.10em] sm:tracking-[0.16em]", caps: false },
  "zh-Hant-TW": { font: "", tracking: "tracking-[0.10em] sm:tracking-[0.14em]", caps: false },
  th: { font: "", tracking: "tracking-[0.04em] sm:tracking-[0.08em]", caps: false },
};

/** A rule that fades in from the edge and closes on a brand diamond. */
function Ornament({ side }: { side: "left" | "right" }) {
  const rule =
    side === "left"
      ? "bg-gradient-to-r from-transparent via-brand-cta/25 to-brand-cta/60"
      : "bg-gradient-to-l from-transparent via-brand-cta/25 to-brand-cta/60";

  return (
    <span
      aria-hidden
      className={`hidden max-w-[180px] flex-1 items-center gap-[10px] sm:flex ${
        side === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <span className={`h-px flex-1 ${rule}`} />
      <span className="h-[5px] w-[5px] rotate-45 bg-brand-cta shadow-[0_0_10px_rgb(0_174_247/0.9)]" />
    </span>
  );
}

export function Copyright({ text, locale }: { text: string; locale: Locale }) {
  const deco = DECO[locale];

  return (
    <div className="flex w-full items-center justify-center gap-[16px] sm:gap-[24px]">
      <Ornament side="left" />

      <p
        // No `whitespace-nowrap`: tracked type is wide, and a line that cannot
        // wrap can only overflow. Centred, a wrap looks intentional.
        className={`copyright-ink text-center text-[11px] leading-[22px] sm:text-[13px] sm:leading-[24px] ${deco.font} ${deco.tracking} ${
          deco.caps ? "uppercase" : ""
        }`}
      >
        {text}
      </p>

      <Ornament side="right" />
    </div>
  );
}
