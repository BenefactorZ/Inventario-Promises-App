// === EDITAR PRODUCTO ===
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

  // Cerrar modal
  modal.querySelector("#closeModal").addEventListener("click", () => modal.remove());

  // Envío del formulario
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
