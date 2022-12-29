import express from "express";
import { Empresas } from "../controllers/empresas/EmpresaClass.js";

const router = express.Router();

router.route("/").get(Empresas.getAll).post(Empresas.create);

router
  .route("/:id")
  .get(Empresas.getById)
  .put(Empresas.edit)
  .delete(Empresas.delete);

export default router;
