const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  scope: '/brokerage/',
  runtimeCaching: require('next-pwa/cache'),
  disable: process.env.NODE_ENV === 'development',
});


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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new PrismaPlugin());

      // Optional: Uncomment if you want to externalize @prisma/client manually
      // config.externals = [...(config.externals || []), { '@prisma/client': 'commonjs @prisma/client' }];
    }

    return config;
  },

  // Optional: Uncomment if using serverExternalPackages
  // serverExternalPackages: ['@prisma/client'],
};

module.exports = withPWA(nextConfig)
