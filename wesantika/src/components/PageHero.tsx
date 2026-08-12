import Image from "next/image";
import { HeroVideo } from "./HeroVideo";

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
  video,
  objectPosition,
  size = "page",
  title,
  body,
  titleAs: Title = "h1",
  children,
}: {
  /** Also the video's poster frame, and the fallback under reduced motion. */
  image: string;
  /** Optional looping background video, layered over the poster image. */
  video?: string;
  /** CSS object-position. Chosen per image by measurement, not by eye. */
  objectPosition: string;
  size?: HeroSize;
  title: string;
  body?: string;
  /** About's hero lead is not the page's h1 — that heading sits below it. */
  titleAs?: "h1" | "p";
  /** A CTA, rendered under the body copy. */
  children?: React.ReactNode;
}) {
  const s = SIZE[size];

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

      {video && (
        <HeroVideo
          src={video}
          poster={image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/*
        One treatment for all six heroes: white type on a black gradient falling
        away to the right.

        The strength is not a taste decision — it is what makes the type legible
        over content that cannot be measured. Five of these images are pale
        enough that white on them unaided is around 1.5:1, and the Our Work hero
        is now a video whose frames no decoder here can read.

        So the ramp is set against the **worst possible ground, pure white**:

          alpha 0.50  ->  3.95:1   fails AA
          alpha 0.55  ->  4.74:1   passes, no margin
          alpha 0.60  ->  5.74:1   passes with margin      <- held across the copy
          alpha 0.78  ->  9.9:1                            <- at the left edge

        The copy column ends at roughly 50% of the frame, so it never sees less
        than 0.60 and the guarantee holds whatever is behind it — a bright frame,
        a dark one, or a photograph nobody has audited. Past 50% the gradient
        releases so the artwork still arrives at full strength on the right,
        which is where all six put their subject.
      */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgb(0 0 0 / 0.78) 0%, rgb(0 0 0 / 0.60) 50%, rgb(0 0 0 / 0) 85%)",
        }}
      />

      {/* One vertical mechanism for all six: centre the copy in the band below
          the fixed 95px nav. The old `pt-[255px] / [286px] / [356px]` stacks
          each needed re-tuning at every breakpoint. */}
      <div className="canvas relative flex h-full flex-col justify-center px-6 pt-[95px] xl:px-[212px]">
        <Title className={`${s.measure} ${s.title} font-bold text-white`}>
          {title}
        </Title>
        {body && (
          <p className={`${s.measure} ${s.body} font-normal text-white`}>{body}</p>
        )}
        {children}
      </div>
    </section>
  );
}
