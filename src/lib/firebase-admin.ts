
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
    // The service account key is a JSON string, so it needs to be parsed.
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    return initializeApp({
      credential: cert(serviceAccount),
      // Add your databaseURL here if you are using Realtime Database
      // databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    }, ADMIN_APP_NAME);

  } catch (error: any) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase Admin app:', error);
    // Re-throwing the error is important to prevent the app from running with a misconfigured admin SDK.
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
  }
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * This function will throw an error if the admin app cannot be initialized.
 */
export function getFirebaseAdminApp(): App {
  return initializeAdminApp();
}
