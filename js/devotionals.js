const devotionalsSection = document.getElementById("devotionalSection")
const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const monthName = months[currentMonth];


function renderDevotionals(devotionals) {
    devotionals.forEach(devotional => {
        const devotionalCard = document.createElement("article")
        devotionalCard.classList.add("devotionals__card")

        devotionalCard.innerHTML = `
            <div class="devotionals__card__header">
                <p class="devotionals__card__header__day">${devotional.day} de ${monthName}</p>
                <h2 class="devotionals__card__header__title">${devotional.title.toUpperCase()}</h2>
                <p class="devotionals__card__header__verse-description">${devotional.textVerse}</p>
                <span class="devotionals__card__header__verse">${devotional.book} ${devotional.chapter}:${devotional.verse} ${devotional.version}</span>
            </div>
            <div class="devotionals__card__body">
                ${devotional.text.map((p) => `<p>${p}</p>`).join("")}
            </div>
    `;

    devotionalsSection.appendChild(devotionalCard)
    });
};

fetch("../src/data.json")
    .then((res) => res.json())
    .then((data) => {
        const currentDevotional = data
            .filter((devotional) => {
            return devotional.day <= currentDay && devotional.month == currentMonth + 1;
        })
        .sort((a, b) => {
            return b.day - a.day
        })
        
        renderDevotionals(currentDevotional)        
    })
    .catch(err => {
        console.error('Error al cargar el archivo JSON:', err);
      });