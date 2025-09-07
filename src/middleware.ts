
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('firebaseAuthToken')?.value;

  // If the user is logged in, redirect them away from the login page
  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/training', request.url));
  }

  // These are the routes that require authentication
  const protectedRoutes = ['/training', '/exercise', '/profile', '/journal'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/training(.*)', '/exercise/:path*', '/profile', '/journal', '/login'],
};
