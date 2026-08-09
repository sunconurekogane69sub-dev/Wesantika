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
};

export default nextConfig;
