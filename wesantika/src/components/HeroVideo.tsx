"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A looping background video for a hero. **There is no still image behind it.**
 *
 * The stills were removed on request: heroes are video only. What stands in
 * before the first frame decodes is a flat dark ground, which the black gradient
 * over the top makes indistinguishable from a dark frame — so the hero is never
 * a hole, it is just dark for a moment.
 *
 * ---------------------------------------------------------------------------
 * The bug this file has now had twice, written down so it is not had a third
 * time: **the video was not playing at all.**
 *
 * The previous version did this:
 *
 *     el.src = src;
 *     el.load();
 *     void el.play().catch(() => {});
 *
 * `load()` aborts any pending play promise. Calling it and then `play()` in the
 * same tick means `play()` is rejected — and the `.catch(() => {})` swallowed
 * the rejection, so the failure was completely silent. The still stayed up
 * forever and it looked like a loading problem.
 *
 * Two corrections:
 *
 *  - **No `load()`.** Assigning `.src` already invokes the resource selection
 *    algorithm. `load()` adds nothing except the abort.
 *  - **Play on `canplay`, not immediately.** A media element with
 *    `readyState === HAVE_NOTHING` has nothing to play yet, so the first attempt
 *    is a race. `autoplay` is also set imperatively, which is the path browsers
 *    treat as the well-trodden one for muted background video.
 * ---------------------------------------------------------------------------
 *
 * The rest of what this has to get right, none of which a bare
 * `<video autoplay>` does:
 *
 * 1. **`prefers-reduced-motion`.** A looping clip behind a headline is exactly
 *    the continuous movement that setting exists to stop. The file still loads
 *    and the first frame still shows; it simply never plays.
 * 2. **`muted` and `playsInline`.** Without both, mobile Safari refuses to
 *    autoplay and iOS takes the video fullscreen on play.
 * 3. **Autoplay can still be refused** — battery saver, data saver, or policy.
 *    The loaded first frame stays on screen, so a refusal degrades to a still.
 * 4. **It is decoration.** `aria-hidden`, and nothing depends on it.
 */

export function HeroVideo({
  src,
  objectPosition,
  className = "",
}: {
  src: string;
  /**
   * Must match the still underneath, exactly. When it did not, the still was
   * cropped at its measured position while the video defaulted to centre, and
   * the hero visibly jumped on the first frame of playback.
   */
  objectPosition: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  /** Flipped on `loadeddata` — the first decodable frame, playing or paused. */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
      The width gate is gone.

      It existed so phones would fall back to the still rather than pull 19-31MB.
      With the still removed the fallback no longer exists, so gating by width
      would leave a phone looking at an empty hero — which is worse than the data
      cost it was avoiding. The cost is real and unchanged; the fix for it is an
      encoder, not a media query. `npm run media` stays red until then.
    */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.muted = true;
    el.preload = "auto";
    // Under reduced motion the file still loads and the first frame still
    // shows — it simply never plays. A frozen frame is not motion, and it is
    // the only way to honour the setting now that there is no still beneath.
    el.autoplay = !reduced;

    const start = () => {
      if (reduced) return;
      // A rejection here means the browser refused — battery saver, data saver,
      // policy. The first frame is already showing, so it degrades to a still.
      void el.play().catch(() => {});
    };

    el.addEventListener("canplay", start);
    // Assigning src runs resource selection on its own. No load() — see above.
    el.src = src;
    if (el.readyState >= 2) start();

    return () => el.removeEventListener("canplay", start);
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden
      loop
      muted
      playsInline
      onLoadedData={() => setVisible(true)}
      // No `poster`. There is no still layer any more — a poster would be a
      // second decode of a picture nobody asked to see.
      preload="none"
      style={{ objectPosition }}
      className={`${className} transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
