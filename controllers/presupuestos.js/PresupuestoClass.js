import CustomLogger from "../../helper/CustomLogger.js";
import { createPdf, fetchPdf } from "../pdfController.js";
import {
  CreatePresupuesto,
  DeletePresupuesto,
  EditPresupuesto,
  GetAllPresupuestos,
  GetPresupuestosById,
} from "./presupuestosController.js";

const customLogger = new CustomLogger();

export class Presupuestos {
  /**
   * Just Save Presupuesto.
   * @param {*} req
   * @param {*} res
   */
  static create(req, res) {
    customLogger.logDebug("[Presupuesto.create]");
    CreatePresupuesto(req, res);
  }

  /**
   * Just Print PDF. Not Save.
   * @param {*} req
   * @param {*} res
   */
  static print(req, res) {
    customLogger.logDebug("[Presupuesto.print]");
    createPdf(req, res);
  }

  /**
   * Send Pdf to Client, previously must be created.
   * @param {*} req
   * @param {*} res
   */
  static fetch(req, res) {
    customLogger.logDebug("[fetch.fetch]");
    fetchPdf(req, res);
  }

  static getById(req, res) {
    customLogger.logDebug("[Presupuesto.getById]");
    GetPresupuestosById(req, res);
  }

  static getAll(req, res) {
    customLogger.logDebug("[Presupuesto.getAll]");
    GetAllPresupuestos(req, res);
  }

  static delete(req, res) {
    customLogger.logDebug("[Presupuesto.delete]");
    DeletePresupuesto(req, res);
  }

  static edit(req, res) {
    customLogger.logDebug("[Presupuesto.edit]");
    EditPresupuesto(req, res);
  }
}

//   static getAll(req, res) {
//     console.log("desde pedidooo");
//     Pedido.find().exec((err, doc) => {
//       res.status(200).json(doc);
//     });
//   }
