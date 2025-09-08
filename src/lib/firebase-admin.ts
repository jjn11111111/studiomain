
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let adminApp: App | null = null;

function initializeAdminApp(): App | null {
  // Check if the app is already initialized
  if (getApps().some(app => app.name === 'firebase-admin-app')) {
    return getApp('firebase-admin-app');
  }
  
  if (!serviceAccountKey) {
    console.error(
      'CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot be initialized. Server-side authentication actions will fail.'
    );
    return null;
  }

  try {
    // Trim the key to remove potential leading/trailing whitespace
    const serviceAccount = JSON.parse(serviceAccountKey.trim());
    const adminAppConfig = {
      credential: cert(serviceAccount),
    };
    return initializeApp(adminAppConfig, 'firebase-admin-app');
  } catch (error) {
    console.error('CRITICAL: Error parsing FIREBASE_SERVICE_ACCOUNT_KEY or initializing admin app:', error);
    return null;
  }
}

export function getFirebaseAdminApp(): App {
    if (!adminApp) {
        adminApp = initializeAdminApp();
    }
    if (!adminApp) {
        throw new Error('Firebase Admin App is not available. Please check server logs for configuration errors.');
    }
    return adminApp;
}
