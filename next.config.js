/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:7155/:path*'
      }
    ]
  },
  experimental: {
    esmExternals: true
  }
}


module.exports = nextConfig
