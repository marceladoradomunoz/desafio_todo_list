const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const listaDeTareas = document.querySelector("#listaTareas");
const cuentaTareas = document.querySelector("#cuentaTareas");
const tareasRealizadas = document.querySelector("#tareasRealizadas");

let tareas = [];
let indiceArreglo = 0;
let cuentaRealizadas = 0;

function agregarTarea() {
    const tarea = tareaInput.value.trim();
    if (tarea !== "") {
        tareas.push({
            id: indiceArreglo++,
            tarea: tarea,
            realizada: false
        });
        tareaInput.value = "";
        renderizarTareas();
    } else {
        alert("Debe ingresar nombre de tarea distinto de vacío");
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderizarTareas();
}

function toggleRealizada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    tarea.realizada = !tarea.realizada;
    actualizarTotalesTareas();
}

function actualizarTotalesTareas() {
    cuentaTareas.textContent = `Total: ${tareas.length}`;
    cuentaRealizadas = tareas.filter(tarea => tarea.realizada).length;
    tareasRealizadas.textContent = `Realizadas: ${cuentaRealizadas}`;
}

function renderizarTareas() {
    listaDeTareas.innerHTML = "";
    tareas.forEach(tarea => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.tarea}</td>
            <td><input type="checkbox" id="check${tarea.id}" ${tarea.realizada ? 'checked' : ''} onclick="toggleRealizada(${tarea.id})"></td>
            <td><button class="btn_transparente eliminar_rojo" onclick="eliminarTarea(${tarea.id})">X</button></td>
        `;
        listaDeTareas.appendChild(row);
    });
    actualizarTotalesTareas();
}

function cargaInicialTareas() {
    tareas = [
        { id: 16, tarea: 'Hacer mercado', realizada: true },
        { id: 60, tarea: 'Estudiar para la prueba', realizada: false },
        { id: 24, tarea: 'Sacar a pasear a Tobby', realizada: false }
    ];
    indiceArreglo = 61; // Ajustar el índice según la carga inicial
    renderizarTareas();
}

btnAgregar.addEventListener("click", agregarTarea);

cargaInicialTareas();
