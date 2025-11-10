import { renderApp, renderError, renderLoading } from "./ui.js";
import { getProductos, createProducto, updateProducto, deleteProducto } from "./api.js";

let items = [];
let currentTab = "form";
const app = document.getElementById("app");

async function init() {
  renderApp(app, { items, onCreate: handleCreate, onDelete: handleDelete, onEdit: handleEdit, currentTab });
  await loadAndRender();
}

document.addEventListener("DOMContentLoaded", init);

async function loadAndRender() {
  if (currentTab !== "list") return;
  renderLoading(app);
  try {
    const data = await getProductos();
    items = data.map((item) => ({
      ...item,
      _id: typeof item._id === "object" ? item._id.$oid || JSON.stringify(item._id) : item._id,
      fecha: item.createdAt ? new Date(item.createdAt).toLocaleDateString("es-ES") : "Sin fecha",
    }));
    renderApp(app, { items, onCreate: handleCreate, onDelete: handleDelete, onEdit: handleEdit, currentTab });
  } catch (err) {
    renderError(app, "No se pudo cargar la lista de productos.");
  }
}

async function handleCreate(data) {
  try {
    if (!data.name.trim() || isNaN(data.price)) {
      renderError(app, "Nombre o precio inválidos.");
      return;
    }
    await createProducto({
      nombre: data.name.trim(),
      precio: Number(data.price),
      categoria: data.category || "General",
      fecha: new Date().toISOString(),
    });
    currentTab = "list";
    await loadAndRender();
    setActiveTab("productos");
  } catch {
    renderError(app, "No se pudo crear el producto.");
  }
}

async function handleDelete(id) {
  if (!confirm("¿Deseas eliminar este producto?")) return;
  try {
    await deleteProducto(id);
    await loadAndRender();
  } catch {
    renderError(app, "No se pudo eliminar el producto.");
  }
}

async function handleEdit(item) {
  const newName = prompt("Nuevo nombre:", item.nombre);
  if (newName === null) return;
  const newPrice = Number(prompt("Nuevo precio:", item.precio));
  if (isNaN(newPrice)) return renderError(app, "Precio inválido");
  const newCategory = prompt("Nueva categoría:", item.categoria);
  await updateProducto(item._id, {
    nombre: newName.trim(),
    precio: newPrice,
    categoria: newCategory || "General",
  });
  await loadAndRender();
}

document.getElementById("btnRegistrar").addEventListener("click", () => {
  currentTab = "form";
  renderApp(app, { items, onCreate: handleCreate, onDelete: handleDelete, onEdit: handleEdit, currentTab });
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
