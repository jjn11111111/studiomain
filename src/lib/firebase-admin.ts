
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let serviceAccount: object;

if (serviceAccountString) {
  try {
    // First attempt to parse after base64 decoding
    const decodedKey = Buffer.from(serviceAccountString, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(decodedKey);
  } catch (e) {
    try {
      // If base64 fails, try to parse directly as JSON
      serviceAccount = JSON.parse(serviceAccountString);
    } catch (error) {
      console.error('CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY is not a valid JSON string or base64-encoded JSON.', error);
      throw new Error('Failed to parse Firebase service account key.');
    }
  }
} else {
    console.error('CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot be initialized. Server-side authentication actions will fail.');
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set.');
}

const ADMIN_APP_NAME = 'firebase-admin-app-singleton';

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * If the app is not initialized, it will initialize it.
 */
export function getFirebaseAdminApp(): App {
    if (getApps().find((app) => app.name === ADMIN_APP_NAME)) {
        return getApp(ADMIN_APP_NAME);
    }

    return initializeApp({
        credential: cert(serviceAccount),
    }, ADMIN_APP_NAME);
}
