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

    const idDetalle = localStorage.getItem("personajeDetalleId");
    const personaje = personajes.find(p => p.id === Number(idDetalle));

    const container = document.getElementById("detallePersonaje");

    if (personaje) {
      container.innerHTML = `
        <h1>${personaje.nombre}</h1>
        <img src="${personaje.imagen}" alt="${personaje.nombre}">
        <p style="margin-top: 20px;">${personaje.descripcion}</p>
        <a href="perfil.html" style="display:inline-block; margin-top:20px; color:#FFD700;">← Volver al perfil</a>
      `;
    } else {
      container.innerHTML = "<p>Personaje no encontrado.</p>";
    }