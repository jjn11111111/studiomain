import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getAuth} from 'firebase-admin/auth';
import {getFirebaseAdminApp} from './lib/firebase-admin';

// This is the fix: explicitly set the runtime to Node.js
export const runtime = 'nodejs';

async function verifySessionCookie(cookie: string | undefined) {
  if (!cookie) return null;
  try {
    const app = getFirebaseAdminApp();
    const decodedClaims = await getAuth(app).verifySessionCookie(cookie, true);
    return decodedClaims;
  } catch (error) {
    // Session cookie is invalid or expired.
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const sessionCookie = request.cookies.get('__session')?.value;
  const decodedToken = await verifySessionCookie(sessionCookie);

  const isAuthPage = pathname === '/login';

  if (decodedToken) {
    // If logged in, redirect away from login page to the training page
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/training', request.url));
    }
  } else {
    // If not logged in, protect routes
    const protectedRoutes = ['/training', '/exercise', '/profile', '/journal'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/training/:path*', '/exercise/:path*', '/profile', '/journal', '/login'],
};