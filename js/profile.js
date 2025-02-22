import { initializeApp, getAuth, getFirestore, collection, query, where, getDocs, doc, deleteDoc, onAuthStateChanged,firebaseConfig } from "./auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if the user is logged in using onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, display their info and recipes
    displayUserInfo(user);
    fetchUserRecipes(user.uid);
  } else {
    // User is not logged in, redirect to login page
    console.log("User is not logged in. Redirecting to login...");
    window.location.href = 'login.html'; // Ensure this is the correct login page path
  }
});

// Function to display user information (name, email, profile picture)
function displayUserInfo(user) {
  document.getElementById('user-name').textContent = user.displayName || "User Name";
  document.getElementById('user-email').textContent = user.email;

  // Set profile picture if available
  const profilePic = document.getElementById('profile-pic');
  if (user.photoURL) {
    profilePic.src = user.photoURL;
  }
}

// Function to fetch user's recipes from Firestore
async function fetchUserRecipes(userId) {
  const recipesRef = collection(db, "recipes");
  const q = query(recipesRef, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const recipesContainer = document.getElementById("my-recipes");

  // Clear previous recipes
  recipesContainer.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const recipeData = doc.data();
    const recipeId = doc.id;

    // Create elements to display each recipe
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-item");

    recipeElement.innerHTML = `
      <h4>${recipeData.title}</h4>
      <p>${recipeData.description}</p>
      <button onclick="editRecipe('${recipeId}')">Edit</button>
      <button onclick="deleteRecipe('${recipeId}')">Delete</button>
    `;

    recipesContainer.appendChild(recipeElement);
  });
}

// Function to edit a recipe (navigate to an edit page)
function editRecipe(recipeId) {
  // Log recipeId to ensure it's being passed correctly
  console.log("Editing recipe with ID: " + recipeId);
  
  window.location.href = `edit-recipe.html?recipeId=${recipeId}`;
}

// Function to delete a recipe
async function deleteRecipe(recipeId) {
  const recipeRef = doc(db, "recipes", recipeId);

  try {
    await deleteDoc(recipeRef);
    alert('Recipe deleted successfully');
    location.reload(); // Reload to update the recipes list
  } catch (error) {
    alert('Error deleting recipe: ' + error.message);
  }
}
