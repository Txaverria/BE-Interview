const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no es obligatoriamente necesario siempre, pero es costumbre ponerlo.

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
