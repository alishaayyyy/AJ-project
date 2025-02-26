import { signOut, auth } from "./auth.js"; 

let logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    e.preventDefault(); 

    const user = auth.currentUser; 

    if (user) {
      
        signOut(auth).then(() => {
            alert("Logged out successfully!");
           // window.location.href = "../index.html"; // Ensure the path to index.html is correct
        })
        .catch((error) => {
        
            console.error("Error during logout:", error.message);
            alert("An error occurred while logging out.");
        });
    } else {
  
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
