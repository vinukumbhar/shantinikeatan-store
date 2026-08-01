import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com", // Catch images.unsplash.com
      },
      {
        protocol: "https",
        hostname: "unsplash.com",    // Catch raw unconfigured links
      },
    ],
  },
};

export default nextConfig;
