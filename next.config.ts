import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/mess",
  assetPrefix: "/mess",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
