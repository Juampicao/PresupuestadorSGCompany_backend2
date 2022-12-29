import CustomLogger from "../../helper/CustomLogger.js";
import generarId from "../../helper/generarId.js";
import generarJWT from "../../helper/generarJWT.js";
import Usuario from "../../models/Usuario.js";

const customLogger = new CustomLogger();

// Objeto Usuario actual
const objetoUsuario = {
  nombre: "Santiago Gomez",
  email: "santiagogomez@gmail.com",
  password: "1234",
  _id: 9876,
};

const registrar = async (req, res) => {
  // Evitar registros Duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error(`Usuario Ya Registrado`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body); // 1 Creo un usuario.
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save(); // 2 Aca alamcena en la base de datos.
    res.json({
      msg: "Usuario Creado Correctamente, Revisa tu email para crear tu cuenta.",
    });
    customLogger.logDebug(["Registrar Usuario, usuario:", usuario]);
  } catch (error) {
    console.log(error);
  }
  // res.json({ msg: "Creando Usuario.." });
};
// AUTENTICANDO
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario EXISTE
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario CONFIMADO
  if (!usuario.confirmado) {
    const error = new Error("El usuario no ha sido confirmado");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar PASSWORD
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
    console.log(
      ` Entrando desde...  : ${usuario.nombre} - ${usuario.email} - ${usuario.token}`
    );
  } else {
    const error = new Error("El password es incorrecto");
    console.log("El password es Incorrecto");

    return res.status(403).json({ msg: error.message });
  }
};
export { registrar, autenticar };
