// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.GOOGLE_AUTH_DOMAIN,
  projectId: process.env.GOOGLE_PROJECT_ID,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.GOOGLE_APP_ID,
  measurementId: process.env.GOOGLE_j_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
