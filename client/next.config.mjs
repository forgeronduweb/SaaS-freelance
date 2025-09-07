/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  
  // Configuration pour Vercel
  output: 'standalone',
  
  // Désactiver optimizeCss temporairement pour éviter l'erreur critters
  experimental: {
    // optimizeCss: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  
  // Compression et optimisations
  compress: true,
  
  // Cache des images
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost', 'vercel.app'],
  },
  
  // Configuration TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Headers de cache
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ]
  }
}

export default nextConfig
