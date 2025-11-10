import { renderApp, renderError, renderLoading } from "./ui.js";
import { getProductos, createProducto, updateProducto, deleteProducto } from "./api.js";

let items = [];
let currentTab = "form";
let editingItem = null; // ✅ Guarda el producto que se está editando
const app = document.getElementById("app");

// =====================
// Inicialización
// =====================
async function init() {
  renderApp(app, {
    items,
    onCreate: handleCreateOrUpdate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
    editingItem,
  });
  await loadAndRender();
}

document.addEventListener("DOMContentLoaded", init);

// =====================
// Cargar y Renderizar
// =====================
async function loadAndRender() {
  if (currentTab !== "list") return;
  renderLoading(app);

  try {
    const data = await getProductos();

    items = data.map((item) => ({
      _id:
        typeof item._id === "object"
          ? item._id.$oid || JSON.stringify(item._id)
          : item._id,
      nombre: item.nombre,
      cantidad: item.cantidad ?? 1,
      precio: item.precio,
      categoria: item.categoria || "General",
      fecha: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("es-ES")
        : item.fecha
        ? new Date(item.fecha).toLocaleDateString("es-ES")
        : "Sin fecha",
    }));

    renderApp(app, {
      items,
      onCreate: handleCreateOrUpdate,
      onDelete: handleDelete,
      onEdit: handleEdit,
      currentTab,
      editingItem,
    });
  } catch (err) {
    console.error(err);
    renderError(app, "❌ No se pudo cargar la lista de productos.");
  }
}

// =====================
// Crear o Actualizar producto
// =====================
async function handleCreateOrUpdate(data) {
  try {
    const producto = {
      nombre: data.nombre?.trim(),
      precio: Number(data.precio),
      cantidad: Number(data.cantidad) || 1,
      categoria: data.categoria || "General",
      fecha: new Date().toISOString(),
    };

    if (!producto.nombre || isNaN(producto.precio)) {
      renderError(app, "⚠️ Nombre o precio inválidos.");
      return;
    }

    if (editingItem) {
      // ✅ Si hay un producto en edición, lo actualiza
      await updateProducto(editingItem._id, producto);
      editingItem = null;
    } else {
      // ✅ Si no hay producto en edición, crea uno nuevo
      await createProducto(producto);
    }

    currentTab = "list";
    await loadAndRender();
    setActiveTab("productos");
  } catch (err) {
    console.error(err);
    renderError(app, "❌ No se pudo guardar el producto.");
  }
}

// =====================
// Eliminar producto
// =====================
async function handleDelete(id) {
  if (!confirm("¿Deseas eliminar este producto?")) return;
  try {
    await deleteProducto(id);
    await loadAndRender();
  } catch (err) {
    console.error(err);
    renderError(app, "❌ No se pudo eliminar el producto.");
  }
}

// =====================
// Editar producto
// =====================
async function handleEdit(item) {
  // ✅ Cambiar a pestaña de formulario
  currentTab = "form";
  editingItem = item;

  // ✅ Renderiza el formulario con los valores cargados
  renderApp(app, {
    items,
    onCreate: handleCreateOrUpdate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
    editingItem,
  });

  setActiveTab("registrar");
}

// =====================
// Botones de pestañas
// =====================
document.getElementById("btnRegistrar").addEventListener("click", () => {
  currentTab = "form";
  editingItem = null; // ✅ Limpia el modo edición
  renderApp(app, {
    items,
    onCreate: handleCreateOrUpdate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
    editingItem,
  });
  setActiveTab("registrar");
});

document.getElementById("btnProductos").addEventListener("click", async () => {
  currentTab = "list";
  editingItem = null;
  await loadAndRender();
  setActiveTab("productos");
});

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
