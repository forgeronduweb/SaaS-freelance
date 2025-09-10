/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration Turbopack
  experimental: {
    turbo: {
      root: '../client'
    }
  },
  
  // Optimisations pour le build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // Configuration ESLint (désactiver pendant le build si nécessaire)
  eslint: {
    // Désactiver ESLint pendant le build pour éviter les erreurs bloquantes
    ignoreDuringBuilds: true
  },
  
  // Configuration TypeScript
  typescript: {
    // Continuer le build même avec des erreurs TypeScript (optionnel)
    ignoreBuildErrors: false
  },
  
  // Optimisations de performance
  swcMinify: true,
  
  // Configuration des images
  images: {
    domains: [],
    unoptimized: false
  },
  
  // Configuration du cache
  generateBuildId: async () => {
    // Utiliser un ID de build basé sur le timestamp pour le cache
    return `build-${Date.now()}`
  },
  
  // Headers pour le cache
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
