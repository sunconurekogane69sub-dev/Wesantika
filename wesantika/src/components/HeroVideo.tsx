"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A looping background video for a hero, with the poster frame as the fallback.
 *
 * Four things this has to get right, none of which a bare `<video autoplay>`
 * does:
 *
 * 1. **`prefers-reduced-motion`.** A ten-second loop running behind a headline
 *    is exactly the kind of continuous movement that setting exists to stop.
 *    Under it the poster frame is shown and the video is never started, so the
 *    bytes are not fetched either.
 * 2. **`muted` and `playsInline`.** Without both, mobile Safari refuses to
 *    autoplay and iOS takes the video fullscreen on play.
 * 3. **Autoplay can still be refused** — by a battery saver, a data-saver mode,
 *    or a browser policy. `play()` returns a promise; if it rejects, the poster
 *    stays and nothing looks broken.
 * 4. **It is decoration.** `aria-hidden`, and nothing in the hero's meaning
 *    depends on it.
 */
export function HeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotionOk(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOk) return;

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
  }, [motionOk, src]);

  return (
    <video
      ref={ref}
      aria-hidden
      poster={poster}
      muted
      loop
      playsInline
      // No `src` and no `preload` until the effect has confirmed motion is
      // allowed, so under `prefers-reduced-motion` the file is never requested.
      preload="none"
      className={className}
    />
  );
}
