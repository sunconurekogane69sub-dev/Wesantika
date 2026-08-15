import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { HeroCta } from "@/components/HeroCta";
import { PageHero } from "@/components/PageHero";
import { StickyContactRail } from "@/components/StickyContactRail";
import { ABOUT_BLOCK_IDS } from "@/lib/content";
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
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    ...socialMetadata(locale, "/about"),
  };
}

/** About Us page — Figma 210:1001 (1672 x 5405). */
export default async function AboutPage({
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

      {/*
        ---- Hero — 210:956 / 210:995 --------------------------------

        `heroLead` is a 240-character paragraph (272 in Vietnamese). It was set
        at the heading size, which worked only while the hero was 942px tall:
        at the 560px every interior hero now shares, nine lines of 48px type
        overran the section and spilled onto the content below.

        It is body copy, so it is set as body copy. The page title moves up into
        the hero to be its heading — which is also what the other four interior
        pages do, and it removes a genuine oddity here: the hero used to hold a
        paragraph and the real h1 arrived *after* it, 64px and centred.
      */}
      <PageHero
        image="/images/about-hero.png"
        // Back to the centre crop. It was moved to the top so black copy could
        // sit on the pale sky; with white type on the black gradient the ground
        // no longer decides the crop, so the frame can be chosen for the picture
        // — which is the skyline and the sunset, not the empty sky above them.
        video="/video/about-hero.mp4"
        objectPosition="50% 50%"
        title={t.about.title}
        body={t.about.heroLead}
      >
        {/* About tells the story; Our Work is the evidence for it. Pointing
            this at the case studies rather than at Contact keeps the three new
            hero CTAs from all saying the same thing, and matches the order a
            reader actually wants them in. */}
        <HeroCta
          href={`/${locale}/our-work`}
          className="mt-[28px] xl:mt-[32px]"
        >
          {t.about.heroCta}
        </HeroCta>
      </PageHero>

      {/*
        ---- Narrative blocks — 210:979-994 ---------------------------

        This is the longest prose on the site and it was set to fail:
        16px across a **1273px** measure is about 160 characters a line, twice
        the 45-75 that is comfortable to read, and `leading-[19px]` on 16px text
        is 1.19 — tight enough for a label, not for five paragraphs. Paragraphs
        were 4px apart, so they ran together into one grey mass.

        720px, 17/28, and real space between paragraphs. The pull quote was
        indistinguishable from body copy; it now looks like a pull quote.
      */}
      <section className="canvas px-6 pt-[64px] xl:px-0 xl:pt-[88px]">
        <div className="mx-auto max-w-[720px]">
          {ABOUT_BLOCK_IDS.map((id, index) => {
            const block = t.about.blocks[id];
            return (
              <div key={id} className={index === 0 ? "" : "mt-[56px]"}>
                <h2 className="text-[22px] leading-[30px] font-bold text-black xl:text-[26px] xl:leading-[34px]">
                  {block.heading}
                </h2>
                <div className="mt-[18px] flex flex-col gap-[14px]">
                  {block.body.map((line) => (
                    <p
                      key={line}
                      className="text-[16px] leading-[27px] font-normal text-black/85 xl:text-[17px] xl:leading-[28px]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {block.pullQuote && (
                  <p className="mt-[24px] border-l-[3px] border-brand pl-[20px] text-[18px] leading-[28px] font-bold text-brand-ink xl:text-[20px] xl:leading-[30px]">
                    {block.pullQuote}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/*
        ---- Our Vision — 210:978 / 210:984-993 -----------------------

        Was a fixed 941px band with its three parts pinned at `top-[123px]`,
        `top-[211px]` and `top-[606px]`. Those numbers hold for exactly one
        string length: English. The statement runs 37 characters in Japanese and
        98 in Vietnamese, so the 395px reserved for it is either mostly empty or
        — one more line of translation — not enough, and the section carried
        ~240px of dead space at the foot regardless.

        Normal flow instead. It cannot overflow, and it sizes to whatever the
        longest locale actually needs.
      */}
      <section className="relative mt-[80px] xl:mt-[120px]">
        <Image
          src="/images/vision-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div className="canvas relative gutter py-[80px] xl:py-[120px]">
          {/* brand-ink, not brand: 20px normal needs 4.5:1 and #0f84fd only
              reaches 3.3:1 on this near-white band. */}
          <p className="text-[18px] leading-[28px] font-bold text-brand-ink xl:text-[20px]">
            {t.about.vision.label}
          </p>
          <span aria-hidden className="mt-[8px] block h-[4px] w-[49px] bg-brand" />

          <h2 className="mt-[32px] max-w-[760px] text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:mt-[40px] xl:text-[48px] xl:leading-[56px]">
            {t.about.vision.statement}
          </h2>

          <div className="mt-[36px] flex max-w-[620px] flex-col gap-[18px] xl:mt-[48px]">
            {t.about.vision.body.map((line) => (
              <p
                key={line}
                className="text-[17px] leading-[28px] font-normal text-black/85 xl:text-[19px] xl:leading-[30px]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Core values — 210:997 -----------------------------------
          Drawn 1976px wide inside a 1672px page, so it bleeds ~152px past
          each edge. Reproduced as authored: oversized and clipped. */}
      <section className="mt-[14px] w-full overflow-hidden">
        <div className="relative aspect-[1976/1087] w-full xl:left-1/2 xl:w-[1976px] xl:-translate-x-1/2">
          <Image
            src="/images/core-values.png"
            alt=""
            fill
            sizes="1976px"
            className="object-contain"
          />
        </div>
      </section>

      </main>

      <div className="mt-[14px]">
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
