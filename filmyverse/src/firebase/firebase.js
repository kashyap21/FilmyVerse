// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATQB2nAW4EeXXCpIuNQQAX4b5Iy4WHDEU",
  authDomain: "kashyapverse-7a3a1.firebaseapp.com",
  projectId: "kashyapverse-7a3a1",
  storageBucket: "kashyapverse-7a3a1.appspot.com",
  messagingSenderId: "1028263316970",
  appId: "1:1028263316970:web:8f6ea090b2fc725c177693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,'movies')
export const reviewRef = collection(db,'reviews')

export default app;