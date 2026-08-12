import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiProximityPanel } from "@/components/AiProximityPanel";
import { AccentedHeading } from "@/components/AccentedHeading";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
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
        />

      {/* ---- Our Full-Range Services — 180:618-710 ------------------- */}
      <section className="canvas px-6 pt-[64px] xl:px-0 xl:pt-[88px]">
        {/* Ink for the phrase, brand for the one word. It used to be brand
            throughout, which made the whole line read as a label rather than a
            heading. Brand blue is 3.3:1 on white — fine here, because at 28px
            and up it counts as large text. */}
        <AccentedHeading
          text={t.services.heading}
          accent={t.services.headingAccent}
          className="text-[28px] leading-[36px] font-bold text-black xl:pl-[212px] xl:text-[36px] xl:leading-[42px]"
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

        <div className="mt-[80px] flex justify-center xl:mt-[130px]">
          <Link
            href={`/${locale}/services`}
            className="flex h-[48px] min-w-[200px] items-center justify-center rounded-card border border-hairline bg-white px-[20px] text-[16px] leading-[26px] font-bold whitespace-nowrap text-black transition-colors hover:border-brand hover:text-brand"
          >
            {t.services.cta}
          </Link>
        </div>
      </section>

      {/* ---- AI Innovation — 180:725-761 ----------------------------- */}
      <section className="canvas px-6 pt-[100px] xl:px-0 xl:pt-[155px]">
        <h2 className="mx-auto max-w-[1019px] text-center text-[34px] leading-[1.2] font-bold text-black sm:text-[48px] xl:text-[64px] xl:leading-[70px]">
          {t.ai.heading}
        </h2>
        <p className="mx-auto mt-[27px] max-w-[1102px] text-center text-[18px] leading-[26px] font-normal text-black xl:text-[20px] xl:leading-[30px]">
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
                  <span aria-hidden className="text-brand">
                    ✓
                  </span>
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
