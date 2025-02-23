// Import necessary functions from auth.js
import { auth, firestore, signInWithEmailAndPassword, signOut, doc, setDoc, serverTimestamp } from "./auth.js";

// Comment Section Logic
const commentButton = document.getElementById('commentButton');

if (commentButton) {
  commentButton.addEventListener('click', function() {
    const user = auth.currentUser;
    if (user) {
      // User is logged in, navigate to comment page
      window.location.href = "comment.html"; // redirect to comment page
    } else {
      alert("Please log in to add a comment.");
    }
  });
}

// Handle comment submission
const submitCommentButton = document.getElementById('submit-comment');
const commentText = document.getElementById('comment-text');

if (submitCommentButton) {
  submitCommentButton.addEventListener('click', async function() {
    const user = auth.currentUser;
    if (user) {
      // User is logged in, save comment to Firestore
      const comment = commentText.value;
      const commentRef = doc(firestore, "comments", user.uid);  // Create a unique document for each user

      // Save comment with timestamp
      await setDoc(commentRef, {
        userId: user.uid,
        comment: comment,
        timestamp: serverTimestamp()  // Automatically adds server timestamp
      });
alert("successful commented")
      // Redirect back to index page after submitting
     // window.location.href = "index.html"; // Go back to home page
    } else {
      alert("Please log in to submit a comment.");
    }
  });
}
