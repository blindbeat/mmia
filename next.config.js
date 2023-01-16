/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["api.mmmia.black-fire.work"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          ref: true,
        },
      },
    })

    return config
  },
}

module.exports = nextConfig
