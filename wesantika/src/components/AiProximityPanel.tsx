"use client";

import { HeroVideo } from "./HeroVideo";
import { useEffect, useRef, useState } from "react";
import { AI_LABELS, AI_PANEL } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

/** How far the cursor's influence reaches, in panel design px. */
const INFLUENCE_RADIUS = 300;

/** The label rises as the cursor nears it — the movement the eye reads first. */
const MAX_LIFT = 28;
/** And leans towards the pointer, so the row feels like it is tracking you. */
const MAX_LEAN = 20;
/** Scale supports the lift rather than replacing it. */
const MAX_SCALE = 1.38;

/**
 * Resting opacity of a label the cursor is nowhere near.
 *
 * This is what turns proximity into a *spotlight*: the focused label does not
 * only grow, everything else recedes, and the contrast between the two is what
 * the eye actually registers. Prominence by subtraction as well as addition.
 *
 * 0.70 is not a taste value. Labels are 20px bold, so they need 3.0:1, and
 * against the worst case there is — a pure white video frame under the scrim —
 * 0.70 measures 3.23:1 and full white measures 4.74:1. Dimming further reads
 * better and stops passing: at the old 45% scrim even 0.80 fell to 2.74:1,
 * which is why the scrim went to 55% in the same change.
 */
const REST_OPACITY = 0.7;

const BASE_TRANSFORM = "translate(-50%, -50%) scale(1)";

/**
 * AI Innovation panel — Figma 180:752-761.
 *
 * The nine labels sit on a 1564 x 1006 stage that is scaled to fit the viewport,
 * so every coordinate and font size stays exactly as authored.
 *
 * Each label is positioned by its *centre* and every line is `nowrap`, with the
 * lines supplied explicitly by the dictionary. Wrapping is therefore decided by
 * the catalogue rather than by font metrics — which is what had pushed
 * "Advanced AI Engineering" onto three lines instead of two, and which also
 * keeps the layout predictable once the labels are translated.
 *
 * **The gesture is a slide, not a zoom.** As the cursor approaches, a label
 * lifts, leans towards the pointer, firms up very slightly, and grows an
 * underline that wipes in from the left. All four are driven by one eased
 * proximity value, so they arrive together and leave together.
 *
 * The lower-left item is deliberately inert — no movement, no underline, no
 * pointer cursor. It reads as the section's own label rather than one of the
 * capabilities.
 */
