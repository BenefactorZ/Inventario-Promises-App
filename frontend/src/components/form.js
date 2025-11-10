// ===== FORMULARIO DE REGISTRO =====
export function createForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "max-w-xl mx-auto bg-[#1a1a1a] p-6 rounded-2xl shadow-lg";

  form.innerHTML = `
    <h2 class="text-2xl font-semibold text-purple-400 mb-6">Registrar producto</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-purple-300 font-medium mb-1">Nombre</label>
        <input id="nombre" type="text" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" placeholder="Nombre del producto" required />
      </div>

      <div>
        <label class="block text-purple-300 font-medium mb-1">Cantidad</label>
        <input id="cantidad" type="number" min="1" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" placeholder="Cantidad" required />
      </div>

      <div>
        <label class="block text-purple-300 font-medium mb-1">Precio ($)</label>
        <input id="precio" type="number" min="0" step="0.01" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" placeholder="Precio" required />
      </div>

      <div>
        <label class="block text-purple-300 font-medium mb-1">Categoría</label>
        <input id="categoria" type="text" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" placeholder="Categoría" />
      </div>
    </div>

    <div class="mt-6 text-center">
      <button type="submit" class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition">
        Registrar
      </button>
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

// ===== MODAL DE EDICIÓN =====
export function editProducto(producto, onSave) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50";

  modal.innerHTML = `
    <div class="bg-[#1a1a1a] text-purple-200 p-6 rounded-2xl shadow-lg w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-purple-400">Editar producto</h2>
        <button id="close-modal" class="text-gray-400 hover:text-purple-400 text-lg">✕</button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium">Nombre</label>
          <input id="edit-nombre" type="text" value="${producto.nombre}" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" />
        </div>

        <div>
          <label class="block text-sm font-medium">Cantidad</label>
          <input id="edit-cantidad" type="number" value="${producto.cantidad}" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" />
        </div>

        <div>
          <label class="block text-sm font-medium">Precio ($)</label>
          <input id="edit-precio" type="number" value="${producto.precio}" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" />
        </div>

        <div>
          <label class="block text-sm font-medium">Categoría</label>
          <input id="edit-categoria" type="text" value="${producto.categoria}" class="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-400" />
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <button id="save-edit" class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition">Guardar</button>
        <button id="close-modal-bottom" class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition">Cancelar</button>
      </div>
    </div>
  `;

  // Eventos del modal
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
