import { initializeApp, getAuth, getFirestore, collection, addDoc, firebaseConfig, onAuthStateChanged } from "./auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if the user is logged in using onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, allow them to add a recipe
    console.log("User is logged in:", user);
  } else {
    // User is not logged in, redirect to login page
    window.location.href = 'login.html'; // Ensure this is the correct login page path
  }
});

// Handle form submission to add recipe
document.getElementById("add-recipe-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get user input from the form
  const newRecipe = {
    title: document.getElementById("recipe-title").value,
    description: document.getElementById("recipe-description").value,
    ingredients: document.getElementById("recipe-ingredients").value,
    instructions: document.getElementById("recipe-instructions").value,
    userId: auth.currentUser.uid, // Add user ID to associate the recipe with the user
  };

  try {
    // Add the new recipe to Firestore
    const docRef = await addDoc(collection(db, "recipes"), newRecipe);
    alert("Recipe added successfully!");
    console.log("Document written with ID: ", docRef.id);

    // Redirect back to the profile page
    window.location.href = 'profile.html'; // Redirect to profile after adding recipe
  } catch (error) {
    console.error("Error adding recipe: ", error);
    alert("Error adding recipe: " + error.message);
  }
});

// Example of adding a logout button functionality
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  // Perform logout action
  console.log("Logging out...");
  window.location.href = 'login.html'; // Redirect to login page
});
