import type { NextConfig } from "next";


/**
 * Response headers. There were none, on a public site with two POST endpoints.
 *
 * ## The Content-Security-Policy, and what it honestly buys
 *
 * `script-src` keeps `'unsafe-inline'`, and that is a deliberate limit rather
 * than an oversight. Every page here is statically generated, and the strict
 * alternative — a per-request nonce — has to be minted per request, which would
 * push all 122 pages into dynamic rendering. Trading SSG for a directive that
 * only helps against an XSS hole this site has no user-generated surface for is
 * a bad trade. So the script directive is a host allowlist, not a defence
 * against injection.
 *
 * The directives that *do* carry weight here are the ones that cost nothing:
 *
 *   frame-ancestors 'none'   no clickjacking the RFP form into an overlay
 *   form-action 'self'       a hostile <form action> cannot post the enquiry
 *                            somewhere else
 *   base-uri 'self'          a <base> tag cannot re-point every relative URL
 *   object-src 'none'        no Flash/PDF plugin embedding
 *
 * `challenges.cloudflare.com` is allowed for script, frame and connect because
 * Turnstile loads a script and renders its widget in an iframe. It is the only
 * third-party origin in the app — the fonts are self-hosted by `next/font`, so
 * no Google Fonts origin is needed.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  // Next injects inline styles, and so does Turnstile's widget.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  /* Stops a browser second-guessing a declared Content-Type — the mechanism
     behind "this .txt upload executed as script". */
  { key: "X-Content-Type-Options", value: "nosniff" },
  /* frame-ancestors already covers this for modern browsers; kept for the ones
     that only understand the old header. */
  { key: "X-Frame-Options", value: "DENY" },
  /* Send the full URL same-origin, only the origin cross-origin. The default
     varies by browser, and enquiry pages should not leak their path outward. */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /* Nothing here uses a camera, a microphone or a location, so nothing embedded
     in the page should be able to ask for one. */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

/**
 * HSTS, production-only.
 *
 * Not because sending it locally would be dangerous — RFC 6797 §7.2 requires a
 * browser to *ignore* an STS header that arrives over plain HTTP, so a
 * `next start` on localhost could send it harmlessly. Gating it is about intent
 * being legible: this header is a statement about a real domain, and a reader
 * should not have to know that clause to be sure localhost is not being pinned.
 *
 * **No `preload`, deliberately.** The directive is inert until the domain is
 * submitted to hstspreload.org, and submitting is close to irreversible — the
 * entry ships inside browser binaries, removal takes months, and it applies to
 * every subdomain whether or not that subdomain has a certificate. Two years of
 * `includeSubDomains` is the strong part; the preload list is a separate
 * decision that should be made on purpose rather than inherited from a snippet.
 * Add the token here once the domain is settled and every subdomain is HTTPS.
 *
 * Vercel already sends HSTS on its own domains; this makes it explicit and
 * survives a move off Vercel.
 */
const HSTS = {
  key: "Strict-Transport-Security",
  value: "max-age=63072000; includeSubDomains",
};

const nextConfig: NextConfig = {
  images: {
    // All imagery is exported from Figma into /public, so no remote loaders.
    formats: ["image/avif", "image/webp"],
    /**
     * Next 16 narrowed the default from "any quality" to `[75]`, and silently
     * coerces anything else to the nearest allowed value — so `quality={90}` on
     * the heroes was being served as 75 with no warning. These are wide, smooth
     * blue gradients, which is the worst case for banding at 75.
     */
    qualities: [75, 90],
  },
  /**
   * `X-Powered-By: Next.js` off.
   *
   * It names the framework and, by implication, the class of advisories worth
   * trying. Removing it is not security, but it is free, and there is no reason
   * to volunteer the information.
   */
  poweredByHeader: false,

  experimental: {
    /**
     * Enables `app/global-not-found.tsx`, which is what gives an unmatched URL
     * the site's own 404 instead of Next's built-in error card. Required — the
     * file is inert without this flag, and the fallback is silent.
     *
     * Experimental as of 16.3 (introduced 15.4). If a future release changes or
     * drops it, the symptom is Next's unstyled 404 returning, and the fallback
     * is a catch-all route under `[locale]` — worse, because a 404 composed
     * through this app's dynamic root layout renders its body client-side.
     */
    globalNotFound: true,
  },

  async headers() {
    return [
      {
        // Everything, including /api and static assets.
        source: "/:path*",
        headers:
          process.env.NODE_ENV === "production"
            ? [...SECURITY_HEADERS, HSTS]
            : SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
