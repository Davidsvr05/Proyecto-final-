document.addEventListener("DOMContentLoaded", () => {
  const historialTabla = document.getElementById("historialTabla").getElementsByTagName("tbody")[0];
  const filtroOrden = document.getElementById("filtroOrden");
  const totalHorasTrabajadasDiv = document.getElementById("totalHorasTrabajadas");

  cargarHistorial();
  cargarOrdenes();

  filtroOrden.addEventListener("change", cargarHistorial);

  function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    const filtro = filtroOrden.value;
    historialTabla.innerHTML = "";
    let totalHoras = 0;

    historial.forEach(registro => {
      if (filtro === "" || registro.orden === filtro) {
        const orden = ordenes.find(o => o.id === registro.orden);
        const director = orden ? orden.director : "N/A";
        const horaDevolucion = registro.fechaDevolucion || "N/A";
        const horasTrabajadas = registro.fechaDevolucion ? calcularHorasTrabajadas(registro.fechaEntrega, registro.fechaDevolucion) : "N/A";

        if (horasTrabajadas !== "N/A") {
          totalHoras += parseFloat(horasTrabajadas);
        }

        const row = historialTabla.insertRow();

        const directorCell = row.insertCell(0);
        const ordenCell = row.insertCell(1);
        const mecanicoCell = row.insertCell(2);
        const herramientaCell = row.insertCell(3);
        const horaEntregaCell = row.insertCell(4);
        const horaDevolucionCell = row.insertCell(5);
        const horasTrabajadasCell = row.insertCell(6);

        directorCell.textContent = director;
        ordenCell.textContent = registro.orden;
        mecanicoCell.textContent = registro.mecanico;
        herramientaCell.textContent = registro.nombre;
        horaEntregaCell.textContent = registro.fechaEntrega;
        horaDevolucionCell.textContent = horaDevolucion;
        horasTrabajadasCell.textContent = horasTrabajadas;
      }
    });

    totalHorasTrabajadasDiv.textContent = `Total de horas trabajadas: ${totalHoras.toFixed(2)}`;
  }

  function cargarOrdenes() {
    const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    filtroOrden.innerHTML = '<option value="">Todas las Ordenes</option>';
    ordenes.forEach(orden => {
      const option = document.createElement("option");
      option.value = orden.id;
      option.textContent = `${orden.id} - ${orden.nombre}`;
      filtroOrden.appendChild(option);
    });
  }

  function calcularHorasTrabajadas(horaEntrega, horaDevolucion) {
    const start = new Date(horaEntrega);
    const end = new Date(horaDevolucion);
    const diff = Math.abs(end - start) / (1000 * 60 * 60);
    return diff.toFixed(2);
  }
});