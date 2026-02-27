document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
});





function loadCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsDiv = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");

    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalSpan.textContent = "0.00";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartItemsDiv.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" class="cart-img">
            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>€${item.price} × ${item.quantity}</p>
            </div>
            <button onclick="removeItem(${item.id})" class="remove-btn">Remove</button>
        </div>
        `;
    });

    totalSpan.textContent = total.toFixed(2);
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); 
}

loadCart();








const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");

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