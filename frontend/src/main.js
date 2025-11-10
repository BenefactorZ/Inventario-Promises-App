import { renderApp, renderError, renderLoading } from "./ui.js";
import { getProductos, createProducto, updateProducto, deleteProducto } from "./api.js";

let items = [];
let currentTab = "form";
const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  renderApp(app, { items, onCreate: handleCreate, onDelete: handleDelete, onEdit: handleEdit, currentTab });
  await loadAndRender();
}

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
  // Pedir los nuevos valores con prompts
  const newName = prompt("Editar nombre:", item.nombre);
  if (newName === null) return;

  const newCantidad = Number(prompt("Editar cantidad:", item.cantidad));
  if (isNaN(newCantidad)) return renderError(app, "Cantidad inválida.");

  const newPrice = Number(prompt("Editar precio:", item.precio));
  if (isNaN(newPrice)) return renderError(app, "Precio inválido.");

  // Abrir modal para seleccionar categoría
  const newCategory = await selectCategoriaModal(item.categoria);
  if (!newCategory) return; // Si el usuario cancela, no guardar

  await updateProducto(item._id, {
    nombre: newName.trim(),
    cantidad: newCantidad,
    precio: newPrice,
    categoria: newCategory,
    fecha: new Date().toISOString(),
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

// === Modal para seleccionar categoría ===
function selectCategoriaModal(categoriaActual) {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.className = "modal fade show";
    modal.style.display = "block";
    modal.style.backgroundColor = "rgba(0,0,0,0.5)";
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content p-3 shadow-sm">
          <div class="modal-header border-0">
            <h5 class="modal-title text-purple fw-bold">Seleccionar categoría</h5>
            <button class="btn-close" id="closeModal"></button>
          </div>
          <div class="modal-body">
            <select class="form-select mb-3" id="categoriaSelect">
              ${[
                "Papelería",
                "Ropa y accesorios",
                "Belleza y cuidado personal",
                "Herramientas y ferretería",
                "Electrónicos y tecnología",
                "Hogar y cocina",
                "Juguetes y entretenimiento",
                "Alimentos y bebidas",
                "Automotriz",
                "Salud y farmacia",
                "Deportes y aire libre",
                "Oficina y escuela",
                "Otros",
              ]
                .map(
                  (cat) =>
                    `<option value="${cat}" ${
                      cat === categoriaActual ? "selected" : ""
                    }>${cat}</option>`
                )
                .join("")}
            </select>
            <div class="d-flex justify-content-end">
              <button class="btn btn-outline-secondary me-2" id="cancelar">Cancelar</button>
              <button class="btn btn-purple" id="guardar">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#closeModal").onclick = () => {
      modal.remove();
      resolve(null);
    };
    modal.querySelector("#cancelar").onclick = () => {
      modal.remove();
      resolve(null);
    };
    modal.querySelector("#guardar").onclick = () => {
      const value = modal.querySelector("#categoriaSelect").value;
      modal.remove();
      resolve(value);
    };
  });
}
