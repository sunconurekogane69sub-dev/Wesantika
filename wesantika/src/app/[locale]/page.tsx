import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiProximityPanel } from "@/components/AiProximityPanel";
import { CheckMark } from "@/components/CheckMark";
import { Footer } from "@/components/Footer";
import { HeroCta } from "@/components/HeroCta";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { RfpDialog } from "@/components/RfpDialog";
import { ServiceTabs } from "@/components/ServiceTabs";
import { StickyContactRail } from "@/components/StickyContactRail";
import {
  SERVICE_CARD_SETS,
  SERVICE_CATEGORY_IDS,
  serviceCardHref,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/locales";

/** Top page — Figma 211:1002 (1672 x 5539). */
export default async function TopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <main id="main-content">

      {/* ---- Hero — 180:576 / 180:599 --------------------------------
          Full screen on request, and the client-supplied HOME artwork replaces
          the Figma export. `objectPosition` is measured, not chosen: the sky at
          the top of this photograph is deep navy and the city at the foot is
          bright, so white type wants the upper band. */}
      <PageHero
          image="/images/home-hero.jpg"
          video="/video/home-hero.mp4"
          objectPosition="50% 0%"
          size="full"
          title={t.hero.title}
          body={t.hero.subtitle}
        >
          {/*
            The landing hero was the only one on the site with no call to
            action — every interior page got one and the page whose entire job
            is to convert did not. A visitor who agreed with the headline had
            nothing to press.

            Two, because there are two readers here: someone ready to talk, and
            someone who wants proof first. Sending both to the same button loses
            the second one.
          */}
          <div className="mt-8 flex flex-wrap items-center gap-3 xl:mt-10">
            <HeroCta href={`/${locale}/contact`}>{t.hero.ctaPrimary}</HeroCta>
            <HeroCta href={`/${locale}/our-work`} variant="secondary">
              {t.hero.ctaSecondary}
            </HeroCta>
          </div>
        </PageHero>

      {/* ---- Services ------------------------------------------------ */}
      <Section size="lg">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.heading}
          lead={t.services.lead}
        />

        <ServiceTabs
          categories={SERVICE_CATEGORY_IDS.map((id) => ({
            id,
            label: t.services.categories[id],
            cards: SERVICE_CARD_SETS[id].map((card) => ({
              id: card.id,
              icon: card.icon,
              title: t.services.cards[card.id].title,
              body: t.services.cards[card.id].body,
              href: serviceCardHref(locale, card.id),
            })),
          }))}
        />

        {/* Was `mt-[80px] xl:mt-[130px]` and centred, under a grid whose ragged
            right-hand column already left a void — together that put roughly
            400px of empty white between the last card and the button. Aligned
            to the grid's left edge and on the normal rhythm. */}
        <div className="mt-10 flex">
          <Link
            href={`/${locale}/services`}
            className="flex h-[48px] min-w-[200px] items-center justify-center rounded-card border border-hairline bg-white px-[20px] text-[16px] leading-[26px] font-bold whitespace-nowrap text-black transition-colors hover:border-brand hover:text-brand"
          >
            {t.services.cta}
          </Link>
        </div>
      </Section>

      {/*
        ---- AI Innovation — 180:725-761 -----------------------------

        This is the page's signature section and it was not reading as one. It
        sat on white, in the same canvas, with the same centred heading as every
        other section — so the most distinctive thing on the site was formatted
        exactly like the least distinctive.

        It is now the one dark band on an otherwise white page. Nothing about the
        panel changed to achieve that; the *ground* did. A full-bleed dark
        section between two white ones is the oldest trick there is for saying
        "this one matters", and it costs nothing but a background colour.

        The panel also goes edge to edge inside it — it was inset at
        `xl:px-[54px]`, which framed the one element that should not be framed.
      */}
      <section className="relative mt-[clamp(56px,7vw,104px)] w-full overflow-hidden bg-shell-950">
        {/* One soft brand glow, as on the Contact timeline. Depth, cheaply. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[20%] left-[50%] h-[700px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[140px]"
          style={{ background: "radial-gradient(circle, #00aef7 0%, transparent 70%)" }}
        />

        <div className="canvas relative gutter section-y">
          <div className="mx-auto max-w-[900px] text-center">
            <span
              aria-hidden
              className="mx-auto block h-[3px] w-[44px] rounded-full bg-brand-cta"
            />
            <h2 className="display-2 mt-5 text-white">
              {t.ai.heading}
            </h2>
            <p className="mx-auto mt-[20px] max-w-[760px] text-[17px] leading-[28px] font-normal text-white/75 xl:text-[19px] xl:leading-[30px]">
              {t.ai.subtitle}
            </p>
          </div>

          <div className="mt-[48px] xl:mt-[72px]">
            <AiProximityPanel labels={t.ai.labels} />
          </div>
        </div>
      </section>

      {/* ---- Send Your RFP — 180:711-724 ----------------------------- */}
      <section className="canvas gutter section-t">
        {/* min-h, never a fixed height. The authored card is 435px tall and clips
            (overflow-hidden), but that height only works in Figma because the
            heading (180:714, 710px wide) overlaps 161px into the image to stay on
            one line. Laid out honestly the text column is ~549px, the heading
            takes two lines, and the stack exceeds 435px — which cut the bottom
            off the "Send Your RFP" button. Translated copy overruns it further.
            The card now grows with its content, so clipping is impossible. */}
        <div className="flex flex-col overflow-hidden rounded-panel border border-brand bg-white xl:min-h-[435px] xl:flex-row">
          {/* 631px = 58 left padding + the 549px text measure from the file + 24
              right gap, so the checklist rows keep their authored line breaks and
              no longer run under the image. */}
          <div className="px-8 py-10 xl:w-[631px] xl:shrink-0 xl:py-[46px] xl:pr-[24px] xl:pl-[58px]">
            <h2 className="title-1 max-w-[22ch] text-black">
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
            {/* min-width, not a fixed 141px: the authored box left only ~8px of
                side padding and clipped the label once rendered. */}
            <RfpDialog
              copy={t.rfpModal}
              label={t.rfp.cta}
              className="mt-[28px] inline-flex h-[46px] min-w-[141px] items-center justify-center rounded-btn border border-hairline bg-brand-btn px-[20px] text-[16px] leading-[26px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[31px] cursor-pointer"
            />
          </div>

          {/* self-stretch, not h-full: with the card free to grow there is no
              fixed height for h-full to resolve against, so the image column
              takes its height from the flex row instead. */}
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

      </main>

      <div className="mt-[80px] xl:mt-[107px]">
        <Footer
        strings={t.footer}
        office={t.contact.office}
        nav={t.nav}
        serviceNames={t.servicesPage.offer.cards}
        locale={locale}
      />
      </div>
    </>
  );
}
