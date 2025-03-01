import { auth, signInWithPopup, GoogleAuthProvider } from "./auth.js";

auth.languageCode = 'en';
// ya is liay bcs mjhe hr br chahhye ka google pochay knsa account chahye khd login na kry
const provider = new GoogleAuthProvider();

provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
  'prompt': 'select_account'
});


function updateUserProfile(user) {
  console.log('User Profile:', user);
  
  document.getElementById('userName').textContent = `Welcome, ${user.displayName}`;
  document.getElementById('userEmail').textContent = `Email: ${user.email}`;

}

let google = document.getElementById('Google');

google.addEventListener('click', (e) => {
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
  
      updateUserProfile(user);
      alert("Successfully signed in!");
      window.location.href = "../HTML/profile.html";
      //window.location.href = "../HTML/dashboard.html"; // Redirect to the dashboard
    })
    .catch((error) => {
    
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
