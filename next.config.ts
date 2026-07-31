import type { NextConfig } from "next";

/**
 * Static export so the whole thing can sit on GitHub Pages for free.
 *
 * Pages serves a fork at https://<user>.github.io/<repo>/, so every asset needs
 * that prefix. The deploy workflow sets NEXT_PUBLIC_BASE_PATH from the repo
 * name, which means a fork works without anyone editing this file. Local
 * `pnpm dev` leaves it empty and serves from /.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
