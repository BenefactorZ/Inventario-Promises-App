import { renderApp, renderError, renderLoading } from "./ui.js";
import { getProductos, createProducto, updateProducto, deleteProducto } from "./api.js";
import { editProducto } from "./components/form.js";

let items = [];
let currentTab = "form";
const app = document.getElementById("app");

// === Inicialización ===
document.addEventListener("DOMContentLoaded", init);

async function init() {
  renderApp(app, {
    items,
    onCreate: handleCreate,
    onDelete: handleDelete,
    onEdit: handleEdit,
    currentTab,
  });

  if (currentTab === "list") {
    await loadAndRender();
  }
}

// === Cargar productos y renderizar lista ===
async function loadAndRender() {
  if (currentTab !== "list") return;

  renderLoading(app);

  try {
    const data = await getProductos();

    if (!Array.isArray(data)) {
      throw new Error("La API no devolvió una lista.");
    }

    items = data.map((item) => ({
      ...item,
      _id: typeof item._id === "object" ? item._id.$oid || String(item._id) : item._id,
      fecha: item.fecha
        ? new Date(item.fecha).toLocaleDateString("es-ES")
        : "Sin fecha",
        fecha: item.fecha ?? null
    }));

    renderApp(app, {
      items,
      onCreate: handleCreate,
      onDelete: handleDelete,
      onEdit: handleEdit,
      currentTab,
    });
  } catch (err) {
    console.error("Error cargando productos:", err);
    renderError(app, "No se pudo cargar la lista de productos.");
  }
}

// === Crear producto ===
async function handleCreate(data) {
  try {
    if (!data.nombre.trim() || isNaN(data.precio) || isNaN(data.cantidad)) {
      return renderError(app, "Datos inválidos. Revisa los campos.");
    }

    await createProducto({
      nombre: data.nombre.trim(),
      cantidad: Number(data.cantidad),
      precio: Number(data.precio),
      categoria: data.categoria || "General",
      fecha: new Date().toISOString(), // FECHA SOLO AL CREAR
    });

    currentTab = "list";
    await loadAndRender();
    setActiveTab("productos");
  } catch (err) {
    console.error(err);
    renderError(app, "No se pudo crear el producto.");
  }
}

// === Eliminar producto ===
async function handleDelete(id) {
  if (!confirm("¿Deseas eliminar este producto?")) return;

  try {
    await deleteProducto(id);
    await loadAndRender();
  } catch (err) {
    console.error(err);
    renderError(app, "No se pudo eliminar el producto.");
  }
}

// === Editar producto ===
async function handleEdit(producto) {
  editProducto(producto, async (updatedData) => {
    try {
      await updateProducto(producto._id, updatedData);
      await loadAndRender();
    } catch (err) {
      console.error(err);
      renderError(app, "No se pudo actualizar el producto.");
    }
  });
}

// === Cambiar pestañas ===
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

// === Actualizar estado visual de pestañas ===
function setActiveTab(tab) {
  const btnRegistrar = document.getElementById("btnRegistrar");
  const btnProductos = document.getElementById("btnProductos");

  btnRegistrar.classList.toggle("active", tab === "registrar");
  btnProductos.classList.toggle("active", tab === "productos");
}
