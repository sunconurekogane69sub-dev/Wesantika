import type { Locale } from "@/lib/i18n/locales";

/**
 * The copyright line.
 *
 * This was, briefly, a decorative object: hairlines fading in from both edges,
 * brand diamonds on their inner ends, a gradient sheen sweeping the text on a
 * 14-second loop, and 0.22em tracking. All of it has been taken out.
 *
 * The reason is worth writing down. Ornament that carries no information reads
 * as filler, and a *legal* line is the last place to put filler — the whole
 * value of a copyright notice is that it looks like a statement of fact. Three
 * flourishes on eight words of boilerplate looked generated, because generated
 * design is exactly what over-decorating a low-value element looks like.
 *
 * What is left is what a copyright line should be: small, quiet, legible,
 * correctly set for its script, and out of the way. The only thing carried over
 * is per-script tracking, which is typesetting rather than decoration —
 * Japanese and Chinese sit on a full em box and take less of it than Latin, and
 * Thai least of all because its marks belong to the letter they sit on.
 */
const TRACKING: Record<Locale, string> = {
  en: "tracking-[0.02em]",
  vi: "tracking-[0.02em]",
  ja: "tracking-[0.04em]",
  "zh-Hant-TW": "tracking-[0.04em]",
  th: "tracking-normal",
};

export function Copyright({ text, locale }: { text: string; locale: Locale }) {
  return (
    <p
      className={`text-[13px] leading-[20px] font-normal text-white/55 ${TRACKING[locale]}`}
    >
      {text}
    </p>
  );
}
