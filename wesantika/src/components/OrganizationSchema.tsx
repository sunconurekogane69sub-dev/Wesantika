import { CONTACT_CHANNELS, HEAD_OFFICE } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * Organization JSON-LD.
 *
 * The head office is the first genuinely verifiable fact about this company on
 * the site, and rendering it as three lines of text tells a search engine
 * nothing — `PostalAddress` does. This is also what a knowledge panel is built
 * from, and what "wesantika address" has to match to return anything useful.
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
      ...HEAD_OFFICE.postal,
    },
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
