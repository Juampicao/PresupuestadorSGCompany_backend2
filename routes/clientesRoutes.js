import express from "express";
import { Clientes } from "../controllers/clientes/ClientesClass.js";

const router = express.Router();

router.route("/").get(Clientes.getAll).post(Clientes.create);

router
  .route("/:id")
  .get(Clientes.getById)
  .delete(Clientes.delete)
  .put(Clientes.edit);

export default router;
