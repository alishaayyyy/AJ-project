
import { auth, firestore, signInWithEmailAndPassword, signOut, doc, setDoc, serverTimestamp } from "./auth.js";
//yay may yaha sa hata rh app.js ma add ki wi hy
// Comment Section Logic
// const commentButton = document.getElementById('commentButton');

// if (commentButton) {
//   commentButton.addEventListener('click', function() {
//     const user = auth.currentUser;
//     if (user) {
//       // User is logged in, navigate to comment page
//       window.location.href = "comment.html"; // redirect to comment page
//     } else {
//       alert("Please log in to add a comment.");
//     }
//   });
// }

const submitCommentButton = document.getElementById('submit-comment');
const commentText = document.getElementById('comment-text');

if (submitCommentButton) {
  submitCommentButton.addEventListener('click', async function() {
    const user = auth.currentUser;
    if (user) {
      // User is logged in, save comment to Firestore
      const comment = commentText.value;
      const commentRef = doc(firestore, "comments", user.uid); 

      // Save comment with timestamp
      await setDoc(commentRef, {
        userId: user.uid,
        comment: comment,
        timestamp: serverTimestamp() 
      });
alert("successful commented")
    
     // window.location.href = "index.html"; 
    }
    //  else {
    //   alert("Please log in to submit a comment.");
    // }
  });
}
