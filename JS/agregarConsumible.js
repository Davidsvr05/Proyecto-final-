document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agregarConsumibleForm");
  const consumiblesList = document.getElementById("consumibles-list");

  cargarConsumibles();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    
    const modulo = document.getElementById("modulo").value;
    const nombre = document.getElementById("nombre").value;
    const id = document.getElementById("id").value;
    const estado = document.getElementById("estado").value;
    const cantidad = document.getElementById("cantidad").value;
    const costo = document.getElementById("costo").value;
    const fotoInput = document.getElementById("foto");
    const fotoFile = fotoInput.files[0];

    const consumibles = JSON.parse(localStorage.getItem("consumibles")) || [];
    const existe = consumibles.some(c => c.id === id);
    if (existe) {
        Swal.fire({
            icon: "error",
            title: "ID Duplicado",
            text: `Ya existe un consumible con el ID ${id}.`,
            showConfirmButton: true
        });
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const fotoUrl = e.target.result;

        const consumible = { modulo, nombre, id, foto: fotoUrl, estado, cantidad, costo};

        guardarConsumible(consumible);
        mostrarConsumible(consumible);

        form.reset();

        Swal.fire({
            icon: "success",
            title: "Consumible Agregado",
            text: `${nombre} ha sido guardado correctamente.`,
            showConfirmButton: false,
            timer: 2000
        });
    };

    if (fotoFile) {
        reader.readAsDataURL(fotoFile);
    } else {
        
        const defaultFotoUrl = "/imagenes/herramientaPredeterminada.jpg";

        const consumible = { modulo, nombre, id, foto: defaultFotoUrl, estado, cantidad, costo};

        guardarConsumible(consumible);

        mostrarConsumible(consumible);
        
        form.reset();

        Swal.fire({
            icon: "success",
            title: "Consumible Agregado",
            text: `${nombre} ha sido guardado correctamente.`,
            showConfirmButton: false,
            timer: 2000
        });
    }
});

  function mostrarConsumible(consumible) {
    const card = document.createElement("div");
    card.classList.add("consumible-card");

    card.innerHTML = `
        <img src="${consumible.foto}" alt="${consumible.nombre}">
        <h3>${consumible.nombre}</h3>
        <p><strong>Modulo:</strong> ${consumible.modulo}</p>
        <p><strong>ID:</strong> ${consumible.id}</p>
        <p><strong>Estado:</strong> ${consumible.estado}</p>
        <p><strong>Cantidad:</strong> ${consumible.cantidad}</p>
        <p><strong>Costo:</strong> ${consumible.costo}</p>
        <button class="eliminar-btn" data-id="${consumible.id}" aria-label="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="Red" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        </button>
    `;

    card.querySelector(".eliminar-btn").addEventListener("click", () => {
        eliminarConsumible(consumible.id);
    });

    consumiblesList.appendChild(card);
}

function eliminarConsumible(id) {
  let consumibles = JSON.parse(localStorage.getItem("consumibles")) || [];
  consumibles = consumibles.filter(consumible => consumible.id !== id);
  localStorage.setItem("consumibles", JSON.stringify(consumibles));
  cargarConsumibles();

  Swal.fire({
      icon: "success",
      title: "Consumible Eliminado",
      text: `El consumible con ID ${id} ha sido eliminado correctamente.`,
      showConfirmButton: false,
      timer: 2000
  });
}

function guardarConsumible(consumible) {
  const consumibles = JSON.parse(localStorage.getItem("consumibles")) || [];
  consumibles.push(consumible);
  localStorage.setItem("consumibles", JSON.stringify(consumibles));
}

  function cargarConsumibles() {
      const consumibles = JSON.parse(localStorage.getItem("consumibles")) || [];
      consumiblesList.innerHTML = "";

      if (consumibles.length === 0) {
          consumiblesList.innerHTML = "<p>No hay consumibles agregados aún.</p>";
      } else {
          consumibles.forEach(mostrarConsumible);
      }
  }
});