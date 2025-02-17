// Import the necessary functions from Firebase SDKs
// Use the same version for both the app and auth SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js"; // Use the same version for app
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; // Update this to the same version


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
const auth = getAuth(app);  // Pass the initialized app to getAuth

// Export the Firebase Authentication functions and the auth instance
export { signInWithEmailAndPassword, auth, createUserWithEmailAndPassword };

// let user = auth.currentUser;