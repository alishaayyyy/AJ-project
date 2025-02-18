import {signInWithEmailAndPassword,auth } from "./auth.js";

let form = document.getElementById('form');
form.addEventListener('submit', (e)=>{
e.preventDefault();
let email = document.getElementById('email').value ;
let password = document.getElementById('password').value ;




signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "../index.html";
    alert("Login successfully")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("error")
  });

})