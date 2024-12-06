// ruta principal para calcular
const express = require("express");
const router = express.Router();

// ruta en sí. Usé POST porque se está accediendo la ruta
// y se le está mandando un paquete con el body
router.post("/calculate", (req, res) => {
  const { num1, num2, operacion } = req.body;
  let resultado;

  function dividir(a, b) {
    if (b === 0) {
      throw new Error("No se puede dividir entre 0.");
    }
    return a / b;
  }

  try {
    switch (operacion) {
      case "+":
        resultado = num1 + num2;
        break;

      case "-":
        resultado = num1 - num2;
        break;

      case "*":
        resultado = num1 * num2;
        break;

      case "/":
        resultado = dividir(num1, num2);
        break;

      default:
        return res.status(400).json({ error: "Operación inválida." });
    }

    res.json({ resultado: resultado });
    console.log(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
