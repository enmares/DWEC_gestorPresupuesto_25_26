
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

function CrearGasto(descripcion, valor, fecha, ...tags) {

    this.descripcion = descripcion;

    if(Date.parse(fecha) == NaN || fecha == undefined)
    {
        this.fecha = new Date();
    }
    else{
        this.fecha = Date.parse(fecha);
    }

    if(tags == undefined || tags.length == 0)
    {
        this.etiquetas = [];
    }
    else{
        this.etiquetas = tags;
    }

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

        for(let i = arrayEtiquetas.length-1; i>=0; i--)
        {
            if(this.etiquetas.includes(arrayEtiquetas[i]))
            {
                let index = this.etiquetas.indexOf(arrayEtiquetas[i])
                this.etiquetas.splice(index,1);
            }
        }
    }
    
    this.mostrarGastoCompleto = function() {

        let fecha = new Date(this.fecha);
        let res = "";

        for(let i=0; i<this.etiquetas.length; i++)
        {
            res += `- ${this.etiquetas[i]}\n`
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fecha.toLocaleString()}\nEtiquetas:\n` + res;
    }

    this.actualizarFecha = function(fecha) {
        if(isNaN(Date.parse(fecha)) || fecha == undefined){
            return;
        }
        else{
            this.fecha = Date.parse(fecha);
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        
        let fecha = new Date(this.fecha);
        let dia = fecha.getDate();
        let mes = fecha.getMonth()+ 1;

        if(dia < 10){
            dia = '0'+ dia;
        }
        if(mes <10){
            mes = '0' + mes;
        }

        if(periodo === "dia"){
            return fecha.getFullYear() + '-' + mes + '-' + dia;
        }
        else if(periodo === "anyo"){
            return fecha.getFullYear();
        }
        else if(periodo === "mes"){
            return fecha.getFullYear() + '-' + mes;
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

function filtrarGastos(objeto){

    let arrayGastos = [];
    let resultado = [];

    //Esto hace una copia de gastos[]
    
    for(let i=0; i<gastos.length; i++)
    {
        arrayGastos.push(gastos[i]);
    }

    //Aquí empiezan los filter

    for(let i=0; i < arrayGastos.length; i++){

        resultado = arrayGastos.filter(function(fechaDesde){
            return !isNaN(Date.parse(fechaDesde));
        });

        resultado = arrayGastos.filter(function(fechaHasta){
            return !isNaN(Date.parse(fechaHasta));
        });

        resultado = arrayGastos.filter(function(valorMinimo){
            return arrayGastos[i].valor >= valorMinimo;
        });

        resultado = arrayGastos.filter(function(valorMaximo){
            return arrayGastos[i].valor <= valorMaximo;
        });

        resultado = arrayGastos.filter(function(descripcion){
            return arrayGastos[i].descripcion.toLowerCase().includes(descripcion.toLowerCase());
        });

        resultado = arrayGastos.filter(function(etiquetasTiene){
            return arrayGastos[i].etiquetas.includes(...etiquetasTiene);
        })
    }
    if(resultado.length < 1){
        return gastos;
    }
    return resultado;
}

function agruparGastos(){

}

let date = new Date('2021-12-31');
console.log(date.getMonth());
console.log(date.getFullYear());
console.log(date.getDay());


let tags = ["E1", "E2", "E3"]

let gasto1 = new CrearGasto("Antonio Patata", 4, tags, Date.now());
console.log(gasto1.obtenerPeriodoAgrupacion("mes"))
presupuesto= 124;



gastos.push(gasto1);

console.log(filtrarGastos({descripcionContiene:"patata"}));





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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}


