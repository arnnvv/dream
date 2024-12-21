import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.**",
        port: "",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
    mdxRs: true,
  },
  serverExternalPackages: ["@node-rs/argon2"],
  pageExtensions: ["tsx", "ts", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
