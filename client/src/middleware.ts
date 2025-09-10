import { NextResponse } from 'next/server'

export function middleware() {
  // Middleware désactivé - seulement la landing page
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png).*)',
  ],
}
