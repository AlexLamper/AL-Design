import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin de project-root: er staat een tweede package-lock.json in C:\Projects,
  // waardoor Next anders de verkeerde map als workspace-root kiest.
  turbopack: { root: __dirname },
};

export default nextConfig;
