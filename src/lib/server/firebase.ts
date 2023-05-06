import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import { SECRET_FIREBASE_SERVICE_ACCOUNT_KEY } from '$env/static/private';
import { PUBLIC_FIREBASE_STORAGE_BUCKET } from '$env/static/public';

const serviceAccount = JSON.parse(SECRET_FIREBASE_SERVICE_ACCOUNT_KEY);

export const app = initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'gs://' + PUBLIC_FIREBASE_STORAGE_BUCKET
});
export const db = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true });
export const storage = getStorage(app);
export const auth = getAuth(app);
