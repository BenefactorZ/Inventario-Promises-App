import { createForm } from "./components/form.js";
import { createTable } from "./components/list.js";

/**
 * Renderiza el contenido principal de la aplicación.
 * Alterna entre el formulario y la tabla según el tab activo.
 */
export function renderApp(
  root,
  {
    items = [],
    onCreate,
    onDelete,
    onEdit,
    currentTab,
    currentPage = 1,
    totalPages = 1,
    onNextPage = () => {},
    onPrevPage = () => {},
  }
) {
  if (!root) {
    console.error("❌ No se encontró el contenedor raíz para renderizar la app.");
    return;
  }

  root.innerHTML = "";

  if (currentTab === "form") {
    root.appendChild(createForm(onCreate));
  } else {
    const tableSection = createTable(items, {
      onDelete,
      onEdit,
      currentPage,
      totalPages,
      onNextPage,
      onPrevPage,
    });

    if (!items || items.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "alert alert-info mt-3 text-center fw-semibold";
      emptyMsg.textContent = "No hay productos disponibles. Agrega uno nuevo.";
      root.appendChild(emptyMsg);
    }

    root.appendChild(tableSection);
  }
}

/**
 * Muestra un indicador de carga centrado.
 */
export function renderLoading(root) {
  if (!root) return;
  root.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
      <div class="spinner-border text-purple" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `;
}

/**
 * Muestra un mensaje de error elegante.
 */
export function renderError(root, message) {
  if (!root) return;

  const alert = document.createElement("div");
  alert.className = "alert alert-danger mt-3 shadow-sm fw-semibold";
  alert.textContent = message;

  root.prepend(alert);

  setTimeout(() => {
    if (alert && alert.parentNode) alert.remove();
  }, 3000);
}
