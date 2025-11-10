// src/components/form.js

// ✅ Formulario de creación
export function createForm(onSubmit) {
  const form = document.createElement("form");
  form.classList.add("form-container");

  form.innerHTML = `
    <h2 class="text-purple-500 font-semibold mb-4">Registrar producto</h2>

    <label>Nombre</label>
    <input id="nombre" type="text" placeholder="Nombre del producto" required />

    <label>Cantidad</label>
    <input id="cantidad" type="number" min="1" placeholder="Cantidad" required />

    <label>Precio ($)</label>
    <input id="precio" type="number" min="0" step="0.01" placeholder="Precio" required />

    <label>Categoría</label>
    <input id="categoria" type="text" placeholder="Categoría" />

    <button type="submit" class="btn-registrar">Registrar</button>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      nombre: form.querySelector("#nombre").value,
      cantidad: form.querySelector("#cantidad").value,
      precio: form.querySelector("#precio").value,
      categoria: form.querySelector("#categoria").value,
    };
    onSubmit(data);
    form.reset();
  });

  return form;
}

// ✅ Modal de edición
export function editProducto(producto, onSave) {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal-content">
      <h2 class="text-purple-500 font-semibold mb-4">Editar producto</h2>

      <label>Nombre</label>
      <input id="edit-nombre" type="text" value="${producto.nombre}" />

      <label>Cantidad</label>
      <input id="edit-cantidad" type="number" value="${producto.cantidad}" />

      <label>Precio ($)</label>
      <input id="edit-precio" type="number" value="${producto.precio}" />

      <label>Categoría</label>
      <input id="edit-categoria" type="text" value="${producto.categoria}" />

      <div class="modal-buttons">
        <button id="save-edit" class="btn-guardar">Guardar cambios</button>
        <button id="close-modal" class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  `;

  // === Eventos ===
  modal.querySelector("#close-modal").addEventListener("click", () => modal.remove());

  modal.querySelector("#save-edit").addEventListener("click", () => {
    const updated = {
      ...producto,
      nombre: modal.querySelector("#edit-nombre").value,
      cantidad: modal.querySelector("#edit-cantidad").value,
      precio: modal.querySelector("#edit-precio").value,
      categoria: modal.querySelector("#edit-categoria").value,
    };
    onSave(updated);
    modal.remove();
  });

  document.body.appendChild(modal);
}
