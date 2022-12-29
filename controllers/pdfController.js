import express from "express";
import pdf from "html-pdf";
import templateSgCompany from "../documents/templateSgCompany.js";
import CustomLogger from "../helper/CustomLogger.js";

// Fetch Pdf
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();

const customLogger = new CustomLogger();

const createPdf = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { cliente, productosList, empresa, variables } = req.body;
  console.log("[createPdfFn]", req.body);
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
};

//? - - - - - - - - - En funcionamiento
/**
 * Get PDF previous has been created.
 * @param {*} req
 * @param {*} res
 */
app.get("/pdf/fetch", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  customLogger.logDebug("[On fetchPdfFn]");
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    res.sendFile(`${__dirname}/result.pdf`);
    console.log("[FetchPdf] Exitoso");
  } catch (error) {
    console.log(error);
  }
});

//? Todo -------- SIN USO - - - - - - - -
/**
 * Get PDF previous has been created.
 * @param {*} req
 * @param {*} res
 */
const fetchPdf = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  customLogger.logDebug("[On fetchPdfFn]");
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    res.sendFile(`${__dirname}/result.pdf`);
    console.log("[FetchPdf] Exitoso");
  } catch (error) {
    console.log(error);
  }
};

export { createPdf, fetchPdf };
