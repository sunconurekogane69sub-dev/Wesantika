import Image from "next/image";

/**
 * The one hero on the site.
 *
 * Before this existed the six heroes were authored independently and had
 * drifted apart in every dimension that a reader actually notices:
 *
 *   height   941 / 942 / 950 / 952 / 620 / 560
 *   heading   64 /  48 /  48 /  48 /  64 /  58 px
 *   gutter   212 / 213 / 207 / 217 / 212 / 212 px
 *   position  four different `pt-` stacks, and Technologies laid its copy out
 *             with `xl:absolute top/left` — a different mechanism entirely
 *
 * None of those differences was a decision; they accumulated. Centralising them
 * is what makes the set look deliberate, and it means the next hero cannot
 * drift again.
 *
 * Two sizes only. The landing page gets the tall one, every interior page gets
 * the short one — a standard split, and one the reader can feel: arriving on an
 * interior page, the content starts above the fold instead of a screen below it.
 * 941px was taller than the viewport of a 1440x900 laptop.
 *
 * `objectPosition` is per-image and load-bearing, not decoration. All six
 * photographs put their subject on the right and leave the left pale, but they
 * do not agree on where vertically the pale part sits, and the Figma exports
 * (~1.8 aspect) crop very differently from the client-supplied art (1.50).
 * Every value here is measured — `npm run ink` models this exact crop and
 * fails the build if the copy stops clearing WCAG on its ground.
 */
type HeroSize = "full" | "home" | "page";

const SIZE = {
  /**
   * Full screen, for the landing page.
   *
   * `100svh`, not `100vh`. On mobile browsers `vh` is the viewport *with the
   * address bar hidden*, so a `100vh` hero is taller than what you can actually
   * see, and its bottom — a CTA, usually — sits under the browser chrome until
   * you scroll. `svh` is the smallest viewport state and always fits.
   *
   * `max-h` caps it so the hero cannot become absurd on a tall desktop window,
   * and `min-h` keeps the copy from being crushed on a landscape phone.
   */
  full: {
    section: "h-[100svh] min-h-[520px] max-h-[1000px]",
    title:
      "text-[38px] leading-[1.12] sm:text-[52px] xl:text-[68px] xl:leading-[1.08]",
    body: "mt-[22px] text-[17px] leading-[28px] sm:text-[19px] xl:mt-[28px] xl:text-[22px] xl:leading-[34px]",
    measure: "max-w-[720px]",
  },
  home: {
    section: "h-[560px] sm:h-[660px] xl:h-[760px]",
    title:
      "text-[36px] leading-[1.15] sm:text-[48px] xl:text-[60px] xl:leading-[1.1]",
    body: "mt-[20px] text-[17px] leading-[27px] sm:text-[19px] xl:mt-[26px] xl:text-[22px] xl:leading-[32px]",
    measure: "max-w-[680px]",
  },
  page: {
    section: "h-[400px] sm:h-[470px] xl:h-[560px]",
    title:
      "text-[30px] leading-[1.18] sm:text-[38px] xl:text-[48px] xl:leading-[1.15]",
    body: "mt-[16px] text-[16px] leading-[25px] sm:text-[17px] xl:mt-[20px] xl:text-[19px] xl:leading-[30px]",
    measure: "max-w-[620px]",
  },
} satisfies Record<HeroSize, Record<string, string>>;

export function PageHero({
  image,
  objectPosition,
  size = "page",
  title,
  body,
  ink = "black",
  scrim = false,
  titleAs: Title = "h1",
  children,
}: {
  image: string;
  /** CSS object-position. Chosen per image by measurement, not by eye. */
  objectPosition: string;
  size?: HeroSize;
  title: string;
  body?: string;
  /** Measured against the artwork by scripts/ink-audit.mjs. */
  ink?: "black" | "white";
  /**
   * A soft left-to-right dark wash, for the one hero that sets white type over
   * a photograph. Without it white measures 3.6:1 there, which only clears AA
   * because the sub-head was set **bold** to qualify as large text — and bold
   * body copy is one of the things that reads as amateur. 12% black is enough
   * to reach 4.5:1; this ramps from 35% so the margin is real, and it is gone
   * by the middle of the frame, which is where the photograph's subject is.
   */
  scrim?: boolean;
  /** About's hero lead is not the page's h1 — that heading sits below it. */
  titleAs?: "h1" | "p";
  /** A CTA, rendered under the body copy. */
  children?: React.ReactNode;
}) {
  const s = SIZE[size];
  const text = ink === "white" ? "text-white" : "text-black";

  return (
    <section className={`relative ${s.section}`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        // 90 rather than Next's default 75: these are wide, smooth blue
        // gradients, and 75 puts visible banding across the sky on every one of
        // them. The extra bytes land on a single above-the-fold image.
        quality={90}
        className="object-cover"
        style={{ objectPosition }}
      />

      {scrim && (
        /*
          The full-screen hero gets a stronger wash than the fixed-height one,
          and not for taste. Its height is the viewport's, so the crop is not
          constant: at the 520px floor the copy sits on deep navy sky and white
          measures 4.8:1, but at the 1000px ceiling the same copy has slid down
          onto the bright city and it measures 3.97:1 — under AA. The ramp below
          carries the worst case to 5.7:1, so the hero is legible on a landscape
          phone and a tall desktop window alike.
        */
        <div
          aria-hidden
          className={
            size === "full"
              ? "absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/5"
              : "absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent"
          }
        />
      )}

      {size === "page" && (
        <>
          {/*
            The five interior heroes had identical CSS and still looked
            unrelated, because the *ground under the copy* was different on
            every one: About's copy sat on a sunset skyline (warm, with the
            balcony rail cutting through it), Our Work's sat directly on a
            browser mockup and a phone, and the other three sat on clean pale
            blue. Contrast passed everywhere — that was never the problem. Five
            different backdrops was.

            So the copy always gets the same ground. The wash holds ~90% white
            across the copy column, then releases by 80% so the photograph still
            arrives at full strength on the right, which is where all five put
            their subject. Black type, one ink, on one field, on every page.

            Below xl the copy runs the full width, so the ramp would leave its
            right-hand end unwashed — that breakpoint gets a flat wash instead.
          */}
          <div aria-hidden className="absolute inset-0 bg-white/85 xl:hidden" />
          <div
            aria-hidden
            className="absolute inset-0 hidden xl:block"
            style={{
              background:
                "linear-gradient(to right, rgb(255 255 255 / 0.93) 0%, rgb(255 255 255 / 0.88) 45%, rgb(255 255 255 / 0) 80%)",
            }}
          />
        </>
      )}

      {/* One vertical mechanism for all six: centre the copy in the band below
          the fixed 95px nav. The old `pt-[255px] / [286px] / [356px]` stacks
          each needed re-tuning at every breakpoint. */}
      <div className="canvas relative flex h-full flex-col justify-center px-6 pt-[95px] xl:px-[212px]">
        <Title className={`${s.measure} ${s.title} font-bold ${text}`}>
          {title}
        </Title>
        {body && (
          <p className={`${s.measure} ${s.body} font-normal ${text}`}>{body}</p>
        )}
        {children}
      </div>
    </section>
  );
}
