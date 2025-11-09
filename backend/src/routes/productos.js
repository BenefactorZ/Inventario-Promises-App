import express from "express";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js"; // ✅ bien referenciado

const router = express.Router();

router.get("/", getProductos);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
