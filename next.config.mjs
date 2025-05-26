/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
  },
  output: 'standalone',
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-*',
      'lucide-react'
    ],
  }

}

export default nextConfig
