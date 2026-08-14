import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckMark } from "@/components/CheckMark";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { HeroCta } from "@/components/HeroCta";
import { RfpDialog } from "@/components/RfpDialog";
import { ServiceOfferCard } from "@/components/ServiceOfferCard";
import { StickyContactRail } from "@/components/StickyContactRail";
import {
  GLOBAL_TEAM_POINTS,
  SERVICE_HIGHLIGHTS,
  SERVICE_OFFER_CARDS,
  serviceDetailHref,
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
    title: t.servicesPage.metaTitle,
    description: t.servicesPage.metaDescription,
    ...socialMetadata(locale, "/services"),
  };
}

/** Services page — Figma 405:2302 (1672 x 9390). */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const s = t.servicesPage;

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <main id="main-content">

      {/* ---- Hero — 405:1949 / 405:1997-1998 / 405:1993 -------------- */}
      <PageHero
          image="/images/services-hero.png"
          video="/video/services-hero.mp4"
          objectPosition="50% 30%"
          title={s.hero.title}
          body={s.hero.body}
        >
          <HeroCta
            href={`/${locale}/contact`}
            className="mt-[28px] xl:mt-[32px]"
          >
            {s.hero.cta}
          </HeroCta>
        </PageHero>

      {/* The rest of the hero paragraph. It was a 334-character sub-head sat on
          top of a heading and a CTA — eight lines of body copy inside a 560px
          hero, which `npm run fit` showed overrunning in Vietnamese. The hero
          keeps the opening claim; this is the remainder, in the body where it
          belongs. */}
      <section className="canvas px-6 pt-[56px] xl:px-[212px] xl:pt-[72px]">
        <p className="max-w-[760px] text-[17px] leading-[28px] font-normal text-black/85 xl:text-[19px] xl:leading-[30px]">
          {s.hero.bodyMore}
        </p>
      </section>

      {/* ---- Accelerate — 405:1971 / 405:1983 / 405:1990 ------------- */}
      {/*
        Was the one centred composition on a page where everything else — hero,
        intro, offer, global, why — is left-aligned on the 212px gutter. One
        section breaking the column system is what "the text positioning is all
        over the place" looks like from the outside, so it now sits where the
        rest of the page sits, under the same brand rule the Why section uses.
      */}
      <section className="canvas px-6 pt-[80px] xl:px-[212px] xl:pt-[140px]">
        <span
          aria-hidden
          className="block h-[3px] w-[44px] rounded-full bg-brand"
        />
        <h2 className="mt-[20px] max-w-[1021px] text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:text-[44px] xl:leading-[52px]">
          {s.accelerate.heading}
        </h2>

        {/* `max-w-[880px]` is not a taste call — it is the width the artwork
            was drawn for.

            `svc-ai.jpg` and `svc-legacy.jpg` are 364x400 portrait crops whose
            subjects run off their own edges: the robot hand's wrist leaves the
            frame at the right, the phone leaves it at the bottom left. That
            works in the 420px card the design specifies, where the picture
            fills the lower half of the card edge to edge.

            Letting these two cards take the full 212px-gutter width made them
            ~600px each, and `object-contain` then fits the portrait art by
            height and centres it — so the subject floated in the middle with
            dead space either side and a ~90px empty band under the DETAIL link.
            880px puts the cards back at ~420 and the art back in its frame.

            The authored gutter between them was 190px, a full column on a
            laptop. 40px matches the offer grid below, so the two read as one
            system. */}
        <div className="mt-[44px] grid max-w-[880px] gap-[40px] md:grid-cols-2 xl:mt-[56px]">
          {/* These two sit directly above the seventeen offer cards, so they
              take the same resting state: a 1px hairline rather than 3px of
              saturated brand, going brand on hover. Leaving them at 3px while
              the grid below moved to 1px would have read as an oversight.

              The whole card is the link, as with the offer cards. The button
              becomes a styled span — a `<Link>` inside a `<Link>` is invalid,
              and the card was already the obvious target. */}
          {SERVICE_HIGHLIGHTS.map((highlight) => (
            <Link
              key={highlight.id}
              href={serviceDetailHref(locale, highlight.detail)}
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[16px] border border-hairline bg-white outline-none transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_18px_40px_-16px_rgb(6_42_82/0.28)] focus-visible:-translate-y-[3px] focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-ink motion-reduce:hover:translate-y-0 xl:min-h-[485px]"
            >
              <span
                aria-hidden
                className="absolute inset-x-[-1px] top-[-1px] z-10 h-[3px] origin-left scale-x-0 rounded-t-[16px] bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <Image
                src={highlight.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain object-bottom"
              />
              {/* Both source photos are white at the top, so the black label
                  and the affordance below it read cleanly where they sit. */}
              <h3 className="relative px-[37px] pt-[54px] text-[24px] leading-[1.2] font-bold text-black transition-colors duration-200 group-hover:text-brand-ink xl:text-[28px] xl:leading-[34px]">
                {s.accelerate.highlights[highlight.id]}
              </h3>
              {/* Was a 130x52 solid brand button (586:806 / 586:808). On a card
                  that is now itself the target, a filled button is a second
                  control competing with the first. The label carries the brand
                  colour instead — 6.01:1 on white at any size. */}
              <span
                aria-hidden
                className="relative mt-[16px] ml-[37px] inline-flex w-fit items-baseline text-[17px] leading-[26px] font-bold text-brand-ink xl:text-[18px]"
              >
                <span className="border-b border-brand-ink/0 transition-colors duration-200 group-hover:border-brand-ink/60">
                  {s.detailLabel}
                </span>
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[5px]">
                  {" →"}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Services We Offer — 405:1981 / 405:2322 ---------------- */}
      <section className="canvas px-6 pt-[100px] xl:px-[212px] xl:pt-[150px]">
        <h2 className="max-w-[975px] text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:text-[44px] xl:leading-[52px]">
          {s.offer.heading}
        </h2>
        <p className="mt-[20px] max-w-[860px] text-[17px] leading-[28px] font-normal text-black/85 xl:text-[19px] xl:leading-[30px]">
          {s.offer.subtitle}
        </p>

        <div className="mt-[44px] grid gap-[28px] sm:grid-cols-2 xl:mt-[56px] xl:grid-cols-3">
          {SERVICE_OFFER_CARDS.map((card) => (
            <ServiceOfferCard
              key={card.id}
              image={card.image}
              title={s.offer.cards[card.id].title}
              body={s.offer.cards[card.id].body}
              detailLabel={s.detailLabel}
              detailHref={
                "detail" in card
                  ? serviceDetailHref(locale, card.detail)
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* ---- Global Engineering Teams — 405:2286 --------------------- */}
      {/*
        A fixed 917px band with its content pinned at `top-[111px] left-[150px]`
        — the last of the Figma-coordinate layouts on this page, and the same
        fragility already removed from About and Technologies. Those numbers hold
        for one string length; the German-length locales here are Vietnamese and
        Thai, and either could have run past the bottom of the band with nothing
        to stop them.

        Normal flow, the 212px site gutter, and the three "It requires" points
        laid out across the width instead of stacked at 32px — they are three
        short labels, not three paragraphs, and stacking them made the section
        far taller than it needed to be.
      */}
      <section className="relative mt-[100px] overflow-hidden xl:mt-[160px]">
        <Image
          src="/images/svc-global.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        {/*
          A white scrim over the left two-thirds — the mirror of the black one
          every hero uses, for the same reason and by the same arithmetic.

          Moving this band into normal flow put the copy where the artwork is
          busiest: the second line of the intro ran straight across a
          photographed face, and the middle "It requires" card sat over a
          woman's head showing through its own 80% white fill. Black body copy
          on an unconstrained photograph has no contrast guarantee at all — the
          ground is whatever the picture happens to be doing at that pixel.

          0.92 at the left edge holds black at 17.8:1 against the darkest thing
          in this image, easing to nothing by 78% so the globe and the laptop on
          the right survive intact. Measured by `npm run ink`, which now models
          this ramp rather than the bare photograph.
        */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgb(255 255 255 / 0.92) 0%, rgb(255 255 255 / 0.86) 42%, rgb(255 255 255 / 0) 78%)",
          }}
        />
        <div className="canvas relative px-6 py-[80px] xl:px-[212px] xl:py-[112px]">
          <div className="max-w-[760px]">
            <h2 className="text-[30px] leading-[1.18] font-bold text-black sm:text-[38px] xl:text-[44px] xl:leading-[52px]">
              {s.global.heading}
            </h2>
            <p className="mt-[22px] text-[17px] leading-[28px] font-normal text-black/85 xl:text-[19px] xl:leading-[30px]">
              {s.global.intro}
            </p>
          </div>

          <p className="mt-[40px] text-[19px] leading-[30px] font-bold text-black xl:mt-[52px] xl:text-[22px] xl:leading-[32px]">
            {s.global.requiresLead}{" "}
            <span className="text-brand-ink">{s.global.requiresLabel}</span>
          </p>

          <ul className="mt-[28px] grid gap-[20px] sm:grid-cols-3 xl:mt-[32px] xl:gap-[24px]">
            {GLOBAL_TEAM_POINTS.map((point) => (
              <li
                key={point.id}
                className="flex items-center gap-[16px] rounded-[14px] border border-hairline bg-white/80 px-[20px] py-[18px] backdrop-blur-sm"
              >
                <Icon
                  src={point.icon}
                  width={point.w}
                  height={point.h}
                  className="h-[38px] w-[42px] shrink-0 object-contain"
                />
                <span className="text-[17px] leading-[26px] font-bold text-black xl:text-[19px] xl:leading-[28px]">
                  {s.global.points[point.id]}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-[36px] max-w-[760px] text-[17px] leading-[28px] font-normal text-black/85 xl:mt-[44px] xl:text-[19px] xl:leading-[30px]">
            {s.global.outro}
          </p>
        </div>
      </section>

      {/* ---- Send Your RFP — 405:1910 (same card as the Top page) ---- */}
      <section className="canvas px-6 pt-[80px] xl:px-[212px] xl:pt-[120px]">
        <div className="flex flex-col overflow-hidden rounded-panel border border-brand bg-white xl:min-h-[435px] xl:flex-row">
          <div className="px-8 py-10 xl:w-[631px] xl:shrink-0 xl:py-[46px] xl:pr-[24px] xl:pl-[58px]">
            <h2 className="max-w-[710px] text-[28px] leading-[36px] font-bold text-brand xl:text-[36px] xl:leading-[42px]">
              {t.rfp.heading}
            </h2>
            <p className="mt-[24px] max-w-[598px] text-[16px] leading-[26px] font-normal text-black/85 xl:mt-[30px]">
              {t.rfp.body}
            </p>
            <ul className="mt-[30px] flex flex-col gap-[19px] xl:mt-[36px]">
              {t.rfp.checklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-[10px] text-[16px] leading-[26px] font-normal text-black/85"
                >
                  {/* Was the literal character U+2713, whose shape came from whatever
                      font the reader happens to have. `icon-check.svg` is the
                      same mark, drawn once. */}
                  <CheckMark className="mt-[3px] h-[18px] w-[18px] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <RfpDialog
              copy={t.rfpModal}
              label={t.rfp.cta}
              className="mt-[28px] inline-flex h-[46px] min-w-[141px] items-center justify-center rounded-btn border border-hairline bg-brand-btn px-[20px] text-[16px] leading-[26px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[31px] cursor-pointer"
            />
          </div>
          <div className="relative h-[260px] w-full sm:h-[340px] xl:h-auto xl:flex-1 xl:self-stretch">
            <Image
              src="/images/rfp-visual.png"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 671px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/*
        ---- Why Choose Wesantika — 405:1972-1980 ---------------------

        The photograph is gone on request, and it turned out to be the smaller
        half of the problem. Four other things went with it:

          - Eight claims set at **40px bold** in a single column was a wall of
            display type where a scannable list belonged. 17px in a grid now,
            and the section is shorter for it.
          - The tick was the literal character **✔**, so its shape came from
            whatever font the reader happens to have, and it lands on a dingbat
            face on Windows. `icon-check.svg` had been in /public all along.
          - The ground was `#fafaf9`, a *warm* grey, on a site that is cool blue
            throughout — and an ad-hoc hex besides. It is the brand tint now.
          - The heading indented 150px and the list 207px, in a section sitting
            on the site's 212px gutter. Both numbers were arbitrary.

        Losing the image also removes the reason the list was one narrow column.
        Four across on two rows fills the width the photograph freed, and every
        claim is legible at a glance rather than something to scroll past.
      */}
      {/*
        Second pass on this section. The card grid was an improvement on the wall
        of 40px type, but it had two problems of its own:

          - **Eight identical check discs.** The brand disc is the site's icon
            idiom — the Contact channels use it, and so do the timeline steps —
            and repeating it eight times with the same glyph turned a meaningful
            mark into wallpaper. The discs are gone from here and reserved for
            where they distinguish one thing from another.
          - **Eight sparse cards.** Each held a three-word label in a 24px-padded
            box, so most of the section was padding. Eight bare claims read
            better dense than spread out — a specification, not eight posters.

        It is now the same composition as the Contact page's timeline: the
        heading holds one column and the content the other. Two sections built
        the same way is a language; two built differently is an accident.
      */}
      <section className="mt-[80px] w-full bg-brand-tint xl:mt-[120px]">
        <div className="canvas grid gap-[40px] px-6 py-[72px] xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:gap-[96px] xl:px-[212px] xl:py-[104px]">
          <div className="xl:pt-[6px]">
            <span
              aria-hidden
              className="block h-[3px] w-[44px] rounded-full bg-brand"
            />
            <h2 className="mt-[20px] text-[30px] leading-[1.15] font-bold text-black sm:text-[36px] xl:text-[42px] xl:leading-[50px]">
              {s.why.heading}
            </h2>

            <Link
              href={`/${locale}/contact`}
              className="mt-[28px] inline-flex h-[48px] w-fit items-center justify-center rounded-btn bg-brand-btn px-[28px] text-[16px] leading-[26px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[36px]"
            >
              {s.why.cta}
            </Link>
          </div>

          {/* Two columns of four, divided by hairlines rather than boxed. The
              rule between rows is what makes eight short claims scan as a list
              instead of eight fragments. */}
          <ul className="grid grid-cols-1 gap-x-[48px] sm:grid-cols-2">
            {s.why.items.map((item, index) => (
              <li
                key={item}
                className="group flex items-center gap-[14px] border-t border-black/10 py-[18px] first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
              >
                {/* A small brand chevron rather than a disc: it marks the item
                    without competing with the label, and at 12px it reads as
                    punctuation. The index is decorative — the list conveys
                    membership, and these are not ranked. */}
                <span
                  aria-hidden
                  // brand-ink at 50% measured 2.17:1 on the tint — too faint to read.
                  // Full ink is 5.47:1; the 12px size keeps it subordinate to the
                  // label without leaning on opacity to do it.
                  className="text-[12px] leading-none font-bold text-brand-ink"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-[6px] w-[6px] shrink-0 rotate-45 bg-brand" aria-hidden />
                <span className="text-[16px] leading-[24px] font-bold text-black xl:text-[17px] xl:leading-[26px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      </main>

      <Footer
        strings={t.footer}
        office={t.contact.office}
        nav={t.nav}
        serviceNames={t.servicesPage.offer.cards}
        locale={locale}
      />
    </>
  );
}
