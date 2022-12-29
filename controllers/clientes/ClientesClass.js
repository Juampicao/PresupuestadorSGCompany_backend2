import CustomLogger from "../../helper/CustomLogger.js";
import {
  createCliente,
  deleteCliente,
  editCliente,
  getAllClientes,
  getClienteById,
} from "./clienteController.js";

const customLogger = new CustomLogger();
export class Clientes {
  static getAll(req, res) {
    customLogger.logDebug("[Clientes.getAll]");
    getAllClientes(req, res);
  }

  static getById(req, res) {
    customLogger.logDebug("[Clientes.getById]");
    getClienteById(req, res);
  }

  static delete(req, res) {
    customLogger.logDebug("[Clientes.delete]");
    deleteCliente(req, res);
  }

  static edit(req, res) {
    customLogger.logDebug("[Clientes.edit]");
    editCliente(req, res);
  }

  static create(req, res) {
    customLogger.logDebug("[Clientes.create]");
    createCliente(req, res);
  }
}

//   static getAll(req, res) {
//     console.log("desde pedidooo");
//     Pedido.find().exec((err, doc) => {
//       res.status(200).json(doc);
//     });
//   }
