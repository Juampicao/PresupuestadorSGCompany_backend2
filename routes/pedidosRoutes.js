import express from "express";
import { Pedidos } from "../controllers/pedidos/PedidoClass.js";

const router = express.Router();

router.route("/").post(Pedidos.create).get(Pedidos.getAll);

router
  .route("/:id")
  .get(Pedidos.getById)
  .delete(Pedidos.delete)
  .put(Pedidos.edit);

export default router;
