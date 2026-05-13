import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: ["http://localhost:3000", "http://172.17.64.1:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Whitelist external image hosts used by supplier/product images
      { protocol: "https", hostname: "barjuicevape.com" },
      { protocol: "https", hostname: "yellowtailwine.com" },
      { protocol: "https", hostname: "media.villamariawines.com" },
      { protocol: "https", hostname: "oysterbaywines.com" },
      { protocol: "https", hostname: "iheartwines.co.uk" },
      { protocol: "https", hostname: "lostmary.co.uk" },
      { protocol: "https", hostname: "pixlvape.com" },
      { protocol: "https", hostname: "eluxsalt.co.uk" },
      { protocol: "https", hostname: "skecrystalbar.com" },
      { protocol: "https", hostname: "elfbar.co.uk" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      // Broad wildcard to allow any https host when necessary
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
