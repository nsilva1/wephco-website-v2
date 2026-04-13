// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseDevConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseProdConfig = {
  apiKey: "AIzaSyDsWsrIZROg93_Z6nV_TLGkmAXrWTRS9oA",
  authDomain: "wephco-6e87a.firebaseapp.com",
  projectId: "wephco-6e87a",
  storageBucket: "wephco-6e87a.firebasestorage.app",
  messagingSenderId: "117238434882",
  appId: "1:117238434882:web:eb2486bc48db7ac52531db",
  measurementId: "G-YHQJ6QHTZZ"
};

const firebaseConfig = process.env.NODE_ENV === 'production' ? firebaseProdConfig : firebaseDevConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
	localCache: persistentLocalCache(),
});
export const storage = getStorage(app);





