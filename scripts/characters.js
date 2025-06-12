class Personaje {
    constructor(id,nombre,imagen,descripcion,archivo){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}

const Personajes =[
new Personaje(1,"Batman","recursos/batman.jpeg","El Caballero de la Noche"),
new Personaje(2,"Joker","recursos/joker.png","El Príncipe Payaso del Crimen"),
new Personaje(3,"Penguin", "recursos/The Penguin.jpeg", "Mafioso clásico de Gotham."),
new Personaje(4,"Catwoman", "recursos/gatubela.jpeg", "Ladrona con moral ambigua."),
new Personaje(5,"Harley Quinn", "recursos/♥️💙.jpeg", "Psiquiatra convertida en villana."),
new Personaje(6, "Robin", "recursos/robin.jpeg", "El joven maravilla."),
new Personaje(7, "Alfred", "recursos/alfrec.jpeg", "El mayordomo leal."),
new Personaje(8,"James Gordon", "recursos/James Gordon.jpeg", "Comisario aliado de Batman."),
new Personaje(9,"bane","recursos/bane.jpeg", "Fuerza bruta e inteligencia."),
new Personaje(10,"Riddler", "recursos/riddle.jpeg", "El hombre de los acertijos."),
new Personaje(11,"Two-Face", "recursos/two-face.jpeg", "El ex fiscal de distrito."),
new Personaje(12,"Scarecrow", "recursos/Scarecrow_.jpeg", "El Maestro del miedo."),
new Personaje(13, "Lucius Fox", "recursos/lucius fox.jpeg", "Ingeniero brillante."),
new Personaje(14, "Batgirl", "recursos/batgirl.jpeg", "La aliada encapuchada."),
new Personaje(15, "Ra's al Ghul", "recursos/ra's al ghul.jpeg", "Líder de la Liga de Asesinos."),

];

// Detecta en qué página estás
const esDetalle = window.location.pathname.includes("detalle.html");

// Si estás en characters.html
function mostrarPersonajes() {
    const contenedor = document.querySelector(".carrusel");
    if (!contenedor) return;

    Personajes.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("slide");

        div.innerHTML = `
            <a href="detalle.html?id=${p.id}">
                <img src="${p.imagen}" alt="${p.nombre}" title="${p.nombre}">
            </a>
        `;

        contenedor.appendChild(div);
    });
}

// Si estás en detalle.html
function mostrarDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const personaje = Personajes.find(p => p.id === id);

    const contenedor = document.querySelector("#detalle-personaje");
    if (!contenedor || !personaje) return;

    contenedor.innerHTML = `
        <div class="detalle">
            <img src="${personaje.imagen}" alt="${personaje.nombre}">
            <h2>${personaje.nombre}</h2>
            <p>${personaje.descripcion}</p>
            <a href="characters.html">← Volver</a>
        </div>
    `;
}

window.addEventListener("DOMContentLoaded", () => {
    if (esDetalle) {
        mostrarDetalle();
    } else {
        mostrarPersonajes();
    }
});