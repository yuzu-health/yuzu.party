import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { a as PUBLIC_FIREBASE_API_KEY, b as PUBLIC_FIREBASE_AUTH_DOMAIN, c as PUBLIC_FIREBASE_PROJECT_ID, P as PUBLIC_FIREBASE_STORAGE_BUCKET, d as PUBLIC_FIREBASE_MESSAGING_SENDER_ID, e as PUBLIC_FIREBASE_APP_ID } from "./public.js";
const config = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID
};
const app = initializeApp(config);
getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
getStorage(app);
setPersistence(auth, inMemoryPersistence);
