import mongoose from "mongoose";
const PedidoSchema = mongoose.Schema(
  {
    clienteCreador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
    },
    nombrePedido: {
      type: String,
      required: true,
    },
    descripcionPedido: {
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Pedido;
if (mongoose.models.Pedido) {
  Pedido = mongoose.model("Pedido");
} else {
  Pedido = mongoose.model("Pedido", PedidoSchema);
}

export default Pedido;
