module.exports = ({ name, price1, price2, receiptId }) => {
  const today = new Date();
  const pedido = {
    referencia: "5555",
    notas:
      "Precios indicados NO incluyen IVA.Tipo de cambio:cotizacion dolar(venta) BANCO NACION,según el día que se realice el pago. Plazo de entrega :15/20 dìas con entregas parciales o a convenir desde el replanteo",
    observaciones: "Bachas a proveeer por el cliente",
    empresa: {
      nombre: "Marmoles Service SG",
      correo: "marmolessg@gmail.com",
      contacto: "1531354321",
    },
    cliente: {
      nombre: "Juan Pablo S.A",
      direccion: "Ciudad de la paz 2629",
      correo: "paradacao.juan@gmail.com",
    },
    productos: [
      {
        nombreMaterial: "Travertino",
        descripcion: "M2 Blanco Nube PuraStone. Espesor 2 cm",
        cantidad: 50.5,
        precioUnitario: 100,
        precioTotal: "",
      },
      {
        nombreMaterial: "Cuarzo",
        descripcion: "Unid.Provisión y colocación de elementos de fijacion",
        cantidad: 20,
        precioUnitario: 45,
        precioTotal: "",
      },
    ],
  };

  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
         
           .invoice-box {
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
          <div class="invoice-box">
          
         <main>
           <div>
              <img  src="https://thumbs.dreamstime.com/b/initial-logo-letter-sg-shield-icon-silver-color-isolated-black-background-logotype-design-company-identity-203814637.jpg" style="width:100%; max-width:250px; ">
            </div>

            <div>
               <p> Fecha: ${`${today.getDate()}. ${
                 today.getMonth() + 1
               }. ${today.getFullYear()}.`}</p>
             <p>Cotizacion: ${pedido.referencia}</p>
            </div>
            <div>
              <span>
                   Empresa
               </span>
                   ${pedido.empresa.nombre}
              <span> 
                    Contacto
              </span>
                  ${pedido.empresa.contacto}
               <span>
                   Correo
               </span>
                   ${pedido.empresa.correo}
            </div>
             <div>
                <span>
                  Cliente:
                 </span>
                     ${pedido.cliente.nombre}
                  <span>
                    Direccion:
                   </span> 
                      ${pedido.cliente.direccion}
                  <span>
                    Correo:
                   </span>
                    ${pedido.cliente.correo}
                   </div>

         </main>

            <div class="divTabla">
            
            <table class="tabla">
             <thead>
                <tr class="titulos">
                   <td colspan="1">Materiales</td>
                   <td colspan="2" >Descripcion</td>
                   <td colspan="1">Cantidad</td>
                   <td colspan="1">Precio.U</td>
                   <td colspan="1">Precio Total</td>
                </tr>
             </thead>
             <tbody>
                     ${pedido.productos.map(
                       (producto) =>
                         `
                <tr>
                       <td colspan="1" >  ${producto.nombreMaterial}</td>
                       <td colspan="2" > ${producto.descripcion}.</td>

                       <td colspan="1" class="center"> ${producto.cantidad}</td>
                       <td colspan="1" class="center"> $${
                         producto.precioUnitario
                       } </td>

                       <td colspan="1" class="center"> $${
                         producto.cantidad * producto.precioUnitario
                       }</td>
                </tr>
                       `
                     )}
            
             </tbody>
            </table>
            </div>
             <br />
             <section class="info">
             <h4> Oberservaciones</h4>
             <p> ${pedido.observaciones}</p>
             <h4> Notas</h4>
             <p> ${pedido.notas}</p>
             </section>
             <br />
             <h1 class="center">Precio Total: ${
               // customers[0].productos.precio + customers[1].productos.precio
               // pedido.productos.map(
               //   (producto) => `${producto[0].precio} + ${producto[1].precio}`
               // )
               `$10000`
             } 
             </h1>
          </div>
       </body>
    </html>
    `;
};
