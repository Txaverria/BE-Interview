// imports de los packages de node
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

// routes
const calculate = require("./routes/calculate");

// crear el app para usar Express
const app = express();

// config del app de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no es obligatoriamente necesario siempre, pero es costumbre ponerlo.

// instrucción para usar las rutas
app.use("/api", calculate);

// puerto y listen creados
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
