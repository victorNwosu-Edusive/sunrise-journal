// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7dZFsSDtg86X89LbevsbUyoydNuHS85E",
  authDomain: "sunrise-journal-9c998.firebaseapp.com",
  projectId: "sunrise-journal-9c998",
  storageBucket: "sunrise-journal-9c998.firebasestorage.app",
  messagingSenderId: "574648221945",
  appId: "1:574648221945:web:e505e11662d6ec0d3de228",
  measurementId: "G-9611W8368Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);