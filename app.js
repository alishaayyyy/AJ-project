
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
