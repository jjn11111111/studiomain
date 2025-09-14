
'use server';

import {cookies} from 'next/headers';
import {getAuth as getAdminAuthSdk} from 'firebase-admin/auth';
import {getFirebaseAdminApp} from '@/lib/firebase-admin';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {getAuth as getClientAuth} from 'firebase/auth';
import {app as clientApp} from '@/lib/firebase';
import {getFirestore as getAdminFirestore} from 'firebase-admin/firestore';
import type { App } from 'firebase-admin/app';
import Stripe from 'stripe';

function getAdminAuth() {
  try {
    const app = getFirebaseAdminApp();
    return { auth: getAdminAuthSdk(app), adminDb: getAdminFirestore(app), error: null };
  } catch (error: any) {
    console.error("Failed to get Firebase Admin services:", error.message);
    return { auth: null, adminDb: null, error: error.message };
  }
}

export async function createSessionCookie(idToken: string) {
  const { auth, error } = getAdminAuth();
  if (error || !auth) {
      console.error("Failed to create session cookie: Firebase Admin App not initialized.", error);
      return { error: "Failed to create session cookie: " + (error || "Firebase Admin App not initialized.") };
  }
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn});
  cookies().set('__session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
  return { error: null };
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
  
  const { auth, adminDb, error: adminError } = getAdminAuth();
  
  if (adminError || !auth || !adminDb) {
      return { error: adminError || 'Server is not configured for authentication. Please contact support.' };
  }
  
  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });
    
    // Create a customer in Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    });
    const customer = await stripe.customers.create({
      email: userRecord.email,
      metadata: {
        firebaseUID: userRecord.uid,
      },
    });

    await adminDb.collection('users').doc(userRecord.uid).set({
        email: userRecord.email,
        createdAt: new Date(),
        subscription: { status: 'free' },
        stripeCustomerId: customer.id,
    });

    // Sign in the user on the client to get an ID token, then create the session cookie.
    const clientAuth = getClientAuth(clientApp);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const sessionResult = await createSessionCookie(idToken);
    if (sessionResult.error) {
        return { error: sessionResult.error };
    }
    return {success: true};
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
        return { error: 'This email address is already in use. Please log in or use a different email.' };
    }
    console.error("Sign up error:", error);
    return {error: 'An unknown error occurred during sign up. Please try again.'};
  }
}

export async function signInWithEmail(formData: FormData) {
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }
  
  const { auth, error: adminError } = getAdminAuth();
  if (adminError || !auth) {
      return { error: adminError || 'Server is not configured for authentication. Please contact support.' };
  }

  try {
    // We must use the client SDK to sign in and get an ID token.
    const clientAuth = getClientAuth(clientApp);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // The ID token can now be used to create a session cookie on the server.
    const sessionResult = await createSessionCookie(idToken);
    if (sessionResult.error) {
        return { error: sessionResult.error };
    }

    return {success: true};
  } catch (error: any) {
    // Catch specific Firebase auth errors for client-side sign-in
    if (error.code === 'auth/invalid-credential') {
        return {error: 'Invalid email or password.'};
    }
    console.error("Sign in error:", error);
    return {error: 'An unknown error occurred during sign in.'};
  }
}
