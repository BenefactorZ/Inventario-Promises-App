import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productosRoutes from "./routes/productos.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/productos", productosRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión:", err));

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));
