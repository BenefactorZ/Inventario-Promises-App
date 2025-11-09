import Producto from "../models/Producto.js";

// ===============================
// Obtener todos los productos
// ===============================
export const getProductos = async (req, res) => {
  try {
    // 🧠 .lean() devuelve objetos planos (no instancias de Mongoose)
    const productos = await Producto.find().sort({ createdAt: -1 }).lean();

    // 🔧 Convertimos _id en string y formateamos fechas
    const productosLimpios = productos.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : null,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
    }));

    res.json(productosLimpios);
  } catch (err) {
    console.error("❌ Error en getProductos:", err);
    res.status(500).json({ error: "Error al obtener los productos" });
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
