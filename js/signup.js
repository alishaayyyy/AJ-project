import { createUserWithEmailAndPassword, auth } from './auth.js'; 

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value; 

    try {
   
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

 
        const user = userCredential.user;
        // window.location.href = "../HTML/login.html";
        alert("signed up successfully!");

        // window.location.href = './login.html'; // Uncomment to redirect
    } catch (error) {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorMessage);
        alert(`Error: ${errorMessage}`);
    }
});
