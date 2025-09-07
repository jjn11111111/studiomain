
'use server';

import { cookies } from 'next/headers';

export async function setAuthCookie(token: string) {
  cookies().set('firebaseAuthToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function clearAuthCookie() {
    cookies().delete('firebaseAuthToken');
}
