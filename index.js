const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// routes
const calculateV1 = require("./routes/v1/calculate");
const calculateV2 = require("./routes/v2/calculate");

// crear el app para usar Express
const app = express();

// config del app de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no es obligatoriamente necesario siempre, pero es costumbre ponerlo.

// configurar CORS
const corsOptions = {
  origin: 'Este sería el dominio para CORS', 
  methods: ["POST"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Si estamos en development entonces permitimos todos los orígenes
if (process.env.NODE_ENV === "dev") {
  app.use(cors());
} else {
  app.use(cors(corsOptions));
}

// configurar rate-limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    status: "error",
    code: 429,
    message: "Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.",
  },
});
app.use(apiLimiter);

// configurar swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación del API",
      version: "1.0.0",
      description: "Documentación del API endpoint de calculate.js",
    },
    servers: [
      {
        url: "https://localhost:3000",
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// conectar a mongodb
connectDB();

// instrucción para usar las rutas
app.use("/api/v1", calculateV1);
app.use("/api/v2", calculateV2);

// exportar la app para testing
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;

  const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
  const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
  const credentials = { 
    key: privateKey, 
    cert: certificate, 
    passphrase: process.env.SSL_PASSPHRASE 
  };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, () => {
    console.log(`App corriendo en HTTPS en el port: ${port}`);
  });
}

module.exports = app;
