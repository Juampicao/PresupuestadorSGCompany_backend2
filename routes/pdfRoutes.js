import express from "express";
import { createPdf } from "../controllers/pdfController.js";

const router = express.Router();

router.route("/create").post(createPdf);
// router.route("/fetch").get(fetchPdf);

export default router;
