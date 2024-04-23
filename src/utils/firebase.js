// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9HDZr8Kxx6cIaBGaUtsWVxbA1t1D8-2I",
  authDomain: "netflixclone-6f246.firebaseapp.com",
  projectId: "netflixclone-6f246",
  storageBucket: "netflixclone-6f246.appspot.com",
  messagingSenderId: "749059387440",
  appId: "1:749059387440:web:51b43da109e0770aa0bdf5",
  measurementId: "G-QG9CR8W3XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();