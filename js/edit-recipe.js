import { initializeApp, getAuth, getFirestore, doc, getDoc, updateDoc, firebaseConfig, onAuthStateChanged } from "./auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if the user is logged in using onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');

    if (recipeId) {
      fetchRecipeData(recipeId);
    } else {
      window.location.href = 'profile.html';
    }
  } else {
    window.location.href = 'login.html'; //
  }
});

// Fetch the recipe 
async function fetchRecipeData(recipeId) {
  const recipeRef = doc(db, "recipes", recipeId);
  const docSnap = await getDoc(recipeRef);

  if (docSnap.exists()) {
    const recipeData = docSnap.data();

    document.getElementById("recipe-title").value = recipeData.title;
    document.getElementById("recipe-description").value = recipeData.description;
    document.getElementById("recipe-ingredients").value = recipeData.ingredients;
    document.getElementById("recipe-instructions").value = recipeData.instructions;
  } else {
    window.location.href = 'profile.html'; 
  }
}

document.getElementById("edit-recipe-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipeId');

  const updatedRecipe = {
    title: document.getElementById("recipe-title").value,
    description: document.getElementById("recipe-description").value,
    ingredients: document.getElementById("recipe-ingredients").value,
    instructions: document.getElementById("recipe-instructions").value,
  };

  if (recipeId) {
    const recipeRef = doc(db, "recipes", recipeId);
    await updateDoc(recipeRef, updatedRecipe);
    alert("Recipe updated successfully!");
    window.location.href = 'profile.html';
  }
});


