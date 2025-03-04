document.addEventListener("DOMContentLoaded", () => {
  const inventarioTabla = document.getElementById("inventarioTabla").getElementsByTagName("tbody")[0];
  const filtroModulo = document.getElementById("filtroModulo");

  cargarInventario();
  cargarModulos();

  filtroModulo.addEventListener("change", cargarInventario);

  function cargarInventario() {
    const herramientas = JSON.parse(localStorage.getItem("herramientas")) || [];
    const moduloFiltro = filtroModulo.value;

    inventarioTabla.innerHTML = "";

    herramientas.forEach(herramienta => {
      if (moduloFiltro && herramienta.modulo !== moduloFiltro) {
        return;
      }

      const row = inventarioTabla.insertRow();

      const nombreCell = row.insertCell(0);
      const idCell = row.insertCell(1);
      const estadoCell = row.insertCell(2);
      const personaCell = row.insertCell(3);
      const idPersonaCell = row.insertCell(4);
      const moduloCell = row.insertCell(5);

      nombreCell.textContent = herramienta.nombre;
      idCell.textContent = herramienta.id;
      estadoCell.textContent = herramienta.estado;

      if (herramienta.estado === "No disponible") {
        personaCell.textContent = herramienta.mecanico || "N/A";
        idPersonaCell.textContent = herramienta.mecanicoId || "N/A";
      } else {
        personaCell.textContent = "N/A";
        idPersonaCell.textContent = "N/A";
      }

      moduloCell.textContent = herramienta.modulo || "N/A";
    });
  }

  function cargarModulos() {
    const modulos = JSON.parse(localStorage.getItem("modulos")) || [];

    modulos.forEach(modulo => {
      const option = document.createElement("option");
      option.value = modulo.id;
      option.textContent = `${modulo.id} - ${modulo.nombre}`;
      filtroModulo.appendChild(option);
    });
  }
});