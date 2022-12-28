import express from "express";
import { getAllEmpresas } from "../controllers/empresasController.js";

const router = express.Router();

router.route("/").get(getAllEmpresas);

export default router;
