import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  // One small stylesheet: inlining it saves a render-blocking round trip.
  experimental: { inlineCss: true },
  // The design has no photos (type, stickers and SVG only), so there's no
  // next/image loader or scripts/images.mjs output to wire up.
};

export default nextConfig;
