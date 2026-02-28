document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SEARCH FUNCTION
  ========================== */
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (!query) return;
      window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  }


const productData = {
  id: 3,
  name: "Acheron Lightcone",
  price: 99.99,
  image: "img/AchyLight.jpg"
};



  /* =========================
     QUANTITY BUTTONS
  ========================== */
  let quantity = 1;

  const quantityDisplay = document.getElementById("quantityDisplay");
  const increaseBtn = document.getElementById("increaseQty");
  const decreaseBtn = document.getElementById("decreaseQty");

  if (increaseBtn && decreaseBtn && quantityDisplay) {

    increaseBtn.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });

    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });
  }


  /* =========================
     ADD TO CART FUNCTION
  ========================== */
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }


  /* =========================
     ADD TO CART BUTTON
  ========================== */
  window.openPopup = function () {

    addToCart({
      ...productData,
      quantity: quantity
    });

    const popup = document.getElementById("popup");

    if (popup) {
      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");
      }, 2000);
    }
  };


  /* =========================
     SIDE MENU
  ========================== */
  const menuToggle = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (menuToggle && sideMenu && closeMenu) {

    menuToggle.addEventListener("click", () => {
      sideMenu.classList.add("open");
    });

    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        sideMenu.classList.remove("open");
      }
    });
  }

});