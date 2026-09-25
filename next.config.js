/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      { source: '/meridian', destination: 'http://100.31.233.0/' },
      { source: '/meridian/:path*', destination: 'http://100.31.233.0/:path*' },
    ]
  },
}
