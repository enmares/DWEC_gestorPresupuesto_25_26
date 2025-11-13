'use strict';

import * as gesPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, ...gasto){

    let elemento = document.getElementById(idElemento);
    let objetoGasto = gasto[0];
    
    for(let i=0; i < objetoGasto.length; i++){

        let divGasto = document.createElement('div');
        divGasto.className = 'gasto';

        let gastoDesc = document.createElement('div');
        gastoDesc.className = 'gasto-descripcion';
        gastoDesc.textContent = objetoGasto[i].descripcion;

        let gastoFecha = document.createElement('div');
        gastoFecha.className = 'gasto-fecha';
        gastoFecha.textContent = objetoGasto[i].fecha;

        let gastoValor = document.createElement('div');
        gastoValor.className = 'gasto-valor';
        gastoValor.textContent = objetoGasto[i].valor;

        let gastoEtiquetas = document.createElement('div');
        gastoEtiquetas.className = 'gasto-etiquetas';
    
        divGasto.appendChild(gastoDesc);
        divGasto.appendChild(gastoFecha);
        divGasto.appendChild(gastoValor);

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

function EditarHandle(){

    this.handleEvent = function(e){
        this.gasto.descripcion = prompt('Introduce la nueva descripción', this.gasto.descripcion);
        
        let valorString = prompt('Introduce el nuevo valor', this.gasto.valor)
        this.gasto.valor = parseFloat(valorString);

        this.gasto.fecha = prompt('Introduce la fecha actualizada', this.gasto.fecha);

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

const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);

const botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    nuevoGastoWeb,
    EditarHandle
}