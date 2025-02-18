import { auth, signInWithPopup, GoogleAuthProvider } from "./auth.js";

auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

// Add prompt parameter to force account selection
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
  'prompt': 'select_account'
});

// Define the updateUserProfile function
function updateUserProfile(user) {
  // For example, update the user profile on your page
  console.log('User Profile:', user);
  
  // Assuming you want to display the user's name and email on the page
  document.getElementById('userName').textContent = `Welcome, ${user.displayName}`;
  document.getElementById('userEmail').textContent = `Email: ${user.email}`;
  // You can also update your database or perform other actions here
}

let google = document.getElementById('Google');

google.addEventListener('click', (e) => {
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // Call updateUserProfile function to update profile details
      updateUserProfile(user);
      alert("Successfully signed in!");
      //window.location.href = "../HTML/dashboard.html"; // Redirect to the dashboard
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
