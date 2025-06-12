let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

const personajes = [
  {
    id: 1,
    nombre: "Batman",
    descripcion: "El Caballero de la Noche, protector de Gotham.",
    imagen: "recursos/batman.jpeg"
  },
  {
    id: 2,
    nombre: "Joker",
    descripcion: "El archienemigo de Batman, símbolo del caos.",
    imagen: "recursos/joker.png"
  },
  {
    id: 3,
    nombre: "Robin",
    descripcion: "El fiel compañero de Batman en su lucha contra el crimen.",
    imagen: "recursos/robin.jpeg"
  }
];

function toggleFavorito(id) {
  if (!usuarioActivo?.favoritos) {
    usuarioActivo.favoritos = [];
  }

  const index = usuarioActivo.favoritos.indexOf(id);
  if (index === -1) {
    usuarioActivo.favoritos.push(id);
  } else {
    usuarioActivo.favoritos.splice(index, 1);
  }

  localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
  renderizarPersonajes();
}

function renderizarPersonajes() {
  const contenedor = document.getElementById("personajesContainer");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  personajes.forEach(personaje => {
    const esFavorito = usuarioActivo?.favoritos?.includes(personaje.id);

    const card = document.createElement("div");
    card.classList.add("favorito-card");

    // Contenido de la tarjeta
    card.innerHTML = `
      <h3 class="personaje-nombre" data-id="${personaje.id}">${personaje.nombre}</h3>
      <img src="${personaje.imagen}" alt="${personaje.nombre}" style="max-width:100px;" class="personaje-imagen" data-id="${personaje.id}">
      <p>${personaje.descripcion}</p>
      ${
        usuarioActivo
          ? `<button onclick="toggleFavorito(${personaje.id})">
              ${esFavorito ? '💛 Quitar de favoritos' : '🤍 Agregar a favoritos'}
            </button>`
          : `<p><em>Inicia sesión para agregar a favoritos</em></p>`
      }
    `;

    // Evento para ir al detalle
    card.querySelectorAll('.personaje-nombre, .personaje-imagen').forEach(el => {
      el.addEventListener('click', () => {
        localStorage.setItem('personajeDetalle', JSON.stringify(personaje));
        window.location.href = 'detalle.html';
      });
    });

    contenedor.appendChild(card);
  });
}

renderizarPersonajes();