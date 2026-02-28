window.addEventListener("load", () => {
  document.body.classList.add("loaded");
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



document.getElemenyById("surveyForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        gender: formData.get("gender"),
        age: formData.get("age"),
        country: formData.get("country"),
        rating: formData.get("rating"),
        shop_again: formData.get("shop_again"),
        feedback: formData.get("feedback")
    };

    console.log("Survey Submitted:", data);

    document.getElementById("successMessage").style.display = "block";

    this.reset();
});