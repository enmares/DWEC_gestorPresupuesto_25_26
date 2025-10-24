'use strict';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    
    let elemento = document.getElementById(idElemento);

    let gastoDesc = document.createElement('div').className() = 'gasto-descripcion';
    let gastoFecha = document.createElement('div').className() = 'gasto-fecha';
    let gastoValor = document.createElement('div').className() = 'gasto-valor';
    let gastoEtiquetas = document.createElement('div').className() = 'gasto-etiquetas';

    gastoDesc.innerHTML = gasto.descripcion;
    gastoFecha.innerHTML = gasto.fecha;
    gastoValor.innerHTML = gasto.valor;

    elemento.appendChild(gastoDesc);
    elemento.appendChild(gastoFecha);
    elemento.appendChild(gastoValor);

    for(let i=0; i<gasto.etiquetas.length; i++){

        let spanFecha = document.createElement('span').className() = 'gasto-etiquetas-etiqueta';
        gastoEtiquetas.appendChild(spanFecha).innerHTML = gasto.etiquetas[i];
    }

    elemento.appendChild(gastoEtiquetas);

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
}