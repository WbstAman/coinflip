// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true, // helpful for Netlify static hosting
};

module.exports = nextConfig; 