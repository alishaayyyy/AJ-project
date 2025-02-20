import { signOut, auth } from "./auth.js"; // Import Firebase's signOut and getAuth

//const auth = getAuth(); // Initialize Firebase auth instance
let logout = document.getElementById('logout'); // Get the logout button

logout.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form behavior

    const user = auth.currentUser; // Get the current user at the time of the click

    if (user) {
        // User is logged in, proceed to log out
        signOut(auth).then(() => {
            alert("Logged out successfully!");
           // window.location.href = "../index.html"; // Ensure the path to index.html is correct
        })
        .catch((error) => {
            // Handle sign-out errors
            console.error("Error during logout:", error.message);
            alert("An error occurred while logging out.");
        });
    } else {
        // If no user is logged in
        alert("You are already signed out.");
    }
})    


  // const user = auth.currentUser; // Get the current user

  // if (user) {
  //     // User is logged in, redirect to index.html (or your user details page)
  //     window.location.href = '../HTML/profile.html';
   
  // } else {
  //     // User is not logged in, redirect to login.html
  //     window.location.href = '../HTML/login.html';
  // }
