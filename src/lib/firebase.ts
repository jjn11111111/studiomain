
'use client';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_3pSSn6f4x531b2NqM5T85rF63g8cY2U",
  authDomain: "pinealvision.firebaseapp.com",
  projectId: "pinealvision",
  storageBucket: "pinealvision.appspot.com",
  messagingSenderId: "590588534644",
  appId: "1:590588534644:web:3b4d95c8aa84c355ba9621"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const getDbInstance = (): Firestore => {
    return getFirestore(app);
}

export { app, getDbInstance as db };

