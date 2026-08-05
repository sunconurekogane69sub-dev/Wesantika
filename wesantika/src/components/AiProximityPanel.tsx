"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AI_LABELS, AI_PANEL } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

/** How far the cursor's influence reaches, in panel design px. */
const INFLUENCE_RADIUS = 300;
/** Scale applied to a label the cursor sits directly on. */
const MAX_SCALE = 1.6;

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
 * Labels magnify as the cursor approaches, weighted by distance. The lower-left
 * item is deliberately inert: it reads as the section's own label rather than one
 * of the capabilities.
 */
export function AiProximityPanel({ labels }: { labels: Dictionary["ai"]["labels"] }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<Array<HTMLSpanElement | null>>([]);
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

  // Distance-weighted magnification.
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
        if (!el || label.fixed) return;

        if (!pointer) {
          el.style.transform = BASE_TRANSFORM;
          el.style.zIndex = "10";
          return;
        }

        const px = (pointer.x - rect.left) * ratio;
        const py = (pointer.y - rect.top) * ratio;
        const distance = Math.hypot(px - label.cx, py - label.cy);

        const t = Math.max(0, 1 - distance / INFLUENCE_RADIUS);
        const eased = t * t * (3 - 2 * t); // smoothstep
        const scale = 1 + (MAX_SCALE - 1) * eased;

        el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
        el.style.zIndex = String(10 + Math.round(eased * 20));
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
      <Image
        src="/images/ai-panel.png"
        alt=""
        fill
        sizes="(max-width: 1672px) 100vw, 1564px"
        className="object-cover"
      />

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
                  : " transition-transform duration-100 ease-out will-change-transform"
              }`}
            >
              {lines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </span>
          );
        })}
      </div>
    </div>
  );
}
