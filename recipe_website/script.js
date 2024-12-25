function toggleWishlist(button) {
    const icon = button.querySelector("i");
    const recipeTitle = button.closest(".recipe-card").querySelector(".recipe-title").innerText;
    const wishlist = document.getElementById("wishlist-items");
  
    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");

      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = recipeTitle;
      listItem.dataset.title = recipeTitle; 
      wishlist.appendChild(listItem);
    } else {

      icon.classList.remove("fas");
      icon.classList.add("far");
  
      const items = wishlist.querySelectorAll("li");
      items.forEach((item) => {
        if (item.dataset.title === recipeTitle) {
          wishlist.removeChild(item);
        }
      });
    }
  }
  
  function viewRecipe() {
    window.location.href = 'recipe-detail.html';
  }
  