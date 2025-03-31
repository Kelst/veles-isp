/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Повністю ігнорувати помилки TypeScript під час збірки
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;