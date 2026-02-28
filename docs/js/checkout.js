document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SEARCH
  ================================ */
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn?.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) return;
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
  });


  /* ===============================
     SIDE MENU
  ================================ */
  const menuToggle = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");

  menuToggle?.addEventListener("click", () => {
    sideMenu?.classList.add("open");
  });

  closeMenu?.addEventListener("click", () => {
    sideMenu?.classList.remove("open");
  });

  document.addEventListener("click", (e) => {
    if (
      sideMenu &&
      !sideMenu.contains(e.target) &&
      !menuToggle?.contains(e.target)
    ) {
      sideMenu.classList.remove("open");
    }
  });


  /* ===============================
     SUPABASE
  ================================ */
  const supabaseUrl = "https://qdmvhebngzxjeedoajvs.supabase.co";
  const supabaseKey = "sb_publishable_GKr34Ih7wJfGcIipUyhNpA_i5GMliBK";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


  /* ===============================
     CART FUNCTIONS
  ================================ */

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }


  function renderCheckoutItems() {
    const cart = getCart();
    const container = document.getElementById("checkout-items");
    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach(item => {
      container.innerHTML += `
        <div class="checkout-item">
          <p><strong>${item.name}</strong></p>
          <p>€${item.price} × ${item.quantity}</p>
        </div>
      `;
    });
  }


  function calculateTotals() {
    const cart = getCart();

    let subtotal = 0;

    cart.forEach(item => {
      subtotal += Number(item.price) * Number(item.quantity);
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById("checkoutTotal").textContent = subtotal.toFixed(2);
    document.getElementById("checkoutTax").textContent = tax.toFixed(2);
    document.getElementById("checkoutFinal").textContent = total.toFixed(2);
  }


  /* ===============================
     UPDATE STOCK
  ================================ */

  async function updateStockAfterPurchase() {
    const cart = getCart();

    for (const item of cart) {

      const { data: product, error } = await supabase
        .from("products")
        .select("In_Stock")
        .eq("Product_ID", item.id)
        .single();

      if (error) throw error;

      if (product.In_Stock < item.quantity) {
        alert(`Not enough stock for ${item.name}`);
        throw new Error("Insufficient stock");
      }

      const newStock = product.In_Stock - item.quantity;

      const { error: updateError } = await supabase
        .from("products")
        .update({ In_Stock: newStock })
        .eq("Product_ID", item.id);

      if (updateError) throw updateError;
    }
  }


  /* ===============================
     PAYMENT FORM
  ================================ */

  const form = document.getElementById("paymentForm");
  const processing = document.getElementById("processing");
  const success = document.getElementById("success");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    form.classList.add("hidden");
    processing.classList.remove("hidden");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await updateStockAfterPurchase();

      const cart = getCart();
      
      let subtotal = 0;
      cart.forEach(item => {
        subtotal += Number(item.price) * Number(item.quantity);
      });

      const tax = subtotal * 0.10;
      const total = subtotal + tax;

      const { error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            order_id: orderId,
            items: cart,
            subtotal: subtotal,
            tax: tax,
            total: total
          }
        ]);

      if (orderError) throw orderError;

      document.getElementById("orderId").textContent = orderId;

      processing.classList.add("hidden");
      success.classList.remove("hidden");

      const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
      document.getElementById("orderId").textContent = orderId;

      localStorage.removeItem("cart");

    } catch (err) {
      processing.classList.add("hidden");
      form.classList.remove("hidden");
      alert("Payment failed. Please try again.");
      console.error(err);
    }
  });


  /* ===============================
     INITIAL LOAD
  ================================ */

  renderCheckoutItems();
  calculateTotals();

});
