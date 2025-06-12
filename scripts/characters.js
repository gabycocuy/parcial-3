let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

const personajes = [
  {
    id: 1,
    nombre: "Batman",
    descripcion: "El Caballero de la Noche, protector de Gotham.",
    imagen: "assets/batman.jpg"
  },
  {
    id: 2,
    nombre: "Joker",
    descripcion: "El archienemigo de Batman, símbolo del caos.",
    imagen: "assets/joker.jpg"
  },
  {
    id: 3,
    nombre: "Robin",
    descripcion: "El fiel compañero de Batman en su lucha contra el crimen.",
    imagen: "assets/robin.jpg"
  }
];

if (usuarioActivo) {
  document.getElementById('nombre').value = usuarioActivo.nombre;
  document.getElementById('correo').value = usuarioActivo.correo;
  document.getElementById('contrasena').value = usuarioActivo.contrasena;

  renderizarFavoritos();
}

document.getElementById('formPerfil').addEventListener('submit', function (e) {
  e.preventDefault();

  const nuevoNombre = document.getElementById('nombre').value;
  const nuevoCorreo = document.getElementById('correo').value;
  const nuevaContrasena = document.getElementById('contrasena').value;

  const correoEnUso = usuarios.some(
    (usuario) => usuario.correo === nuevoCorreo && usuario.correo !== usuarioActivo.correo
  );

  if (correoEnUso) {
    mostrarMensaje('Este correo ya está en uso por otro usuario.', 'red');
    return;
  }

  usuarioActivo.nombre = nuevoNombre;
  usuarioActivo.correo = nuevoCorreo;
  usuarioActivo.contrasena = nuevaContrasena;

  const index = usuarios.findIndex(usuario => usuario.correo === usuarioActivo.correo);
  if (index !== -1) {
    usuarios[index] = usuarioActivo;
  } else {
    usuarios.push(usuarioActivo);
  }

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

  mostrarMensaje('Perfil actualizado correctamente.', 'green');
});

function mostrarMensaje(mensaje, color) {
  const mensajeElemento = document.getElementById('mensaje');
  mensajeElemento.textContent = mensaje;
  mensajeElemento.style.color = color;
}

function toggleFavorito(id) {
  if (!usuarioActivo.favoritos) {
    usuarioActivo.favoritos = [];
  }

  const index = usuarioActivo.favoritos.indexOf(id);
  if (index === -1) {
    usuarioActivo.favoritos.push(id);
  } else {
    usuarioActivo.favoritos.splice(index, 1);
  }

  localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
  renderizarFavoritos();
  renderizarPersonajes(); 
}

function renderizarPersonajes() {
  const contenedor = document.getElementById("personajesContainer");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  personajes.forEach(personaje => {
    const esFavorito = usuarioActivo.favoritos?.includes(personaje.id);

    const card = document.createElement("div");
    card.classList.add("favorito-card");
    card.innerHTML = `
      <h3>${personaje.nombre}</h3>
      <img src="${personaje.imagen}" alt="${personaje.nombre}" style="max-width:100px; cursor: pointer;" onclick="irADetalle(${personaje.id})">
      <p>${personaje.descripcion}</p>
      <button onclick="toggleFavorito(${personaje.id})">
        ${esFavorito ? '💛 Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    `;
    contenedor.appendChild(card);
  });
}

function renderizarFavoritos() {
  const contenedor = document.getElementById("favoritosContainer");
  if (!contenedor) return;

  contenedor.innerHTML = "<h2>Mis Favoritos</h2>";

  const favoritos = personajes.filter(p => usuarioActivo.favoritos?.includes(p.id));
  if (favoritos.length === 0) {
    contenedor.innerHTML += "<p>No tienes personajes favoritos aún.</p>";
    return;
  }

  favoritos.forEach(personaje => {
    const card = document.createElement("div");
    card.classList.add("favorito-card");
    card.innerHTML = `
      <h3>${personaje.nombre}</h3>
      <img src="${personaje.imagen}" alt="${personaje.nombre}" style="max-width:100px;">
      <p>${personaje.descripcion}</p>
    `;
    contenedor.appendChild(card);
  });
}
function irADetalle(id) {
  localStorage.setItem("personajeDetalleId", id);
  window.location.href = "detalle.html";
}

renderizarPersonajes();