import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["http://localhost:3000", "http://172.17.64.1:3000"],
  /* config options here */
};

export default nextConfig;