export function AiProximityPanel({ labels }: { labels: Dictionary["ai"]["labels"] }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const rulesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const [fit, setFit] = useState(1);

  // Fit the design stage to whatever width the section gives us.
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? AI_PANEL.width;
      setFit(width / AI_PANEL.width);
    });
    observer.observe(surface);
    return () => observer.disconnect();
  }, []);

  // Distance-weighted slide + underline.
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;
    let pointer: { x: number; y: number } | null = null;

    const paint = () => {
      frame = null;
      const rect = surface.getBoundingClientRect();
      if (rect.width === 0) return;

      // client px -> panel design px
      const ratio = AI_PANEL.width / rect.width;

      AI_LABELS.forEach((label, index) => {
        const el = labelsRef.current[index];
        const rule = rulesRef.current[index];
        if (!el || label.fixed) return;

        if (!pointer) {
          el.style.transform = BASE_TRANSFORM;
          el.style.zIndex = "10";
          el.style.opacity = String(REST_OPACITY);
          el.style.textShadow = "0 2px 10px rgb(0 0 0 / 0.30)";
          if (rule) {
            rule.style.transform = "scaleX(0)";
            rule.style.opacity = "0";
          }
          return;
        }

        const px = (pointer.x - rect.left) * ratio;
        const py = (pointer.y - rect.top) * ratio;
        const distance = Math.hypot(px - label.cx, py - label.cy);

        const t = Math.max(0, 1 - distance / INFLUENCE_RADIUS);
        const eased = t * t * (3 - 2 * t); // smoothstep

        // Lean is signed by which side the cursor is on, and clamped so a
        // pointer far off to one side does not fling the label across the panel.
        const lean =
          Math.max(-1, Math.min(1, (px - label.cx) / INFLUENCE_RADIUS)) *
          MAX_LEAN *
          eased;
        const lift = -MAX_LIFT * eased;
        const scale = 1 + (MAX_SCALE - 1) * eased;

        el.style.transform =
          `translate(calc(-50% + ${lean.toFixed(2)}px), calc(-50% + ${lift.toFixed(2)}px))` +
          ` scale(${scale.toFixed(4)})`;
        el.style.zIndex = String(10 + Math.round(eased * 20));
        el.style.opacity = (REST_OPACITY + (1 - REST_OPACITY) * eased).toFixed(3);
        // The glow arrives with the lift rather than as a separate hover state,
        // so the label reads as lit rather than as merely bigger.
        el.style.textShadow =
          `0 2px 10px rgb(0 0 0 / ${(0.3 + 0.25 * eased).toFixed(2)}), ` +
          `0 0 ${(18 * eased).toFixed(1)}px rgb(0 174 247 / ${(0.75 * eased).toFixed(2)})`;

        if (rule) {
          rule.style.transform = `scaleX(${eased.toFixed(3)})`;
          rule.style.opacity = eased.toFixed(3);
        }
      });
    };

    const schedule = () => {
      frame ??= requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    // Paint the resting state once on mount. Without this the labels render at
    // full opacity from the JSX and only drop to REST_OPACITY on the first
    // pointer move — a visible pop the moment the cursor enters the section.
    //
    // It also has to happen *here* rather than in the JSX, because this effect
    // returns early under prefers-reduced-motion. A reduced-motion visitor gets
    // no dimming at all, which is right: with no interaction to light a label
    // back up, a permanently dimmed label is just a worse label.
    schedule();

    surface.addEventListener("pointermove", onMove);
    surface.addEventListener("pointerleave", onLeave);
    return () => {
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={surfaceRef}
      className="relative w-full overflow-hidden rounded-hero-panel"
      style={{ aspectRatio: `${AI_PANEL.width} / ${AI_PANEL.height}` }}
    >
      {/* Video only here too. The dark ground stands in until the first frame,
          and the scrim over it means the transition is barely a change. */}
      <div aria-hidden className="absolute inset-0 bg-shell-950" />
      <HeroVideo
        src="/video/ai-panel.mp4"
        objectPosition="50% 50%"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/*
        A flat scrim, and its strength is arithmetic rather than taste.

        Every label here is 20px bold (one is 32px), which puts them over the
        18.66px-bold line and so under the 3.0:1 large-text threshold rather than
        4.5:1. White at 3.0:1 needs the ground no lighter than mid-grey, and a
        55% black veil delivers 4.74:1 for a lit label and 3.23:1 for a resting
        one against the worst case there is — a pure white video frame. Since no decoder here can read the clip's frames, that
        worst-case guarantee is the only kind worth having.

        It went 45% -> 55% when the labels started dimming at rest. At 45% a
        resting label measured 2.74:1, under the line; the extra veil is what
        pays for the spotlight.
      */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />

      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: AI_PANEL.width,
          height: AI_PANEL.height,
          transform: `scale(${fit})`,
        }}
      >
        {AI_LABELS.map((label, index) => {
          const lines = labels[label.id as keyof typeof labels] ?? [label.id];
          return (
            <span
              key={label.id}
              ref={(el) => {
                labelsRef.current[index] = el;
              }}
              style={{
                left: label.cx,
                top: label.cy,
                fontSize: label.fontSize,
                lineHeight: `${label.lineHeight}px`,
                transform: BASE_TRANSFORM,
              }}
              className={`absolute z-10 block text-center font-bold text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.28)]${
                label.fixed
                  ? ""
                  : // cursor-pointer on request. The labels are not links, so
                    // this is the one place the site promises interactivity it
                    // does not have — see the note in README.
                    " cursor-pointer transition-[transform,opacity] duration-200 ease-out will-change-transform"
              }`}
            >
              {lines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}

              {/*
                The underline. `scaleX` from a left origin, so it wipes in rather
                than fading, and it is driven by the same eased value as the
                slide — that is what makes the two read as one gesture.

                Inside the label, so it inherits the lift and the lean and
                travels with the text instead of being left behind.
              */}
              {!label.fixed && (
                <span
                  aria-hidden
                  ref={(el) => {
                    rulesRef.current[index] = el;
                  }}
                  className="mt-[8px] block h-[3px] origin-left rounded-full bg-brand-cta opacity-0 transition-[transform,opacity] duration-150 ease-out will-change-transform"
                  style={{ transform: "scaleX(0)" }}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
