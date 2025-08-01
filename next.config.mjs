/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_URL: process.env.APP_URL,
  },
  images: {
    // domains: ['localhost', 'ik.imagekit.io'],
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: process.env.API_BASE_URL + '/sitemap.xml',
      }
    ]
  },
};

export default nextConfig;
