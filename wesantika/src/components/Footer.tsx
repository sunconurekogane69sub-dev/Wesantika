import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, OFFICES, serviceDetailHref } from "@/lib/content";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";
import { Copyright } from "./Copyright";

/**
 * Footer — Figma 180:727 (Top) / 210:931 (About Us). Identical on both pages.
 *
 * One fix applied: the heading is #000000 in Figma, sitting on the #062a52 navy
 * panel, which makes it unreadable. It is white here.
 *
 * **It carries navigation now.** It previously had none at all — a pitch, a
 * form, an address and a copyright line, and no way to get anywhere. That is the
 * first thing a footer is for: it is where people look when the page they are on
 * has not answered their question, and on a site of 122 routes behind five
 * locale prefixes it is also how a crawler finds the depth.
 *
 * Three columns, chosen to match how the site is actually shaped:
 *
 *   Explore    every page that exists, from NAV_ITEMS plus Contact
 *   Services   six of the seventeen write-ups — the ones a visitor is most
 *              likely to be looking for, since linking all seventeen would make
 *              the footer taller than the pages above it
 *
 * A third column listing the four contact channels was here and has been
 * removed: `StickyContactRail` carries the same four on every page, and the
 * Contact page spells them out in full. Three places for one list is two too
 * many.
 *
 * Every label is already translated — nav labels from `nav`, service names from
 * `serviceNames` — so this added no new copy beyond the two column headings.
 */

/**
 * The six service write-ups surfaced in the footer. Ordered by how commonly they
 * are the reason someone arrives, not alphabetically.
 */
const FOOTER_SERVICES = [
  "custom",
  "ai",
  "web",
  "mobile",
  "cloud",
  "qa",
] as const;

export function Footer({
  strings,
  office,
  nav,
  serviceNames,
  locale,
  withForm = true,
}: {
  /** The copyright line picks its decorative face by script. */
  locale: Locale;
  strings: Dictionary["footer"];
  /** Only the label is translated; the address itself never is. */
  office: Dictionary["contact"]["office"];
  /** Reused for the Explore column — already translated, so no new copy. */
  nav: Dictionary["nav"];
  /**
   * Service names for the Services column.
   *
   * These come from the offer cards, not from `serviceDetails[id].eyebrow`,
   * which is the *back-link* label on a detail page and is the literal string
   * "Services" on all seventeen — so the column rendered "Services" six times
   * over. The offer titles are the actual service names and are translated in
   * all five locales.
   */
  serviceNames: Dictionary["servicesPage"]["offer"]["cards"];
  /**
   * The Contact page carries its own form, and two identical forms on one page
   * is worse than one — it makes "Send Message" ambiguous in a screen reader's
   * form list. That page drops the panel and keeps only the copyright bar.
   */
  withForm?: boolean;
}) {
  const linkClass =
    "text-[15px] leading-[26px] text-white/70 transition-colors hover:text-white focus-visible:text-white";
  const headingClass =
    "text-[13px] leading-[20px] font-bold tracking-[0.08em] text-brand-cta uppercase";
  return (
    // scroll-mt clears the now-fixed 95px nav when #contact is jumped to.
    <footer id="contact" className="w-full scroll-mt-[95px]">
      {withForm && (
        <div className="w-full bg-shell-900">
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
          <div className="canvas grid gap-[40px] gutter py-[72px] xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-[80px] xl:py-[88px]">
            <div className="xl:max-w-[520px] xl:self-center">
              <h2 className="text-[26px] leading-[34px] font-bold text-white xl:text-[30px] xl:leading-[38px]">
                {strings.heading}
              </h2>
              <p className="mt-[14px] text-[16px] leading-[26px] font-normal text-white/80 xl:text-[17px]">
                {strings.subtitle}
              </p>

              {/* The offices, on every page that carries the footer panel.
                  A postal address is the ordinary way a B2B visitor checks that
                  a supplier is a real company in a real place, and it is the one
                  piece of contact information that was missing everywhere.

                  It belongs in this column, under the pitch — not as a third
                  grid child, which is where it first landed and which pushed the
                  form out of the layout entirely.

                  Two across from 480px up. Stacked, two addresses push the form
                  most of a screen further down on a phone; side by side they
                  cost four lines instead of eight, and each is only three lines
                  long so neither column gets cramped. `min-[480px]` rather than
                  `sm` because the pair still fits comfortably at 480 and that is
                  where most of the phone range actually is.

                  Not translated — see the note in src/lib/content.ts. */}
              <div className="mt-[24px] grid gap-[20px] min-[480px]:grid-cols-2 xl:mt-[28px]">
                {OFFICES.map((o) => (
                  <address key={o.id} className="block not-italic">
                    <p className="text-[13px] leading-[20px] font-bold tracking-[0.02em] text-white/70">
                      {office.names[o.id]}
                    </p>
                    <p className="mt-[8px] text-[15px] leading-[24px] font-normal text-white/85">
                      {o.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </address>
                ))}
              </div>
            </div>

            <div className="w-full">
              <ContactForm strings={strings} />
            </div>
          </div>
        </div>
      )}

      {/* ---------- navigation ----------
          Three columns on the same navy as the panel above, separated by a
          hairline rather than a colour change: this is the same surface, a
          different job. */}
      <div className="w-full bg-shell-900">
        <div className="canvas gutter">
          <div className="h-px w-full bg-white/10" aria-hidden />

          <nav
            aria-label={strings.navHeading}
            className="grid gap-[36px] py-[48px] sm:grid-cols-2 xl:grid-cols-[1fr_1.4fr_auto] xl:gap-[48px] xl:py-[56px]"
          >
            <div>
              <h2 className={headingClass}>{strings.navHeading}</h2>
              <ul className="mt-[16px] flex flex-col gap-[6px]">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className={linkClass}
                    >
                      {nav[item.id]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/${locale}/contact`} className={linkClass}>
                    {nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className={headingClass}>{strings.servicesHeading}</h2>
              <ul className="mt-[16px] flex flex-col gap-[6px]">
                {FOOTER_SERVICES.map((id) => (
                  <li key={id}>
                    <Link href={serviceDetailHref(locale, id)} className={linkClass}>
                      {serviceNames[id].title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${locale}/services`}
                    className={`${linkClass} font-bold text-white/85`}
                  >
                    {nav.solution}
                    <span aria-hidden> →</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* The wordmark closes the footer. `logo-bright.png` is the one with
                a genuinely transparent background — the other is opaque white,
                which is why it cannot go on navy. */}
            <div className="sm:col-span-2 xl:col-span-1 xl:justify-self-end">
              <Link
                href={`/${locale}`}
                className="relative block h-[27px] w-[109px]"
                aria-label="Wesantika"
              >
                <Image
                  src="/images/logo-bright.png"
                  alt="Wesantika"
                  fill
                  sizes="109px"
                  className="object-contain"
                />
              </Link>
            </div>
          </nav>
        </div>
      </div>


      <div className="w-full bg-shell-950">
        <div className="canvas flex flex-col gap-2 gutter py-[22px] sm:flex-row sm:items-center sm:justify-between">
          <Copyright text={strings.copyright} locale={locale} />
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
