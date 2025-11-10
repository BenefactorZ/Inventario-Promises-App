import { renderApp, renderError, renderLoading } from "./ui.js";
import { getProductos, createProducto, updateProducto, deleteProducto } from "./api.js";

let items = [];
let currentTab = "form";
const app = document.getElementById("app");

// =====================
// Inicialización
// =====================
async function init() {
  renderApp(app, {
    items,
    onCreate: handleCreate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
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
      onCreate: handleCreate,
      onDelete: handleDelete,
      onEdit: handleEdit,
      currentTab,
    });
  } catch (err) {
    console.error(err);
    renderError(app, "❌ No se pudo cargar la lista de productos.");
  }
}

// =====================
// Crear producto
// =====================
async function handleCreate(data) {
  try {
    // ✅ Asegurar nombres correctos
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

    await createProducto(producto);
    currentTab = "list";
    await loadAndRender();
    setActiveTab("productos");
  } catch (err) {
    console.error(err);
    renderError(app, "❌ No se pudo crear el producto.");
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
  const newName = prompt("Nuevo nombre:", item.nombre);
  if (newName === null) return;

  const newCantidad = Number(prompt("Nueva cantidad:", item.cantidad));
  if (isNaN(newCantidad)) return renderError(app, "Cantidad inválida.");

  const newPrice = Number(prompt("Nuevo precio:", item.precio));
  if (isNaN(newPrice)) return renderError(app, "Precio inválido.");

  const newCategory = prompt("Nueva categoría:", item.categoria);

  const actualizado = {
    nombre: newName.trim(),
    cantidad: newCantidad,
    precio: newPrice,
    categoria: newCategory || "General",
  };

  try {
    await updateProducto(item._id, actualizado);
    await loadAndRender();
  } catch (err) {
    console.error(err);
    renderError(app, "❌ No se pudo actualizar el producto.");
  }
}

// =====================
// Botones de pestañas
// =====================
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
