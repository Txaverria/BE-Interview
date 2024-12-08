// configuración para conectarse a Redis
const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6380,
  },
});

redisClient.on("error", (err) => {
  console.error("Error de conexión a Redis:", err);
});

redisClient.connect()
  .then(() => {
    console.log("Conectado a Redis exitosamente.");
  })
  .catch((err) => {
    console.error("Error al conectar a Redis:", err);
  });

module.exports = redisClient;