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

        }


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

/*
function EditarHandle(){
    
    //solo puede tener el método handleEvente en el this la func constructora
    this.handleEvent = function(evento){
        this.gasto;
        
    }
}

let objetoEditar = new EditarHandle();
objetoEditar.gasto = gasto; //este último 'gasto' es un objeto*/

let botonEditar = document.createElement('button');
botonEditar.innerText = 'Editar gasto';
document.getElementById('controlesprincipales').append(botonEditar);
//botonEditar.addEventListener("click",objetoEditar);

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
    //EditarHandle
}