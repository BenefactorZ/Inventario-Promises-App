// === CREAR PRODUCTO ===
export function createForm(onSubmit) {
  const container = document.createElement("div");
  container.className = "card card-body shadow-sm";

  container.innerHTML = `
    <h5 class="mb-3 text-purple fw-bold">Registrar nuevo producto</h5>
    <form id="itemForm" autocomplete="off">
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label fw-semibold">Nombre del Producto</label>
          <input name="nombre" class="form-control input-theme" required />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Cantidad</label>
          <input name="cantidad" type="number" class="form-control input-theme" min="1" required />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Precio ($)</label>
          <input name="precio" type="number" step="0.01" class="form-control input-theme" min="0" required />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Categoría</label>
          <select name="categoria" class="form-select input-theme" required>
            <option value="" selected disabled>Seleccionar categoría</option>
            <option>Papelería</option>
            <option>Ropa y accesorios</option>
            <option>Belleza y cuidado personal</option>
            <option>Herramientas y ferretería</option>
            <option>Electrónicos y tecnología</option>
            <option>Hogar y cocina</option>
            <option>Juguetes y entretenimiento</option>
            <option>Alimentos y bebidas</option>
            <option>Automotriz</option>
            <option>Salud y farmacia</option>
            <option>Deportes y aire libre</option>
            <option>Oficina y escuela</option>
            <option>Otros</option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-purple px-4 fw-semibold" type="submit">
          Registrar producto
        </button>
      </div>
    </form>
  `;

  const form = container.querySelector("#itemForm");

  // === Tema claro / oscuro ===
  const updateInputTheme = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    form.querySelectorAll(".input-theme").forEach((el) => {
      if (isLight) {
        el.style.backgroundColor = "#ffffff";
        el.style.color = "#000000";
        el.style.border = "1px solid #ccc";
      } else {
        el.style.backgroundColor = "#1e1e1e";
        el.style.color = "#ffffff";
        el.style.border = "1px solid #555";
      }
    });
  };
  updateInputTheme();
  const observer = new MutationObserver(updateInputTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // === Envío de formulario ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      cantidad: Number(form.cantidad.value),
      precio: Number(form.precio.value),
      categoria: form.categoria.value,
      fecha: new Date().toISOString(),
    };

    if (!data.nombre || !data.categoria || isNaN(data.cantidad) || isNaN(data.precio)) return;
    onSubmit(data);
    form.reset();
  });

  return container;
}

// === EDITAR PRODUCTO ===
export function editProducto(producto, onSave) {
  const modal = document.createElement("div");
  modal.className = "modal fade show";
  modal.style.display = "block";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <div class="modal-header border-0">
          <h5 class="modal-title text-purple fw-bold">Editar producto</h5>
          <button class="btn-close" id="closeModal"></button>
        </div>
        <div class="modal-body">
          <form id="editForm" autocomplete="off">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input name="nombre" class="form-control" value="${producto.nombre}" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Cantidad</label>
              <input name="cantidad" type="number" class="form-control" value="${producto.cantidad}" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Precio ($)</label>
              <input name="precio" type="number" step="0.01" class="form-control" value="${producto.precio}" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Categoría</label>
              <select name="categoria" class="form-select">
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
                      `<option value="${cat}" ${cat === producto.categoria ? "selected" : ""}>${cat}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="text-end">
              <button class="btn btn-purple" type="submit">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Cerrar modal
  modal.querySelector("#closeModal").addEventListener("click", () => modal.remove());

  // Guardar cambios
  modal.querySelector("#editForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedData = {
      nombre: e.target.nombre.value.trim(),
      cantidad: Number(e.target.cantidad.value),
      precio: Number(e.target.precio.value),
      categoria: e.target.categoria.value,
      fecha: new Date().toISOString(),
    };

    onSave(updatedData);
    modal.remove();
  });
}
