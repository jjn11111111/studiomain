
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

const ADMIN_APP_NAME = 'firebase-admin-app-workaround';

function initializeAdminApp(): App {
  const existingApp = getApps().find(app => app.name === ADMIN_APP_NAME);
  if (existingApp) {
    return existingApp;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      'The FIREBASE_SERVICE_ACCOUNT_KEY is missing. ' +
      'Please paste your Firebase Service Account JSON key into the .env file.'
    );
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    return initializeApp({
      credential: cert(serviceAccount),
    }, ADMIN_APP_NAME);
  } catch (error: any) {
    throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize app: ${error.message}`);
  }
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 */
export function getFirebaseAdminApp(): App {
  return initializeAdminApp();
}
