/* eslint-disable @next/next/no-img-element */

/**
 * SVG icons exported from Figma are served straight from /public.
 * They deliberately bypass next/image: the optimiser refuses SVG unless
 * `dangerouslyAllowSVG` is enabled, and vectors gain nothing from it anyway.
 */
export function Icon({
  src,
  alt = "",
  width,
  height,
  className,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      aria-hidden={alt === "" || undefined}
      draggable={false}
    />
  );
}
