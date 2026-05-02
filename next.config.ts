import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    authInterrupts: true,
    serverComponentsExternalPackages: ['firebase-admin']
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;