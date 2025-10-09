import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"
import { verifyToken } from '@/lib/auth'

// Routes qui nécessitent une authentification
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/projects',
  '/messages',
  '/settings'
]

// Routes publiques (pas besoin d'auth)
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/reset-password'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Ignorer les fichiers statiques et API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Vérifier si la route nécessite une authentification
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Vérifier d'abord le token NextAuth
    const nextAuthToken = request.cookies.get('next-auth.session-token')?.value || 
                         request.cookies.get('__Secure-next-auth.session-token')?.value

    if (nextAuthToken) {
      // Laisser NextAuth gérer l'authentification
      return NextResponse.next()
    }

    // Fallback sur l'ancien système JWT
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // Rediriger vers login si pas de token
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Vérifier la validité du token
    const payload = verifyToken(token)
    if (!payload) {
      // Token invalide, rediriger vers login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('auth-token')
      return response
    }

    // Ajouter les infos utilisateur aux headers pour les API routes
    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.userId)
    response.headers.set('x-user-type', payload.userType)
    return response
  }

  // Route publique ou non protégée
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png|api).*)',
  ],
}
