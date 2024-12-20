import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.wired.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "propunjabtv.com",
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
