
'use server';

import {cookies} from 'next/headers';
import {getAuth} from 'firebase-admin/auth';
import {getFirebaseAdminApp} from '@/lib/firebase-admin';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {getAuth as getClientAuth} from 'firebase/auth';
import {app as clientApp} from '@/lib/firebase';
import {getFirestore as getAdminFirestore} from 'firebase-admin/firestore';

function getAdminAuth() {
  try {
    const app = getFirebaseAdminApp();
    return { auth: getAuth(app), adminDb: getAdminFirestore(app) };
  } catch (error) {
    console.error("Failed to get Firebase Admin instance:", error);
    return { auth: null, adminDb: null };
  }
}

export async function createSessionCookie(idToken: string) {
  const { auth } = getAdminAuth();
  if (!auth) return;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn});
  cookies().set('__session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function clearSessionCookie() {
  cookies().delete('__session');
}

export async function signUpWithEmail(formData: FormData) {
  const { auth, adminDb } = getAdminAuth();
  if (!auth || !adminDb) {
    return {error: 'Server configuration error. Please try again later.'};
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });
    
    // Also create a user document in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
        email: userRecord.email,
        createdAt: new Date(),
        subscription: { status: 'free' },
    });

    // We can't get an ID token from the admin SDK user record directly.
    // We need to sign in the user on the client to get it.
    // This is a bit of a workaround, but it's a common pattern.
    // For this to work, we have to sign in with the client SDK
    const clientAuth = getClientAuth(clientApp);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    await createSessionCookie(idToken);
    return {success: true};
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
        return { error: 'This email address is already in use. Please log in or use a different email.' };
    }
    console.error("Sign up error:", error);
    // Provide a more generic error for other cases
    return {error: 'An unknown error occurred during sign up. Please try again.'};
  }
}

export async function signInWithEmail(formData: FormData) {
   const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }

  try {
    // We still use client SDK to sign in to get the ID token.
    const clientAuth = getClientAuth(clientApp);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    await createSessionCookie(idToken);

    return {success: true};
  } catch (error: any) {
    // Firebase's client-side SDK has more generic error messages for security
    // This is a reasonable default for a failed login attempt.
    return {error: 'Invalid email or password.'};
  }
}
