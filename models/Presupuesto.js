import mongoose from "mongoose";
const PresupuestoSchema = mongoose.Schema(
  {
    cliente: {
      nombreCliente: "",
      contactoCliente: "",
      direccionCliente: "",
      nombrePedido: "",
      descripcionPedido: "",
    },
    empresa: {
      nombreEmpresa: "",
      direccionEmpresa: "",
      contactoEmpresa: "",
      observacionesParticulares: "",
      aclaracionesGenerales: "",
    },
    variables: {
      numeroPresupuesto: "",
      numeroCotizacion: "",
      fechaPresupuesto: "",
      validezPresupuesto: { type: Number },
      descuentoTotal: { type: Number },
      tipoDescuento: { type: String },
    },
    productosList: [
      {
        cantidad: { type: Number, default: "" },
        costoUnitario: { type: Number, default: "" },
        descripcion: { type: String, default: "" },
        nombreMaterial: { type: String, default: "" },
        coeficienteVenta: { type: Number, default: "" },
        monedaCotizar: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Presupuesto;
if (mongoose.models.Presupuesto) {
  Presupuesto = mongoose.model("Presupuesto");
} else {
  Presupuesto = mongoose.model("Presupuesto", PresupuestoSchema);
}

export default Presupuesto;
