// Navigation bar
const navButton = document.getElementById("navButton");
const navLinks = document.querySelectorAll(".nav-link");

navButton.addEventListener("click", () => {
    navLinks.forEach((link) => {
        link.classList.toggle("hidden");
    });
});

// Devotional Section

const devotionalDate = document.getElementById("devotionalDate");
const devotionalTitle = document.getElementById("devotionalTitle");
const verseDescription = document.getElementById("verseDescription");
const verseDevotional = document.getElementById("verseDevotional");
const textDevotional = document.getElementById("textDevotional");

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const monthName = months[currentMonth];

// leyendo la BD (JSON)

fetch("../src/data.json")
    .then((res) => res.json())
    .then((data) => {
        const currentDevotional = data.find((devotional) => {
            return devotional.day == currentDay && devotional.month == currentMonth + 1;
        });

        devotionalDate.textContent = `${currentDay} de ${monthName}`;
        devotionalTitle.textContent = currentDevotional.title.toUpperCase();
        verseDescription.textContent = currentDevotional.textVerse;
        verseDevotional.textContent = `${currentDevotional.book} ${currentDevotional.chapter}:${currentDevotional.verse} ${currentDevotional.version}`
        currentDevotional.text.forEach((t) => (textDevotional.innerHTML += `<p>${t}</p>`));
    })