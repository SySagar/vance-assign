// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration copied from your Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAkD_1G9kpoCU2Vez8ikVXMi_9QY1Qy9wQ",
    authDomain: "vance-assnign.firebaseapp.com",
    projectId: "vance-assnign",
    storageBucket: "vance-assnign.appspot.com",
    messagingSenderId: "54336214889",
    appId: "1:54336214889:web:a72d4642988b67eb0b8ff8",
    measurementId: "G-JT98YKGK98"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
