// === EDITAR PRODUCTO ===
export function editProducto(producto, onSave) {
  const modal = document.createElement("div");
  modal.className = "modal fade show";
  modal.style.display = "block";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
  
  // Plantilla del modal
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content p-3 shadow-sm">
        <div class="modal-header border-0">
          <h5 class="modal-title text-purple fw-bold">Editar producto</h5>
          <button class="btn-close" id="closeModal"></button>
        </div>
        <div class="modal-body">
          <form id="editForm" autocomplete="off">
            <div class="row g-3">

              <div class="col-md-6">
                <label class="form-label fw-semibold">Nombre</label>
                <input 
                  name="nombre" 
                  class="form-control input-theme" 
                  value="${producto.nombre}" 
                  required 
                />
              </div>

              <div class="col-md-3">
                <label class="form-label fw-semibold">Cantidad</label>
                <input 
                  name="cantidad" 
                  type="number" 
                  class="form-control input-theme" 
                  value="${producto.cantidad}" 
                  min="0"
                  required 
                />
              </div>

              <div class="col-md-3">
                <label class="form-label fw-semibold">Precio ($)</label>
                <input 
                  name="precio" 
                  type="number" 
                  step="0.01" 
                  class="form-control input-theme" 
                  value="${producto.precio}" 
                  min="0"
                  required 
                />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Categoría</label>
                <select name="categoria" class="form-select input-theme" required>
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

            </div>

            <div class="d-flex justify-content-end mt-4">
              <button class="btn btn-purple px-4 fw-semibold" type="submit">
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

  // === Aplicar tema claro/oscuro igual que en createForm ===
  const form = modal.querySelector("#editForm");
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

  // === Envío del formulario ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value.trim();
    const cantidad = Number(e.target.cantidad.value);
    const precio = Number(e.target.precio.value);
    const categoria = e.target.categoria.value;

    const updatedData = {
      nombre,
      cantidad,
      precio,
      // Si el usuario no cambia la categoría, se mantiene la anterior
      categoria: categoria || producto.categoria,
      fecha: new Date().toISOString(),
    };

    onSave(updatedData);
    modal.remove();
  });
}
