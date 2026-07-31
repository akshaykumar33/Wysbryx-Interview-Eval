import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.wysbryx.com",
      },
    ],
  },
};

export default nextConfig;
