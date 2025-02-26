import { initializeApp, getAuth, getFirestore, collection, addDoc, firebaseConfig, onAuthStateChanged } from "./auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if the user is logged in 
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
  } else {
    
    window.location.href = 'login.html'; 
  }
});

// Handle form submission to add recipe
document.getElementById("add-recipe-form").addEventListener("submit", async (event) => {
  event.preventDefault();

//user details
  const newRecipe = {
    title: document.getElementById("recipe-title").value,
    description: document.getElementById("recipe-description").value,
    ingredients: document.getElementById("recipe-ingredients").value,
    instructions: document.getElementById("recipe-instructions").value,
    userId: auth.currentUser.uid,
  };

  try {
    // Add the new recipe to Firestore
    const docRef = await addDoc(collection(db, "recipes"), newRecipe);
    alert("Recipe added successfully!");
    console.log("Document written with ID: ", docRef.id);

    //  back to the profile page
    window.location.href = 'profile.html'; 
  } catch (error) {
    console.error("Error adding recipe: ", error);
    alert("Error adding recipe: " + error.message);
  }
});

// // Example of adding a logout button functionality
// const logoutBtn = document.getElementById("logout-btn");
// logoutBtn.addEventListener("click", () => {
//   // Perform logout action
//   console.log("Logging out...");
//   window.location.href = 'login.html'; // Redirect to login page
// });
