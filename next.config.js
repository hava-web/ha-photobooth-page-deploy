const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
});

module.exports = nextConfig;
