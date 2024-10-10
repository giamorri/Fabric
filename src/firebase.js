// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCHSfUZiq9LPIzfp4SeJgggZVHP5kgGEqc",
    authDomain: "fabric-edec6.firebaseapp.com",
    projectId: "fabric-edec6",
    storageBucket: "fabric-edec6.appspot.com",
    messagingSenderId: "213643106014",
    appId: "1:213643106014:web:a2a298c6f8dbc6bc9d944f",
    measurementId: "G-2BSER4141Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth, Firestore, and Storage instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export Storage instance
export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
