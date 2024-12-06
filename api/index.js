// imports de los packages de node
const express = require("express");
const app = express();
require("dotenv").config();

// config del app de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no es obligatoriamente necesario siempre, pero es costumbre ponerlo.


// puerto y listen creados
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});