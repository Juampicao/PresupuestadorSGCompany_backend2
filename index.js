import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import conectarDB from "./config/db.js";
// Pdf
import { dirname } from "path";
import { fileURLToPath } from "url";

// Routing
import clientesRoutes from "./routes/clientesRoutes.js";
import empresasRoutes from "./routes/empresasRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import presupuestosRoutes from "./routes/presupuestosRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

// Conectar DB.
conectarDB();

// Routes
const app = express();
dotenv.config();

// Puerto
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
console.log(`La variable de entorno es ${process.env.FRONTEND_URL}`);

// Routing
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.use(`/pdf`, pdfRoutes);
app.use(`/usuarios`, usuariosRoutes);
app.use(`/presupuestos`, presupuestosRoutes);
app.use(`/clientes`, clientesRoutes);
app.use(`/empresas`, empresasRoutes);
app.use(`/pedidos`, pedidosRoutes);

//Todo Mudar a pdfController.js

//? - - - - - - - - - Create PDF  - - - - - - - - -  -
import pdf from "html-pdf";
import templateSgCompany from "./documents/templateSgCompany.js";
import CustomLogger from "./helper/CustomLogger.js";

const customLogger = new CustomLogger();

app.post("/create", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { cliente, productosList, empresa, variables } = req.body;
  console.log("[createPdfFn from url post /pdf/fetch]", req.body);
  try {
    pdf
      .create(
        templateSgCompany({ cliente, productosList, empresa, variables }),
        {
          childProcessOptions: {
            env: {
              OPENSSL_CONF: "/dev/null",
            },
          },
        }
      )
      .toFile("result.pdf", (err) => {
        if (err) {
          console.log(err);
          res.send(Promise.reject());
        }

        res.send(Promise.resolve());
      });
  } catch (error) {
    customLogger.logError("[createPdfFn]", error);
    res.send({ status: 400, msg: "Error en [createPdfFn]" });
  }
});

//? - - - - - - - - - FETCH PDF  - - - - - - - - -  -
app.get("/pdf/fetch", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    res.sendFile(`${__dirname}/result.pdf`);
    console.log("[FetchPdf] Exitoso");
  } catch (error) {
    console.log(error);
  }
});
