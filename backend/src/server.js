import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productosRoutes from "./routes/productos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ====== ✅ CORS CONFIGURADO CORRECTAMENTE ======
const allowedOrigins = [
  "http://localhost:5173", // entorno local
  "http://localhost:5174", // a veces Vite usa este puerto
  "https://stellular-shortbread-96e37f.netlify.app", // dominio de Netlify
  "https://inventario-promises-app-1.onrender.com", // tu dominio en Render
];

// Middleware de CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir peticiones sin origen (como Postman o curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("⛔ Bloqueado por CORS:", origin);
        return callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ====== Middleware ======
app.use(express.json());

// ====== Conexión a MongoDB ======
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// ====== Rutas principales ======
app.use("/api/productos", productosRoutes);
console.log("✅ Ruta /api/productos registrada correctamente");

// ====== Ruta raíz (para prueba rápida) ======
app.get("/", (req, res) => {
  res.send("🚀 Servidor backend funcionando correctamente");
});

// ====== Servidor ======
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
