// ruta principal para calcular
const express = require("express");
const router = express.Router();
const Log = require("../models/Log"); // Asegúrate de que la ruta sea correcta
const redisClient = require("../config/redis"); // Importar el cliente de Redis

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

  // se crea una clave para cada operación (para usarla con Redis)
  const claveCache = `calc:${operacion}:${num1}:${num2}`;

  try {
    // esto busca el resultado en el caché de Redis. Si se lo encuentra, lo usa para devolver la respuesta.
    const resultadoCache = await redisClient.get(claveCache);
    if (resultadoCache) {
      const tiempoFin = Date.now();
      const tiempoRespuesta = tiempoFin - tiempoInicio;

      await Log.create({
        operacion: operacion,
        num1: num1,
        num2: num2,
        resultado: Number(resultadoCache),
        timestamp: new Date(),
        responseTime: tiempoRespuesta,
      });

      console.log("Resultado obtenido de la caché:", req.body);
      return res.json({ resultado: Number(resultadoCache), cache: true });
    }

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

    // guardar el resultado en la caché con TTL de 60 segundos
    await redisClient.setEx(claveCache, 60, resultado.toString());

    await Log.create({
      operacion: operacion,
      num1: num1,
      num2: num2,
      resultado: resultado,
      timestamp: new Date(),
      responseTime: tiempoRespuesta,
    });

    res.json({ resultado: resultado, cache: false });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
