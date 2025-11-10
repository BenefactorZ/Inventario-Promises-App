import Producto from "../models/Producto.js";


export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });

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


export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria, cantidad, fecha } = req.body;

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

    res.status(201).json({
      ...guardado.toObject(),
      _id: guardado._id.toString(),
      createdAt: guardado.createdAt?.toISOString(),
      updatedAt: guardado.updatedAt?.toISOString(),
    });
  } catch (err) {
    console.error(" Error en crearProducto:", err);
    res.status(400).json({ error: "Error al crear el producto" });
  }
};


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
    console.error(" Error en actualizarProducto:", err);
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
};

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
    console.error(" Error en eliminarProducto:", err);
    res.status(400).json({ error: "Error al eliminar el producto" });
  }
};
