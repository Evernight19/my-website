if (window.__supabaseLoaded) {
    console.log("Supabase already initialized — skipping");
} else {
    window.__supabaseLoaded = true;

    console.log("JS is running");

    const supabaseUrl = "https://qdmvhebngzxjeedoajvs.supabase.co";
    const supabaseKey = "sb_publishable_GKr34Ih7wJfGcIipUyhNpA_i5GMliBK";
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    async function loadProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        console.log("Data:", data);
        console.log("Error:", error);

        if (error) {
            console.error("Error fetching data:", error);
            return;
        }

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        data.forEach(product => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.Product_ID}</td>
                <td>${product.Product_Name}</td>
                <td>${product.Category}</td>
                <td>${product.Price}</td>
                <td>${product.In_Stock}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    loadProducts();

    console.log("Script loaded");
}














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