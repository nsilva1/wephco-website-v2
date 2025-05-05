import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (config) => {
  //   config.externals = [...config.externals, { '@prisma/client': 'commonjs @prisma/client' }];
  //   return config;
  // },
  // serverExternalPackages: ['@prisma/client'],
  images: {
    // domains: ["example.com", "images.unsplash.com", "i.imgur.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
