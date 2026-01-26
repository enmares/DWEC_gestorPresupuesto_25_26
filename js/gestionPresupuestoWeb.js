'use strict';

import * as gesPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, objetoGasto){

    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";
    
    for(let i=0; i < objetoGasto.length; i++){

        let divGasto = document.createElement('div');
        divGasto.className = 'gasto';

        let gastoDesc = document.createElement('div');
        gastoDesc.className = 'gasto-descripcion';
        gastoDesc.textContent = objetoGasto[i].descripcion;

        let gastoFecha = document.createElement('div');
        gastoFecha.className = 'gasto-fecha';

        let fechaFormateada = new Date(objetoGasto[i].fecha);
        gastoFecha.textContent = fechaFormateada.toLocaleDateString();

        let gastoValor = document.createElement('div');
        gastoValor.className = 'gasto-valor';
        gastoValor.textContent = objetoGasto[i].valor;

        let gastoEtiquetas = document.createElement('div');
        gastoEtiquetas.className = 'gasto-etiquetas';
    
        divGasto.appendChild(gastoDesc);
        divGasto.appendChild(gastoFecha);
        divGasto.appendChild(gastoValor);

        if (objetoGasto[i].etiquetas){

            for(let o=0; o<objetoGasto[i].etiquetas.length; o++){

                let spanFecha = document.createElement('span');
                spanFecha.className = 'gasto-etiquetas-etiqueta';
                gastoEtiquetas.appendChild(spanFecha).innerHTML = objetoGasto[i].etiquetas[o];
                divGasto.appendChild(gastoEtiquetas);

                /* BORRAR ETIQUETA */
                
                let objetoBorradoEtiqueta = new BorrarEtiquetasHandle();
                objetoBorradoEtiqueta.gasto = objetoGasto[i];
                objetoBorradoEtiqueta.etiqueta = objetoGasto[i].etiquetas[o];

                spanFecha.addEventListener("click", objetoBorradoEtiqueta);
            
            }
            
        }

        //ESTO FORMA PARTE DEL EJERCICIO 5 -------------------------

        /* BOTÓN EDITAR */

        let botonEditar = document.createElement('button');
        botonEditar.type = "button";
        botonEditar.className = "gasto-editar";
        botonEditar.innerHTML = 'Editar gasto';
        divGasto.appendChild(botonEditar);

        let objetoManejador = new EditarHandle();
        objetoManejador.gasto = objetoGasto[i]; 

        botonEditar.addEventListener("click", objetoManejador);

        /* BOTÓN BORRAR */

        let botonBorrar = document.createElement('button');

        botonBorrar.className = "gasto-borrar";
        botonBorrar.innerHTML = "Borrar gasto";
        divGasto.appendChild(botonBorrar);

        let objetoBorrador = new BorrarHandle();
        objetoBorrador.gasto = objetoGasto[i];

        botonBorrar.addEventListener("click", objetoBorrador);

        /* BOTÓN EDITAR */
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let botonEditarFormulario = document.createElement('button');
        botonEditarFormulario.type = "button";
        botonEditarFormulario.className = "gasto-editar-formulario";
        botonEditarFormulario.innerHTML = "Editar (formulario)";
        divGasto.appendChild(botonEditarFormulario);

        let objetoEditorForm = new EditarHandleFormulario();
        objetoEditorForm.gasto = objetoGasto[i];
        objetoEditorForm.form = formulario;

        botonEditarFormulario.addEventListener("click", objetoEditorForm);
        botonEditarFormulario.addEventListener("click", function (){
            botonEditarFormulario.disabled = true;
            divGasto.append(formulario);
        })

            /* BOTÓN BORRAR API*/

            let botonBorrarApi = formulario.querySelector('.gasto-borrar-api');

            let objetoBorradorApi = new BorrarHandleAPI(); /*Ojo con esto */
            objetoBorradorApi.gasto = objetoGasto[i];
    
            botonBorrarApi.addEventListener("click", objetoBorradorApi);

            /*BOTON EDITAR GASTO (API) */

            let botonEditarFormApi = formulario.querySelector('.gasto-editar-formulario'); //aquí tengo un queryselector, pero lo engancha del formulario

            let objetoEditorApi = new EditarHandleApi();
            objetoEditorApi.gasto = objetoGasto[i];
            objetoEditorApi.form = formulario;

            botonEditarFormApi.addEventListener("click", objetoEditorApi)
            botonEditarFormApi.addEventListener("click", function (){
                botonEditarFormApi.disabled = true;
                divGasto.append(formulario);
            })


        /* BOTÓN CANCELAR EDICIÓN */
        let btnCancelarEdicion = formulario.querySelector("button.cancelar");
        let objetoCancelarEdicion = new CancelarEditarHandleFormulario();
        objetoCancelarEdicion.form = formulario;

        btnCancelarEdicion.addEventListener("click", objetoCancelarEdicion);

        //ESTO FORMA PARTE DEL EJERCICIO 5 -------------------------

        elemento.appendChild(divGasto);
        
    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
    let elemento = document.getElementById(idElemento);

    let agrupBox = document.createElement('div');
    agrupBox.className = 'agrupacion';

    let h1gasto = document.createElement('h1');
    if(periodo == 'anyo'){
        h1gasto.innerHTML = 'Gastos agrupados por año';
    }
    else{
        h1gasto.innerHTML = `Gastos agrupados por ${periodo}`;
    }

    agrupBox.appendChild(h1gasto);

    for(let i=0; i<Object.keys(agrup).length; i++){
        
        let agrupDato = document.createElement('div');
        agrupDato.className = 'agrupacion-dato';

        let agrupDatoClave = document.createElement('span');
        agrupDatoClave.className = 'agrupacion-dato-clave';
        agrupDatoClave.innerHTML = Object.keys(agrup)[i];

        let agrupDatoValor = document.createElement('span');
        agrupDatoValor.className = 'agrupacion-dato-valor';
        agrupDatoValor.innerHTML = Object.values(agrup)[i];


        agrupDato.appendChild(agrupDatoClave);
        agrupDato.appendChild(agrupDatoValor);

        agrupBox.appendChild(agrupDato);
    }

    elemento.appendChild(agrupBox);

}

function repintar(){
    
    mostrarDatoEnId('presupuesto', gesPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gesPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gesPresupuesto.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML = '';
    mostrarGastoWeb('listado-gastos-completo', gesPresupuesto.listarGastos());
}

function actualizarPresupuestoWeb(){
    let stringPresupuesto = prompt('Introduce un presupuesto', 0);
    let presupuesto = parseInt(stringPresupuesto);
    gesPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb(){
    let stringDescripcion = prompt('Introduce una descripción');
    let stringValor = prompt('Introduce el valor');
    let stringFecha = prompt('Introduce la fecha del gasto');
    let stringEtiquetas = prompt('Introduce las etiquetas separadas por comas. Ej: et1,et2,et3');

    let valor = parseFloat(stringValor);
    let etiquetas = stringToArray(stringEtiquetas);

    let gastoNuevo = new gesPresupuesto.CrearGasto(stringDescripcion, valor, stringFecha, etiquetas);
    gesPresupuesto.anyadirGasto(gastoNuevo);
    repintar();
}

function stringToArray(string){
    
    let aux = '';
    let array = [];

    for(let i=0; i<string.length; i++){

        if(string[i] == ','){
            array.push(aux);
            aux = '';
        }
        else{
            aux += string[i];
        }

        if(i == string.length-1){
            array.push(aux);
        }
    }
    return array;
}

function BorrarHandleAPI(){
    
    this.handleEvent = async function () {
        let usuario = 'enriquemartinez';
        let gastoId = this.gasto.gastoId;

        try {
            const response = await fetch(
                `https://gestion-presupuesto-api.onrender.com/api/${usuario}/${gastoId}`,
                {
                    method: 'DELETE'
                }
            );

            if (!response.ok) {
                throw new Error('Error al eliminar el gasto');
            }

            console.log('Gasto eliminado correctamente');
            gesPresupuesto.borrarGasto(this.gasto.id);
            cargarGastosApi();
            repintar();

        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar el gasto');
        }
    };
} 


function EditarHandle(){

    this.handleEvent = function(e){
        this.gasto.descripcion = prompt('Introduce la nueva descripción', this.gasto.descripcion);
        
        let valorString = prompt('Introduce el nuevo valor', this.gasto.valor)
        this.gasto.valor = parseFloat(valorString);

        let fechaFormateada = new Date(this.gasto.fecha);
        this.gasto.fecha = prompt('Introduce la fecha actualizada', fechaFormateada.toLocaleDateString());

        let stringEtiquetas = prompt('Introduce las nuevas etiquetas', this.gasto.etiquetas);
        this.gasto.etiquetas = stringToArray(stringEtiquetas);

        repintar();
    }
}

function BorrarHandle(){

    this.handleEvent = function (e){

        gesPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){

    this.handleEvent = function (e){
        
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function CancelarHandle(){

    this.handleEvent = function (e){

        document.getElementById('anyadirgasto-formulario').disabled = false;
        this.formulario.remove();
        repintar();
    }
}

function EditarHandleFormulario(){

    this.handleEvent = function (e){

        this.form.elements["descripcion"].value = this.gasto.descripcion;
        this.form.elements["valor"].value = this.gasto.valor;

        let fechaObjeto = new Date(this.gasto.fecha);
        let dia = String(fechaObjeto.getDate()).padStart(2, "0");
        let mes = String(fechaObjeto.getMonth()+1).padStart(2, "0");
        let anyo = fechaObjeto.getFullYear();
        let fechaString = anyo + "-" + mes + "-" + dia;

        this.form.elements["fecha"].value = fechaString;
        this.form.elements["etiquetas"].value = this.gasto.etiquetas;

        this.form.addEventListener("submit", (e)=> {  //si no es con función flecha no pilla el this. de la instancia del objeto gasto

            e.preventDefault();
            
            this.gasto.descripcion = this.form.elements["descripcion"].value;

            let valor = Number(this.form.elements["valor"].value);
            this.gasto.valor = valor;
            
            this.gasto.fecha = this.form.elements["fecha"].value;

            let arrayEtiquetas = stringToArray(this.form.elements["etiquetas"].value);
            this.gasto.etiquetas = arrayEtiquetas;
    
            repintar();
            
        })

    }
}

function CancelarEditarHandleFormulario(){

    this.handleEvent = function (){

        this.form.querySelector("button.cancelar").disabled = false;
        this.form.remove();
        repintar();
    }
}

function EditarHandleApi(){

    this.handleEvent = function(){

        let usuario = document.querySelector("#nombre_usuario").value.trim();
        let gastoId = this.gasto.gastoId;

        //apartado de edición

        this.form.elements["descripcion"].value = this.gasto.descripcion;
        this.form.elements["valor"].value = this.gasto.valor;

        let fechaObjeto = new Date(this.gasto.fecha);
        let dia = String(fechaObjeto.getDate()).padStart(2, "0");
        let mes = String(fechaObjeto.getMonth()+1).padStart(2, "0");
        let anyo = fechaObjeto.getFullYear();
        let fechaString = anyo + "-" + mes + "-" + dia;

        this.form.elements["fecha"].value = fechaString;
        this.form.elements["etiquetas"].value = this.gasto.etiquetas;

        this.form.addEventListener("submit", async (e)=> {  //si no es con función flecha no pilla el this. de la instancia del objeto gasto

            e.preventDefault();
            
            this.gasto.descripcion = this.form.elements["descripcion"].value;

            let valor = Number(this.form.elements["valor"].value);
            this.gasto.valor = valor;
            
            this.gasto.fecha = this.form.elements["fecha"].value;

            let arrayEtiquetas = stringToArray(this.form.elements["etiquetas"].value);
            this.gasto.etiquetas = arrayEtiquetas;

            try {
                const response = await fetch(
                    `https://gestion-presupuesto-api.onrender.com/api/${usuario}/${gastoId}`,
                    {
                        method: 'PUT',
                        headers: {'Content-Type':
                         'application/json'},
                        body: {
                            
                        }
                    }
                );
    
                if (!response.ok) {
                    throw new Error('Error al editar el gasto');
                }
    
                console.log('Gasto editardo correctamente');
                cargarGastosApi();
                repintar();
    
            } catch (error) {
                console.error(error);
                alert('No se pudo editar el gasto');
            }
    
            repintar();
            
        })

       
    }
}

function EnviarGastoAPI(){

    this.handleEvent = async function(){

        let descripcion = this.formulario.elements["descripcion"].value;
        let valorString = this.formulario.elements["valor"].value;
        let fecha = this.formulario.elements["fecha"].value;
        let etiquetasString = this.formulario.elements["etiquetas"].value;
    
        let valor = parseFloat(valorString);
        let etiquetasArray = stringToArray(etiquetasString);
    
        let gastoNuevo = {descripcion, valor, fecha, etiquetas : etiquetasArray};

        // let usuario = 'enriquemartinez';
        let usuario = document.querySelector("#nombre_usuario").value.trim();
        
        let gastoJSON = JSON.stringify(gastoNuevo);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: gastoJSON 
        };

        try{
            let response = await fetch(
                `https://gestion-presupuesto-api.onrender.com/api/${usuario}`, options /*REVISAR TODO ESTOOOOOOOOO */
            );
    
            if (!response.ok) {
                throw new Error("Error al crear el gasto");
            }
    
            let json = await response.json();
            console.log("Creado " + json);
    
            gesPresupuesto.cargarGastos(json);
            cargarGastosApi();
            document.getElementById('anyadirgasto-formulario').disabled = false;
            this.formulario.remove();
            repintar();
        }
        catch(error){
            console.error(error);
            alert(error);
        }
    } }


function nuevoGastoWebFormulario(){

    let botonAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');
    botonAnyadirGastoForm.disabled = true;

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let controlesPrincipales = document.getElementById("controlesprincipales");
    controlesPrincipales.append(plantillaFormulario);

    let btnCancelar = document.querySelector('button.cancelar');
    let btnCancelarForm = new CancelarHandle();
    btnCancelarForm.formulario = formulario;
    btnCancelar.addEventListener("click", btnCancelarForm);

    let botonEnviarFormApi = formulario.querySelector('.gasto-enviar-api');
    let handleEnviarGastoAPI = new EnviarGastoAPI();
    handleEnviarGastoAPI.formulario = formulario;
    botonEnviarFormApi.addEventListener("click", handleEnviarGastoAPI)

    botonAnyadirGastoForm.addEventListener("click",function(event){

        event.preventDefault();

        let descripcion = formulario.elements["descripcion"].value;
        let valorString = formulario.elements["valor"].value;
        let fecha = formulario.elements["fecha"].value;
        let etiquetasString = formulario.elements["etiquetas"].value;
    
        let valor = parseFloat(valorString);
        let etiquetasArray = stringToArray(etiquetasString);
    
        let gastoNuevo = new gesPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetasArray);

        gesPresupuesto.anyadirGasto(gastoNuevo);
    
        repintar();
        botonAnyadirGastoForm.disabled = false;
        event.currentTarget.remove();
        });
}

function filtrarGastoWeb(){

    let formulario = document.getElementById('formulario-filtrado');

    formulario.addEventListener("submit",function(event){

        event.preventDefault();

        let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;

        let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
        let valorMinimoNum;
        if (valorMinimo !== "" && valorMinimo !== null && valorMinimo !== undefined) {
            valorMinimoNum = parseFloat(valorMinimo);
        } else {
            valorMinimoNum = null;
        }
        
        let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;
        let valorMaximoNum;
        if (valorMaximo !== "" && valorMaximo !== null && valorMaximo !== undefined) {
            valorMaximoNum = parseFloat(valorMaximo);
        } else {
            valorMaximoNum = null;
        }

        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;

        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;

        let etiquetasTiene = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
        let etiquetasTieneArray = [];
        if (etiquetasTiene && etiquetasTiene.trim() !== "") {
            etiquetasTieneArray = gesPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
        }

        let objetoGasto = {
            fechaDesde:fechaDesde,
            fechaHasta:fechaHasta,
            valorMinimo:valorMinimoNum,
            valorMaximo:valorMaximoNum,
            descripcionContiene:descripcion,
            etiquetasTiene:etiquetasTieneArray
        }

        let gastosFiltrados = gesPresupuesto.filtrarGastos(objetoGasto);
        mostrarGastoWeb('listado-gastos-completo', gastosFiltrados);

    });

}

function guardarGastosWeb(){

    let gastosAlmacenados = gesPresupuesto.listarGastos();
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(gastosAlmacenados));

}

function cargarGastosWeb(){

    let gastosAlmacenamiento = [];

    if(localStorage.getItem("GestorGastosDWEC") != undefined){
        gastosAlmacenamiento = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        gesPresupuesto.cargarGastos(gastosAlmacenamiento);
    }
    else{
        gesPresupuesto.cargarGastos(gastosAlmacenamiento);
    }
    repintar();

}

async function cargarGastosApi() {

    let usuario = document.querySelector("#nombre_usuario").value.trim();

    if (!usuario) {
        alert("Error, debes introducir un usuario");
        return;
    }

    try {
        let response = await fetch(
            `https://gestion-presupuesto-api.onrender.com/api/${usuario}`
        );

        if (!response.ok) {
            throw new Error("Error al obtener los gastos");
        }

        let json = await response.json();
        // console.log(json);

        gesPresupuesto.cargarGastos(json);
        repintar();

    } catch (error) {
        console.error(error);
    }
}

const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);

const botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

const botonAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoForm.addEventListener("click", nuevoGastoWebFormulario);

let formularioFiltrado = document.getElementById('formulario-filtrado');
const botonFormularioFiltrado = formularioFiltrado.querySelector('button');
botonFormularioFiltrado.addEventListener("click", filtrarGastoWeb);

const botonGuardarGastos = document.getElementById('guardar-gastos');
botonGuardarGastos.addEventListener("click", guardarGastosWeb);

const botonCargarGastos = document.getElementById('cargar-gastos');
botonCargarGastos.addEventListener("click", cargarGastosWeb);

const cargarGastosApibtn = document.getElementById('cargar-gastos-api');
cargarGastosApibtn.addEventListener("click", cargarGastosApi);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    nuevoGastoWeb,
    EditarHandle,
    filtrarGastoWeb
}