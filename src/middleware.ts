import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // These are the routes that require authentication
  const protectedRoutes = ['/training', '/exercise', '/profile', '/journal'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for the Firebase auth token in cookies
    // This cookie is expected to be set upon user login.
    const authToken = request.cookies.get('firebaseAuthToken')?.value;

    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/training/:path*', '/exercise/:path*', '/profile', '/journal'],
};
