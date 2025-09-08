
import { initializeApp, getApps, App, cert, deleteApp } from 'firebase-admin/app';

const ADMIN_APP_NAME = 'firebase-admin-app-workaround';

function initializeAdminApp(serviceAccountKey?: string) {
  // If a key is provided, always try to create a new app instance or update it.
  if (serviceAccountKey) {
    // Check if an app with the specific name already exists and delete it.
    // This allows re-initialization with a new key if the user pastes a different one.
    const existingApp = getApps().find(app => app.name === ADMIN_APP_NAME);
    if (existingApp) {
      deleteApp(existingApp);
    }
    
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      return initializeApp({
        credential: cert(serviceAccount),
      }, ADMIN_APP_NAME);
    } catch (error: any) {
      throw new Error(`Failed to parse provided Service Account Key: ${error.message}`);
    }
  }

  // If no key is provided, try to use the environment variable.
  const envServiceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (envServiceAccountKey) {
     const existingApp = getApps().find(app => app.name === ADMIN_APP_NAME);
     if (existingApp) {
      return existingApp;
     }
     try {
        const serviceAccount = JSON.parse(envServiceAccountKey);
        return initializeApp({
          credential: cert(serviceAccount),
        }, ADMIN_APP_NAME);
     } catch (error: any) {
        throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY from environment: ${error.message}`);
     }
  }

  // If we reach here, no key is available from any source.
  throw new Error(
    'Firebase Service Account Key is missing. ' +
    'Provide it in the login form or set FIREBASE_SERVICE_ACCOUNT_KEY in your environment.'
  );
}

/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * Can be initialized with a key string directly.
 */
export function getFirebaseAdminApp(serviceAccountKey?: string): App {
  return initializeAdminApp(serviceAccountKey);
}
