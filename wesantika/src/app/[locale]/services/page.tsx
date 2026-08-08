import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import { Nav } from "@/components/Nav";
import {
  ServiceOfferCard,
  ServiceOfferPlaceholder,
} from "@/components/ServiceOfferCard";
import { StickyContactRail } from "@/components/StickyContactRail";
import {
  GLOBAL_TEAM_POINTS,
  SERVICE_HIGHLIGHTS,
  SERVICE_OFFER_CARDS,
  SERVICE_OFFER_PLACEHOLDERS,
} from "@/lib/content";
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
    title: t.servicesPage.metaTitle,
    description: t.servicesPage.metaDescription,
    alternates: {
      canonical: `/${locale}/services`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/services`]),
      ),
    },
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

      {/* ---- Hero — 405:1949 / 405:1997-1998 / 405:1993 -------------- */}
      <section className="relative h-[620px] sm:h-[780px] xl:h-[950px]">
        <Image
          src="/images/services-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <Nav locale={locale} nav={t.nav} />
        <div className="canvas relative h-full px-6 xl:px-0">
          <div className="pt-[170px] sm:pt-[230px] xl:pt-[356px] xl:pl-[207px]">
            {/* Both authored white (250:1106/1107) over the pale left side of the
                photo — 2.8:1 even with a navy wash over it. Black measures
                6.1:1 (headline) and 8.3:1 (body) unaided, so the wash is gone.
                See `node scripts/ink-audit.mjs`. */}
            <h1 className="max-w-[755px] text-[32px] leading-[1.2] font-bold text-black sm:text-[40px] xl:text-[48px] xl:leading-[58px]">
              {s.hero.title}
            </h1>
            <p className="mt-[40px] max-w-[748px] text-[16px] leading-[24px] font-normal text-black xl:text-[20px]">
              {s.hero.body}
            </p>
            <a
              href="#contact"
              className="mt-[48px] inline-flex h-[46px] min-w-[289px] items-center justify-center rounded-btn bg-brand px-[27px] text-[20px] leading-[24px] font-normal whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[60px]"
            >
              {s.hero.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Accelerate — 405:1971 / 405:1983 / 405:1990 ------------- */}
      <section className="canvas px-6 pt-[80px] xl:px-0 xl:pt-[126px]">
        <h2 className="mx-auto max-w-[1021px] text-center text-[30px] leading-[1.2] font-bold text-black sm:text-[38px] xl:text-[48px] xl:leading-[58px]">
          {s.accelerate.heading}
        </h2>

        <div className="mx-auto mt-[60px] grid max-w-[1024px] gap-[26px] md:grid-cols-2 xl:mt-[126px]">
          {SERVICE_HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.id}
              className="relative flex h-[420px] flex-col overflow-hidden rounded-[16px] border-[3px] border-brand bg-white xl:h-[574px]"
            >
              <Image
                src={highlight.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain object-bottom"
              />
              {/* Both source photos are white at the top, so the black label
                  in the file reads cleanly where it is placed. */}
              <h3 className="relative px-[41px] pt-[91px] text-[24px] leading-[1.2] font-bold text-black xl:text-[32px] xl:leading-[39px]">
                {s.accelerate.highlights[highlight.id]}
              </h3>
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
            />
          ))}
          {/* The artboard draws 18 slots; only the first is authored. */}
          {Array.from({ length: SERVICE_OFFER_PLACEHOLDERS }, (_, i) => (
            <ServiceOfferPlaceholder key={`slot-${i}`} />
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
            <a
              href="#contact"
              className="mt-[28px] inline-flex h-[46px] min-w-[141px] items-center justify-center rounded-btn border border-hairline bg-brand px-[20px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[31px]"
            >
              {t.rfp.cta}
            </a>
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

      {/* ---- Why Choose Wesantika — 405:1972-1980 -------------------- */}
      <section className="mt-[80px] w-full bg-[#fafaf9] xl:mt-[136px]">
        <div className="canvas relative px-6 py-[80px] xl:px-0 xl:py-0 xl:pt-[103px] xl:pb-[104px]">
          <h2 className="text-[36px] leading-[1.15] font-bold text-black sm:text-[48px] xl:pl-[150px] xl:text-[64px] xl:leading-[77px]">
            {s.why.heading}
          </h2>

          <div className="mt-[40px] flex flex-col gap-[48px] xl:mt-[56px] xl:flex-row xl:items-start xl:gap-0 xl:pl-[207px]">
            <ul className="flex flex-col gap-0 xl:w-[643px] xl:shrink-0">
              {s.why.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-[12px] text-[24px] leading-[36px] font-bold text-black sm:text-[32px] xl:text-[40px] xl:leading-[48px]"
                >
                  <span aria-hidden className="text-brand">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="relative aspect-square w-full max-w-[693px] overflow-hidden rounded-[53px] xl:w-[693px] xl:shrink-0">
              <Image
                src="/images/svc-award.png"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 693px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-[56px] flex justify-center xl:mt-[110px]">
            <a
              href="#contact"
              className="inline-flex h-[46px] min-w-[300px] items-center justify-center rounded-btn border border-hairline bg-brand px-[20px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
              {s.why.cta}
            </a>
          </div>
        </div>
      </section>

      <Footer strings={t.footer} />
    </>
  );
}
