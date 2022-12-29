import CustomLogger from "../../helper/CustomLogger.js";
import Cliente from "../../models/Cliente.js";
import Pedido from "../../models/Pedido.js";

const customLogger = new CustomLogger();

//?  - - - - - - - - getAllPedidos- - - - - - - - - -

const getAllPedidos = async (req, res) => {
  const pedidos = await Pedido.find();
  // Todo Agregar el "creador" .where("creador").equals(req.usuario);
  try {
    res.send({
      status: 200,
      data: pedidos,
    });
    customLogger.logDebug(
      `[getAllPedidos] cantidad: ${pedidos.length}, pedidos:${pedidos} `
    );
  } catch (error) {
    customLogger.logError("getAllPedidos", error);
    return res.status(404).json({ msg: error });
  }
};

//?  - - - - - - - - Create Pedido - - - - - - - - - -

const createPedido = async (req, res) => {
  const { clienteCreador, nombrePedido, descripcionPedido } = req.body;

  const pedido = await new Pedido(req.body);
  const cliente = await Cliente.findById(clienteCreador);

  customLogger.logDebug("cliente es:" + cliente.nombre + "id:" + cliente._id);

  // Crear pedido
  pedido.creador = req.body.creador; // Todo cambiar de postman.
  pedido.clienteCreador = clienteCreador;
  pedido.nombrePedido = nombrePedido;
  pedido.descripcionPedido = descripcionPedido;

  try {
    // Guardar Pedido
    const pedidoNuevo = await pedido.save();

    // Ahderir pedido en el cliente.
    cliente.pedidos.push(pedidoNuevo._id);
    await cliente.save();

    // Enviar respuesta a frontend
    res.json({ msg: "pedido creado", data: pedido, status: 200 });
    customLogger.logDebug(
      `Nuevo pedido:${pedidoNuevo}, Cliente Creador:${cliente.nombreCliente}`
    );
  } catch (error) {
    customLogger.logError("[CreatePedido]", error);
    return res.status(404).json({ msg: error });
  }
};

//?  - - - - - - - - getPedidoById - - - - - - - - - -

const getPedidoById = async (req, res) => {
  // Todo, validar que sea el usuario creador.
  const { usuario } = req;
  const { id } = req.params;

  const pedido = await Pedido.findById(id)
    .populate([
      {
        path: "clienteCreador",
        model: "Cliente",
      },
    ])
    .select("_id, nombreCliente"); // Todo solo mostrar id  y nombreCliente.

  try {
    res.send({ data: pedido, status: 200 });
    customLogger.logDebug("[getPedidoById]", pedido);
  } catch (error) {
    customLogger.logError("[getPedidoById]", error);
    return res.status(404).json({ msg: error });
  }
};

// Todo creador usuario
const deletePedido = async (req, res) => {
  const { id } = req.params;

  //1° Eliminar el pedido
  const pedidoAEliminar = await Pedido.findByIdAndDelete(id);
  if (!pedidoAEliminar) {
    throw Error("No existe el pedido", error);
  }

  //2° Buscar cliente para editar.
  const cliente = await Cliente.findById(pedidoAEliminar.clienteCreador);
  if (!cliente) {
    throw Error("No existe el cliente", error);
  }

  customLogger.logDebug(
    `pedidoAEliminar: ${pedidoAEliminar}, cliente: ${cliente.nombreCliente} ${cliente._id}`
  );

  //   2° Eliminar todo lo que aparezca la ref CLIENTE.
  try {
    //TODO no elimina. ¿Que pasa si  no existe la ref?
    // const eliminarRefPedidoFromCliente = await Cliente.updateOne(
    //   // {
    //   //   $and: [{ creador: req.usuario }],
    //   // },
    //   {
    //     $pull: {
    //       pedidos: {
    //         _id: pedidoAEliminar,
    //       },
    //     },
    //   }
    // );
    //? Remove refs from cliente.
    // PedidoSchema.pre("remove", function (next) {
    //   // Remove all the "pedidos"" docs that reference the removed person.
    //   this.model("Cliente").remove({ pedido: this._id }, next);
    // });
  } catch (error) {
    console.log(error);
    throw Error("No se pudo eliminar la referencia del pedido");
  }

  try {
    customLogger.logDebug(
      `[deletePedidoPedido], pedido: ${pedidoAEliminar}, cliente:${cliente.nombreCliente} idCliente: ${cliente._id}`
    );
    res.json({
      data: pedidoAEliminar,
      msg: "Pedido Eliminado Correctamente",
      status: 200,
    });
  } catch (error) {
    customLogger.logError("[deletePedidoPedido]", error);
    res.json(error);
  }
};
const editPedido = async (req, res) => {};
export { getAllPedidos, createPedido, getPedidoById, deletePedido, editPedido };
