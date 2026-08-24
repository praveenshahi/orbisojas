import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export: the site is served by nginx from /var/www/orbisojas on
   * the GCP VM, so there is no Node process to run Next's server.
   *
   * Every route is already prerendered, so nothing is lost structurally.
   * The one real cost is `images.unoptimized` — there is no Image
   * Optimization API on a static host, so source files are served as-is.
   * They are therefore pre-compressed at build time; see scripts/optimise-images.
   */
  output: "export",

  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
