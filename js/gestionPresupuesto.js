// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idgastos = 0;

function actualizarPresupuesto(value) {

    if(value > 0){
        presupuesto = value;
        return presupuesto;
    }
    else{
        console.log("Error");
    }
    return -1;
}

function mostrarPresupuesto() {
    console.log("Tu presupuesto actual es de " + presupuesto + "€");
}

function CrearGasto(numero, cadena) {
    
    let gasto = {
    valor : numero,
    descripcion : cadena,
    mostrarGasto : function(){
        console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + "€");
    },

    actualizarDescripcion : function(value){
        this.descripcion = value;
        console.log(this.descripcion);
    },

    actualizarValor : function(value){
        if(value > 0 && Number(value) === value){
            this.valor = value;
            console.log("Tu valor es " + this.valor);
        }
    },

    mostrarGastoCompleto : function(){
        console.log("Gasto correspondiente a " + this.descripcion + "con valor " + this.valor + "€");
    }
}
    return gasto;
}

actualizarPresupuesto(4);
mostrarPresupuesto();
let toni = CrearGasto(90 ,"Toni");
toni.mostrarGasto();
toni.actualizarDescripcion("Enrique");
toni.actualizarValor("gfasd");

function listarGastos(){
    return gastos;
};
/*function anyadirGasto(gasto){
    let gasto = new CrearGasto( 0, "Gasto1")
    idgastos += 1;
    gastos.Add();
};*/
function anyadirGasto(){};
function borrarGasto(idGasto){
    for(let i=0; i < gastos.lenght; i++){
        if(gastos[i]===idGasto){
            gastos.RemoveAt(i);
        }
    }
};
function calcularTotalGastos(){

    let aux=0;
    let sum=0;

    for(let i=0; i<gastos.length; i++){
        aux = gastos[i];
        sum += aux;
    }
    return sum;
};

function calcularBalance(){
    let gastosTotales = calcularTotalGastos();
    return presupuesto - gastosTotales;
};


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
