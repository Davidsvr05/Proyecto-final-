document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agregarModuloForm");
  const modulosList = document.getElementById("Modulos-list");

  cargarModulos();

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const id = document.getElementById("id").value;

      const modulos = JSON.parse(localStorage.getItem("modulos")) || [];

      const existe = modulos.some(modulo => modulo.id === id);
      if (existe) {
          Swal.fire({
              icon: "error",
              title: "Error",
              text: "El ID ya está registrado. Ingresa un ID diferente.",
              showConfirmButton: true
          });
          return;
      }

      const modulo = { nombre, id };

      guardarModulo(modulo);
      mostrarModulo(modulo);
      form.reset();

      Swal.fire({
          icon: "success",
          title: "Módulo Agregado",
          text: `${nombre} ha sido guardado correctamente.`,
          showConfirmButton: false,
          timer: 2000
      });
  });

  function guardarModulo(modulo) {
      const modulos = JSON.parse(localStorage.getItem("modulos")) || [];
      modulos.push(modulo);
      localStorage.setItem("modulos", JSON.stringify(modulos));
  }

  function cargarModulos() {
      const modulos = JSON.parse(localStorage.getItem("modulos")) || [];
      modulosList.innerHTML = ""; // Limpiar lista

      if (modulos.length === 0) {
          modulosList.innerHTML = "<p>No hay módulos agregados aún.</p>";
      } else {
          modulos.forEach(mostrarModulo);
      }
  }

  function mostrarModulo(modulo) {
      const card = document.createElement("div");
      card.classList.add("modulo-card");

      card.innerHTML = `
          <h3>${modulo.nombre}</h3>
          <p><strong>ID:</strong> ${modulo.id}</p>
          <button class="eliminar-btn" data-id="${modulo.id}" aria-label="Eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="Red" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
          </button>
      `;

      card.querySelector(".eliminar-btn").addEventListener("click", () => {
          eliminarModulo(modulo.id);
      });

      modulosList.appendChild(card);
  }

  function eliminarModulo(id) {
      let modulos = JSON.parse(localStorage.getItem("modulos")) || [];
      modulos = modulos.filter(modulo => modulo.id !== id);
      localStorage.setItem("modulos", JSON.stringify(modulos));

      cargarModulos();

      Swal.fire({
          icon: "warning",
          title: "Módulo Eliminado",
          text: "El módulo ha sido eliminado correctamente.",
          showConfirmButton: false,
          timer: 2000
      });
  }
});