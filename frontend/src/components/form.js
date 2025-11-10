// === FORMULARIO (Registrar producto) ===
export function createForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "form-container";

 container.innerHTML = `
    <h5 class="mb-3 text-purple fw-bold">Registrar nuevo producto</h5>
    <form id="itemForm" autocomplete="off">
      <div class="row g-3">

        <div class="col-md-3">
          <label class="form-label fw-semibold">Nombre del Producto</label>
          <input 
            name="name" 
            class="form-control input-theme" 
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Cantidad</label>
          <input 
            name="qty" 
            type="number" 
            class="form-control input-theme" 
            min="0" 
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Precio ($)</label>
          <input 
            name="price" 
            type="number" 
            step="0.01" 
            class="form-control input-theme" 
            min="0" 
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Categoría</label>
          <select name="category" class="form-select input-theme" required>
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: form.querySelector("#nombre").value.trim(),
      cantidad: form.querySelector("#cantidad").value,
      precio: form.querySelector("#precio").value,
      categoria: form.querySelector("#categoria").value,
    };

    onSubmit(data);
    form.reset();
  });

  return form;
}

// === MODAL (Editar producto) ===
export function editProducto(producto, onSave) {
  const modal = document.createElement("div");
  modal.className = "modal fade show";
  modal.style.display = "block";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content p-3" style="background-color: var(--bs-dark, #1a1a1a); color: #fff; border-radius: 10px;">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" style="color: #9b5de5;">Editar producto</h5>
          <button class="btn-close" id="closeModal" style="filter: invert(1);"></button>
        </div>
        <div class="modal-body">
          <form id="editForm" autocomplete="off">
            <div class="mb-3">
              <label class="form-label" style="color: #9b5de5;">Nombre</label>
              <input name="nombre" class="form-control"
                style="background-color: #2b2b2b; color: #fff; border: 1px solid #9b5de5;"
                value="${producto.nombre}" required />
            </div>
            <div class="mb-3">
              <label class="form-label" style="color: #9b5de5;">Cantidad</label>
              <input name="cantidad" type="number" class="form-control"
                style="background-color: #2b2b2b; color: #fff; border: 1px solid #9b5de5;"
                value="${producto.cantidad}" required />
            </div>
            <div class="mb-3">
              <label class="form-label" style="color: #9b5de5;">Precio ($)</label>
              <input name="precio" type="number" step="0.01" class="form-control"
                style="background-color: #2b2b2b; color: #fff; border: 1px solid #9b5de5;"
                value="${producto.precio}" required />
            </div>
            <div class="mb-3">
              <label class="form-label" style="color: #9b5de5;">Categoría</label>
              <select name="categoria" class="form-select"
                style="background-color: #2b2b2b; color: #fff; border: 1px solid #9b5de5;">
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
                        cat === producto.categoria ? "selected" : ""
                      }>${cat}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="text-end">
              <button class="btn" type="submit"
                style="background-color: #9b5de5; color: white; font-weight: 600; padding: 8px 20px; border-radius: 8px;">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // === Cerrar modal ===
  modal.querySelector("#closeModal").addEventListener("click", () => modal.remove());

  // === Guardar cambios ===
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
