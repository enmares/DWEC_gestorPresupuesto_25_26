'use strict';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML() = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    
    let elemento = document.getElementById(idElemento);

    document.createElement('div').className() = 'gasto-descripcion';
    document.createElement('div').className() = 'gasto-fecha';
    document.createElement('div').className() = 'gasto-valor';
    document.createElement('div').className() = 'gasto-etiquetas';

}

mostrarGastosAgrupadosWeb()

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}