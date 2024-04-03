let restante = 0;

const guardarPresupuesto = () => {
    let presupuesto = parseInt(document.querySelector("#presupuestoInicial").value);
    if (presupuesto < 1 || isNaN(presupuesto)) {
        mostrarError("#msj_error_pregunta", "CANTIDAD NO VALIDA");
        return;
    }

    localStorage.setItem("presupuesto", presupuesto);
    localStorage.setItem("gastos", JSON.stringify([]));
    actualizarVista();
}

const actualizarVista=()=> {
    let presupuesto = localStorage.getItem("presupuesto");
    restante = presupuesto;


    let divPregunta = document.querySelector("#pregunta");
    let divGastos = document.querySelector("#divGastos");
    let divControlGastos = document.querySelector("#divControlGastos");
    divPregunta.style.display = "none"
    divGastos.style.display = "none"

    let controlGastos = `<div class="gastos-realizados">
                                <h2>Listado de Gastos</h2> 
                                <div class="alert alert-primary">              
                                presupuesto: $ ${presupuesto}</div> 
                                <div class="alert alert-succes">
                                restante: $ ${presupuesto} </div>  
                        </div>`;

    if (!presupuesto) {
        divPregunta.style.display = "block";
    } else {
        divPregunta.style.display = "none";
        divGastos.style.display = "block";
        divControlGastos.innerHTML = controlGastos;
        refrescarListado();
    }
}

const agregarGastos=()=> {
    let tipo = document.querySelector("#tipoGastos").value;
    let cantidad = parseInt(document.querySelector("#cantidadGastos").value);

    if (cantidad<1 || isNaN(cantidad) || tipo.trim()=== '') {
        mostrarError("#msj_error_crearGastos", "ERROR EN CAMPOS");
        return;
    }
    if (cantidad > restante) {
        mostrarError("#msj_error_crearGastos", "CANTIDAD MAYOR AL PRESUPUESTO");
        return;
    }
    let nuevoGastos = {
        tipo,
        cantidad
    }

    let gastos = JSON.parse(localStorage.getItem("gastos"));
    gastos.push(nuevoGastos);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    refrescarListado();
    document.querySelector("#formGastos").reset();
}

const refrescarListado=()=> {
    let presupuesto = localStorage.getItem("presupuesto");
    let gastos = JSON.parse(localStorage.getItem("gastos"));

    let totalGastos = 0 ;
    let listadoHtml = ``;
    gastos.map(gastos=>{
            listadoHtml+=`<li class="gastos">
                            <p> ${gastos.tipo}
                            <span class="gastos">$ ${gastos.cantidad}</span>
                            </p>
                            </li>`;

            totalGastos+=parseInt(gastos.cantidad);
    });
console.log ("Total de gastos: "+totalGastos);


restante = presupuesto-totalGastos;
let divControlGastos=document.querySelector("#divControlGastos");
divControlGastos.innerHTML='';

if((presupuesto/4)>restante){
    clase="alert alert-danger";
} else if ((presupuesto/2)>restante){
    clase="alert alert-warning";
}else {
    clase="alert alert-success";
}

divControlGastos.innerHTML=`<div class="gastos-realizados>
                                <h2>Listado de Gastos</h2>
                                ${listadoHtml}
                                <div class="alert alert-primary">              
                                presupuesto: $ ${presupuesto}</div> 
                                <div class="${clase}">
                                restante: $ ${restante} </div>
                                
                                <button
                                onclick="reiniciarPresupuesto()"
                                class="button u-full-width">Reiniciar Presupuesto</button>
                            </div>
`;
}

const reiniciarPresupuesto=()=>{
    localStorage.clear();
    location.reload(true);
}




const mostrarError = (elemento, mensaje) => {
    divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="alert alert-danger error">${mensaje}</p>`;
    setTimeout(() => { divError.innerHTML = ''; }, 2000);
}



