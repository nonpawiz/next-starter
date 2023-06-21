/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */

const nextConfig = {
  crossOrigin: "anonymous",
  devtool: "source-map",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
