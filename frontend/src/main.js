import { renderApp, renderError, renderLoading } from "./ui.js";
import { getProductos, createProducto, updateProducto, deleteProducto } from "./api.js";

// ===============================
// Estado global
// ===============================
let items = [];
let currentTab = "list";
const app = document.getElementById("app");

// ===============================
// Inicialización
// ===============================
async function init() {
  currentTab = "list";
  await loadAndRender();
}

document.addEventListener("DOMContentLoaded", init);

// ===============================
// Cargar productos desde MongoDB
// ===============================
async function loadAndRender() {
  renderLoading(app);

  try {
    const data = await getProductos(); // Obtiene los productos del backend
    items = data;

    renderApp(app, {
      items,
      onCreate: handleCreate,
      onDelete: handleDelete,
      onEdit: handleEdit,
      currentTab,
    });
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
    renderError(app, "No se pudo cargar la lista de productos.");
  }
}

// ===============================
// Crear producto (POST)
// ===============================
async function handleCreate(data) {
  try {
    // Validación simple
    if (!data.name.trim() || isNaN(data.qty) || isNaN(data.price)) {
      renderError(app, "Nombre, cantidad o precio inválidos.");
      return;
    }

    // Crear producto en backend
    const nuevo = await createProducto({
      nombre: data.name.trim(),
      precio: Number(data.price),
      categoria: data.category || "General",
    });

    console.log("✅ Producto creado:", nuevo);

    currentTab = "list";
    await loadAndRender();
  } catch (err) {
    console.error("❌ Error al crear producto:", err);
    renderError(app, "No se pudo crear el producto.");
  }
}

// ===============================
// Eliminar producto (DELETE)
// ===============================
async function handleDelete(id) {
  const confirmDelete = confirm("¿Deseas eliminar este producto?");
  if (!confirmDelete) return;

  try {
    await deleteProducto(id);
    console.log("🗑️ Producto eliminado");
    await loadAndRender();
  } catch (err) {
    console.error("❌ Error al eliminar producto:", err);
    renderError(app, "No se pudo eliminar el producto.");
  }
}

// ===============================
// Editar producto (PUT)
// ===============================
async function handleEdit(item) {
  const newName = prompt("Nuevo nombre:", item.nombre);
  if (newName === null) return;

  const newPrice = Number(prompt("Nuevo precio:", item.precio));
  if (isNaN(newPrice)) {
    renderError(app, "Precio inválido");
    return;
  }

  const newCategory = prompt("Nueva categoría:", item.categoria);

  try {
    const actualizado = await updateProducto(item._id, {
      nombre: newName.trim(),
      precio: newPrice,
      categoria: newCategory || "General",
    });

    console.log("✅ Producto actualizado:", actualizado);
    await loadAndRender();
  } catch (err) {
    console.error("❌ Error al actualizar producto:", err);
    renderError(app, "No se pudo actualizar el producto.");
  }
}
