import { auth ,initializeApp, getFirestore, collection, addDoc, doc, setDoc, getDoc,firebaseConfig} from './auth.js'; // Import Firebase's getAuth to get the current user

function viewRecipe(url) {
  window.location.href = url; 
}


function toggleWishlist(event, btn) {
  event.stopPropagation(); 
  const icon = btn.querySelector('i');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
  }
}

// user login or not
// user login or not

//import { auth } from './auth.js';

document.getElementById("profile").onclick = function () {
  const user = auth.currentUser; // Get the current user

  if (user) {
      // User is logged in, redirect to profile.html
      window.location.href = 'HTML/profile.html';
  } else {
      // User is not logged in, redirect to login.html
      window.location.href = 'HTML/login.html';
  }
};


document.getElementById("add").onclick = function () {
  const user = auth.currentUser; // Get the current user

  if (user) {
      // User is logged in, redirect to profile.html
      window.location.href = 'HTML/add-recipe.html';
  } else {
      // User is not logged in, redirect to login.html
      window.location.href = 'HTML/login.html';
  }
};


// rating
// import { initializeApp, getFirestore, collection, addDoc, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
// import { firebaseConfig } from './auth.js'; // Make sure firebaseConfig is correctly imported

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get elements
const stars = document.querySelectorAll('.star');
const submitButton = document.getElementById('submit-rating');
const ratingMessage = document.getElementById('rating-message');

// Store selected rating
let selectedRating = 0;

// Add event listener to stars for selecting rating
stars.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    highlightStars(selectedRating);
  });
});

// Highlight stars based on the selected rating
function highlightStars(rating) {
  stars.forEach((star) => {
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.style.color = 'gold';
    } else {
      star.style.color = 'white';
    }
  });
}

// Handle submit button click
submitButton.addEventListener('click', async () => {
  if (selectedRating === 0) {
    ratingMessage.textContent = 'Please select a rating!';
    ratingMessage.style.color = 'red';
    return;
  }

  try {
    // Assuming each recipe or content has a unique ID, replace 'recipeId' with your actual recipe ID
    const recipeId = 'sampleRecipeId'; // Example recipe ID
    const ratingRef = doc(db, 'ratings', recipeId);

    // Check if the recipe already has a rating
    const docSnap = await getDoc(ratingRef);

    if (docSnap.exists()) {
      // If the recipe already has a rating, update it
      await setDoc(ratingRef, { rating: selectedRating }, { merge: true });
    } else {
      // If no rating exists, create a new rating document
      await setDoc(ratingRef, { rating: selectedRating });
    }

    ratingMessage.textContent = 'Thank you for your rating!';
    ratingMessage.style.color = 'green';
  } catch (error) {
    console.error('Error submitting rating:', error);
    ratingMessage.textContent = 'Something went wrong. Please try again.';
    ratingMessage.style.color = 'red';
  }
});

// Get elements




// Add event listener to stars for selecting rating
stars.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    highlightStars(selectedRating);
  });
});

// Highlight stars based on the selected rating


// Handle submit button click
submitButton.addEventListener('click', async () => {
  if (selectedRating === 0) {
    ratingMessage.textContent = 'Please select a rating!';
    ratingMessage.style.color = 'red';
    return;
  }

  try {
    // Example: Let's use a hardcoded recipeId, replace with actual dynamic data
    const recipeId = 'sampleRecipeId'; // Replace this with the actual recipe ID in your app
    const ratingRef = doc(db, 'ratings', recipeId);

    // Check if the recipe already has a rating
    const docSnap = await getDoc(ratingRef);

    if (docSnap.exists()) {
      // If the recipe already has a rating, update it
      await setDoc(ratingRef, { rating: selectedRating }, { merge: true });
    } else {
      // If no rating exists, create a new rating document
      await setDoc(ratingRef, { rating: selectedRating });
    }

    ratingMessage.textContent = 'Thank you for your rating!';
    ratingMessage.style.color = 'green';
  } catch (error) {
    console.error('Error submitting rating:', error);
    ratingMessage.textContent = 'Something went wrong. Please try again.';
    ratingMessage.style.color = 'red';
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  let selectedRating = 0; // Store the selected rating value

  // Add click event listener to each star
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      // Reset the stars to white
      stars.forEach((s) => s.style.color = "white");

      // Change the color of the clicked star and all previous stars
      selectedRating = parseInt(star.getAttribute("data-value"));
      for (let i = 0; i < selectedRating; i++) {
        stars[i].style.color = "#ff641d"; // Change color to orange
      }

      // Update the message
      const ratingMessage = document.getElementById("rating-message");
      ratingMessage.textContent = `You selected ${selectedRating} star(s).`;
    });
  });

  // Submit rating
  const submitButton = document.getElementById("submit-rating");
  submitButton.addEventListener("click", function () {
    if (selectedRating > 0) {
      // Save the rating to Firebase or perform necessary actions here
      console.log("Rating submitted:", selectedRating);
      document.getElementById("rating-message").textContent = `You rated ${selectedRating} star(s). Thank you for your feedback!`;

      // Optionally, reset the rating after submission
      stars.forEach((star) => star.style.color = "white");
      selectedRating = 0;
    } else {
      alert("Please select a rating before submitting.");
    }
  });
});
