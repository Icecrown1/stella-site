/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  allowedDevOrigins: [
    '*.replit.dev',
    '*.worf.replit.dev',
    '*.repl.co',
    '*.replit.app',
    '127.0.0.1',
  ]
};

module.exports = nextConfig;
