export const templateSgCompany = ({
  cliente,
  productosList,
  empresa,
  variables,
}) => {
  // Cliente
  const {
    nombreCliente,
    contactoCliente,
    direccionCliente,
    descripcionPedido,
    nombrePedido,
  } = cliente;

  // Empresa
  const {
    nombreEmpresa,
    direccionEmpresa,
    contactoEmpresa,
    aclaracionesGenerales,
    observacionesParticulares,
  } = empresa;

  // Variables
  const {
    validezPresupuesto,
    numeroPresupuesto,
    fechaPresupuesto,
    descuentoTotal,
    tipoDescuento,
  } = variables;

  /**
   * @returns Object {subtotal, descuento, precioFinal}
   */
  function returnPrecioFinal() {
    let subTotal = productosList
      .map(
        (producto) =>
          producto.costoUnitario * producto.cantidad * producto.coeficienteVenta
      )
      .reduce((prev, curr) => prev + curr, 0);

    const descuento = subTotal * (descuentoTotal / 100);
    const precioFinal = subTotal - descuento;

    console.log(
      "subTotal:",
      subTotal,
      "descuento",
      descuento,
      "precioFinal",
      precioFinal
    );

    return { subTotal, descuento, precioFinal };
  }

  /**
   *
   * @returns date presupuesto
   */
  function getDate() {
    const today = new Date();
    if (fechaPresupuesto) {
      return fechaPresupuesto;
    } else {
      return `${today.getDate()}. ${
        today.getMonth() + 1
      }. ${today.getFullYear()}.`;
    }
  }

  //* Crear numero al azar si no existe numero en el front.
  function crearNumeroPresupuestoAleatorio(min = 1000, max = 5000) {
    let numeroPresupuestoAzar = Math.floor(
      Math.random() * (max - min + 1) + min
    );
    console.log("el numero presupuesto=", numeroPresupuesto);
    return numeroPresupuestoAzar;
  }

  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
         
           body {
             padding: 30px; 
             margin: auto;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             font-family: 'Helvetica Neue', 'Helvetica';
             color: #555;
            }       
            .tabla {
               min-width: 100%;
               width: 100%;
               align-items: center;
               line-height: inherit;
               padding-right: 5px;
               padding-left: 5px;
               padding-top:15px;
            }

            .tabla td {
               padding:5px;
               border-bottom: 1px solid #eee;
            }

            .center {
               text-align: center;
            }

            .titulos {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
              text-align: center;
            }    
            
            span {
               font-weight: bold;
            }

          </style>
     
       </head>
       <body>
          <div>
          
         <main >
           <div>
              <img  src="https://thumbs.dreamstime.com/b/initial-logo-letter-sg-shield-icon-silver-color-isolated-black-background-logotype-design-company-identity-203814637.jpg" style="width:100%; max-width:250px; ">
            </div>

            <div>
               <p> Fecha: ${getDate()}</p>
             <p><span>Numero Presupuesto:</span> ${
               numeroPresupuesto
                 ? numeroPresupuesto
                 : crearNumeroPresupuestoAleatorio()
             }</p>

            </div>
            <div  style="display:grid; grid-template-columns: repeat(1 minmax(0, 1fr));">
              <span>
                   Empresa
               </span>
                   ${nombreEmpresa}
              <span> 
                    Contacto
              </span>              
                   ${contactoEmpresa}
                <span>
                    Direccion
                </span>
                    ${direccionEmpresa}
            </div>
             <br />
             <div class="bg-red-500">
                <span>
                  Cliente:
                 </span>
                     ${nombreCliente}
                  <span>
                    Direccion:
                   </span> 
                      ${direccionCliente}
                  <span>
                    Correo:
                   </span>
                    ${contactoCliente}
                   </div>

         </main>
             <div>
              <span>Descripcion del pedido:</span> ${descripcionPedido}
             </div>
            <div class="divTabla">
            
            <table class="tabla">
             <thead>
                <tr class="titulos">
                   <td colspan="2">Materiales</td>
                   <td colspan="1">Cantidad</td>
                   <td colspan="1">Precio.U</td>
                   <td colspan="1">Precio Total</td>
                </tr>
             </thead>
             <tbody>
             ${
               productosList
                 ? productosList.map(
                     (producto) =>
                       `
                         <tr>
                           <td colspan="2"> ${producto.nombreMaterial}</td>
                           <td colspan="1" class="center">
                             ${Number(producto.cantidad)}
                           </td>
                           <td colspan="1" class="center">
                             ${
                               producto.monedaCotizar === "dolar"
                                 ? "U$D"
                                 : "AR$"
                             }
                              ${Number(
                                producto.costoUnitario *
                                  producto.coeficienteVenta
                              )}
                           </td>
                           <td colspan="1" class="center">
                          ${
                            producto.monedaCotizar === "dolar" ? "U$D" : "AR$"
                          }     
                           ${Number(
                             producto.cantidad *
                               producto.costoUnitario *
                               producto.coeficienteVenta
                           )}
                           </td>
                         </tr>
                   `
                   )
                 : ""
             }
             </tbody>
            </table>
            </div>
             <br />
             <section class="info">
             <h4> Validez</h4>
             ${` Presupuesto Valido por ${validezPresupuesto} dias.`}
             <h4> Observaciones</h4>
             <p> ${observacionesParticulares}</p>
             <h4> Notas</h4>
             <p> ${aclaracionesGenerales}</p>
             <p> ${
               tipoDescuento
                 ? `<p> <span> Motivo descuento: </span> ${tipoDescuento} </p>`
                 : ""
             }</p>

             </section>
             <br />
             <h1 class="center">Sub-Total: U$D
            ${productosList ? returnPrecioFinal().subTotal : ""}
             </h1>
             <h1 class="center"> Descuento: U$D ${
               returnPrecioFinal().descuento
             }</h1>
             <h1 class="center"> Precio Total: 
               U$D ${returnPrecioFinal().precioFinal}
             </h1>

          </div>
       </body>
    </html>
    `;
};

export default templateSgCompany;
