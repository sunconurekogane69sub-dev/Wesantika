import Image from "next/image";
import { notFound } from "next/navigation";
import { AiProximityPanel } from "@/components/AiProximityPanel";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ServiceCard } from "@/components/ServiceCard";
import { StickyContactRail } from "@/components/StickyContactRail";
import { SERVICE_CARDS, SERVICE_CATEGORY_IDS } from "@/lib/content";
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

      {/* ---- Hero — 180:576 / 180:599 -------------------------------- */}
      <section className="relative h-[620px] sm:h-[760px] xl:h-[941px]">
        <Image
          src="/images/top-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <Nav locale={locale} nav={t.nav} />
        <div className="canvas relative h-full px-6 xl:px-0">
          <div className="pt-[170px] sm:pt-[210px] xl:pt-[255px] xl:pl-[212px]">
            <h1 className="max-w-[701px] text-[40px] leading-[1.2] font-bold text-white sm:text-[52px] xl:text-[64px] xl:leading-[77px]">
              {t.hero.title}
            </h1>
            <p className="mt-[21px] max-w-[703px] text-[18px] leading-[26px] font-bold text-white xl:text-[24px] xl:leading-[29px]">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Our Full-Range Services — 180:618-710 ------------------- */}
      <section className="canvas px-6 pt-[64px] xl:px-0 xl:pt-[88px]">
        <h2 className="text-[28px] leading-[36px] font-bold text-brand xl:pl-[212px] xl:text-[36px] xl:leading-[44px]">
          {t.services.heading}
        </h2>

        <div className="mt-[40px] flex flex-col gap-[40px] xl:mt-[59px] xl:flex-row xl:gap-0 xl:pl-[212px]">
          <ul className="flex flex-col gap-[27px] xl:w-[363px] xl:shrink-0">
            {SERVICE_CATEGORY_IDS.map((id, index) => (
              <li
                key={id}
                className="relative pl-[12px] text-[20px] leading-[24px] font-bold text-black"
              >
                {/* Active marker — Figma 180:710, a 5px brand rule */}
                {index === 0 && (
                  <span
                    aria-hidden
                    className="absolute top-[-2px] left-0 h-[27px] w-[5px] bg-brand"
                  />
                )}
                {t.services.categories[id]}
              </li>
            ))}
          </ul>

          <div className="grid gap-x-[11px] gap-y-[12px] sm:grid-cols-2 xl:w-[891px]">
            {SERVICE_CARDS.map((card) => (
              <ServiceCard
                key={card.id}
                icon={card.icon}
                title={t.services.cards[card.id].title}
                body={t.services.cards[card.id].body}
              />
            ))}
          </div>
        </div>

        <div className="mt-[80px] flex justify-center xl:mt-[130px]">
          <a
            href="#contact"
            className="flex h-[48px] min-w-[200px] items-center justify-center rounded-card border border-hairline bg-white px-[20px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-black transition-colors hover:border-brand hover:text-brand"
          >
            {t.services.cta}
          </a>
        </div>
      </section>

      {/* ---- AI Innovation — 180:725-761 ----------------------------- */}
      <section className="canvas px-6 pt-[100px] xl:px-0 xl:pt-[155px]">
        <h2 className="mx-auto max-w-[1019px] text-center text-[34px] leading-[1.2] font-bold text-black sm:text-[48px] xl:text-[64px] xl:leading-[77px]">
          {t.ai.heading}
        </h2>
        <p className="mx-auto mt-[27px] max-w-[1102px] text-center text-[18px] leading-[26px] font-normal text-black xl:text-[20px] xl:leading-[24px]">
          {t.ai.subtitle}
        </p>
        <div className="mt-[60px] xl:mt-[114px] xl:px-[54px]">
          <AiProximityPanel labels={t.ai.labels} />
        </div>
      </section>

      {/* ---- Send Your RFP — 180:711-724 ----------------------------- */}
      <section className="canvas px-6 pt-[80px] xl:px-[186px] xl:pt-[107px]">
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
            {/* min-width, not a fixed 141px: the authored box left only ~8px of
                side padding and clipped the label once rendered. */}
            <a
              href="#contact"
              className="mt-[28px] inline-flex h-[46px] min-w-[141px] items-center justify-center rounded-btn border border-hairline bg-brand px-[20px] text-[16px] leading-[19px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 xl:mt-[31px]"
            >
              {t.rfp.cta}
            </a>
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

      <div className="mt-[80px] xl:mt-[107px]">
        <Footer strings={t.footer} />
      </div>
    </>
  );
}
