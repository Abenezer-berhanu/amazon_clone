// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATJV6Z3596A9TZ0ZIvhxWWfseE5ihoutg",
  authDomain: "fir-b8532.firebaseapp.com",
  projectId: "fir-b8532",
  storageBucket: "fir-b8532.appspot.com",
  messagingSenderId: "324377586690",
  appId: "1:324377586690:web:51ff838316b5f2a0284b1b",
  measurementId: "G-0BQF2G5B5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()