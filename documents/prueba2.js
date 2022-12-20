module.exports = ({ name, price1, price2, receiptId }) => {
  const today = new Date();
  const pedido = {
    referencia: "5555",
    notas:
      "Precios indicados NO incluyen IVA.Tipo de cambio:cotizacion dolar(venta) BANCO NACION,según el día que se realice el pago. Plazo de entrega :15/20 dìas con entregas parciales o a convenir desde el replanteo",
    observaciones: "Bachas a proveeer por el cliente",
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
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica';
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             text-align: left
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             text-align: center;
             display: flex;
             items-align:center,
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             .prueba {
                text-align:center;
                vertical-align: center;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
}
          </style>
     
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://c8.alamy.com/compes/2ajytgj/letra-inicial-sg-logo-design-plantilla-vectorial-carta-sg-logo-design-2ajytgj.jpg"
                               style="width:100%; max-width:250px;"></td>
                            <td>
                               Fecha: ${`${today.getDate()}. ${
                                 today.getMonth() + 1
                               }. ${today.getFullYear()}.`}
                            </td>
                            <td>
                               Cotizacion: ${pedido.referencia}
                            </td>
                         </tr>
                      </table>
                   </td>
                         
                   <td colspan="2" class="information">
                      <table>
                         <tr>
                            <td>
                            <p>
                             Nombre: ${pedido.cliente.nombre}
                            </p>
                               <p>
                             Cotizacion: ${pedido.cliente.direccion}
                            </p> 
                            <p>
                            Correo: ${pedido.cliente.correo}
                            </p>
                            </td>
                           
                         </tr>
                      </table>
                   </td>
                
                </tr>
          
                <tr class="heading">
                   <td colspan="1">Materiales</td>
                   <td colspan="2" >Descripcion</td>
                   <td colspan="1">Cantidad</td>
                   <td colspan="1">Precio.U</td>
                   <td colspan="1">Precio Total</td>

                </tr>
             
                     ${pedido.productos.map(
                       (producto) =>
                         `
                <tr class="item">
                       <td colspan="1">  ${producto.nombreMaterial}</td>
                       <td colspan="2" > ${producto.descripcion}.</td>

                       <td colspan="1" class="prueba"> ${producto.cantidad}</td>
                       <td colspan="1" class="prueba"> $${
                         producto.precioUnitario
                       } </td>

                       <td colspan="1" > $${
                         producto.cantidad * producto.precioUnitario
                       }</td>
                </tr>
                       `
                     )}
             </table>
             <br />
             <section class="info">
             <h4> Oberservaciones</h4>
             <p> ${pedido.observaciones}</p>
             <h4> Notas</h4>
             <p> ${pedido.notas}</p>
             </section>
             <br />
             <h1 class="justify-center">Precio Total: ${
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
