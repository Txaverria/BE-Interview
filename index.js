// imports de los packages de node
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const fs = require("fs");
const https = require("https");

// routes
const calculateV1 = require("./routes/v1/calculate");
const calculateV2 = require("./routes/v2/calculate");

// crear el app para usar Express
const app = express();

// config del app de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no es obligatoriamente necesario siempre, pero es costumbre ponerlo.

// conectar a mongodb
connectDB();

// instrucción para usar las rutas
app.use("/api/v1", calculateV1);
app.use("/api/v2", calculateV2);

// puerto y listen creados
const port = process.env.PORT || 3000;

const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`App corriendo en HTTPS en el port: ${port}`);
});