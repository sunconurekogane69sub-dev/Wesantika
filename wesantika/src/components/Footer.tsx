import type { Dictionary } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

/**
 * Footer — Figma 180:727 (Top) / 210:931 (About Us). Identical on both pages.
 *
 * One fix applied: the heading is #000000 in Figma, sitting on the #062a52 navy
 * panel, which makes it unreadable. It is white here.
 */
export function Footer({ strings }: { strings: Dictionary["footer"] }) {
  return (
    // scroll-mt clears the now-fixed 95px nav when #contact is jumped to.
    <footer id="contact" className="w-full scroll-mt-[95px]">
      <div className="w-full bg-navy-900">
        <div className="canvas flex flex-col gap-12 px-6 pt-[80px] pb-[100px] xl:flex-row xl:gap-[142px] xl:pt-[156px] xl:pr-[208px] xl:pl-[160px]">
          <div className="xl:mt-[100px] xl:max-w-[636px]">
            <h2 className="text-[36px] leading-[44px] font-bold text-white">
              {strings.heading}
            </h2>
            <p className="mt-[10px] text-[20px] leading-[24px] font-normal text-white">
              {strings.subtitle}
            </p>
          </div>

          <div className="w-full xl:w-[526px] xl:shrink-0">
            <ContactForm strings={strings} />
          </div>
        </div>
      </div>

      <div className="w-full bg-navy-950">
        <div className="canvas flex flex-col gap-2 px-6 py-[44px] sm:flex-row sm:items-center sm:justify-between xl:px-[160px]">
          <p className="text-[24px] leading-[29px] font-normal text-white">
            {strings.copyright}
          </p>
          <a
            href="#"
            className="text-[24px] leading-[29px] font-normal text-white underline-offset-4 hover:underline"
          >
            {strings.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
