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
      // Meridian's build requests root-relative /assets and /api; these only
      // apply when no file in public/ or route in pages/ matches first.
      { source: '/assets/:path*', destination: 'http://100.31.233.0/assets/:path*' },
      { source: '/api/:path*', destination: 'http://100.31.233.0/api/:path*' },
    ]
  },
}
