import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckMark } from "@/components/CheckMark";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { HeroCta } from "@/components/HeroCta";
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

          The clip changed. It was falling green digits on black — the Matrix
          shot — which is a film reference standing in for the thing the page is
          actually about, on a site whose copy works hard to be credible rather
          than cinematic. It was also, not coincidentally, impossible to
          compress: thousands of small high-contrast glyphs moving every frame
          is the worst case for an inter-frame codec, and it stayed at 11.6MB
          where every other hero came in under 6.

          What replaced it is a real editor on a real laptop at a shallow depth
          of field. It says the same thing without the costume, and the blur
          that makes it read as a photograph rather than a screenshot is also
          what makes it 0.7MB.

          `50% 40%` centres the screen in the crop; the old 15% was framed for a
          full-height effect that no longer exists. */}
      <PageHero
          image="/images/tech-hero.png"
          video="/video/technologies-hero.mp4"
          objectPosition="50% 40%"
          title={tech.hero.title}
          body={tech.hero.body}
        >
          <HeroCta
            href={`/${locale}/contact`}
            className="mt-[28px] xl:mt-[32px]"
          >
            {tech.hero.cta}
          </HeroCta>
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

      {/*
        ---- Stacks heading + capabilities — 421:2387 / 421:2386 -----

        The heading sat at `pl-210` and its own capability list at `pl-612` —
        a 400px gulf between a heading and the paragraphs belonging to it,
        reproduced faithfully from the file's "right of centre" placement. On a
        wide screen it read as two unrelated blocks with a hole between them.

        Same two-column composition as the Contact timeline and the Why Choose
        band: heading in one column, content in the other, both on the 212px
        site gutter. Three sections built the same way is a system.
      */}
      <section className="canvas grid gap-[40px] px-6 pt-[70px] xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-[80px] xl:px-[212px] xl:pt-[88px]">
        <div className="xl:pt-[6px]">
          <span
            aria-hidden
            className="block h-[3px] w-[44px] rounded-full bg-brand"
          />
          <h2 className="mt-[20px] text-[28px] leading-[1.18] font-bold text-black sm:text-[34px] xl:text-[38px] xl:leading-[46px]">
            {tech.stacksHeading}
          </h2>
        </div>

        <ul className="flex flex-col gap-[24px]">
          {tech.capabilities.map((paragraph) => (
            <li key={paragraph.slice(0, 40)} className="flex gap-[14px]">
              <CheckMark className="mt-[2px] shrink-0" />
              <p className="max-w-[720px] text-[16px] leading-[26px] font-normal text-black/85 xl:text-[17px] xl:leading-[28px]">
                {paragraph}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Technology stacks on the light band — 482:143 ----------- */}
      {/* Was `bg-[#f7f7f7]` — an ad-hoc *warm* neutral on a site that is cool blue
          throughout, the same fault the Services band had. And `pb-[186px]`, which
          is a Figma coordinate rather than a spacing decision. */}
      <div className="mt-[80px] w-full bg-brand-tint pt-[72px] pb-[96px] xl:mt-[104px] xl:pt-[88px] xl:pb-[112px]">
        <TechStackSection heading={headings.ai} section={section("ai")} />
        <TechStackSection heading={headings.backend} section={section("backend")} />
        <TechStackSection heading={headings.frontend} section={section("frontend")} />
        <TechStackSection heading={headings.app} section={section("app")} />

        {/* ---- Pick Your Stack — 507:128 ---------------------------- */}
        <section className="canvas px-6 pt-[88px] xl:px-[212px] xl:pt-[120px]">
          <div className="flex flex-col overflow-hidden rounded-panel border border-hairline bg-white xl:min-h-[435px] xl:flex-row">
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

        <TechStackSection heading={headings.devops} section={section("devops")} spacing={103} />
        <TechStackSection heading={headings.cloud} section={section("cloud")} />
      </div>

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
    /*
      The heading sat at `pl-210` and the tiles at `pl-301` — a 91px step with
      nothing to justify it. Both are on the site gutter now, and the tiles are
      a real grid rather than `flex-wrap` with a 9px gap, which was leaving a
      ragged last row of different width on every one of the six sections.

      The tiles themselves were flat white rectangles on a warm grey with no
      edge and no state. They now have the hairline every other surface on this
      site uses, and they lift on hover — these are third-party marks, so the
      only thing to signal is "this is a discrete thing", which an edge does.
    */
    <section
      className="canvas px-6 xl:px-[212px]"
      style={{ paddingTop: spacing }}
    >
      <h2 className="text-[20px] leading-[29px] font-bold text-black xl:text-[22px] xl:leading-[30px]">
        {heading}
      </h2>
      <ul className="mt-[28px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 xl:mt-[36px] xl:grid-cols-6">
        {section.logos.map((logo) => (
          <li
            key={logo.file}
            className="flex h-[88px] items-center justify-center rounded-[10px] border border-black/[0.08] bg-white transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:border-black/[0.16] hover:shadow-[0_10px_24px_-12px_rgb(6_42_82/0.22)] motion-reduce:hover:translate-y-0"
          >
            <Image
              src={logo.file}
              alt=""
              width={logo.w}
              height={logo.h}
              className="max-h-[52px] w-auto max-w-[112px] object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
