import Producto from "../models/Producto.js";

// ===============================
// Obtener todos los productos
// ===============================
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 }); // ordena del más nuevo al más viejo
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// Crear un nuevo producto
// ===============================
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria, cantidad, fecha } = req.body;

    // Validación mínima
    if (!nombre || !precio)
      return res.status(400).json({ error: "Nombre y precio son requeridos" });

    const nuevo = new Producto({
      nombre,
      precio,
      categoria: categoria || "General",
      cantidad: cantidad || 1,
      fecha: fecha || new Date(),
    });

    const guardado = await nuevo.save();

    res.status(201).json(guardado); // ✅ devolvemos el producto creado
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===============================
// Actualizar un producto
// ===============================
export const actualizarProducto = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // ✅ devuelve el producto actualizado
    );

    if (!actualizado)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===============================
// Eliminar un producto
// ===============================
export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!eliminado)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json({ mensaje: "Producto eliminado", eliminado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
