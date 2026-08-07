/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
