const devotionalSection = document.getElementById("devotionalSection")
const fragment = document.createDocumentFragment()
const devotionalTemplate = document.getElementById("devotionalTemplate")
const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const monthName = months[currentMonth];


function renderDevotionals(devotionals) {
    devotionals.forEach(devotional => {
        const clone = devotionalTemplate.content.cloneNode(true)

        // Configurar los elementos estáticos del devocional
        clone.getElementById("devotionalDay").textContent = `${devotional.day} de ${monthName}`
        clone.getElementById("devotionalTitle").textContent = devotional.title.toUpperCase()
        clone.getElementById("textVerse").textContent = devotional.textVerse
        clone.getElementById("devotionalVerse").textContent = `${devotional.book} ${devotional.chapter}:${devotional.verse}`
        
        // Obtener el contenedor donde van los párrafos del texto del devocional
        const devotionalText = clone.getElementById("devotionalText");

        // Recorrer el array 'devotional.text' y crear un <p> para cada texto
        devotional.text.forEach((paragraph) => {
            const p = document.createElement("p") // Crear un nuevo párrafo
            p.textContent = paragraph // Asignar el texto al párrafo de forma segura
            devotionalText.appendChild(p) // Añadir el párrafo al contenedor
        })
        // Añadir el contenido clonado al fragmento
        fragment.appendChild(clone)
    });
    // Añadir todo el fragmento al DOM
    devotionalSection.appendChild(fragment)
};

// Realiza una solicitud para obtener el archivo JSON con los datos de los devocionales
fetch("../src/data.json")
    .then((res) => res.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
        // Filtra los devocionales por día menor o igual al día actual y mes igual al mes actual
        const currentDevotional = data
            .filter((devotional) => {
                // Devuelve solo los devocionales del mes actual y hasta el día actual
                return devotional.day <= currentDay && devotional.month == currentMonth + 1;
        })
        .sort((a, b) => {
            // Ordena los devocionales filtrados por día de manera descendente (de mayor a menor)
            return b.day - a.day
        })
        // Llama a la función para renderizar los devocionales filtrados y ordenados en el DOM
        renderDevotionals(currentDevotional)        
    })
    .catch(err => {
        // Maneja cualquier error que ocurra durante la carga o procesamiento del archivo JSON
        console.error('Error al cargar el archivo JSON:', err);
    });