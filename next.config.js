/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's.wordpress.com',
        port: '',
        pathname: '/mshots/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'vivieliterapia.netlify.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'notaia.netlify.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
