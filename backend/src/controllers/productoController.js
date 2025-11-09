import Producto from "../models/Producto.js";


export const getProductos = async (req, res) => {
  try {
    // Trae los productos, ordenados del más nuevo al más viejo
    const productos = await Producto.find().sort({ createdAt: -1 });

    // ✅ Convertimos los ObjectId a strings
    const productosLimpios = productos.map((p) => ({
      ...p.toObject(),
      _id: p._id.toString(),
      fecha: p.fecha
        ? new Date(p.fecha).toISOString().split("T")[0] // YYYY-MM-DD
        : "Sin fecha",
    }));

    res.json(productosLimpios);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
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

    // Crear nuevo producto
    const nuevo = new Producto({
      nombre,
      precio,
      categoria: categoria || "General",
      cantidad: cantidad || 1,
      fecha: fecha || new Date(),
    });

    const guardado = await nuevo.save();

    // 🔧 Enviamos el producto limpio al frontend
    res.status(201).json({
      ...guardado.toObject(),
      _id: guardado._id.toString(),
      createdAt: guardado.createdAt?.toISOString(),
      updatedAt: guardado.updatedAt?.toISOString(),
    });
  } catch (err) {
    console.error("❌ Error en crearProducto:", err);
    res.status(400).json({ error: "Error al crear el producto" });
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
      { new: true } // Devuelve el producto ya actualizado
    ).lean();

    if (!actualizado)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json({
      ...actualizado,
      _id: actualizado._id.toString(),
      createdAt: actualizado.createdAt?.toISOString(),
      updatedAt: actualizado.updatedAt?.toISOString(),
    });
  } catch (err) {
    console.error("❌ Error en actualizarProducto:", err);
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
};

// ===============================
// Eliminar un producto
// ===============================
export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id).lean();

    if (!eliminado)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json({
      mensaje: "Producto eliminado correctamente",
      eliminado: {
        ...eliminado,
        _id: eliminado._id.toString(),
      },
    });
  } catch (err) {
    console.error("❌ Error en eliminarProducto:", err);
    res.status(400).json({ error: "Error al eliminar el producto" });
  }
};
