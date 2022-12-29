import CustomLogger from "../../helper/CustomLogger.js";
import Presupuesto from "../../models/Presupuesto.js";

const customLogger = new CustomLogger();

//* Get All
const GetAllPresupuestos = async (req, res) => {
  customLogger.logDebug("[GetAllPresupuestosFn], body:", req.body);

  const presupuestos = await Presupuesto.find();
  try {
    res.json({
      msg: `Cantidad de presupuestos: ${presupuestos.length}`,
      status: 200,
      data: presupuestos,
    });
  } catch (error) {
    customLogger.logDebug("[GetAllPresupuestosFn]", error);
  }
};

//* Get By Id
const GetPresupuestosById = async (req, res) => {
  const { id } = req.params;

  customLogger.logDebug("[GetPresupuestosByIdFn], id:", id);

  let presupuesto;
  try {
    presupuesto = await Presupuesto.findById(id);
  } catch (error) {
    let msg = `No existe el presupuesto con id: ${id}`;
    res.json({ msg: msg, status: 400 });
    throw Error(msg);
  }

  try {
    customLogger.logDebug("[GetPresupuestosByIdFn], presupuesto:", presupuesto);
    res.json({ data: presupuesto, status: 200 });
  } catch (error) {
    const Error = "Error en [GetPresupuestosByIdFn]";
    customLogger.logError("[GetPresupuestosByIdFn]", error);
    res.json({ status: 400, msg: Error });
  }
};

//* Create
const CreatePresupuesto = async (req, res) => {
  const { cliente, productosList, empresa, variables } = req.body;

  customLogger.logDebug("[CreatePresupuestoFn], req.body:", req.body);

  const presupuesto = await new Presupuesto(req.body);

  presupuesto.cliente = cliente;
  presupuesto.productosList = productosList;
  presupuesto.empresa = empresa;
  presupuesto.variables = variables;
  presupuesto.variables.numeroCotizacion = `${variables.numeroPresupuesto}-${cliente.nombrePedido}`;
  try {
    const nuevoPresupuesto = await presupuesto.save();
    const msg = `El presupuesto se guardo correctamente! id:${nuevoPresupuesto._id}`;
    res.json({ msg: msg, data: nuevoPresupuesto, status: 200 });
    customLogger.logDebug("[CreatePresupuestoFn], msg:", msg);
  } catch (error) {
    const err = new Error("Hubo un problema creando el presupuesto ");
    customLogger.logError("[CreatePresupuestoFn], err:", error);
    return res.status(404).json({ msg: err });
  }
};

//* Delete
const DeletePresupuesto = async (req, res) => {
  const { id } = req.params;
  customLogger.logDebug("[DeletePresupuestoFn], id:", id);

  let presupuestoAEliminar;
  try {
    presupuestoAEliminar = await Presupuesto.findByIdAndDelete(id);
  } catch (error) {
    let msg = `No existe el presupuesto con id: ${id}`;
    res.json({ msg: msg, status: 400 });
    throw Error(msg);
  }

  try {
    customLogger.logDebug(
      `[DeletePresupuestoFn], status: 200, presupuesto eliminado: ${presupuestoAEliminar._id}, nombreCliente: ${presupuestoAEliminar.cliente.nombreCliente}`
    );
    res.json({
      status: 200,
      data: presupuestoAEliminar,
      msg: "Eliminado correctamente",
    });
  } catch (error) {
    customLogger.logError("[DeletePresupuestoFn]", error);
  }
};

//* Edit
const EditPresupuesto = async (req, res) => {
  const { id } = req.params;
  customLogger.logDebug("[EditPresupuestoFn], id:", id);

  try {
    customLogger.logDebug("[EditPresupuestoFn], status:200, id:", id);
    res.json({ msg: "Funcion no desarrollada todavia!" });
  } catch (error) {
    customLogger.logError("[EditPresupuestoFn], response", error);
  }
};
export {
  GetAllPresupuestos,
  GetPresupuestosById,
  CreatePresupuesto,
  DeletePresupuesto,
  EditPresupuesto,
};

// fetch("http://localhost:4000/pedidos/2032", {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   // body: JSON.stringify({ id: 78912 }),
// })
//   .then((response) => customLogger.logDebug("response: ", response))
//   .then(() =>
//     customLogger.logDebug("La respuesta de BD llego bien pero no se lee!")
//   );
