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
  storageBucket: "pinealvision.appspot.com",
  apiKey: "AIzaSyCvoQb8ycCZb-FbaWWS87YPjPDwtrw6Dus",
  authDomain: "pinealvision.firebaseapp.com",
  measurementId: "G-PLS89S3H00",
  messagingSenderId: "590588534644"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check
// IMPORTANT: This is temporarily disabled to prevent reCAPTCHA errors during local development.
// To enable App Check for production, you must:
// 1. Create a reCAPTCHA v3 site key in your Google Cloud Console.
// 2. Add it to a .env.local file as NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-key-here".
// 3. Uncomment the code below.
/*
if (typeof window !== 'undefined') {
  try {
    // To test locally, you will need to add a NEXT_PUBLIC_RECAPTCHA_DEBUG_TOKEN variable
    // to a .env.local file with the debug token from your console.
    if (process.env.NEXT_PUBLIC_RECAPTCHA_DEBUG_TOKEN) {
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NEXT_PUBLIC_RECAPTCHA_DEBUG_TOKEN;
    }
    
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true
        });
    } else {
        console.warn("Firebase App Check is not initialized. NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing.");
    }
  } catch (error) {
    console.error("App Check initialization error:", error);
  }
}
*/

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
