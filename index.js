const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const dotenv = require("dotenv");

const pdfTemplate = require("./documents/templateSgCompany.js");

const app = express();
dotenv.config();

console.log(`La variable de entorno es ${process.env.FRONTEND_URL}`);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create-pdf", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { cliente, productosList, empresa, variables } = req.body;
  console.log("app.post, req.body => ", req.body);
  pdf
    .create(pdfTemplate({ cliente, productosList, empresa, variables }), {
      childProcessOptions: {
        env: {
          OPENSSL_CONF: "/dev/null",
        },
      },
    })
    .toFile("result.pdf", (err) => {
      if (err) {
        console.log(err);
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
});

app.get("/fetch-pdf", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
