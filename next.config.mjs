import config from "./next-i18next.config.js";

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["api.mmmia.black-fire.work"]
  },
  i18n: config.i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          ref: true
        }
      }
    });

    // FS used for image dimensions populating in SSR
    config.resolve.fallback = { fs: false };

    return config;
  }
};

export default nextConfig;
