
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js"; 

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; 

import { getFirestore, collection, setDoc, getDoc, updateDoc, arrayUnion, query, where, getDocs, doc, deleteDoc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyB_CJue-0XAWimGB1g2yfJqdUjziLzuaZw",
  authDomain: "aj-kitchen-main.firebaseapp.com",
  projectId: "aj-kitchen-main",
  storageBucket: "aj-kitchen-main.firebasestorage.app",
  messagingSenderId: "931381064094",
  appId: "1:931381064094:web:6090c56991785edb7fa68f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const firestore = getFirestore(app);

// Export 
export { signInWithEmailAndPassword, auth, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, getFirestore, setDoc, getDoc, updateDoc, arrayUnion, onAuthStateChanged, collection, query, where, getDocs, doc, deleteDoc, getAuth, initializeApp, firebaseConfig, addDoc, serverTimestamp, firestore };
