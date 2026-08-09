import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
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
          objectPosition="50% 30%"
          title={s.hero.title}
          body={s.hero.body}
        >
          <Link
            href={`/${locale}/contact`}
            className="mt-[28px] inline-flex h-[48px] w-fit items-center justify-center rounded-btn bg-brand-btn px-[28px] text-[16px] leading-[24px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[32px]"
          >
            {s.hero.cta}
          </Link>
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
      <section className="canvas px-6 pt-[80px] xl:px-0 xl:pt-[126px]">
        <h2 className="mx-auto max-w-[1021px] text-center text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:text-[48px] xl:leading-[58px]">
          {s.accelerate.heading}
        </h2>

        {/* 420 x 485 with a 190px gutter — 586:1306 / 586:1298, down from the
            ~497 x 574 the file used to draw. The gutter only opens up at xl;
            190px between two cards is a full column on a laptop. */}
        <div className="mx-auto mt-[60px] grid max-w-[1030px] gap-[40px] md:grid-cols-2 xl:mt-[126px] xl:gap-[190px]">
          {SERVICE_HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.id}
              className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[16px] border-[3px] border-brand bg-white xl:min-h-[485px]"
            >
              <Image
                src={highlight.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain object-bottom"
              />
              {/* Both source photos are white at the top, so the black label
                  and the button below it read cleanly where they are placed. */}
              <h3 className="relative px-[37px] pt-[61px] text-[24px] leading-[1.2] font-bold text-black xl:text-[28px] xl:leading-[34px]">
                {s.accelerate.highlights[highlight.id]}
              </h3>
              {/* 130 x 52 blue button — 586:806 / 586:808. The label is bold
                  where the file sets it regular: white on #0f84fd measures
                  3.66:1, which clears AA only once the type counts as large,
                  and 20px needs to be bold to qualify. */}
              <Link
                href={serviceDetailHref(locale, highlight.detail)}
                className="relative mt-[17px] ml-[37px] inline-flex h-[52px] min-w-[130px] w-fit items-center justify-center rounded-btn bg-brand-btn px-[16px] text-[20px] leading-[24px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
              >
                {s.detailLabel}
                <span aria-hidden>&nbsp;→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Services We Offer — 405:1981 / 405:2322 ---------------- */}
      <section className="canvas px-6 pt-[100px] xl:px-0 xl:pt-[190px]">
        <h2 className="mx-auto max-w-[975px] text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:pl-[117px] xl:text-[48px] xl:leading-[58px]">
          {s.offer.heading}
        </h2>
        <p className="mx-auto mt-[24px] max-w-[1209px] text-[18px] leading-[24px] font-bold text-black xl:pl-[0px] xl:text-[20px]">
          {s.offer.subtitle}
        </p>

        <div className="mt-[52px] grid gap-x-[59px] gap-y-[65px] sm:grid-cols-2 xl:grid-cols-3 xl:pr-[189px] xl:pl-[258px]">
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
      <section className="relative mt-[100px] xl:mt-[264px] xl:h-[917px]">
        <Image
          src="/images/svc-global.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="canvas relative px-6 py-[80px] xl:h-full xl:px-0 xl:py-0">
          <div className="xl:absolute xl:top-[111px] xl:left-[150px] xl:max-w-[760px]">
            <h2 className="max-w-[623px] text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:text-[48px] xl:leading-[58px]">
              {s.global.heading}
            </h2>
            <p className="mt-[24px] max-w-[695px] text-[18px] leading-[24px] font-normal text-black xl:mt-[31px] xl:text-[20px]">
              {s.global.intro}
            </p>
            <p className="mt-[36px] text-[20px] leading-[29px] font-bold text-black xl:mt-[52px] xl:text-[24px]">
              {s.global.requiresLead}
            </p>
            <p className="text-[20px] leading-[29px] font-bold text-black xl:text-[24px]">
              {s.global.requiresLabel}
            </p>

            <ul className="mt-[24px] flex flex-col gap-[28px]">
              {GLOBAL_TEAM_POINTS.map((point) => (
                <li key={point.id} className="flex items-center gap-[24px]">
                  <Icon
                    src={point.icon}
                    width={point.w}
                    height={point.h}
                    className="h-[40px] w-[44px] shrink-0 object-contain xl:h-[50px] xl:w-[54px]"
                  />
                  <span className="text-[24px] leading-[1.2] font-bold text-brand-ink xl:text-[32px] xl:leading-[39px]">
                    {s.global.points[point.id]}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-[36px] max-w-[654px] text-[18px] leading-[24px] font-normal text-black xl:mt-[55px] xl:text-[20px]">
              {s.global.outro}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Send Your RFP — 405:1910 (same card as the Top page) ---- */}
      <section className="canvas px-6 pt-[80px] xl:px-[150px] xl:pt-[133px]">
        <div className="flex flex-col overflow-hidden rounded-panel border border-brand bg-white xl:min-h-[435px] xl:flex-row">
          <div className="px-8 py-10 xl:w-[631px] xl:shrink-0 xl:py-[46px] xl:pr-[24px] xl:pl-[58px]">
            <h2 className="max-w-[710px] text-[28px] leading-[36px] font-bold text-brand xl:text-[36px] xl:leading-[44px]">
              {t.rfp.heading}
            </h2>
            <p className="mt-[24px] max-w-[598px] text-[16px] leading-[19px] font-bold text-black xl:mt-[30px]">
              {t.rfp.body}
            </p>
            <ul className="mt-[30px] flex flex-col gap-[19px] xl:mt-[36px]">
              {t.rfp.checklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-[10px] text-[16px] leading-[19px] font-bold text-black"
                >
                  <span aria-hidden className="text-brand">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <RfpDialog
              copy={t.rfpModal}
              label={t.rfp.cta}
              className="mt-[28px] inline-flex h-[46px] min-w-[141px] items-center justify-center rounded-btn border border-hairline bg-brand-btn px-[20px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[31px] cursor-pointer"
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
      <section className="mt-[80px] w-full bg-brand-tint xl:mt-[120px]">
        <div className="canvas px-6 py-[72px] xl:px-[212px] xl:py-[104px]">
          <h2 className="text-[32px] leading-[1.15] font-bold text-black sm:text-[40px] xl:text-[48px] xl:leading-[58px]">
            {s.why.heading}
          </h2>

          <ul className="mt-[36px] grid gap-[16px] sm:grid-cols-2 xl:mt-[48px] xl:grid-cols-4">
            {s.why.items.map((item) => (
              <li
                key={item}
                className="flex flex-col gap-[16px] rounded-[16px] bg-white p-[24px] transition-shadow duration-200 hover:shadow-[0_10px_28px_-10px_rgb(6_42_82/0.22)]"
              >
                {/* Brand disc, white glyph — the same treatment as the Contact
                    page's channel list and the sticky rail, so an icon means
                    the same thing everywhere. The blue original measures only
                    3.34:1 on a tint disc; white on brand-btn is 6.01:1. */}
                <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-brand-btn">
                  <Icon
                    src="/icons/icon-check-white.svg"
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                  />
                </span>
                <span className="text-[17px] leading-[26px] font-bold text-black">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-[48px] flex justify-center xl:mt-[64px]">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-[48px] min-w-[280px] items-center justify-center rounded-btn bg-brand-btn px-[28px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
              {s.why.cta}
            </Link>
          </div>
        </div>
      </section>

      </main>

      <Footer strings={t.footer} />
    </>
  );
}
