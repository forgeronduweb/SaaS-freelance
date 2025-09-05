import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

const verifyTokenMiddleware = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET || 'afrilance-super-secret-jwt-key-minimum-32-characters-long-for-security'
    console.log(`[MIDDLEWARE] Using JWT secret length: ${secret.length}`)
    const decoded = jwt.verify(token, secret) as JWTPayload
    console.log(`[MIDDLEWARE] JWT decoded successfully:`, decoded)
    return decoded
  } catch (error) {
    console.log(`[MIDDLEWARE] JWT verification error:`, error)
    console.log(`[MIDDLEWARE] Token that failed:`, token.substring(0, 50) + '...')
    return null
  }
}

export function middleware(request: NextRequest) {
  // Middleware complètement désactivé pour optimiser les performances
  return NextResponse.next()
  
  // Code original commenté pour réactivation future
  /*
  // Récupérer le token depuis les cookies ou localStorage (via headers)
  const cookieToken = request.cookies.get('token')?.value
  const authHeader = request.headers.get('authorization')?.replace('Bearer ', '')
  const xToken = request.headers.get('x-token')
  
  const token = cookieToken || authHeader || xToken
  
  console.log(`[MIDDLEWARE] Cookie token: ${!!cookieToken}`)
  console.log(`[MIDDLEWARE] Auth header: ${!!authHeader}`)
  console.log(`[MIDDLEWARE] X-Token header: ${!!xToken}`)
  console.log(`[MIDDLEWARE] Final token found: ${!!token}`)
  
  if (token) {
    console.log(`[MIDDLEWARE] Token value (first 20 chars): ${token.substring(0, 20)}...`)
    console.log(`[MIDDLEWARE] Token length: ${token.length}`)
  }
  
  let isAuthenticated = false
  let userType = null
  
  if (token) {
    try {
      const decoded = verifyTokenMiddleware(token)
      console.log(`[MIDDLEWARE] Token decoded:`, decoded)
      if (decoded && typeof decoded === 'object' && 'role' in decoded) {
        isAuthenticated = true
        userType = decoded.role
        console.log(`[MIDDLEWARE] User authenticated as: ${userType}`)
      } else {
        console.log(`[MIDDLEWARE] Token decoded but invalid structure`)
      }
    } catch (error) {
      console.log(`[MIDDLEWARE] Token invalid:`, error)
      // Token invalide, on le supprime
      const response = NextResponse.next()
      response.cookies.delete('token')
      return response
    }
  }
  
  // Si l'utilisateur essaie d'accéder à une route protégée sans être connecté
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    console.log(`[MIDDLEWARE] Redirecting to login - protected route without auth`)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Si l'utilisateur connecté essaie d'accéder aux pages d'auth, le rediriger vers son dashboard
  if (isAuthenticated && authRoutes.includes(pathname)) {
    const dashboardUrl = userType === 'CLIENT' ? '/dashboard/client' : '/dashboard/freelance'
    console.log(`[MIDDLEWARE] Redirecting authenticated user to: ${dashboardUrl}`)
    return NextResponse.redirect(new URL(dashboardUrl, request.url))
  }
  
  // Vérifier que l'utilisateur accède au bon type de dashboard
  if (isAuthenticated && pathname.startsWith('/dashboard/')) {
    const expectedDashboard = userType === 'CLIENT' ? '/dashboard/client' : '/dashboard/freelance'
    const wrongDashboard = userType === 'CLIENT' ? '/dashboard/freelance' : '/dashboard/client'
    
    if (pathname.startsWith(wrongDashboard)) {
      console.log(`[MIDDLEWARE] Redirecting to correct dashboard: ${expectedDashboard}`)
      return NextResponse.redirect(new URL(expectedDashboard, request.url))
    }
  }
  
  console.log(`[MIDDLEWARE] Allowing access to: ${pathname}`)
  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.png (icon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)',
  ],
}
