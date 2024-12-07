const Joi = require("joi");

// Este es el schema de Joi para validar el JSON de Body
const calculationSchema = Joi.object({
  num1: Joi.number()
    .required()
    .min(-1e9)
    .max(1e9)
    .messages({
      "number.base": "num1 debe ser un número.",
      "any.required": "num1 es obligatorio.",
      "number.min": "num1 no puede ser menor que -1e9.",
      "number.max": "num1 no puede ser mayor que 1e9.",
    }),
  num2: Joi.number()
    .required()
    .min(-1e9)
    .max(1e9)
    .when("operacion", {
      is: "/",
      then: Joi.number().not(0).messages({
        "any.invalid": "num2 no puede ser 0 para la división.",
      }),
    })
    .messages({
      "number.base": "num2 debe ser un número.",
      "any.required": "num2 es obligatorio.",
      "number.min": "num2 no puede ser menor que -1e9.",
      "number.max": "num2 no puede ser mayor que 1e9.",
    }),
  operacion: Joi.string().required().valid("+", "-", "*", "/").messages({
    "string.base": "operacion debe ser un texto.",
    "any.required": "operacion es obligatorio.",
    "any.only": "operacion debe ser uno de los siguientes: +, -, *, /",
  }),
});

module.exports = calculationSchema;
