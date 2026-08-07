import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: false,
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
};

export default nextConfig;
