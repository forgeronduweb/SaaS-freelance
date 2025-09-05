/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  
  // Désactiver optimizeCss temporairement pour éviter l'erreur critters
  experimental: {
    // optimizeCss: true,
  },
  
  // Compression et optimisations
  compress: true,
  
  // Cache des images
  images: {
    formats: ['image/webp', 'image/avif'],
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
          }
        ]
      }
    ]
  }
}

export default nextConfig
