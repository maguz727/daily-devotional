// Barra de navegación
const navButton = document.getElementById("navButton");
const navLinks = document.querySelectorAll(".nav-link");

navButton.addEventListener("click", () => {
    navLinks.forEach((link) => {
        link.classList.toggle("hidden");
    });
});