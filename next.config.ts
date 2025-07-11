import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "specials-images.forbesimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.forbes.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "forbes.com",
        port: "",
        pathname: "/**",
      },
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
