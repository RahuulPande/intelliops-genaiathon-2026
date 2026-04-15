import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Prevent workspace root inference issues in Docker and CI
  // Without this, standalone output nests files under the inferred root path
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
