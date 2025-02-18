import { createUserWithEmailAndPassword, auth } from './auth.js'; // import your firebase auth functions

// Grab the form and form elements
const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const email = emailInput.value; // Get the email from the input field
    const password = passwordInput.value; // Get the password from the input field

    try {
        // Firebase sign-up logic with await
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Successfully signed up
        const user = userCredential.user;
        alert("signed up successfully!");

        // Redirect to login page or dashboard (if needed)
        // window.location.href = './login.html'; // Uncomment to redirect
    } catch (error) {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorMessage);
        alert(`Error: ${errorMessage}`);
    }
});
