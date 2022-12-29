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
      type: String,
      required: true,
    },
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

let Pedido;
if (mongoose.models.Pedido) {
  Pedido = mongoose.model("Pedido");
} else {
  Pedido = mongoose.model("Pedido", PedidoSchema);
}

try {
  // Todo. Ref.
  // Remove all the "pedidos"" docs that reference the removed person.
  // PedidoSchema.pre(`remove`, function (next) {
  //   this.model("Cliente").remove({ pedido._id: this._id }, next);
  // });

  // PedidoSchema.post(`remove`, function (next) {
  //   this.model("Cliente").remove({ _id: { $in: doc.pedidos } }, next);
  // });

  console.log(
    "[Pedido.js], removiendo la referencia del cliente sobre el pedido borrado"
  );
} catch (error) {
  console.log(error);
}

export default Pedido;
