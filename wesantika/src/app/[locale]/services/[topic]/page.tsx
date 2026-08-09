import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Emphasis } from "@/components/Emphasis";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StickyContactRail } from "@/components/StickyContactRail";
import { SERVICE_DETAIL_TOPICS, type ServiceDetailId } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale, LOCALE_CODES } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return LOCALE_CODES.flatMap((locale) =>
    SERVICE_DETAIL_TOPICS.map((topic) => ({ locale, topic: topic.slug })),
  );
}

const resolve = (slug: string): ServiceDetailId | undefined =>
  SERVICE_DETAIL_TOPICS.find((topic) => topic.slug === slug)?.id;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const id = resolve(topic);
  if (!isLocale(locale) || !id) return {};
  const d = getDictionary(locale).serviceDetails[id];

  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/services/${topic}`,
      languages: Object.fromEntries(
        LOCALE_CODES.map((code) => [code, `/${code}/services/${topic}`]),
      ),
    },
  };
}

/** Shared width for every band on the page — Figma 586:815 / 586:1083. */
const SHELL = "mx-auto w-full max-w-[1140px] px-6 xl:px-0";

/**
 * Long-form service write-up — Figma 586:813 (AI) and 586:1081 (Custom), now
 * the template for all fourteen topics in SERVICE_DETAIL_TOPICS.
 *
 * **No hero.** This is what the "DETAIL →" buttons open, and the brief is that
 * the hero must not follow the reader in; the page opens on the heading. That
 * leaves nothing behind the nav bar but white page, so it renders solid rather
 * than in its transparent-over-hero state.
 *
 * The file paints card titles blue on some cards and near-black on others with
 * no pattern to it — 12 of 14 blue on the Custom page, 1 of 7 on the AI page.
 * Body copy is normalised to near-black: the brand colour is spent on the
 * section rules, the step numerals and the CTA, where it carries structure
 * rather than just tinting paragraphs.
 *
 * Colour notes, since this page introduces the tinted bands:
 * - #f4f9ff is the lightest step of the brand blue that still reads as a band
 *   against white. Headings on it are black; brand-ink measures 5.68:1 there if
 *   a link ever needs to sit on the tint.
 * - White on #0f84fd is 3.66:1, which only clears AA as large text — so every
 *   white-on-brand string here (the step numerals, the CTA) is bold and at
 *   least 18.66px. The same 3.66:1 applies to brand-on-white, which is why the
 *   benefit ticks and the FAQ "+" are 20px bold as well as aria-hidden.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  const id = resolve(topic);
  if (!isLocale(locale) || !id) notFound();
  const t = getDictionary(locale);
  const d = t.serviceDetails[id];

  return (
    <>
      <StickyContactRail labels={t.rail} />
      <Nav locale={locale} nav={t.nav} alwaysSolid />

      <main className="canvas pt-[95px]">
        {/* ---- Heading + intro -------------------------------------- */}
        <div className={`${SHELL} pt-[56px] xl:pt-[88px]`}>
          <Link
            href={`/${locale}/services`}
            className="text-[16px] leading-[19px] font-bold text-brand-ink underline-offset-4 hover:underline"
          >
            <span aria-hidden>← </span>
            {d.eyebrow}
          </Link>

          <h1 className="mt-[20px] max-w-[750px] text-[30px] leading-[1.2] font-semibold text-black sm:text-[36px] xl:text-[40px] xl:leading-[48px]">
            {d.title}
          </h1>

          {/* A short brand rule under the H1 ties the page to the nav pill and
              the CTA without adding another block of colour. */}
          <div aria-hidden className="mt-[24px] h-[4px] w-[64px] rounded-full bg-brand" />

          {d.intro.map((paragraph, index) => (
            <p
              key={index}
              className="mt-[24px] max-w-[750px] text-[16px] leading-[26px] font-normal text-black/85 xl:text-[18px] xl:leading-[28px]"
            >
              <Emphasis text={paragraph} className="font-normal text-brand-ink" />
            </p>
          ))}
        </div>

        {/* ---- What we build --------------------------------------- */}
        <section className={`${SHELL} pt-[56px] xl:pt-[80px]`}>
          <SectionHeading>{d.cardsHeading}</SectionHeading>

          {/* 364px columns with a 24px gutter — 586:815 / 586:1083 */}
          <div className="mt-[32px] grid gap-[24px] sm:grid-cols-2 xl:grid-cols-3">
            {d.cards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-[8px] border border-hairline bg-white px-[26px] py-[28px] transition-colors duration-200 ease-out hover:border-brand"
              >
                <h3 className="text-[18px] leading-[24px] font-semibold text-[#212529]">
                  {card.title}
                </h3>
                <p className="mt-[16px] text-[16px] leading-[24px] font-normal text-[#525252]">
                  <Emphasis text={card.body} className="font-bold" />
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Why Wesantika --------------------------------------- */}
        <section className="mt-[56px] w-full bg-[#f4f9ff] py-[56px] xl:mt-[88px] xl:py-[80px]">
          <div className={SHELL}>
            <SectionHeading>{d.whyHeading}</SectionHeading>

            <div className="mt-[32px] grid gap-[24px] sm:grid-cols-2 xl:grid-cols-3">
              {d.why.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[8px] border-l-[4px] border-brand bg-white px-[24px] py-[24px] shadow-[0_1px_3px_rgb(0_0_0/0.06)]"
                >
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#212529]">
                    {item.title}
                  </h3>
                  <p className="mt-[12px] text-[16px] leading-[24px] font-normal text-[#525252]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Process --------------------------------------------- */}
        <section className={`${SHELL} pt-[56px] xl:pt-[88px]`}>
          <SectionHeading>{d.processHeading}</SectionHeading>

          {/* An ordered list, so the sequence survives without the numerals —
              the badges are decorative and hidden from assistive tech. */}
          <ol className="mt-[32px] flex flex-col">
            {d.process.map((step, index) => (
              <li key={step.title} className="flex gap-[20px] xl:gap-[28px]">
                {/* The rail is drawn by the column rather than by a border on
                    the row, so it stops cleanly after the final step. */}
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-brand text-[20px] leading-[24px] font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  {index < d.process.length - 1 && (
                    <span aria-hidden className="w-[2px] flex-1 bg-brand/25" />
                  )}
                </div>

                <div className="pb-[32px]">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#212529] xl:pt-[10px]">
                    {step.title}
                  </h3>
                  <p className="mt-[10px] max-w-[820px] text-[16px] leading-[24px] font-normal text-[#525252]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- Benefits -------------------------------------------- */}
        <section className={`${SHELL} pt-[24px] xl:pt-[40px]`}>
          <SectionHeading>{d.benefitsHeading}</SectionHeading>

          <div className="mt-[32px] grid gap-x-[40px] gap-y-[28px] sm:grid-cols-2 xl:grid-cols-3">
            {d.benefits.map((benefit) => (
              <article key={benefit.title} className="flex gap-[14px]">
                <span
                  aria-hidden
                  className="mt-[2px] text-[20px] leading-[24px] font-bold text-brand"
                >
                  ✔
                </span>
                <div>
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#212529]">
                    {benefit.title}
                  </h3>
                  <p className="mt-[10px] text-[16px] leading-[24px] font-normal text-[#525252]">
                    {benefit.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---- FAQ -------------------------------------------------- */}
        <section className="mt-[56px] w-full bg-[#fafaf9] py-[56px] xl:mt-[88px] xl:py-[80px]">
          <div className={SHELL}>
            <SectionHeading>{d.faqHeading}</SectionHeading>

            {/* <details> rather than a scripted accordion: it is keyboard and
                screen-reader operable with no JS, and this is a server page. */}
            <div className="mt-[32px] flex flex-col gap-[12px]">
              {d.faq.map((entry) => (
                <details
                  key={entry.q}
                  className="group rounded-[8px] border border-hairline bg-white px-[24px] py-[18px] open:border-brand"
                >
                  {/* `list-none` covers Firefox/Chrome; Safari needs its own
                      pseudo-element hidden explicitly or the triangle stays. */}
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-[16px] text-[17px] leading-[24px] font-semibold text-[#212529] marker:content-none [&::-webkit-details-marker]:hidden">
                    {entry.q}
                    <span
                      aria-hidden
                      className="mt-[2px] shrink-0 text-[20px] leading-[20px] font-bold text-brand transition-transform duration-200 ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-[14px] max-w-[900px] text-[16px] leading-[26px] font-normal text-[#525252]">
                    {entry.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA -------------------------------------------------- */}
        <div className="flex justify-center py-[56px] xl:py-[88px]">
          {/* Same reasoning as the DETAIL button: 18px white on #0f84fd is
              3.66:1, so the label is bold to qualify as large text. */}
          <a
            href="#contact"
            className="inline-flex h-[48px] items-center justify-center rounded-[8px] bg-brand px-[24px] text-[18px] leading-[24px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
          >
            {d.cta}
          </a>
        </div>
      </main>

      <Footer strings={t.footer} />
    </>
  );
}

/** One treatment for every band heading, so the six sections read as a set. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[24px] leading-[1.25] font-bold text-black sm:text-[28px] xl:text-[32px] xl:leading-[39px]">
      {children}
    </h2>
  );
}
