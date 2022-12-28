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
    pedidos: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pedido",
        },
      },
    ],
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
