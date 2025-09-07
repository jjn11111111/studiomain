'use server';

import {cookies} from 'next/headers';
import {getAuth} from 'firebase-admin/auth';
import {getFirebaseAdminApp} from '@/lib/firebase-admin';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {getAuth as getClientAuth} from 'firebase/auth';
import {app as clientApp} from '@/lib/firebase';
import {doc, setDoc, getFirestore} from 'firebase/firestore';
import {getFirestore as getAdminFirestore} from 'firebase-admin/firestore';

const app = getFirebaseAdminApp();
const auth = getAuth(app);
const adminDb = getAdminFirestore(app);

export async function createSessionCookie(idToken: string) {
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

    const clientAuth = getClientAuth(clientApp);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    await createSessionCookie(idToken);
    return {success: true};
  } catch (error: any) {
    return {error: error.message || 'An unknown error occurred.'};
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
    return {error: 'Invalid email or password.'};
  }
}