import express from "express";
import { getAllClientes } from "../controllers/clienteController.js";

const router = express.Router();

router.route("/").get(getAllClientes);

export default router;
