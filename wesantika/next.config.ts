import type { NextConfig } from "next";

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
};

export default nextConfig;
