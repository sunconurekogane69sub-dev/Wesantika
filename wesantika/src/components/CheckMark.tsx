import { Icon } from "./Icon";

/**
 * The `ei:check` mark used beside the Technologies capability paragraphs
 * (Figma 479:43/47/51 and 508:65, 27.8px in brand blue).
 *
 * Exported from the component at 422:6; the blue is baked into the SVG, so it
 * needs no colour inheritance.
 */
export function CheckMark({ className = "" }: { className?: string }) {
  return (
    <Icon
      src="/icons/icon-check.svg"
      width={28}
      height={28}
      className={`h-[28px] w-[28px] object-contain ${className}`}
    />
  );
}
