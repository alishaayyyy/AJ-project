import { auth } from './auth.js'; // Import Firebase's getAuth to get the current user

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

// This function will be triggered when the button is clicked
document.getElementById("profile").onclick = function () {
  // const auth = getAuth();
  const user = auth.currentUser; // Get the current user

  if (user) {
      // User is logged in, redirect to profile.html
      window.location.href = 'HTML/profile.html';  // Update the path correctly
  } else {
      // User is not logged in, redirect to login.html
      window.location.href = 'HTML/login.html';  // Corrected path to login.html
  }
};
