/**
 * The site's own absolute origin, needed by canonical URLs, hreflang
 * alternates, `og:image` and the sitemap — all of which are ignored by
 * crawlers unless absolute.
 *
 * `NEXT_PUBLIC_SITE_URL` is inlined at build time, so it has to be set as a
 * *build* environment variable, not just a runtime one. If it is missing on
 * Vercel, `VERCEL_PROJECT_PRODUCTION_URL` (the project's production domain,
 * injected automatically) keeps the deployment from shipping metadata that
 * points at localhost — which is what a forgotten variable used to cause.
 *
 * Note this is deliberately the *production* domain even on preview builds:
 * canonicals and hreflang on a preview should point at production, not at the
 * throwaway deployment URL.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
