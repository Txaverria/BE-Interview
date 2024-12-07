// ruta principal para calcular
const express = require("express");
const router = express.Router();
const Log = require("../models/Log"); // Asegúrate de que la ruta sea correcta

router.post("/calculate", async (req, res) => {
  const { num1, num2, operacion } = req.body;
  let resultado;

  function dividir(a, b) {
    if (b === 0) {
      throw new Error("No se puede dividir entre 0.");
    }
    return a / b;
  }

  const tiempoInicio = Date.now();

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

    const tiempoFin = Date.now();
    const tiempoRespuesta = tiempoFin - tiempoInicio;

    await Log.create({
      operacion: operacion,
      num1: num1,
      num2: num2,
      resultado: resultado,
      timestamp: new Date(),
      responseTime: tiempoRespuesta
    });

    res.json({ resultado: resultado });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
