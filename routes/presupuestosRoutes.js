import express from "express";
import { Presupuestos } from "../controllers/presupuestos.js/PresupuestoClass.js";

const router = express.Router();

router.route("/").get(Presupuestos.getAll);

router.route("/print").post(Presupuestos.print);
router.route("/create").post(Presupuestos.create);
router.route("/fetch").get(Presupuestos.fetch);

router
  .route("/:id")
  .put(Presupuestos.edit)
  .get(Presupuestos.getById)
  .delete(Presupuestos.delete);

export default router;
