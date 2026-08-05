import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All imagery is exported from Figma into /public, so no remote loaders.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
