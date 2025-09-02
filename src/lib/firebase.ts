// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// TODO: Add your Firebase project configuration here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check - TEMPORARILY DISABLED
// if (typeof window !== 'undefined') {
//   try {
//     const appCheck = initializeAppCheck(app, {
//       provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!),
//       isTokenAutoRefreshEnabled: true
//     });
//   } catch (error) {
//     console.error("App Check initialization error:", error);
//   }
// }


const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
