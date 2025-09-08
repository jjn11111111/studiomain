
import { initializeApp, getApps, App, cert, deleteApp } from 'firebase-admin/app';

const ADMIN_APP_NAME = 'firebase-admin-app-workaround';

function initializeAdminApp() {
  // If an app with the specific name already exists, return it.
  const existingApp = getApps().find(app => app.name === ADMIN_APP_NAME);
  if (existingApp) {
    return existingApp;
  }

  // Try to use the environment variable.
  const envServiceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (envServiceAccountKey) {
     try {
        // Ensure the key is not an empty string before parsing.
        if (envServiceAccountKey.trim() === '') {
            throw new Error(
              'The FIREBASE_SERVICE_ACCOUNT_KEY is empty. ' +
              'Please paste your Firebase Service Account JSON key into the .env file.'
            );
        }
        const serviceAccount = JSON.parse(envServiceAccountKey);
        return initializeApp({
          credential: cert(serviceAccount),
        }, ADMIN_APP_NAME);
     } catch (error: any) {
        throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize app: ${error.message}`);
     }
  }

  // If we reach here, no key is available.
  throw new Error(
    'Firebase Service Account Key is missing. ' +
    'Please set FIREBASE_SERVICE_ACCOUNT_KEY in your .env file.'
  );
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 */
export function getFirebaseAdminApp(): App {
  return initializeAdminApp();
}
