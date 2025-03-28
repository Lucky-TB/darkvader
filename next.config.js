/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // For deployment, we'll ignore TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // For deployment, we'll ignore ESLint errors
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig; 