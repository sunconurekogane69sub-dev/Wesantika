"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A looping background video for a hero, with the poster frame as the fallback.
 *
 * Four things this has to get right, none of which a bare `<video autoplay>`
 * does:
 *
 * 1. **`prefers-reduced-motion`, and viewport width.** A looping clip behind a
 *    headline is exactly the continuous movement that setting exists to stop,
 *    and on a narrow screen it is also 19-31MB nobody asked for. Either gate
 *    shows the poster and never requests the file.
 * 2. **`muted` and `playsInline`.** Without both, mobile Safari refuses to
 *    autoplay and iOS takes the video fullscreen on play.
 * 3. **Autoplay can still be refused** — by a battery saver, a data-saver mode,
 *    or a browser policy. `play()` returns a promise; if it rejects, the poster
 *    stays and nothing looks broken.
 * 4. **It is decoration.** `aria-hidden`, and nothing in the hero's meaning
 *    depends on it.
 */
/**
 * Below this width the video is never requested and the poster stands in.
 *
 * Not a design choice — a cost one. These clips are stock-download originals at
 * 12-16 Mbps, and the three page heroes are 19-31MB each. On a phone that is a
 * measurable amount of somebody's data allowance spent on decoration they will
 * have scrolled past before it starts. Desktop-only hero video is the standard
 * mitigation and it is the only one available without an encoder.
 */
const MIN_WIDTH = 1024;

export function HeroVideo({
  src,
  objectPosition,
  className = "",
}: {
  src: string;
  /**
   * Must match the still underneath, exactly.
   *
   * This was missing, and it was the whole bug behind "the static image appears
   * briefly". The `<Image>` beneath was cropped at its measured position — the
   * Our Work hero at `50% 0%`, About at `50% 50%` — while the video defaulted to
   * centre. So the first frame of playback landed on a different crop and the
   * hero visibly jumped. It was never a loading delay; it was a position shift.
   */
  objectPosition: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  /** Flipped on the `playing` event, so the fade starts when frames do. */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    const apply = () => setPlay(!motion.matches && wide.matches);
    apply();
    motion.addEventListener("change", apply);
    wide.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      wide.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !play) return;

    // The source is assigned here rather than rendered as a `<source>` child.
    // Adding a child to a `<video>` after mount does not make the browser fetch
    // it — the spec only re-runs resource selection on `load()` — so a
    // conditionally rendered `<source>` produces a video element that never
    // plays and a poster that never moves.
    el.src = src;
    el.load();

    // Autoplay can still be refused: battery saver, data saver, or policy.
    // The poster is already showing, so a rejection needs no handling.
    void el.play().catch(() => {});
  }, [play, src]);

  return (
    <video
      ref={ref}
      aria-hidden
      // No `poster`. The still is already rendered underneath as a real
      // `<Image>` — with priority, sizing and format negotiation — so a poster
      // here would be the same picture decoded a second time, and it would be
      // the thing that flashes.
      muted
      loop
      playsInline
      onPlaying={() => setVisible(true)}
      // No `src` and no `preload` until the effect has confirmed both gates,
      // so a phone or a reduced-motion user never requests the file at all.
      preload="none"
      style={{ objectPosition }}
      // Fades up over the still rather than replacing it. With the crop now
      // identical on both, the dissolve has nothing to reveal but motion.
      className={`${className} transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
