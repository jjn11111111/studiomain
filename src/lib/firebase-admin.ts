
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let adminApp: App | null = null;
let initError: Error | null = null;

if (!serviceAccountString) {
  const errorMessage = 'CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot be initialized. Server-side authentication actions will fail.';
  console.error(errorMessage);
  initError = new Error(errorMessage);
} else {
    try {
        let serviceAccount: object;
        try {
            // Check if the key is base64 encoded
            const decodedKey = Buffer.from(serviceAccountString, 'base64').toString('utf-8');
            serviceAccount = JSON.parse(decodedKey);
        } catch (e) {
            // Assume it's a plain JSON string if base64 decoding fails
            serviceAccount = JSON.parse(serviceAccountString);
        }

        const ADMIN_APP_NAME = 'firebase-admin-app-singleton';
        
        if (!getApps().some(app => app.name === ADMIN_APP_NAME)) {
           adminApp = initializeApp({
                credential: cert(serviceAccount),
            }, ADMIN_APP_NAME);
        } else {
            adminApp = getApp(ADMIN_APP_NAME);
        }
    } catch (error: any) {
        const errorMessage = `CRITICAL: Failed to initialize Firebase Admin SDK. The service account key may be invalid. Error: ${error.message}`;
        console.error(errorMessage, error);
        initError = new Error(errorMessage);
    }
}


/**
 * Retrieves the singleton instance of the Firebase Admin App.
 * Returns null if the app could not be initialized.
 */
export function getFirebaseAdminApp(): App | null {
    return adminApp;
}

/**
 * Returns the initialization error, if any.
 */
export function getFirebaseAdminAppInitializationError(): Error | null {
    return initError;
}
