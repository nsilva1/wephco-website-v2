const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    authInterrupts: true,
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

export default nextConfig;
