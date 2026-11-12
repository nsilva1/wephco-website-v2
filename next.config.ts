import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['firebase-admin'],
  // The magazine PDFs are read from disk when they are emailed after payment,
  // so they have to be packaged with the server code for that page.
  outputFileTracingIncludes: {
    '/magazine/payment-success': [
      './public/WIMAO.pdf',
      './public/Investment_Intelligence.pdf',
    ],
  },
  experimental: {
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
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