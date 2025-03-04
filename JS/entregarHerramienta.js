document.addEventListener("DOMContentLoaded", () => {
  const mechanicList = document.getElementById("mechanicList");
  const toolList = document.getElementById("toolList");
  const ordenTrabajoSelect = document.getElementById("ordenTrabajo");

  cargarMecanicos();
  cargarHerramientas();
  cargarOrdenes();

  function cargarMecanicos() {
    const mechanics = JSON.parse(localStorage.getItem("personas")) || [];
    mechanicList.innerHTML = "";

    if (mechanics.length === 0) {
        mechanicList.innerHTML = "<p>No hay mecánicos agregados aún.</p>";
    } else {
        mechanics.forEach(mostrarMecanico);
    }
  }

  function cargarHerramientas() {
    const tools = JSON.parse(localStorage.getItem("herramientas")) || [];
    toolList.innerHTML = ""; 

    if (tools.length === 0) {
        toolList.innerHTML = "<p>No hay herramientas agregadas aún.</p>";
    } else {
        tools.forEach(mostrarHerramienta);
    }
  }

  function cargarOrdenes() {
    const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    ordenTrabajoSelect.innerHTML = '<option value="" disabled selected>Seleccione una Orden</option>';

    ordenes.forEach(orden => {
      const option = document.createElement("option");
      option.value = orden.id;
      option.textContent = `${orden.id} - ${orden.nombre}`;
      ordenTrabajoSelect.appendChild(option);
    });
  }

  function mostrarMecanico(mecanico) {
    const div = document.createElement("div");
    div.className = "mechanic";
    div.innerHTML = `<img src="${mecanico.foto}" alt="${mecanico.nombre}"><p>${mecanico.nombre}</p>`;
    div.onclick = () => selectMechanic(mecanico.nombre);
    mechanicList.appendChild(div);
  }

  function mostrarHerramienta(herramienta) {
    const div = document.createElement("div");
    div.className = "tool";
    div.innerHTML = `<img src="${herramienta.foto}" alt="${herramienta.nombre}"><p>${herramienta.nombre}</p>`;
    div.onclick = () => selectTool(herramienta.id);
    toolList.appendChild(div);
  }

  function selectMechanic(name) {
    document.getElementById("selectedMechanic").textContent = name;
  }

  function selectTool(id) {
    const tools = JSON.parse(localStorage.getItem("herramientas")) || [];
    const tool = tools.find(tool => tool.id === id);
    if (tool) {
        document.getElementById("selectedTool").textContent = tool.nombre;
        document.getElementById("selectedToolId").value = tool.id;
        toggleButtons(tool.estado, tool.mecanico);
    }
  }

  function toggleButtons(estado, mecanico) {
    const entregaButton = document.getElementById("entregaButton");
    const recibeButton = document.getElementById("recibeButton");
    const selectedMechanic = document.getElementById("selectedMechanic").textContent;

    if (estado === "Disponible") {
        entregaButton.style.display = "inline-block";
        recibeButton.style.display = "none";
    } else if (mecanico === selectedMechanic) {
        entregaButton.style.display = "none";
        recibeButton.style.display = "inline-block";
    } else {
        entregaButton.style.display = "none";
        recibeButton.style.display = "none";
    }
  }

  window.registerAction = function (action) {
    const selectedMechanic = document.getElementById("selectedMechanic").textContent;
    const selectedToolId = document.getElementById("selectedToolId").value;
    const dateTime = document.getElementById("dateTime").value;
    const selectedOrden = document.getElementById("ordenTrabajo").value;

    if (action === 'entrega' && selectedMechanic !== 'N/A' && selectedToolId && selectedOrden) {
        const tools = JSON.parse(localStorage.getItem("herramientas")) || [];
        const toolIndex = tools.findIndex(tool => tool.id === selectedToolId);
        if (toolIndex !== -1) {
            tools[toolIndex].estado = "No disponible";
            tools[toolIndex].mecanico = selectedMechanic;
            tools[toolIndex].orden = selectedOrden;
            tools[toolIndex].fechaEntrega = dateTime;
            localStorage.setItem("herramientas", JSON.stringify(tools));
            agregarHistorial(tools[toolIndex], 'entrega');
            cargarHerramientas();
            Swal.fire({
                icon: "success",
                title: "Herramienta Entregada",
                text: "La herramienta ha sido entregada correctamente.",
                showConfirmButton: false,
                timer: 2000
            });
        }
    } else if (action === 'recibe' && selectedToolId) {
        const tools = JSON.parse(localStorage.getItem("herramientas")) || [];
        const toolIndex = tools.findIndex(tool => tool.id === selectedToolId);
        if (toolIndex !== -1 && tools[toolIndex].mecanico === selectedMechanic) {
            tools[toolIndex].estado = "Disponible";
            tools[toolIndex].fechaDevolucion = dateTime;
            localStorage.setItem("herramientas", JSON.stringify(tools));
            agregarHistorial(tools[toolIndex], 'devolucion');
            cargarHerramientas();
            Swal.fire({
                icon: "success",
                title: "Herramienta Recibida",
                text: "La herramienta ha sido recibida correctamente.",
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Solo el mecánico que alquiló la herramienta puede devolverla.",
                showConfirmButton: true
            });
        }
    }
  }

  function agregarHistorial(herramienta, accion) {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const registro = {
      id: herramienta.id,
      nombre: herramienta.nombre,
      mecanico: herramienta.mecanico,
      orden: herramienta.orden,
      fechaEntrega: herramienta.fechaEntrega,
      fechaDevolucion: accion === 'devolucion' ? herramienta.fechaDevolucion : null
    };
    historial.push(registro);
    localStorage.setItem("historial", JSON.stringify(historial));
  }
});