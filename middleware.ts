// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access to login page and public assets.
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Get the token from cookies.
  const token = request.cookies.get('token');

  // If token is not present, redirect to /login.
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If token exists, proceed.
  return NextResponse.next();
}

// Specify paths that the middleware should apply to.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
