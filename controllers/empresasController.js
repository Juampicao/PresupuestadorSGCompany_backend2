import CustomLogger from "../helper/CustomLogger.js";
import Empresa from "../models/Empresa.js";

const customLogger = new CustomLogger();

const getAllEmpresas = async (req, res) => {
  const {} = req.body;
  customLogger.logDebug(`[getAllEmpresasFN]`, req.body);

  const empresas = await Empresa.find();

  try {
    res.send({
      empresas,
    });
    customLogger.logDebug(
      `[getAllEmpresasFN] cantidad: ${empresas.length}, empresas:${empresas} `
    );
  } catch (error) {
    customLogger.logError(error);
    return res.status(404).json({ msg: error });
  }
};

export { getAllEmpresas };
