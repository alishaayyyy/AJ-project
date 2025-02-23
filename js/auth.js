// Import the necessary functions from Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js"; // Use the same version for app
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; // Update this to the same version

import { getFirestore, collection, setDoc, getDoc, updateDoc, arrayUnion, query, where, getDocs, doc, deleteDoc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"; // Use the same version for firestore

// Your Firebase configuration (make sure it's correct)
const firebaseConfig = {
  apiKey: "AIzaSyB_CJue-0XAWimGB1g2yfJqdUjziLzuaZw",
  authDomain: "aj-kitchen-main.firebaseapp.com",
  projectId: "aj-kitchen-main",
  storageBucket: "aj-kitchen-main.firebasestorage.app",
  messagingSenderId: "931381064094",
  appId: "1:931381064094:web:6090c56991785edb7fa68f"
};

// Initialize Firebase app (ensure this is done before using any Firebase services)
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);  // Initialize Firestore

// Export the Firebase Authentication functions, Firestore, and the auth instance
export { signInWithEmailAndPassword, auth, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, getFirestore, setDoc, getDoc, updateDoc, arrayUnion, onAuthStateChanged, collection, query, where, getDocs, doc, deleteDoc, getAuth, initializeApp, firebaseConfig, addDoc, serverTimestamp, firestore };
