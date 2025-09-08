
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

let adminApp: App | null = null;

function initializeAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // NOTE: This is a placeholder for local development.
  // In a real production environment, you should use a more secure method
  // for managing your service account key, such as Google Secret Manager.
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. ' +
      'Please set it in your .env file. ' +
      'Go to Project Settings > Service Accounts in the Firebase console to generate a new private key.'
    );
  }
  
  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    return initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error: any) {
    throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize app: ${error.message}`);
  }
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * Throws an error if the app could not be initialized.
 */
export function getFirebaseAdminApp(): App {
  if (!adminApp) {
    adminApp = initializeAdminApp();
  }
  return adminApp;
}
