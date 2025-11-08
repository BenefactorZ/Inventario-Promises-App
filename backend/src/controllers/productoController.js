import Producto from "../models/Producto.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find(); // Promise
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    await nuevo.save(); // Promise
    res.status(201).json({ mensaje: "Producto agregado correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body); // Promise
    res.json({ mensaje: "Producto actualizado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id); // Promise
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
