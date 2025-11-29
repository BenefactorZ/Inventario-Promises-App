import Producto from "../models/Producto.js";


export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });

    const productosLimpios = productos.map(p => ({
      _id: p._id.toString(),
      nombre: p.nombre,
      precio: p.precio,
      cantidad: p.cantidad,
      categoria: p.categoria,
      fecha: p.fecha?.toISOString(),        
      createdAt: p.createdAt?.toISOString(),
    }));

    res.json(productosLimpios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};




export const crearProducto = async (req, res) => {
  try {
    const data = req.body;

    if (!data.fecha || data.fecha.trim() === "") {
      delete data.fecha;
    }

    const nuevo = new Producto(data);
    const guardado = await nuevo.save();

    res.status(201).json({
      ...guardado.toObject(),
      _id: guardado._id.toString(),
      fecha: guardado.fecha?.toISOString(),
      createdAt: guardado.createdAt?.toISOString(),
      updatedAt: guardado.updatedAt?.toISOString(),
    });
  } catch (err) {
    console.error("Error en crearProducto:", err);
    res.status(400).json({ error: "Error al crear el producto" });
  }
};




export const actualizarProducto = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
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
