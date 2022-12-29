import CustomLogger from "../../helper/CustomLogger.js";
import { autenticar, registrar } from "./usuarioController.js";

const customLogger = new CustomLogger();

export class Usuarios {
  static autenticar(req, res) {
    customLogger.logDebug("[Usuarios.autenticar]");
    autenticar(req, res);
  }

  static registrar(req, res) {
    customLogger.logDebug("[Usuarios.registrar]");
    registrar(req, res);
  }
}

//   static getAll(req, res) {
//     console.log("desde pedidooo");
//     Pedido.find().exec((err, doc) => {
//       res.status(200).json(doc);
//     });
//   }
