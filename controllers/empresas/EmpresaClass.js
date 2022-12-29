import CustomLogger from "../../helper/CustomLogger.js";
import {
  createEmpresa,
  deleteEmpresa,
  editEmpresa,
  getAllEmpresas,
  getEmpresaById,
} from "./empresasController.js";
const customLogger = new CustomLogger();

export class Empresas {
  static getAll(req, res) {
    customLogger.logDebug("[Empresas.getAll]");
    getAllEmpresas(req, res);
  }

  static getById(req, res) {
    customLogger.logDebug("[Empresas.getById]");
    getEmpresaById(req, res);
  }

  static delete(req, res) {
    customLogger.logDebug("[Empresas.delete]");
    deleteEmpresa(req, res);
  }

  static edit(req, res) {
    customLogger.logDebug("[Empresas.edit]");
    editEmpresa(req, res);
  }

  static create(req, res) {
    customLogger.logDebug("[Empresas.create]");
    createEmpresa(req, res);
  }
}

//   static getAll(req, res) {
//     console.log("desde pedidooo");
//     Pedido.find().exec((err, doc) => {
//       res.status(200).json(doc);
//     });
//   }
