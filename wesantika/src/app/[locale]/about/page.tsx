import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StickyContactRail } from "@/components/StickyContactRail";
import { ABOUT_BLOCK_IDS } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale, LOCALE_CODES } from "@/lib/i18n/locales";

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
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/about`]),
      ),
    },
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

      {/* ---- Hero — 210:956 / 210:995 -------------------------------- */}
      <section className="relative h-[620px] sm:h-[760px] xl:h-[942px]">
        <Image
          src="/images/about-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Not in the design: the hero's left half is near-white sky, and the
            white headline scored ~1.3:1 against it. This scrim keeps the
            intended white type and makes it readable. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900/75 via-navy-900/45 to-navy-900/10"
        />
        <Nav locale={locale} nav={t.nav} />
        <div className="canvas relative h-full px-6 xl:px-0">
          <div className="pt-[170px] sm:pt-[220px] xl:pt-[286px] xl:pl-[213px]">
            <p className="max-w-[1158px] text-[26px] leading-[1.25] font-bold text-white sm:text-[36px] xl:text-[48px] xl:leading-[58px]">
              {t.about.heroLead}
            </p>
          </div>
        </div>
      </section>

      {/* ---- About Us heading — 210:996 ------------------------------ */}
      <h1 className="canvas px-6 pt-[70px] text-center text-[40px] leading-[1.2] font-bold text-black sm:text-[52px] xl:px-0 xl:pt-[109px] xl:text-[64px] xl:leading-[77px]">
        {t.about.title}
      </h1>

      {/* ---- Narrative blocks — 210:979-994 -------------------------- */}
      <section className="canvas px-6 pt-[48px] xl:px-0 xl:pt-[63px]">
        <div className="mx-auto max-w-[1273px]">
          {ABOUT_BLOCK_IDS.map((id, index) => {
            const block = t.about.blocks[id];
            return (
              <div key={id} className={index === 0 ? "" : "mt-[64px]"}>
                <h2 className="text-[22px] leading-[29px] font-bold text-black xl:text-[24px]">
                  {block.heading}
                </h2>
                <div className="mt-[18px] flex flex-col gap-[4px]">
                  {block.body.map((line) => (
                    <p
                      key={line}
                      className="text-[16px] leading-[19px] font-normal text-black"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {block.pullQuote && (
                  <p className="mt-[24px] text-[16px] leading-[19px] font-normal text-navy-700">
                    {block.pullQuote}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Our Vision — 210:978 / 210:984-993 ---------------------- */}
      <section className="relative mt-[80px] xl:mt-[137px] xl:h-[941px]">
        <Image
          src="/images/vision-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="canvas relative px-6 py-[80px] xl:h-full xl:px-0 xl:py-0">
          <div className="xl:absolute xl:top-[123px] xl:left-[213px]">
            <p className="text-[20px] leading-[24px] font-normal text-brand">
              {t.about.vision.label}
            </p>
            <span aria-hidden className="mt-[4px] block h-[4px] w-[49px] bg-brand" />
          </div>

          <h2 className="mt-[40px] max-w-[655px] text-[32px] leading-[1.2] font-bold text-black sm:text-[40px] xl:absolute xl:top-[211px] xl:left-[213px] xl:mt-0 xl:text-[48px] xl:leading-[58px]">
            {t.about.vision.statement}
          </h2>

          <div className="mt-[32px] flex max-w-[551px] flex-col gap-[29px] xl:absolute xl:top-[606px] xl:left-[213px] xl:mt-0">
            {t.about.vision.body.map((line) => (
              <p
                key={line}
                className="text-[20px] leading-[27px] font-normal text-black xl:text-[24px] xl:leading-[29px]"
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

      <div className="mt-[14px]">
        <Footer strings={t.footer} />
      </div>
    </>
  );
}
