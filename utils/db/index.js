import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    admin.auth(app)
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}

export default admin.firestore();