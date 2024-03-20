// Función para obtener el nombre del usuario
function obtenerNombreUsuario() {
    let nombre = prompt("¡Bienvenido al Gestor de Gastos!\nPor favor, ingresa tu nombre:");
    if (nombre === null || nombre.trim() === "") {
        return "Invitado";
    } else {
        return nombre.trim();
    }
}

// Función para mostrar el menú de opciones
function mostrarMenu() {
    let menu = "Menú de opciones:\n";
    menu += "1. Agregar gasto\n";
    menu += "2. Ver lista de gastos\n";
    menu += "3. Filtrar por descripción\n";
    menu += "4. Buscar por palabra clave\n";
    menu += "5. Salir";
    return menu;
}

// Array para almacenar los gastos
let gastos = [];

// Función para agregar un gasto
function agregarGasto() {
    let descripcion = prompt("Ingrese la descripción del gasto:");
    let valor = parseFloat(prompt("Ingrese el valor del gasto:"));

    if (!isNaN(valor)) {
        gastos.push({ descripcion, valor });
        alert("Gasto agregado exitosamente.");
    } else {
        alert("El valor del gasto debe ser un número válido.");
    }
}

// Función para ver la lista de gastos
function verListaGastos() {
    let lista = "Lista de gastos:\n";
    let total = 0;
    for (let gasto of gastos) {
        lista += `- Descripción: ${gasto.descripcion}, Valor: ${gasto.valor.toFixed(2)}\n`;
        total += gasto.valor;
    }
    lista += `Total de gastos: ${total.toFixed(2)}`;
    alert(lista);
}

// Función para filtrar gastos por descripción
function filtrarPorDescripcion() {
    let filtro = prompt("Ingrese la descripción para filtrar los gastos:");
    let gastosFiltrados = gastos.filter(gasto => gasto.descripcion.toLowerCase().includes(filtro.toLowerCase()));

    if (gastosFiltrados.length === 0) {
        alert("No se encontraron gastos que coincidan con la descripción proporcionada.");
    } else {
        let listaFiltrada = "Gastos que coinciden con la descripción '" + filtro + "':\n";
        for (let gasto of gastosFiltrados) {
            listaFiltrada += `- Descripción: ${gasto.descripcion}, Valor: ${gasto.valor.toFixed(2)}\n`;
        }
        alert(listaFiltrada);
    }
}

// Función para buscar gastos por palabra clave
function buscarPorPalabraClave() {
    let keyword = prompt("Ingrese una palabra clave para buscar en la descripción de los gastos:");
    let resultados = gastos.filter(gasto => gasto.descripcion.toLowerCase().includes(keyword.toLowerCase()));

    if (resultados.length === 0) {
        alert("No se encontraron gastos que contengan la palabra clave '" + keyword + "'.");
    } else {
        let listaResultados = "Gastos que contienen la palabra clave '" + keyword + "':\n";
        for (let gasto of resultados) {
            listaResultados += `- Descripción: ${gasto.descripcion}, Valor: ${gasto.valor.toFixed(2)}\n`;
        }
        alert(listaResultados);
    }
}

// Función principal para iniciar el gestor de gastos
function iniciarGestorGastos() {
    let nombreUsuario = obtenerNombreUsuario();
    alert("¡Bienvenido, " + nombreUsuario + "!" + " A continuacion aparecera el menu para navegar en el gestor de gastos");

    while (true) {
        let opcion = prompt(mostrarMenu());
        switch (opcion) {
            case "1":
                agregarGasto();
                break;
            case "2":
                verListaGastos();
                break;
            case "3":
                filtrarPorDescripcion();
                break;
            case "4":
                buscarPorPalabraClave();
                break;
            case "5":
                alert("Gracias por utilizar el Gestor de Gastos.");
                return;
            default:
                alert("Opción no válida. Por favor, seleccione una opción del menú.");
        }
    }
}

iniciarGestorGastos();
