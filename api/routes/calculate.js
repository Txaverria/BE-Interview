// ruta principal para calcular
const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const redisClient = require("../config/redis");
const calculationSchema = require("../validation/calculationSchema");

router.post("/calculate", async (req, res) => {
  const { error, value } = calculationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    /*
      Entre las operaciones de Joi se busca que se haya encontrado
      el error de que la operación es inválida. Esto porque entre
      los requisitos del programa venía que las operaciones inválidas
      tienen que devolver un 404, y que Joi tiene que manejar las
      operaciones inválidas.
    */
    const unsupportedOperationError = error.details.find(
      (detail) => detail.context && detail.context.key === "operacion" && detail.type === "any.only"
    );

    if (unsupportedOperationError) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Operación no soportada.",
        errors: [unsupportedOperationError.message],
      });
    }

    // Si no es error por la operación, se manda el error del input 400 normal.
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Información inválida.",
      errors: errorMessages,
    });
  }

  try {
    const { num1, num2, operacion } = value; // esto usa los valores validados por Joi
    const claveCache = `calc:${operacion}:${num1}:${num2}`;

    let resultado;

    const tiempoInicio = Date.now();
    const resultadoCache = await redisClient.get(claveCache);

    if (resultadoCache) {
      const tiempoFin = Date.now();
      const tiempoRespuesta = tiempoFin - tiempoInicio;

      await Log.create({
        operacion,
        num1,
        num2,
        resultado: Number(resultadoCache),
        timestamp: new Date(),
        responseTime: tiempoRespuesta,
      });

      return res.json({
        status: "success",
        operation: operacion,
        inputs: { number1: num1, number2: num2 },
        result: Number(resultadoCache),
        timestamp: new Date(),
        responseTime: `${tiempoRespuesta} ms`,
      });
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
        resultado = num1 / num2;
        break;
      default:
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Operación no soportada.",
          details: `La operación '${operacion}' no está soportada. Usa una de las siguientes: +, -, *, /.`,
        });
    }

    const tiempoFin = Date.now();
    const tiempoRespuesta = tiempoFin - tiempoInicio;

    await redisClient.setEx(claveCache, 60, resultado.toString());

    await Log.create({
      operacion,
      num1,
      num2,
      resultado,
      timestamp: new Date(),
      responseTime: tiempoRespuesta,
    });

    res.json({
      status: "success",
      operation: operacion,
      inputs: { number1: num1, number2: num2 },
      result: resultado,
      timestamp: new Date(),
      responseTime: `${tiempoRespuesta} ms`,
    });
  } catch (err) {
    console.error(err); // loggea el error para debugging
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Un error inesperado ocurrió.",
      details: err.message,
    });
  }
});

module.exports = router;
