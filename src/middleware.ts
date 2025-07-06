import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('session')?.value === 'authenticated'

  if (!isLoggedIn && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}
