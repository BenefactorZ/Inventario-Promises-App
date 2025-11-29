import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productosRoutes from "./routes/productos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Conexión correcta
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB Atlas"))
  .catch((err) => console.error(" Error al conectar con MongoDB:", err));

app.use("/api/productos", productosRoutes);

app.get("/", (req, res) => {
  res.send(" Servidor backend funcionando correctamente con CORS abierto");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
});
