window.addEventListener("load", () => {
  const intro = document.querySelector(".video-intro");
  const main = document.querySelector(".main-content");
  const introVideo = document.getElementById("introVideo");
  const targetVideo = document.querySelector(".BlackHole2 video");

  if (!intro || !introVideo || !targetVideo) return;

  if (!sessionStorage.getItem("visitedHome")) {
    introVideo.play().catch(() => {});

    setTimeout(() => {
      moveIntroToTarget();

      main.classList.add("visible");

      intro.addEventListener(
        "transitionend",
        () => {
          intro.style.display = "none";
          sessionStorage.setItem("visitedHome", "true");
        },
        { once: true }
      );
    }, 5000);
  } else {
    intro.style.display = "none";
    main.classList.add("visible");
  }

  function moveIntroToTarget() {
    const introRect = intro.getBoundingClientRect();
    const targetRect = targetVideo.getBoundingClientRect();

    const scale = Math.min(
      targetRect.width / introRect.width,
      targetRect.height / introRect.height
    );

    const translateX =
      targetRect.left + targetRect.width / 2 -
      (introRect.left + introRect.width / 2);

    const translateY =
      targetRect.top + targetRect.height / 2 -
      (introRect.top + introRect.height / 2);

    intro.style.transform = `
      translate(${translateX}px, ${translateY}px)
      scale(${scale})
    `;
  }
});


















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

















