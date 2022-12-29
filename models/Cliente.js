import mongoose from "mongoose";
const ClienteSchema = mongoose.Schema(
  {
    nombreCliente: {
      type: String,
      required: true,
    },
    contactoCliente: {
      type: Number,
      required: false,
    },
    direccionCliente: {
      type: String,
      required: false,
    },
    correoElectronico: {
      type: String,
      required: false,
    },
    fechaUltimaModificacion: {
      type: Date,
      required: true,
    },
    pedidos: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pedido",
        },
      },
    ],
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Cliente;
if (mongoose.models.Cliente) {
  Cliente = mongoose.model("Cliente");
} else {
  Cliente = mongoose.model("Cliente", ClienteSchema);
}

export default Cliente;
