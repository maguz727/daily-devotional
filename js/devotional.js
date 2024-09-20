// Obtener elementos del DOM donde se mostrarán los datos del devocional
const devotionalDate = document.getElementById("devotionalDate");
const devotionalTitle = document.getElementById("devotionalTitle");
const verseDescription = document.getElementById("verseDescription");
const verseDevotional = document.getElementById("verseDevotional");
const textDevotional = document.getElementById("textDevotional");
const audioDevotional = document.getElementById("audioDevotional")

// Array con los nombres de los meses
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

// Obtener el día y el mes actual
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const monthName = months[currentMonth]; // Nombre del mes actual

// Función que renderiza los datos del devocional en el DOM
function renderDevotional(devotional) {
    // Actualizar el contenido de los elementos del devocional
    devotionalDate.textContent = `${devotional.day} de ${
        months[devotional.month - 1]
    }`;
    devotionalTitle.textContent = devotional.title.toUpperCase();
    verseDescription.textContent = devotional.textVerse;
    verseDevotional.textContent = `${devotional.book} ${devotional.chapter}:${devotional.verse} ${devotional.version}`;
    audioDevotional.src = devotional.audio

    // Crear un fragmento de documento para evitar reflows repetidos
    const fragment = document.createDocumentFragment()

    devotional.text.forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        fragment.appendChild(p);
    });

    textDevotional.appendChild(fragment)
}

// leyendo la BD (JSON)

fetch("../src/data.json")
    .then((res) => res.json())
    .then((data) => {
        const currentDevotional = data.find((devotional) => {
            return (
                parseInt(devotional.day) === currentDay &&
                parseInt(devotional.month) === currentMonth + 1
            );
        });
        console.log(currentDevotional);
        renderDevotional(currentDevotional);
    })
    .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
    });
