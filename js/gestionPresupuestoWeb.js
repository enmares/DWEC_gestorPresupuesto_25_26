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

const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}