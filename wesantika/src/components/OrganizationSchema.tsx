import { CONTACT_CHANNELS, OFFICES, PRIMARY_OFFICE } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * Organization JSON-LD.
 *
 * The offices are the first genuinely verifiable fact about this company on the
 * site, and rendering them as lines of text tells a search engine nothing —
 * `PostalAddress` does. This is also what a knowledge panel is built from, and
 * what "wesantika address" has to match to return anything useful.
 *
 * `address` carries **one** office, on purpose: Google's Organization guidance
 * asks for a single principal address there, so putting both into it would
 * leave a consumer guessing which is which. It gets `PRIMARY_OFFICE`, the entry
 * the site itself leads with — Singapore. That is also what decides which
 * country a search engine files this company under, so it has to follow the
 * priority the offices are listed in rather than whichever address was written
 * down first.
 *
 * Every office, including that one, is then listed in `location` — the
 * schema.org property for where an organization actually is. Emitted only when
 * there is more than one office, because a `location` array repeating a single
 * address would say nothing that `address` had not already said.
 *
 * Everything here is real. The email is only emitted when it is not still on
 * `.example` (the RFC 2606 reserved TLD the placeholder uses), because
 * publishing a structured `contactPoint` that cannot receive mail is worse than
 * publishing none — see the launch checklist in README.md.
 */
export function OrganizationSchema({ locale }: { locale: string }) {
  const email = CONTACT_CHANNELS.find((c) => c.id === "email")?.href.replace(
    "mailto:",
    "",
  );
  const emailIsReal = email && !email.endsWith(".example");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wesantika",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og.png`,
    address: {
      "@type": "PostalAddress",
      ...PRIMARY_OFFICE.postal,
    },
    ...(OFFICES.length > 1
      ? {
          location: OFFICES.map((office) => ({
            "@type": "Place",
            address: { "@type": "PostalAddress", ...office.postal },
          })),
        }
      : {}),
    ...(emailIsReal
      ? { contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email }] }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // The object is built from constants in this repo, not from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
