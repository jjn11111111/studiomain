'use client';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

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

// Initialize Firebase for client-side and server-side
const getAppInstance = (): FirebaseApp => {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

const getAuthInstance = (): Auth => {
    return getAuth(getAppInstance());
}

const getDbInstance = (): Firestore => {
    return getFirestore(getAppInstance());
}


export { getAppInstance as app, getAuthInstance as auth, getDbInstance as db };