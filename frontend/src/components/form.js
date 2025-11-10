// === FORMULARIO (Registrar producto) ===
export function createForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "form-container";

  form.innerHTML = `
    <h2>Registrar producto</h2>
    <div class="form-group">
      <label for="nombre">Nombre</label>
      <input id="nombre" type="text" placeholder="Nombre del producto" required />
      
      <label for="cantidad">Cantidad</label>
      <input id="cantidad" type="number" placeholder="Cantidad" required />
      
      <label for="precio">Precio ($)</label>
      <input id="precio" type="number" step="0.01" placeholder="Precio" required />
      
      <label for="categoria">Categoría</label>
      <input id="categoria" type="text" placeholder="Categoría" />
      
      <button type="submit" class="btn-registrar">Registrar</button>
    </div>
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
