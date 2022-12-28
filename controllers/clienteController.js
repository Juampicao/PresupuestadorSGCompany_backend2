import CustomLogger from "../helper/CustomLogger.js";
import Cliente from "../models/Cliente.js";

const customLogger = new CustomLogger();

const getAllClientes = async (req, res) => {
  const {} = req.body;
  customLogger.logDebug(`[getAllClientesFn]`, req.body);

  const clientes = await Cliente.find();

  try {
    res.send({
      empresas,
    });
    customLogger.logDebug(
      `[getAllClientesFn] cantidad: ${empresas.length}, clientes:${clientes} `
    );
  } catch (error) {
    customLogger.logError(error);
    return res.status(404).json({ msg: error });
  }
};

export { getAllClientes };
