
import { getApp, getApps, initializeApp, cert, App } from 'firebase-admin/app';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let adminApp: App | undefined;

function initializeAdminApp() {
  if (!serviceAccountKey) {
    console.error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK could not be initialized.'
    );
    // Depending on the app's needs, you might want to throw an error
    // or allow the app to continue running without admin features.
    // For this app, auth actions will fail without it.
    throw new Error('Firebase Admin SDK could not be initialized.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    const adminAppConfig = {
      credential: cert(serviceAccount),
    };
    adminApp = initializeApp(adminAppConfig, 'firebase-admin-app');
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY or initializing admin app:', error);
    throw new Error('Firebase Admin SDK could not be initialized due to a configuration error.');
  }
}

export function getFirebaseAdminApp(): App {
  if (!adminApp) {
    if (getApps().some(app => app.name === 'firebase-admin-app')) {
      adminApp = getApp('firebase-admin-app');
    } else {
      initializeAdminApp();
    }
  }
  return adminApp!;
}
