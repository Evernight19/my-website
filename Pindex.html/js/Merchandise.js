document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
});










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





const filterProductsList = document.querySelectorAll(".product");

function applyFilters() {
    const selectedCategories = [...document.querySelectorAll(".filter-category:checked")].map(c => c.value);
    const selectedPrices = document.querySelector(".filter-price:checked")?.value || null;
    const selectedRatings = [...document.querySelectorAll(".filter-rating:checked")].map(r => r.value);

    filterProductsList.forEach(product => {
        let name = product.dataset.name.toLowerCase();
        let show = true;

        
        if (selectedCategories.length > 0) {
            show = selectedCategories.some(cat => name.includes(cat));
        }

        
        if (selectedPrices) {
            let price = 80; 

            if (selectedPrices === "low" && price > 50) show = false;
            if (selectedPrices === "mid" && (price < 50 || price > 100)) show = false;
            if (selectedPrices === "high" && price < 100) show = false;
        }

        
        if (selectedRatings.length > 0) {
            let rating = 5; 
            if (!selectedRatings.some(r => rating >= r)) show = false;
        }

        product.parentElement.style.display = show ? "block" : "none";
    });
}





const toggleBtn = document.querySelector('.filter-toggle');
const filterContent = document.querySelector('.filter-content');

toggleBtn.addEventListener('click', () => {
    filterContent.classList.toggle('open');
    toggleBtn.classList.toggle('active');

    toggleBtn.textContent = filterContent.classList.contains('open')
        ? "Filters ▲"
        : "Filters ▼";
});








document.querySelectorAll(".filter-category, .filter-price, .filter-rating")
    .forEach(input => input.addEventListener("change", applyFilters));


document.getElementById("clearFilters").addEventListener("click", () => {
    document.querySelectorAll(".filter-category, .filter-price, .filter-rating")
        .forEach(input => input.checked = false);
    applyFilters();
});