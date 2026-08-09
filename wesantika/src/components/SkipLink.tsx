/**
 * Keyboard users land on the nav on every page load. Without this they tab
 * through the logo, six nav items, the locale switcher and the CTA before
 * reaching any content — on every navigation.
 *
 * Visually hidden until focused, then it pins itself over the nav. It is the
 * first focusable thing in the document, which is the only position that works.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-[16px] focus:left-[16px] focus:z-[100] focus:inline-flex focus:h-[46px] focus:items-center focus:rounded-btn focus:bg-brand-btn focus:px-[24px] focus:text-[16px] focus:leading-[19px] focus:font-bold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
    >
      {label}
    </a>
  );
}
