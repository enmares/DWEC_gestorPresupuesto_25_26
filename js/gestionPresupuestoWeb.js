'use strict';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, ...gasto){
    
    for(let i=0; i < gasto.length; i++){

        let elemento = document.getElementById(idElemento);

        document.createElement('div').className = 'gasto-descripcion';
        let gastoFecha = document.createElement('div').className = 'gasto-fecha';
        let gastoValor = document.createElement('div').className = 'gasto-valor';
        let gastoEtiquetas = document.createElement('div').className = 'gasto-etiquetas';
    
        document.getElementByClassName('gasto-descripcion').textContent = gasto[i].descripcion;
        document.getElementByClassName('gasto-fecha').textContent = gasto[i].fecha;
        document.getElementByClassName('gasto-valor').textContent = gasto[i].valor;
        
        elemento.appendChild(gastoDesc);
        elemento.appendChild(gastoFecha);
        elemento.appendChild(gastoValor);
    
        for(let i=0; i<gasto[i].etiquetas.length; i++){
    
            let spanFecha = document.createElement('span').className = 'gasto-etiquetas-etiqueta';
            gastoEtiquetas.appendChild(spanFecha).innerHTML = gasto.etiquetas[i];
        }
    
        elemento.appendChild(gastoEtiquetas);
    }

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb
}