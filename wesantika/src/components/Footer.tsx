import { HEAD_OFFICE } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

/**
 * Footer — Figma 180:727 (Top) / 210:931 (About Us). Identical on both pages.
 *
 * One fix applied: the heading is #000000 in Figma, sitting on the #062a52 navy
 * panel, which makes it unreadable. It is white here.
 */
export function Footer({
  strings,
  office,
  withForm = true,
}: {
  strings: Dictionary["footer"];
  /** Only the label is translated; the address itself never is. */
  office: Dictionary["contact"]["office"];
  /**
   * The Contact page carries its own form, and two identical forms on one page
   * is worse than one — it makes "Send Message" ambiguous in a screen reader's
   * form list. That page drops the panel and keeps only the copyright bar.
   */
  withForm?: boolean;
}) {
  return (
    // scroll-mt clears the now-fixed 95px nav when #contact is jumped to.
    <footer id="contact" className="w-full scroll-mt-[95px]">
      {withForm && (
        <div className="w-full bg-navy-900">
          {/*
            This panel was 958px tall — taller than the viewport of a 1440x900
            laptop, for a footer. It is now ~520px, from four changes, none of
            which removes anything the reader was using:

              padding   156/100 -> 88/88
              heading    36/44  -> 30/38, and the sub-head 20/24 -> 17/26
                                   (20px on 24px leading is 1.2 — cramped)
              fields     five stacked rows -> two paired rows + the message
              gutter     pl-160/pr-208 -> 212 both sides, the site's gutter,
                                   which is also what the heroes above now use
          */}
          <div className="canvas grid gap-[40px] px-6 py-[72px] xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-[80px] xl:px-[212px] xl:py-[88px]">
            <div className="xl:max-w-[520px] xl:self-center">
              <h2 className="text-[26px] leading-[34px] font-bold text-white xl:text-[30px] xl:leading-[38px]">
                {strings.heading}
              </h2>
              <p className="mt-[14px] text-[16px] leading-[26px] font-normal text-white/80 xl:text-[17px]">
                {strings.subtitle}
              </p>
            </div>

            {/* The head office, on every page that carries the footer panel.
                A postal address is the ordinary way a B2B visitor checks that a
                supplier is a real company in a real place, and it is the one
                piece of contact information that was missing everywhere.

                Not translated — see the note in src/lib/content.ts. */}
            <address className="mt-[24px] block not-italic xl:mt-[28px]">
              <p className="text-[13px] leading-[16px] font-bold tracking-[0.02em] text-white/70">
                {office.heading}
              </p>
              <p className="mt-[8px] text-[15px] leading-[24px] font-normal text-white/85">
                {HEAD_OFFICE.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
          </div>

          <div className="w-full">
          </div>
        </div>
      )}

      <div className="w-full bg-navy-950">
        <div className="canvas flex flex-col gap-2 px-6 py-[26px] sm:flex-row sm:items-center sm:justify-between xl:px-[212px]">
          {/* 24px for a copyright line was competing with the page's own
              headings. 15px is what a legal line is meant to be. */}
          <p className="text-[15px] leading-[22px] font-normal text-white/70">
            {strings.copyright}
          </p>
          {/*
            The design puts a "Privacy Policy" link here. It has no destination,
            and a privacy policy is a legal document about how this company
            actually handles data — not something to invent. The link is held
            back rather than shipped pointing at "#", where it would be a dead
            link on all 117 pages and, worse, imply a policy exists.

            To restore it once real text is written: add /[locale]/privacy and
            render `strings.privacy` (already translated in all five
            dictionaries) as a Link to it.
          */}
        </div>
      </div>
    </footer>
  );
}
