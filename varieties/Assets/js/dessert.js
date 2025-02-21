 const API_KEY = 'ad210d8303dc46df8c618aeb023e506a'; //KhatriJeiya
    // const API_KEY = 'ec89a9f243a343caa5f21add5a045576'; //alisha2
    // const API_KEY = '5564031193454379b491545b1de39e2d'; //alisha
    // const API_KEY = '7ef1577b26a74418acf49eb98506d43b'; //JeiyaKumari
// const API_KEY = 'e66a81dcbd274ba1974c9406d76df8c9';
const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;

// Fetch and display recipes for a specific category
async function  fetchRecipesByCategory(category, count = 6) {
  try {
    const response = await fetch(`${BASE_URL}&number=${count}&tags=${category}`);
    const data = await response.json();
    console.log(data);
    
    displayRecipesByCategory(data.recipes, category);
  } catch (error) {
    console.error(Error `fetching ${category} recipes:`, error);
  }
}

// Display recipes for a specific category
function displayRecipesByCategory(recipes, category) {
  const container = document.getElementById(`${category}-container`);
  container.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-card-content">
        <h3>${recipe.title}</h3>
        <span class="heart-icon" onclick="toggleHeart(event)">&#x2764;</span>
        <p>${recipe.summary ? recipe.summary.substring(0, 100) + '...' : 'No description available.'}</p>
      </div>
    `;

    card.addEventListener('click', () => openRecipeDetails(recipe));
    container.appendChild(card);
  });
}

// Toggle heart icon
function toggleHeart(event) {
  event.stopPropagation();
  const heart = event.target;
  heart.classList.toggle('filled');
}

// Display recipe details
function openRecipeDetails(recipe) {
  const container = document.querySelector('.main-container');
  container.innerHTML = `
    <div class="recipe-details">
      
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p class="summary">${recipe.summary || "No description available."}</p>
      <h3 class="fontin orh3">Ingredients</h3>
      <ul class="fulldetailul">
        ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
      </ul>
      <h3 class="orh3 fontin">Instructions</h3>
      <p>${recipe.instructions || "Instructions not available."}</p>
      <button class="back-button" onclick="reloadPage()">&#8592;Back</button>
    </div>
  `;
}

// Reload the page
function reloadPage() {
  location.reload();
}

// Fetch recipes for all categories on page load
function fetchAllCategories() {
//   fetchRecipesByCategory('breakfast', 12);
  fetchRecipesByCategory('desserts', 12);
//   fetchRecipesByCategory('dinner', 6);
//   fetchRecipesByCategory('drinks', 6);
}

// Initial fetch
fetchAllCategories();