// imports de los packages de node
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

// routes
const calculateV1 = require("./routes/v1/calculate");

// crear el app para usar Express
const app = express();

// config del app de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no es obligatoriamente necesario siempre, pero es costumbre ponerlo.

// conectar a mongodb
connectDB();

// instrucción para usar las rutas
app.use("/api/v1", calculateV1);

// puerto y listen creados
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App corriendo en el port: ${port}`);
});
