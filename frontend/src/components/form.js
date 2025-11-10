// === FORMULARIO ORIGINAL (DISEÑO RESTAURADO) ===
export function createForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "form-container"; // usa tu clase original si la tenías en CSS

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

// === MODAL DE EDICIÓN (mantiene el diseño morado actual) ===
export function editProducto(producto, onSave) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Editar producto</h2>
        <button id="close-modal" class="close-btn">✕</button>
      </div>

      <label>Nombre</label>
      <input id="edit-nombre" type="text" value="${producto.nombre}" />

      <label>Cantidad</label>
      <input id="edit-cantidad" type="number" value="${producto.cantidad}" />

      <label>Precio ($)</label>
      <input id="edit-precio" type="number" value="${producto.precio}" />

      <label>Categoría</label>
      <input id="edit-categoria" type="text" value="${producto.categoria}" />

      <div class="modal-actions">
        <button id="save-edit" class="save-btn">Guardar</button>
        <button id="close-modal-bottom" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  `;

  // Eventos
  modal.querySelector("#close-modal").addEventListener("click", () => modal.remove());
  modal.querySelector("#close-modal-bottom").addEventListener("click", () => modal.remove());
  modal.querySelector("#save-edit").addEventListener("click", () => {
    const updated = {
      ...producto,
      nombre: modal.querySelector("#edit-nombre").value.trim(),
      cantidad: modal.querySelector("#edit-cantidad").value,
      precio: modal.querySelector("#edit-precio").value,
      categoria: modal.querySelector("#edit-categoria").value,
    };
    onSave(updated);
    modal.remove();
  });

  document.body.appendChild(modal);
}
