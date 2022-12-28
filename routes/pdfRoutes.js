import express from "express";
import { createPdf } from "../controllers/pdfController.js";

const router = express.Router();

router.route("/").post(createPdf);

export default router;
