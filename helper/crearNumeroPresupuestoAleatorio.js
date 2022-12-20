/**
 * Crear un numero aleatorio para un presupuesto.
 * @param {*} min
 * @param {*} max
 * @returns
 */
function crearNumeroPresupuestoAleatorio(min = 1000, max = 5000) {
  numeroPresupuesto = Math.floor(Math.random() * (max - min + 1) + min);
  return numeroPresupuesto;
}
