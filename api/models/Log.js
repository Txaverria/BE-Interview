const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    operacion: { type: String, required: true },
    num1: { type: Number, required: true },
    num2: { type: Number, required: true },
    resultado: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    responseTime: { type: Number, required: true },
  },
  { collection: "Log" }
);

module.exports = mongoose.model("Log", LogSchema);