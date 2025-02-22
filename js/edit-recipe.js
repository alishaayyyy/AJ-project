import { initializeApp, getAuth, getFirestore, doc, getDoc, updateDoc, firebaseConfig, onAuthStateChanged } from "./auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if the user is logged in using onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  console.log("Auth State Changed: User logged in:", user);

  if (user) {
    console.log("User is logged in. Checking recipe ID...");
    
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');
    
    if (recipeId) {
      console.log("Recipe ID found:", recipeId);
      fetchRecipeData(recipeId);
    } else {
      console.log("No recipe ID found in URL. Redirecting to profile...");
      window.location.href = 'profile.html'; // Redirect if no recipe ID
    }
  } else {
    console.log("User is not logged in. Redirecting to login...");
    // User is not logged in, redirect to login page
    window.location.href = 'login.html'; // Ensure this is the correct login page path
  }
});

// Fetch the recipe data to display in the form
async function fetchRecipeData(recipeId) {
  try {
    console.log("Fetching data for recipeId:", recipeId);
    const recipeRef = doc(db, "recipes", recipeId);
    const docSnap = await getDoc(recipeRef);

    if (docSnap.exists()) {
      const recipeData = docSnap.data();
      console.log("Recipe data fetched:", recipeData);

      // Fill the form with recipe data
      document.getElementById("recipe-title").value = recipeData.title;
      document.getElementById("recipe-description").value = recipeData.description;
      document.getElementById("recipe-ingredients").value = recipeData.ingredients;
      document.getElementById("recipe-instructions").value = recipeData.instructions;
    } else {
      console.log("Recipe not found in Firestore. Redirecting to profile...");
      window.location.href = 'profile.html'; // Redirect if recipe doesn't exist
    }
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    alert("Error fetching recipe data: " + error.message);
    window.location.href = 'profile.html'; // Redirect if there's an error
  }
}

// Handle form submission to save edited recipe
document.getElementById("edit-recipe-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipeId');

  if (recipeId) {
    const updatedRecipe = {
      title: document.getElementById("recipe-title").value,
      description: document.getElementById("recipe-description").value,
      ingredients: document.getElementById("recipe-ingredients").value,
      instructions: document.getElementById("recipe-instructions").value,
    };

    try {
      const recipeRef = doc(db, "recipes", recipeId);
      await updateDoc(recipeRef, updatedRecipe);
      alert("Recipe updated successfully!");
      window.location.href = 'profile.html'; // Redirect back to profile
    } catch (error) {
      alert('Error updating recipe: ' + error.message);
    }
  } else {
    console.log("No recipe ID found. Redirecting...");
    window.location.href = 'profile.html'; // Redirect if no recipe ID
  }
});

// Example of adding a logout button functionality
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  // Clear session or perform logout action
  console.log("Logging out...");
  window.location.href = 'login.html'; // Redirect to login page
});

