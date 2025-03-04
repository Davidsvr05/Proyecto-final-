document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agregarOrdenForm");
  const ordenesList = document.getElementById("ordenes-list");

  cargarOrdenes();

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const id = document.getElementById("id").value;
      const director = document.getElementById("director").value;

      const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

      const existe = ordenes.some(orden => orden.id === id);
      if (existe) {
          Swal.fire({
              icon: "error",
              title: "Error",
              text: "El número de orden ya está registrado. Ingresa un número de orden diferente.",
              showConfirmButton: true
          });
          return;
      }

      const orden = { nombre, id, director };

      guardarOrden(orden);
      mostrarOrden(orden);
      form.reset();

      Swal.fire({
          icon: "success",
          title: "Orden Agregada",
          text: `La orden de trabajo ha sido guardada correctamente.`,
          showConfirmButton: false,
          timer: 2000
      });
  });

  function guardarOrden(orden) {
      const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
      ordenes.push(orden);
      localStorage.setItem("ordenes", JSON.stringify(ordenes));
  }

  function cargarOrdenes() {
      const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
      ordenesList.innerHTML = "";  

      if (ordenes.length === 0) {
          ordenesList.innerHTML = "<p>No hay órdenes de trabajo agregadas aún.</p>";
      } else {
          ordenes.forEach(mostrarOrden);
      }
  }

  function mostrarOrden(orden) {
      const card = document.createElement("div");
      card.classList.add("orden-card");

      card.innerHTML = `
          <h3>${orden.nombre}</h3>
          <p><strong>Número de Orden:</strong> ${orden.id}</p>
          <p><strong>Director Encargado:</strong> ${orden.director}</p>
          <button class="eliminar-btn" data-id="${orden.id}" aria-label="Eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="Red" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
          </button>
      `;

      card.querySelector(".eliminar-btn").addEventListener("click", () => {
          confirmarEliminacion(orden.id);
      });

      ordenesList.appendChild(card);
  }

  function confirmarEliminacion(id) {
      Swal.fire({
          title: '¿Estás seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              eliminarOrden(id);
          }
      });
  }

  function eliminarOrden(id) {
      let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
      ordenes = ordenes.filter(orden => orden.id !== id);
      localStorage.setItem("ordenes", JSON.stringify(ordenes));

      cargarOrdenes();

      Swal.fire({
          icon: "warning",
          title: "Orden Eliminada",
          text: "La orden de trabajo ha sido eliminada correctamente.",
          showConfirmButton: false,
          timer: 2000
      });
  }
});