document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agregarMecanicoForm");
    const personasList = document.getElementById("personas-list");
  
    // Cargar personas almacenadas en localStorage al iniciar
    cargarPersonas();
  
    form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Obtener datos del formulario
        const rol = document.getElementById("rol").value;
        const nombre = document.getElementById("nombre").value;
        const id = document.getElementById("id").value;
        const fotoInput = document.getElementById("foto");
        const fotoFile = fotoInput.files[0];
  
        const reader = new FileReader();
        reader.onload = function (e) {
            const fotoUrl = e.target.result;
  
            // Crear objeto persona
            const persona = { rol, nombre, id, foto: fotoUrl };
  
            // Guardar en localStorage
            guardarPersona(persona);
  
            // Mostrar en la vista
            mostrarPersona(persona);
  
            // Limpiar formulario
            form.reset();
  
            // Mostrar alerta con SweetAlert
            Swal.fire({
                icon: "success",
                title: "Persona Agregada",
                text: `${nombre} ha sido guardado correctamente.`,
                showConfirmButton: false,
                timer: 2000
            });
        };
  
        if (fotoFile) {
            reader.readAsDataURL(fotoFile);
        } else {
            // Usar una imagen predeterminada
            const defaultFotoUrl = "/imagenes/personaPredeterminada.png"; // Cambia esta ruta a la de tu imagen predeterminada
  
            // Crear objeto persona con imagen predeterminada
            const persona = { rol, nombre, id, foto: defaultFotoUrl };
  
            // Guardar en localStorage
            guardarPersona(persona);
  
            // Mostrar en la vista
            mostrarPersona(persona);
  
            // Limpiar formulario
            form.reset();
  
            // Mostrar alerta con SweetAlert
            Swal.fire({
                icon: "success",
                title: "Persona Agregada",
                text: `${nombre} ha sido guardado correctamente.`,
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
  
    function guardarPersona(persona) {
        const personas = JSON.parse(localStorage.getItem("personas")) || [];
        personas.push(persona);
        localStorage.setItem("personas", JSON.stringify(personas));
    }
  
    function cargarPersonas() {
        const personas = JSON.parse(localStorage.getItem("personas")) || [];
        personasList.innerHTML = ""; // Limpiar lista
  
        if (personas.length === 0) {
            personasList.innerHTML = "<p>No hay personas agregadas aún.</p>";
        } else {
            personas.forEach(mostrarPersona);
        }
    }
  
    function mostrarPersona(persona) {
        const card = document.createElement("div");
        card.classList.add("persona-card");
  
        card.innerHTML = `
            <img src="${persona.foto}" alt="${persona.nombre}">
            <h3>${persona.nombre}</h3>
            <p><strong>Rol:</strong> ${persona.rol}</p>
            <p><strong>ID:</strong> ${persona.id}</p>
        `;
  
        personasList.appendChild(card);
    }
  });