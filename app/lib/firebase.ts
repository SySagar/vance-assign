import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const firebaseConfig = {
    apiKey: "AIzaSyAkD_1G9kpoCU2Vez8ikVXMi_9QY1Qy9wQ",
    authDomain: "vance-assnign.firebaseapp.com",
    projectId: "vance-assnign",
    storageBucket: "vance-assnign.appspot.com",
    messagingSenderId: "54336214889",
    appId: "1:54336214889:web:a72d4642988b67eb0b8ff8",
    measurementId: "G-JT98YKGK98"
  };

  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (router:any) => {
  try {
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const signOutUser = async (router:any) => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
  
};

export const db = getFirestore(app);
