import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productosRoutes from "./routes/productos.js"; // ✅ ruta correcta

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Conexión a MongoDB ======
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error(" Error al conectar con MongoDB:", err));

// ====== Rutas principales ======
app.use("/api/productos", productosRoutes);
console.log(" Ruta /api/productos registrada correctamente");

// ====== Ruta raíz (para prueba rápida) ======
app.get("/", (req, res) => {
  res.send(" Servidor backend funcionando correctamente");
});

// ====== Servidor ======
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
});
