
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

// This function safely parses the service account key from the environment variable.
function parseServiceAccount(): object | null {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.error(
      'CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot be initialized. Server-side authentication actions will fail.'
    );
    return null;
  }
  try {
    // The key might be base64 encoded or a direct string. Let's handle both.
    const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
    return JSON.parse(decodedKey);
  } catch (e1) {
    // If base64 decoding fails, try to parse it directly.
    try {
      return JSON.parse(serviceAccountKey);
    } catch (e2) {
      console.error(
        'CRITICAL: Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. It is not a valid JSON string or base64 encoded JSON.',
        e2
      );
      return null;
    }
  }
}

const serviceAccount = parseServiceAccount();

const ADMIN_APP_NAME = 'firebase-admin-app';

// This is the singleton instance of the Firebase Admin App.
let adminApp: App;

// This function initializes and returns the singleton instance.
function initializeAdminApp(): App {
  if (getApps().some((app) => app.name === ADMIN_APP_NAME)) {
    return getApp(ADMIN_APP_NAME);
  }

  if (!serviceAccount) {
    throw new Error('Firebase Admin App initialization failed: Service account credentials are not available or invalid. Check server logs.');
  }

  try {
    return initializeApp({
      credential: cert(serviceAccount),
    }, ADMIN_APP_NAME);
  } catch (error: any) {
    console.error('CRITICAL: Firebase Admin App initialization failed with error:', error.message);
    throw new Error(`Firebase Admin App initialization failed: ${error.message}`);
  }
}


/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * If the app is not initialized, it will attempt to initialize it.
 * Throws an error if initialization fails.
 */
export function getFirebaseAdminApp(): App {
  if (!adminApp) {
    adminApp = initializeAdminApp();
  }
  return adminApp;
}
