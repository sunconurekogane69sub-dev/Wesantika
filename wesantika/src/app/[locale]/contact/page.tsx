import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Nav } from "@/components/Nav";
import { HeroCta } from "@/components/HeroCta";
import { PageHero } from "@/components/PageHero";
import { RfpDialog } from "@/components/RfpDialog";
import {
  CONTACT_CHANNELS,
  CONTACT_STEP_IDS,
  HEAD_OFFICE,
  HEAD_OFFICE_MAP_URL,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/locales";
import { socialMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    ...socialMetadata(locale, "/contact"),
  };
}

/**
 * Contact — the one page in the site with no Figma artboard behind it.
 *
 * It is built around a single observation: the six "Contact Us" buttons that
 * used to jump to the footer form all sent people to the same five fields, no
 * matter what they were asking. A company with a signed-off RFP and a founder
 * with an unnamed problem need different front doors, so the page opens with
 * two and lets the visitor self-select. The RFP route reuses the existing
 * dialog rather than duplicating its upload and Turnstile handling.
 *
 * `contact-hero.png` is pale on the left third — measured, not eyeballed — so
 * the heading is black with no wash. `scripts/ink-audit.mjs` covers the region.
 *
 * The footer renders without its form here: two identical forms on one page is
 * a worse experience than one, and it would make the "Send Message" button
 * ambiguous to anyone using a screen reader's form list. `StickyContactRail` is
 * absent for the same reason — the four channels it hides behind hover are
 * spelled out in the sidebar, so the rail would only cover them up.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const c = t.contact;

  return (
    <>
      <Nav locale={locale} nav={t.nav} />

      <main id="main-content">
        {/* ---------- hero ----------
            `figure`, not `page`. The photograph has a person in it who runs from
            y80 to the bottom edge of the file — 91% of its height — so a fixed
            height cropped 329 source rows off her whatever the object-position
            was, and `50% 30%` in particular cut the top of her head. The hero
            now takes the image's own ratio and shows the composition whole.

            Where she is, measured off the pixels rather than judged by eye. She
            is the only dark mass in a frame that is pale everywhere else, so a
            luminance threshold isolates her: hair and navy suit run **x 865 to
            1471** of 1731, with a trough at 1211-1254 where her white shirt
            shows between the lapels. The dark past x1514 is the chair and the
            window mullions, not her. Add the outstretched hand, which is skin
            against sky and so invisible to that threshold, and the subject is
            **x 830-1471, centred on x 1150 — 66.5% of the width**.

            That is not the object-position, though, and the difference is the
            whole point. `object-position: X%` aligns X% of the image with X% of
            the box, so the visible window's centre lands at
            (X * overflow + boxWidth / 2) / scaledWidth. Solving that for a
            window centred on x1150 gives a number that climbs as the viewport
            widens, because the overflow being distributed shrinks:

              320px   77%     visible source 824-1485, she sits at 50.3%
              375px   80%                    765-1540              49.9%
              414px   84%                    736-1591              48.4%
              640px  100%                    612-1731              48.1%   (h 520)
              990px+  n/a     box matches the ratio, nothing is cropped

            The old single 65% put her at 58% of the frame and cut 74 source
            pixels off her right shoulder. Below 990px she is now within 3% of
            centre at every phone width and never clipped; from 990px up the
            hero is the image's own ratio, so there is no crop to position and
            the value stops mattering. */}
        <PageHero
          image="/images/contact-hero.png"
          size="figure"
          objectPosition="65% 20%"
          objectPositionClass={[
            "[object-position:77%_20%]",
            "min-[360px]:[object-position:80%_20%]",
            "min-[400px]:[object-position:84%_20%]",
            "sm:[object-position:100%_20%]",
            // Past here nothing is cropped horizontally; back to the documented
            // value so the prop and the class agree about the desktop hero.
            "lg:[object-position:65%_20%]",
          ].join(" ")}
          title={c.heroTitle}
          body={c.heroBody}
        >
          {/* Same page, not another one: `#message` is the form section below,
              which already carries `scroll-mt-[95px]` so the fixed nav does not
              cover its heading on arrival. */}
          <HeroCta href="#message" className="mt-[28px] xl:mt-[32px]">
            {c.heroCta}
          </HeroCta>
        </PageHero>

        {/* ---------- two ways in ---------- */}
        <section className="w-full bg-white">
          <div className="canvas gutter pt-[72px] pb-[16px] xl:pt-[88px]">
            <h2 className="text-[28px] leading-[36px] font-bold text-black xl:text-[36px] xl:leading-[42px]">
              {c.paths.heading}
            </h2>

            <div className="mt-[32px] grid gap-[24px] md:grid-cols-2">
              {/* Anchor rather than a route: the form is on this page, and a
                  scroll keeps the two options visible in the back-history. */}
              <article className="flex flex-col rounded-[16px] border border-brand bg-brand-tint p-[24px] sm:p-[32px]">
                <h3 className="text-[22px] leading-[28px] font-bold text-black">
                  {c.paths.message.title}
                </h3>
                <p className="mt-[12px] flex-1 text-[16px] leading-[24px] text-black/75">
                  {c.paths.message.body}
                </p>
                <a
                  href="#message"
                  className="mt-[24px] inline-flex min-h-[46px] w-fit max-w-full items-center justify-center rounded-btn bg-brand-btn px-[24px] py-[10px] text-[16px] leading-[26px] text-center font-bold text-white transition-opacity hover:opacity-90"
                >
                  {c.paths.message.cta}
                </a>
              </article>

              <article className="flex flex-col rounded-[16px] border border-hairline bg-white p-[24px] transition-colors sm:p-[32px] hover:border-brand">
                <h3 className="text-[22px] leading-[28px] font-bold text-black">
                  {c.paths.rfp.title}
                </h3>
                <p className="mt-[12px] flex-1 text-[16px] leading-[24px] text-black/75">
                  {c.paths.rfp.body}
                </p>
                <RfpDialog
                  copy={t.rfpModal}
                  label={c.paths.rfp.cta}
                  className="mt-[24px] inline-flex min-h-[46px] w-fit max-w-full cursor-pointer items-center justify-center rounded-btn border border-brand bg-white px-[24px] py-[10px] text-[16px] leading-[26px] text-center font-bold text-brand-ink transition-colors hover:bg-brand-btn hover:text-white"
                />
              </article>
            </div>
          </div>
        </section>

        {/* ---------- form + direct channels ---------- */}
        <section id="message" className="w-full scroll-mt-[95px] bg-white">
          <div className="canvas grid gap-[48px] gutter pt-[64px] pb-[80px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-[80px]">
            {/* Below xl this grid is a single column, so the form was taking the
                full content width — 976px of input fields at a 1024px viewport.
                The xl column is 788px wide, so capping at 760 keeps the field
                measure the same on a tablet as on a desktop instead of letting
                it stretch to twice a comfortable width. */}
            <div className="max-w-[760px] xl:max-w-none">
              <h2 className="text-[28px] leading-[36px] font-bold text-black xl:text-[36px] xl:leading-[42px]">
                {c.form.heading}
              </h2>
              <p className="mt-[12px] text-[16px] leading-[24px] text-black/75">
                {c.form.body}
              </p>
              <div className="mt-[28px]">
                <ContactForm strings={t.footer} tone="light" idPrefix="page" />
              </div>
            </div>

            {/* Capped with the form for the same reason, so the two halves of
                this section share an edge below xl instead of one stopping at
                760 and the other running to the full 976. */}
            <aside className="max-w-[760px] xl:max-w-none xl:pt-[8px]">
              <h2 className="text-[22px] leading-[28px] font-bold text-black">
                {c.channels.heading}
              </h2>
              <p className="mt-[10px] text-[16px] leading-[24px] text-black/75">
                {c.channels.body}
              </p>

              {/*
                The icons were not rendering at all, for two independent
                reasons. They were served through `next/image`, which refuses
                SVG unless `dangerouslyAllowSVG` is set — the rest of the site
                uses `<Icon>` for exactly that reason. And all four are authored
                `fill="white"`, because they were drawn for the brand-blue
                sticky rail, so even once loaded they were white on a white card.

                So they get the rail's own treatment: white glyph on a brand
                disc. Same asset, same colours, and the two places a visitor can
                reach these four channels now look like the same thing.
              */}
              {/* Two across on a tablet, back to a single stack inside the
                  380px desktop column — a row here is a disc and two words, so
                  one per 760px line is almost entirely empty space. */}
              <ul className="mt-[24px] grid gap-[12px] sm:grid-cols-2 xl:grid-cols-1">
                {CONTACT_CHANNELS.map((channel) => {
                  const external = !channel.href.startsWith("mailto:");
                  return (
                    <li key={channel.id}>
                      <a
                        href={channel.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="group flex items-center gap-[16px] rounded-[12px] border border-hairline bg-white px-[16px] py-[14px] transition-colors hover:border-brand hover:bg-brand-tint"
                      >
                        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-brand-btn">
                          <Icon
                            src={channel.icon}
                            width={22}
                            height={22}
                            className="h-[22px] w-[22px] object-contain"
                          />
                        </span>
                        <span className="text-[16px] leading-[26px] font-bold text-black">
                          {t.rail[channel.id]}
                        </span>
                        <span
                          aria-hidden
                          className="ml-auto text-[18px] leading-none text-brand-ink opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          →
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/*
                The head office sits with the other ways to reach the company,
                not in a separate band — someone on this page is looking for a
                way in, and a postal address is one.

                `<address>` is the right element and it is not a styling choice:
                it tells assistive tech that this is contact information for the
                page, which a `<div>` of three lines does not.

                The address itself is deliberately identical in all five locales
                — see the note in src/lib/content.ts.
              */}
              {/* Same idea, and at xl it is a one-column 16px-gap stack —
                  which is exactly the mt-[32px]/mt-[16px] it replaces, so the
                  desktop sidebar is unchanged. */}
              <div className="mt-[32px] grid gap-[16px] sm:grid-cols-2 xl:grid-cols-1">
                <address className="block rounded-[12px] border border-hairline bg-white p-[24px] not-italic">
                  <h3 className="text-[18px] leading-[28px] font-bold text-black">
                    {c.office.heading}
                  </h3>
                  <p className="mt-[10px] text-[15px] leading-[24px] text-black/80">
                    {HEAD_OFFICE.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <a
                    href={HEAD_OFFICE_MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-[12px] inline-flex items-center gap-[6px] text-[15px] leading-[22px] font-bold text-brand-ink underline-offset-4 hover:underline"
                  >
                    {c.office.mapLink}
                    <span aria-hidden>→</span>
                  </a>
                </address>

                <div className="rounded-[12px] bg-brand-tint p-[24px]">
                  <h3 className="text-[18px] leading-[28px] font-bold text-black">
                    {c.global.heading}
                  </h3>
                  <p className="mt-[10px] text-[15px] leading-[23px] text-black/75">
                    {c.global.body}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/*
          ---------- what happens next ----------

          Was three columns of numeral-title-body. Three columns is a list, and
          this is a *sequence* — the reader needs to see that step two follows
          step one, which a grid of equals cannot say.

          So it is a timeline: one line, three nodes on it, heading alongside.
          The line does the work the layout could not, and reading down it is the
          same motion as time passing.

          Card borders were the other option and they were measured out. On this
          navy, an edge subtle enough to look considered lands at 1.3-1.7:1 —
          under the 3:1 that WCAG asks of a boundary. Rather than force a heavy
          outline, the definition comes from the line, the discs and the fill.
        */}
        <section className="relative w-full overflow-hidden bg-navy-900">
          {/* Depth, cheaply: one soft brand glow off the top-right corner. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full opacity-[0.18] blur-[120px]"
            style={{ background: "radial-gradient(circle, #00aef7 0%, transparent 70%)" }}
          />

          <div className="canvas relative grid gap-[48px] gutter py-[80px] xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)] xl:gap-[100px] xl:py-[112px]">
            <div className="xl:pt-[6px]">
              <span
                aria-hidden
                className="block h-[3px] w-[44px] rounded-full bg-brand-cta"
              />
              <h2 className="mt-[20px] text-[28px] leading-[36px] font-bold text-white xl:text-[36px] xl:leading-[42px]">
                {c.next.heading}
              </h2>
            </div>

            {/* `relative` anchors the line; the line is drawn once for the whole
                list rather than per item, so it cannot break between them. */}
            <ol className="relative flex flex-col gap-[36px] xl:gap-[44px]">
              {/* Runs from the centre of the first disc to the centre of the
                  last, then fades — so it arrives somewhere instead of running
                  off the bottom of the section. */}
              <span
                aria-hidden
                className="absolute top-[22px] bottom-[22px] left-[21px] w-[2px] bg-gradient-to-b from-brand-cta/70 via-brand-cta/40 to-brand-cta/0"
              />

              {CONTACT_STEP_IDS.map((id, index) => {
                const step = c.next.steps[id];
                return (
                  <li key={id} className="relative flex gap-[20px] sm:gap-[26px]">
                    {/* The numeral is decorative — the <ol> already conveys
                        order, so it is hidden rather than read out twice.
                        Brand disc, white glyph: the same idiom as the channel
                        list above and the Why-choose grid on Services. */}
                    <span
                      aria-hidden
                      className="relative z-10 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-brand-btn text-[15px] leading-none font-bold text-white shadow-[0_0_0_6px_rgb(6_42_82)]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-[8px]">
                      <h3 className="text-[20px] leading-[28px] font-bold text-white xl:text-[22px] xl:leading-[30px]">
                        {step.title}
                      </h3>
                      <p className="mt-[10px] max-w-[560px] text-[16px] leading-[26px] text-white/80">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </main>

      <Footer
        strings={t.footer}
        office={t.contact.office}
        nav={t.nav}
        serviceNames={t.servicesPage.offer.cards}
        locale={locale}
        withForm={false}
      />
    </>
  );
}
