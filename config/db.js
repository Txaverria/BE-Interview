const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB se conectó correctamente.");
  } catch (error) {
    console.error("Error al conectarse a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
