import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckMark } from "@/components/CheckMark";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { RfpDialog } from "@/components/RfpDialog";
import { StickyContactRail } from "@/components/StickyContactRail";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/locales";
import { socialMetadata } from "@/lib/metadata";
import { TECH_SECTIONS, type TechSection } from "@/lib/tech-stack";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: t.technologies.metaTitle,
    description: t.technologies.metaDescription,
    ...socialMetadata(locale, "/technologies"),
  };
}

/** Technologies page — Figma 508:66 (1672 x 5646). */
export default async function TechnologiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const tech = t.technologies;
  const headings = tech.sections as Record<string, string>;

  const section = (id: string) => TECH_SECTIONS.find((s) => s.id === id);

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} />

      <main id="main-content">

      {/* ---- Hero — 477:33 / 423:2389 / 423:2388 / 478:36 ------------
          No scrim over the artwork: this hero is pale on the left and the
          headline is authored black, which measures 18:1 there. The nav's own
          140px gradient still carries the white nav type at 5.1:1. */}
      <PageHero
          image="/images/tech-hero.png"
          objectPosition="50% 15%"
          title={tech.hero.title}
          body={tech.hero.body}
        >
          <Link
            href={`/${locale}/contact`}
            className="mt-[28px] inline-flex h-[48px] w-fit items-center justify-center rounded-btn bg-brand-btn px-[28px] text-[16px] leading-[24px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[32px]"
          >
            {tech.hero.cta}
          </Link>
        </PageHero>

      {/* The rest of the hero paragraph. At 466 characters (480 in Vietnamese)
          it was the longest sub-head on the site, and `npm run fit` showed it
          overrunning the 560px hero. The hero keeps the opening claim; this is
          the remainder, in the body where it belongs. */}
      <section className="canvas px-6 pt-[56px] xl:px-[212px] xl:pt-[72px]">
        <p className="max-w-[760px] text-[17px] leading-[28px] font-normal text-black/85 xl:text-[19px] xl:leading-[30px]">
          {tech.hero.bodyMore}
        </p>
      </section>

      {/* ---- Stacks heading + capabilities — 421:2387 / 421:2386 ----- */}
      <section className="canvas px-6 pt-[70px] xl:px-0 xl:pt-[72px]">
        <h2 className="max-w-[652px] text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:pl-[210px] xl:text-[48px] xl:leading-[56px]">
          {tech.stacksHeading}
        </h2>

        {/* The checked paragraphs sit right of centre in the file: marks at
            x=612, text at x=646. */}
        <ul className="mt-[48px] flex flex-col gap-[28px] xl:mt-[79px] xl:pl-[612px]">
          {tech.capabilities.map((paragraph) => (
            <li key={paragraph.slice(0, 40)} className="flex gap-[6px]">
              <CheckMark className="mt-[-3px] shrink-0" />
              <p className="max-w-[805px] text-[16px] leading-[24px] font-normal text-black">
                {paragraph}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Technology stacks on the light band — 482:143 ----------- */}
      <div className="mt-[70px] w-full bg-[#f7f7f7] pt-[75px] pb-[186px] xl:mt-[100px]">
        <TechStackSection heading={headings.ai} section={section("ai")} />
        <TechStackSection heading={headings.backend} section={section("backend")} />
        <TechStackSection heading={headings.frontend} section={section("frontend")} />
        <TechStackSection heading={headings.app} section={section("app")} />

        {/* ---- Pick Your Stack — 507:128 ---------------------------- */}
        <section className="canvas px-6 pt-[100px] xl:px-[193px] xl:pt-[179px]">
          <div className="flex flex-col overflow-hidden rounded-panel border border-brand bg-white xl:min-h-[435px] xl:flex-row">
            <div className="px-8 py-10 xl:w-[631px] xl:shrink-0 xl:py-[46px] xl:pr-[24px] xl:pl-[58px]">
              <h2 className="max-w-[710px] text-[28px] leading-[36px] font-bold text-brand xl:text-[36px] xl:leading-[42px]">
                {tech.rfp.heading}
              </h2>
              <p className="mt-[24px] max-w-[598px] text-[16px] leading-[26px] font-normal text-black/85 xl:mt-[30px]">
                {tech.rfp.body}
              </p>
              <ul className="mt-[30px] flex flex-col gap-[19px] xl:mt-[36px]">
                {t.rfp.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-[10px] text-[16px] leading-[26px] font-normal text-black/85"
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

        <TechStackSection heading={headings.devops} section={section("devops")} spacing={103} />
        <TechStackSection heading={headings.cloud} section={section("cloud")} />
      </div>

      </main>

      <Footer
        strings={t.footer}
        office={t.contact.office}
        nav={t.nav} rail={t.rail} serviceTitles={t.serviceDetails}
        locale={locale}
      />
    </>
  );
}

/**
 * One heading plus its grid of 167x88 logo tiles — Figma 482:95 and siblings.
 * Six columns at xl with a 9px gutter, matching the authored 1047px block.
 * Each logo keeps its authored dimensions, which is what holds the marks at a
 * consistent optical size inside a uniform tile.
 */
function TechStackSection({
  heading,
  section,
  spacing = 60,
}: {
  heading: string;
  section: TechSection | undefined;
  spacing?: number;
}) {
  if (!section) return null;

  return (
    <section className="canvas px-6 xl:px-0" style={{ paddingTop: spacing }}>
      <h2 className="text-[20px] leading-[29px] font-bold text-black xl:pl-[210px] xl:text-[24px]">
        {heading}
      </h2>
      <div className="mt-[36px] flex flex-wrap gap-[9px] xl:mt-[63px] xl:pl-[301px]">
        {section.logos.map((logo) => (
          <div
            key={logo.file}
            className="flex h-[88px] w-[167px] shrink-0 items-center justify-center rounded-[8px] bg-white"
          >
            <Image
              src={logo.file}
              alt=""
              width={logo.w}
              height={logo.h}
              className="max-h-[80px] w-auto max-w-[140px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
