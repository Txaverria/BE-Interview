const request = require("supertest");
const app = require("../index");

const redisClient = require("../config/redis");
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
  await redisClient.quit();
});

describe("Pruebas de JEST para /api/v2/calculate", () => {
  it("debería devolver 200 para un cálculo exitoso", async () => {
    const response = await request(app)
      .post("/api/v2/calculate")
      .send({
        num1: 10,
        num2: 5,
        operacion: "+",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.result).toBe(15);
  });

  it("debería devolver 400 para entradas inválidas", async () => {
    const response = await request(app)
      .post("/api/v2/calculate")
      .send({
        num1: "not-a-number",
        num2: 5,
        operacion: "+",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.errors).toContain("num1 debe ser un número."); // Ajustar los mensajes de error según tu validación
  });

  it("debería devolver 404 para una operación no soportada", async () => {
    const response = await request(app)
      .post("/api/v2/calculate")
      .send({
        num1: 10,
        num2: 5,
        operacion: "^",
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Operación no soportada.");
  });

  it("debería devolver 400 para división por cero", async () => {
    const response = await request(app)
      .post("/api/v2/calculate")
      .send({
        num1: 10,
        num2: 0,
        operacion: "/",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.errors).toContain("num2 no puede ser 0 para la división.");
  });

  it("debería devolver 400 para campos faltantes", async () => {
    const response = await request(app)
      .post("/api/v2/calculate")
      .send({
        num1: 10,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.errors).toContain("num2 es obligatorio.");
  });
});