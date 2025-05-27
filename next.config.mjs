/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_URL: process.env.APP_URL,
  },
  images: {
    domains: ['localhost', 'ik.imagekit.io'],
    // unoptimized: true,
  },
};

export default nextConfig;
