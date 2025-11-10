// src/components/modal.js
export function editProducto(producto, onSave) {
  // Crear contenedor del modal
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");
  modal.innerHTML = `
    <div class="modal-container">
      <h2>Editar producto</h2>
      <form id="editForm">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" id="editNombre" value="${producto.nombre}" required />
        </div>
        <div class="form-group">
          <label>Precio:</label>
          <input type="number" id="editPrecio" value="${producto.precio}" required />
        </div>
        <div class="form-group">
          <label>Categoría:</label>
          <input type="text" id="editCategoria" value="${producto.categoria}" required />
        </div>
        <div class="modal-buttons">
          <button type="submit" class="btn-guardar">Guardar cambios</button>
          <button type="button" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `;

  // Estilos del modal (puedes personalizarlos)
  const style = document.createElement("style");
  style.textContent = `
    .modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex; justify-content: center; align-items: center;
      z-index: 9999;
    }
    .modal-container {
      background: #fff;
      color: #000;
      padding: 20px;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 0 15px rgba(0,0,0,0.3);
      animation: fadeIn 0.2s ease-in-out;
    }
    .form-group { margin-bottom: 12px; }
    label { display: block; margin-bottom: 4px; font-weight: bold; }
    input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 6px; }
    .modal-buttons { display: flex; justify-content: space-between; }
    .btn-guardar, .btn-cancelar {
      padding: 8px 14px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .btn-guardar { background: #28a745; color: #fff; }
    .btn-cancelar { background: #dc3545; color: #fff; }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(modal);

  // Cerrar modal
  modal.querySelector(".btn-cancelar").onclick = () => modal.remove();

  // Guardar cambios
  modal.querySelector("#editForm").onsubmit = (e) => {
    e.preventDefault();
    const updated = {
      nombre: document.getElementById("editNombre").value.trim(),
      precio: Number(document.getElementById("editPrecio").value),
      categoria: document.getElementById("editCategoria").value.trim(),
    };
    modal.remove();
    onSave(updated);
  };
}
