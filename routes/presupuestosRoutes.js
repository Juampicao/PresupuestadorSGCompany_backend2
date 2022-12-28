import express from "express";
import {
  CreatePresupuesto,
  GetAllPresupuestos,
} from "../controllers/presupuestosController.js";

const router = express.Router();

router.route("/").get(GetAllPresupuestos).post(CreatePresupuesto);

export default router;
