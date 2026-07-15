import type { NextConfig } from "next";

const locatorLoader = {
  loaders: [
    {
      loader: "@locator/webpack-loader",
      options: { env: "development" },
    },
  ],
};

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.tsx": locatorLoader,
      "*.jsx": locatorLoader,
      "*.ts": locatorLoader,
      "*.js": locatorLoader,
    },
  },
};

export default nextConfig;



