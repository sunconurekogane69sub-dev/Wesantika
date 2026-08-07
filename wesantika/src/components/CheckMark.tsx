/**
 * Stand-in for the `ei:check` instances on the Technologies page
 * (Figma 479:43/47/51 and 508:65, a 27.8px mark in brand blue).
 *
 * Drawn inline rather than exported: Figma's image API was rate limiting
 * throughout this work. Swap for the real export when it is available.
 */
export function CheckMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={28}
      height={28}
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        d="M5.5 14.5 L11 20 L22.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
