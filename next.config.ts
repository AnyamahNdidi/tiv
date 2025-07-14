import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["9jatext.com.ng"],
  },
  typescript: {
    ignoreBuildErrors: true, // Disables ALL TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ALL ESLint errors
  },
};

export default nextConfig;
