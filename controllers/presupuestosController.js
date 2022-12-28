import CustomLogger from "../helper/CustomLogger.js";

const customLogger = new CustomLogger();

//* Get All
const GetAllPresupuestos = async (req, res) => {
  const { id } = req.params;

  customLogger.logDebug("[GetAllPresupuestosFn], body:", req.body);
  console.log("DESDE BACKEND");

  fetch("http://localhost:4000/pedidos/2032", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ id: 78912 }),
  })
    .then((response) => customLogger.logDebug("response: ", response))
    .then(() =>
      customLogger.logDebug("La respuesta de BD llego bien pero no se lee!")
    );

  try {
    res.json({ msg: "La peticicion al Backend llego correctamente!" });
  } catch (error) {
    customLogger.logDebug("[GetAllPresupuestosFn]", error);
  }
};

//* Get By Id
const GetPresupuestosById = async (req, res) => {
  const {} = req;
  customLogger.logDebug("[GetPresupuestosByIdFn], req.body:", req.body);

  try {
    customLogger.logDebug("[GetAllPresupuestosFn], response:", error);
    res.json({ msg: "La peticicion al Backend llego correctamente!" });
  } catch (error) {
    customLogger.logError("[GetAllPresupuestosFn], response", error);
  }
};

//* Create
const CreatePresupuesto = async (req, res) => {
  const { cliente, productosList, empresa, variables } = req.body;

  customLogger.logDebug("[CreatePresupuestoFn], req.body:", req.body);

  try {
    // const msg = "El nuevo presupuesto se guardo correcto!";
    const msg = "El presupuesto llego pero no se guardo!";
    res.json({ msg: msg });
    customLogger.logDebug("[CreatePresupuestoFn], msg:", msg);
  } catch (error) {
    const err = new Error("Hubo un problema creando el presupuesto ");
    customLogger.logError("[CreatePresupuestoFn], err:", error);
    return res.status(404).json({ msg: err });
  }
};

//* Delete
const DeletePresupuesto = async (req, res) => {
  const {} = req;
  customLogger.logDebug("[DeletePresupuestoFn], req.body:", req.body);

  try {
    customLogger.logDebug("[DeletePresupuestoFn], response:", error);
    res.json({ msg: "La peticicion al Backend llego correctamente!" });
  } catch (error) {
    customLogger.logError("[DeletePresupuestoFn], response", error);
  }
};

//* Edit
const EditPresupuesto = async (req, res) => {
  const {} = req;
  customLogger.logDebug("[EditPresupuestoFn], req.body:", req.body);

  try {
    customLogger.logDebug("[EditPresupuestoFn], response status:", error);
    res.json({ msg: "La peticicion al Backend llego correctamente!" });
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
