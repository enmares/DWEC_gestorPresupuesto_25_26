'use strict';

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

export{
    mostrarDatoEnId,
    mostrarGastoWeb
}