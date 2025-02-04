document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agregarHerramientaForm");
    const herramientasList = document.getElementById("herramientas-list");
  
    // Cargar herramientas almacenadas en localStorage al iniciar
    cargarHerramientas();
  
    form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Obtener datos del formulario
        const modulo = document.getElementById("modulo").value;
        const nombre = document.getElementById("nombre").value;
        const id = document.getElementById("id").value;
        const estado = document.getElementById("estado").value;
        const fotoInput = document.getElementById("foto");
        const fotoFile = fotoInput.files[0];
  
        const reader = new FileReader();
        reader.onload = function (e) {
            const fotoUrl = e.target.result;
  
            // Crear objeto herramienta
            const herramienta = { modulo, nombre, id, foto: fotoUrl, estado};
  
            // Guardar en localStorage
            guardarHerramienta(herramienta);
  
            // Mostrar en la vista
            mostrarHerramienta(herramienta);
  
            // Limpiar formulario
            form.reset();
  
            // Mostrar alerta con SweetAlert
            Swal.fire({
                icon: "success",
                title: "Herramienta Agregada",
                text: `${nombre} ha sido guardado correctamente.`,
                showConfirmButton: false,
                timer: 2000
            });
        };
  
        if (fotoFile) {
            reader.readAsDataURL(fotoFile);
        } else {
            // Usar una imagen predeterminada
            const defaultFotoUrl = "/imagenes/herramientaPredeterminada.jpg"; // Cambia esta ruta a la de tu imagen predeterminada
  
            // Crear objeto herramienta con imagen predeterminada
            const herramienta = { modulo, nombre, id, foto: defaultFotoUrl, estado};
  
            // Guardar en localStorage
            guardarHerramienta(herramienta);
  
            // Mostrar en la vista
            mostrarHerramienta(herramienta);
  
            // Limpiar formulario
            form.reset();
  
            // Mostrar alerta con SweetAlert
            Swal.fire({
                icon: "success",
                title: "Herramienta Agregada",
                text: `${nombre} ha sido guardado correctamente.`,
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
  
    function guardarHerramienta(herramienta) {
        const herramientas = JSON.parse(localStorage.getItem("herramientas")) || [];
        herramientas.push(herramienta);
        localStorage.setItem("herramientas", JSON.stringify(herramientas));
    }
  
    function cargarHerramientas() {
        const herramientas = JSON.parse(localStorage.getItem("herramientas")) || [];
        herramientasList.innerHTML = ""; // Limpiar lista
  
        if (herramientas.length === 0) {
            herramientasList.innerHTML = "<p>No hay herramientas agregadas aún.</p>";
        } else {
            herramientas.forEach(mostrarHerramienta);
        }
    }
  
    function mostrarHerramienta(herramienta) {
        const card = document.createElement("div");
        card.classList.add("herramienta-card");
  
        card.innerHTML = `
            <img src="${herramienta.foto}" alt="${herramienta.nombre}">
            <h3>${herramienta.nombre}</h3>
            <p><strong>Modulo:</strong> ${herramienta.modulo}</p>
            <p><strong>ID:</strong> ${herramienta.id}</p>
            <p><strong>estado:</strong> ${herramienta.estado}</p>
        `;
  
        herramientasList.appendChild(card);
    }
  });