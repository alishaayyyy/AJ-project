import { initializeApp, getAuth, getFirestore, collection, query, where, getDocs, doc, deleteDoc, onAuthStateChanged, firebaseConfig } from "./auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


onAuthStateChanged(auth, (user) => {
  if (user) {
  
    displayUserInfo(user);
    fetchUserRecipes(user.uid);
  } else {
 
    console.log("User is not logged in. Redirecting to login...");
    window.location.href = 'login.html';
  }
});


function displayUserInfo(user) {
  document.getElementById('user-name').textContent = user.displayName || "User Name";
  document.getElementById('user-email').textContent = user.email;


  const profilePic = document.getElementById('profile-pic');
  if (user.photoURL) {
    profilePic.src = user.photoURL;
  }
}

// Function to fetch user's recipes 
async function fetchUserRecipes(userId) {
  const recipesRef = collection(db, "recipes");
  const q = query(recipesRef, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const recipesContainer = document.getElementById("my-recipes");


  recipesContainer.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const recipeData = doc.data();
    const recipeId = doc.id;


    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-item");

    recipeElement.innerHTML = `
      <div class="recipe-card">
        <h4>${recipeData.title}</h4>
        <p class="recipe-description"><strong>Description: </strong>${recipeData.description}</p>
        <p class="recipe-instructions"><strong>Instructions: </strong> ${recipeData.instructions}</p>
        <div class="recipe-footer">
          <button class="edit-btn" data-recipe-id="${recipeId}">Edit</button>
          <button class="delete-btn" data-recipe-id="${recipeId}">Delete</button>
        </div>
      </div>
    `;

    recipesContainer.appendChild(recipeElement);
  });

  const editButtons = document.querySelectorAll('.edit-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const recipeId = e.target.getAttribute('data-recipe-id');
      editRecipe(recipeId);
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const recipeId = e.target.getAttribute('data-recipe-id');
      deleteRecipe(recipeId);
    });
  });
}

function editRecipe(recipeId) {
  window.location.href = `edit-recipe.html?recipeId=${recipeId}`;
}

// deleting a recipe
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
