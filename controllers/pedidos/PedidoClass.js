import CustomLogger from "../../helper/CustomLogger.js";
import {
  createPedido,
  deletePedido,
  getAllPedidos,
  getPedidoById,
} from "./pedidoController.js";

const customLogger = new CustomLogger();

export class Pedidos {
  static getAll(req, res) {
    customLogger.logDebug("[Pedidos.getAll]");
    getAllPedidos(req, res);
  }

  static getById(req, res) {
    customLogger.logDebug("[Pedidos.getById]");
    getPedidoById(req, res);
  }

  static delete(req, res) {
    customLogger.logDebug("[Pedidos.delete]");
    deletePedido(req, res);
  }

  static edit(req, res) {
    customLogger.logDebug("[Pedidos.edit]");
    editPedido(req, res);
  }

  static create(req, res) {
    customLogger.logDebug("[Pedidos.create]");
    createPedido(req, res);
  }
}

//   static getAll(req, res) {
//     console.log("desde pedidooo");
//     Pedido.find().exec((err, doc) => {
//       res.status(200).json(doc);
//     });
//   }
