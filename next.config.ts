import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  serverExternalPackages: ["@node-rs/argon2"],
  pageExtensions: ["tsx", "ts", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
