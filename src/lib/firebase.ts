'use client';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "pinealvision",
  appId: "1:590588534644:web:3b4d95c8aa84c355ba9621",
  storageBucket: "pinealvision.firebasestorage.app",
  apiKey: "AIzaSyCvoQb8ycCZb-FbaWWS87YPjPDwtrw6Dus",
  authDomain: "pinealvision.firebaseapp.com",
  measurementId: "G-PLS89S3H00",
  messagingSenderId: "590588534644"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check conditionally
// IMPORTANT: This is for production security.
if (typeof window !== 'undefined') {
  try {
    // Debug token for local development.
    // This allows testing App Check on localhost without a reCAPTCHA key.
    // Generate a new debug token in your Firebase Console (App Check > Apps > Your Web App > Manage debug tokens)
    if (process.env.NEXT_PUBLIC_RECAPTCHA_DEBUG_TOKEN) {
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_RECAPTCHA_DEBUG_TOKEN;
    }
    
    // Only initialize App Check if a site key is provided and it's not the placeholder.
    // Replace the placeholder in your .env.local file for development.
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== 'your-recaptcha-v3-site-key') {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true
        });
    } else {
        console.warn("Firebase App Check is not initialized. For local development, set NEXT_PUBLIC_RECAPTCHA_SITE_KEY or NEXT_PUBLIC_RECAPTCHA_DEBUG_TOKEN in .env.local. For production, ensure the site key is set in your hosting environment.");
    }
  } catch (error) {
    console.error("App Check initialization error:", error);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
