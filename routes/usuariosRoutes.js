import express from "express";
import { Usuarios } from "../controllers/usuarios/UsuarioClass.js";
const router = express.Router();

router.post("/", Usuarios.registrar);
router.post(`/login`, Usuarios.autenticar);

export default router;
