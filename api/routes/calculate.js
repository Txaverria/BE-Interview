// ruta principal para calcular
const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const redisClient = require("../config/redis");

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

  // Se crea una clave para cada operación (para usarla con Redis)
  const claveCache = `calc:${operacion}:${num1}:${num2}`;

  try {
    // Esto busca el resultado en el caché de Redis. Si se lo encuentra, lo usa para devolver la respuesta.
    const resultadoCache = await redisClient.get(claveCache);
    if (resultadoCache) {
      const tiempoFin = Date.now();
      const tiempoRespuesta = tiempoFin - tiempoInicio;

      // Loguear la solicitud con datos de la caché
      await Log.create({
        operacion: operacion,
        num1: num1,
        num2: num2,
        resultado: Number(resultadoCache),
        timestamp: new Date(),
        responseTime: tiempoRespuesta,
      });

      console.log("Resultado obtenido de la caché:", req.body);
      return res.json({
        status: "success",
        operation: operacion,
        inputs: {
          number1: num1,
          number2: num2,
        },
        result: Number(resultadoCache),
        timestamp: new Date(),
        responseTime: `${tiempoRespuesta} ms`,
      });
    }

    // Si no está en caché, realizar el cálculo
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

    // Loguear la solicitud con datos calculados
    await Log.create({
      operacion: operacion,
      num1: num1,
      num2: num2,
      resultado: resultado,
      timestamp: new Date(),
      responseTime: tiempoRespuesta,
    });

    res.json({
      status: "success",
      operation: operacion,
      inputs: {
        number1: num1,
        number2: num2,
      },
      result: resultado,
      timestamp: new Date(),
      responseTime: `${tiempoRespuesta} ms`,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
