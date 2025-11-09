import { renderApp, renderError, renderLoading } from "./ui.js";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "./api.js";

// ===============================
// Estado global
// ===============================
let items = [];
let currentTab = "form"; // 👈 Inicia en el formulario
const app = document.getElementById("app");

// ===============================
// Inicialización
// ===============================
async function init() {
  renderApp(app, {
    items,
    onCreate: handleCreate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
  });

  // Carga productos, aunque empiece en Registrar
  await loadAndRender();
}

document.addEventListener("DOMContentLoaded", init);

// ===============================
// Cargar productos desde MongoDB
// ===============================
async function loadAndRender() {
  if (currentTab !== "list") return; // 👈 Solo carga si estamos en la pestaña de productos

  renderLoading(app);

  try {
    const data = await getProductos();
    items = data.map((item) => ({
      ...item,
      // ✅ Formatear ID y fecha
      _id:
        typeof item._id === "object"
          ? item._id.$oid || JSON.stringify(item._id)
          : item._id,
      fecha: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("es-ES")
        : "Sin fecha",
    }));

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
    if (!data.name.trim() || isNaN(data.price)) {
      renderError(app, "Nombre o precio inválidos.");
      return;
    }

    // ✅ Crear producto con fecha actual
    const nuevo = await createProducto({
      nombre: data.name.trim(),
      precio: Number(data.price),
      categoria: data.category || "General",
      fecha: new Date().toISOString(),
    });

    console.log("✅ Producto creado:", nuevo);

    // Cambia a la pestaña de productos después de crear
    currentTab = "list";
    await loadAndRender();
    setActiveTab("productos");
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

// ===============================
// Navegación entre pestañas
// ===============================
document.getElementById("btnRegistrar").addEventListener("click", () => {
  currentTab = "form";
  renderApp(app, {
    items,
    onCreate: handleCreate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
  });
  setActiveTab("registrar");
});

document.getElementById("btnProductos").addEventListener("click", async () => {
  currentTab = "list";
  await loadAndRender();
  setActiveTab("productos");
});

// ===============================
// Cambiar visualmente el tab activo
// ===============================
function setActiveTab(tab) {
  const btnRegistrar = document.getElementById("btnRegistrar");
  const btnProductos = document.getElementById("btnProductos");

  if (tab === "registrar") {
    btnRegistrar.classList.add("active");
    btnProductos.classList.remove("active");
  } else {
    btnProductos.classList.add("active");
    btnRegistrar.classList.remove("active");
  }
}
