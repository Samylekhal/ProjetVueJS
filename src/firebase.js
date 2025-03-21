// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudRjCaYTb7wLJea71c5IFsNzjFXw3wfg",
  authDomain: "demineur-d2cb5.firebaseapp.com",
  projectId: "demineur-d2cb5",
  storageBucket: "demineur-d2cb5.firebasestorage.app",
  messagingSenderId: "885878354404",
  appId: "1:885878354404:web:043c7ada5263ccebea97f1",
  measurementId: "G-PNJK5Y7YZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export { auth, db };