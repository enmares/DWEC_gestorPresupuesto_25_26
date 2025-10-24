'use strict';

import * as funcs from './gestionPresupuestoWeb.js';
import * as funcs2 from './gestionPresupuesto.js';

funcs2.actualizarPresupuesto(1500);
funcs.mostrarDatoEnId('presupuesto', funcs2.mostrarPresupuesto());

let gasto1 = new funcs2.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new funcs2.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new funcs2.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new funcs2.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new funcs2.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new funcs2.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

funcs2.anyadirGasto(gasto1);
funcs2.anyadirGasto(gasto2);
funcs2.anyadirGasto(gasto3);
funcs2.anyadirGasto(gasto4);
funcs2.anyadirGasto(gasto5);
funcs2.anyadirGasto(gasto6);

