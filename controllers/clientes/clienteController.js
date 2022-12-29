import CustomLogger from "../../helper/CustomLogger.js";
import Cliente from "../../models/Cliente.js";

const customLogger = new CustomLogger();

const getAllClientes = async (req, res) => {
  // Todo, where creador sea el mismo.
  const {} = req.body;
  customLogger.logDebug(`[getAllClientesFn]`, req.body);

  const clientes = await Cliente.find();

  try {
    res.send({
      clientes,
    });
    customLogger.logDebug(
      `[getAllClientesFn] cantidad: ${clientes.length}, clientes:${clientes} `
    );
  } catch (error) {
    customLogger.logError(error);
    return res.status(404).json({ msg: error });
  }
};

const getClienteById = async (req, res) => {
  // Todo, where creador sea el mismo.

  const { usuario } = req;
  const { id } = req.params;
  const cliente = await Cliente.findById(id).populate([
    {
      path: "pedidos._id",
      model: "Pedido",
    },
  ]);

  try {
    res.send({ cliente: cliente, msg: "cliente recibido correctamente" });
    customLogger.logDebug("[getClienteById]", cliente);
  } catch (error) {
    customLogger.logError("[getClienteById]", error);
    res.json(error);
  }
};

const createCliente = async (req, res) => {
  customLogger.logDebug("[createCliente]", req.body);

  const {
    nombreCliente,
    contactoCliente,
    direccionCliente,
    correoElectronico,
    fechaUltimaModificacion,
  } = req.body;
  const cliente = await new Cliente(req.body);

  // cliente.creador = req.usuario._id; // Todo crear por token.
  cliente.creador = req.body.creador;
  cliente.nombreCliente = nombreCliente;
  cliente.contactoCliente = contactoCliente;
  cliente.direccionCliente = direccionCliente;
  cliente.correoElectronico = correoElectronico;
  cliente.fechaUltimaModificacion = fechaUltimaModificacion;

  // Pedidos
  cliente.pedidos = [];

  try {
    const nuevoCliente = await cliente.save();
    console.log(nuevoCliente.nombreCliente);
    res.json({ msg: "Cliente creado correctamente!", objeto: nuevoCliente });
  } catch (error) {
    customLogger.logError("[createCliente]", error);
    res.json(error);
  }
};

const deleteCliente = async (req, res) => {};

const editCliente = async (req, res) => {};

export {
  getAllClientes,
  getClienteById,
  createCliente,
  deleteCliente,
  editCliente,
};
