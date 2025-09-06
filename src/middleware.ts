import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  void request // Variable utilisée pour validation future
  console.log('TEMPORARY BYPASS - Middleware désactivé pour déboguer')
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)',
  ],
}
