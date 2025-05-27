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
    minimumCacheTTL: 86400
  },
  output: 'standalone',
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react']
  },
  // TODO: /main
  assetPrefix: '/main/',
  trailingSlash: false
}

export default nextConfig
