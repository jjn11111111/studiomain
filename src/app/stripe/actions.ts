
'use server';

import { headers } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import Stripe from 'stripe';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

export async function createCheckoutSession(idToken: string): Promise<{ sessionId?: string; error?: string }> {
  try {
    const adminApp = getFirebaseAdminApp();
    const auth = getAuth(adminApp);
    const db = getFirestore(adminApp);
    
    if (!idToken) {
      return { error: 'Unauthorized: No token provided.' };
    }
    
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    if (!uid) {
      return { error: 'Unauthorized: User not found.' };
    }
    
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
        return { error: 'User not found in database.' };
    }
    const userData = userDoc.data();
    const stripeCustomerId = userData?.stripeCustomerId;

    if (!stripeCustomerId) {
        return { error: 'Stripe customer ID not found.' };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          // IMPORTANT: Replace this with your actual Price ID from your Stripe dashboard
          price: 'price_1PKOE5RpR9sZT2fSWsUn5E0X',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // Make sure to set these URLs in your Stripe dashboard
      success_url: `${headers().get('origin')}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get('origin')}/pricing`,
      metadata: {
        firebaseUID: uid,
      }
    });

    return { sessionId: checkoutSession.id };

  } catch (e: any) {
    console.error('Error creating checkout session:', e);
    return { error: e.message };
  }
}
