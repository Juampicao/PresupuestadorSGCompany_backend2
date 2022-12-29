import CustomLogger from "../../helper/CustomLogger.js";
import Empresa from "../../models/Empresa.js";

const customLogger = new CustomLogger();

const getAllEmpresas = async (req, res) => {
  const {} = req.body;
  customLogger.logDebug(`[getAllEmpresasFN]`, req.body);

  const empresas = await Empresa.find();

  try {
    res.send({
      data: empresas,
      status: 200,
    });
    customLogger.logDebug(
      `[getAllEmpresasFN] cantidad: ${empresas.length}, empresas:${empresas} `
    );
  } catch (error) {
    customLogger.logError(error);
    return res.status(404).json({ msg: error });
  }
};

//?  - - - - - - - - Create Empresa - - - - - - - - - - - -
const createEmpresa = async (req, res) => {
  const {
    nombreEmpresa,
    direccionEmpresa,
    contactoEmpresa,
    observacionesParticulares,
    aclaracionesGenerales,
  } = req.body;

  const empresa = await new Empresa(req.body);

  customLogger.logDebug(
    "empresa es:" + empresa.nombreEmpresa + "id:" + empresa._id
  );

  // Crear empresa
  empresa.creador = req.body.creador; // Todo cambiar de postman.
  empresa.nombreEmpresa = nombreEmpresa;
  empresa.direccionEmpresa = direccionEmpresa;
  empresa.contactoEmpresa = contactoEmpresa;
  empresa.observacionesParticulares = observacionesParticulares;
  empresa.aclaracionesGenerales = aclaracionesGenerales;

  try {
    // Guardar empresa
    const empresaNueva = await empresa.save();

    // Enviar respuesta a frontend
    res.json({
      msg: "Empresa creada correctamente",
      status: 200,
      data: empresa,
    });
    customLogger.logDebug(`Nueva empresa:${empresaNueva}}`);
  } catch (error) {
    customLogger.logError("[createEmpresa]", error);
    return res.status(404).json({ msg: error });
  }
};

//?  - - - - - - - - Get Empresa By id - - - - - - - - - - - -

const getEmpresaById = async (req, res) => {
  // Todo, validar que sea el usuario creador.

  const { usuario } = req;
  const { id } = req.params;

  const empresa = await Empresa.findById(id);

  try {
    res.send({ data: empresa, stats: 200 });
    customLogger.logDebug("[getEmpresaById]", empresa);
  } catch (error) {
    customLogger.logError("[getEmpresaById]", error);
    return res.status(404).json({ msg: error });
  }
};

//?  - - - - - - - - Edit Empresa  - - - - - - - - - - - -

const editEmpresa = async (req, res) => {
  res.json({ msg: "Función no creada por el momento" });
};

//?  - - - - - - - - Delete Empresa - - - - - - - - - - - -

const deleteEmpresa = async (req, res) => {
  const { id } = req.params;

  //1° Eliminar la  empresa
  const empresaAEliminar = await Empresa.findByIdAndDelete(id);
  if (!empresaAEliminar) {
    throw Error("No existe la empresa", error);
  }

  customLogger.logDebug(`empresaAEliminar: ${empresaAEliminar}`);

  try {
    customLogger.logDebug(`[deleteEmpresa], empresa: ${empresaAEliminar}`);
    res.json({
      msg: "Eliminado correctamente",
      status: 200,
      data: empresaAEliminar,
    });
  } catch (error) {
    customLogger.logError("[deleteEmpresa]", error);
    res.json(error);
  }
};

export {
  getAllEmpresas,
  getEmpresaById,
  createEmpresa,
  editEmpresa,
  deleteEmpresa,
};
