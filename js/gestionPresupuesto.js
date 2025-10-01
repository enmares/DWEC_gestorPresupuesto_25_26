
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idgastos = 0;

function actualizarPresupuesto(valor) {

    if(valor > 0){
        presupuesto = valor;
        return presupuesto;
    }

    return -1;
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de "+ presupuesto +" €";
}

function CrearGasto(descripcion, valor, tags) {

    this.etiquetas = tags;
    this.descripcion = descripcion;

    if(valor > 0)
        this.valor = valor;
    else
        this.valor = 0;

    this.mostrarGasto = function(){
        return "Gasto correspondiente a "+ this.descripcion +" con valor "+ this.valor +" €";
    }

    this.actualizarValor = function(value){
        if(value > 0){
            this.valor = value;
        }
    }

    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    }

    this.anyadirEtiquetas = function(...arrayEtiquetas){
        for(let i=0; i < arrayEtiquetas.length; i++)
        {
            if(!this.etiquetas.includes(arrayEtiquetas[i])){
                this.etiquetas.push(arrayEtiquetas[i]);
            }   
        }
    }

    this.borrarEtiquetas = function(...arrayEtiquetas){

        let index = 0; /*CONTINUAR POR AQUÍ!!!!*/

        for(let i=arrayEtiquetas.length -1; i >= 0; i--)
        {

            if(this.etiquetas.includes(arrayEtiquetas[i])){
                this.etiquetas.splice(index,1);
            }
        }
    }
}

function listarGastos(){
    return gastos;
};

function anyadirGasto(objetoGasto){

    objetoGasto.id = idgastos;
    idgastos++;
    gastos.push(objetoGasto);
};

function borrarGasto(idGasto){

    for(let i=gastos.length -1; i >= 0; i--)
    {
        if(gastos[i].id === idGasto)
        {
            gastos.splice(i,1);
        }
    }
    return;
};
function calcularTotalGastos(){

    let aux=0;
    let sum=0;

    for(let i=0; i < gastos.length; i++){
        aux = gastos[i].valor;
        sum += aux;
    }
    return sum;
};

function calcularBalance(){
    let gastosTotales = calcularTotalGastos();
    return presupuesto - gastosTotales;
};

/*
let gasto1 = new CrearGasto("Antonio", 4);
let gasto2 = new CrearGasto("dsads", 5);
console.log(gasto1.valor);
anyadirGasto(gasto1);
anyadirGasto(gasto2);
presupuesto= 124;*/


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}


