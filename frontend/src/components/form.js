// === CREAR / EDITAR PRODUCTO ===
export function createForm(onSubmit, editingItem = null) {
  const container = document.createElement("div");
  container.className = "card card-body shadow-sm";

  // Título dinámico
  const titulo = editingItem
    ? "Editar producto"
    : "Registrar nuevo producto";

  const textoBoton = editingItem
    ? "Guardar cambios"
    : "Registrar producto";

  container.innerHTML = `
    <h5 class="mb-3 text-purple fw-bold">${titulo}</h5>
    <form id="itemForm" autocomplete="off">
      <div class="row g-3">

        <div class="col-md-3">
          <label class="form-label fw-semibold">Nombre del Producto</label>
          <input 
            name="nombre" 
            class="form-control input-theme" 
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Cantidad</label>
          <input 
            name="cantidad" 
            type="number" 
            class="form-control input-theme" 
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
            min="0" 
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Categoría</label>
          <select name="categoria" class="form-select input-theme" required>
            <option value="" disabled>Seleccionar categoría</option>
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
          ${textoBoton}
        </button>
      </div>
    </form>
  `;

  const form = container.querySelector("#itemForm");

  // ✅ Si estamos editando, rellenar los campos
  if (editingItem) {
    form.nombre.value = editingItem.nombre;
    form.cantidad.value = editingItem.cantidad;
    form.precio.value = editingItem.precio;
    form.categoria.value = editingItem.categoria;
  } else {
    form.categoria.value = ""; // Limpia la selección
  }

  // === APLICAR TEMA CLARO/OSCURO ===
  const updateInputTheme = () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
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
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // === ENVÍO DEL FORMULARIO ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fecha = new Date().toISOString();

    const data = {
      nombre: form.nombre.value.trim(),
      cantidad: Number(form.cantidad.value),
      precio: Number(form.precio.value),
      categoria: form.categoria.value.trim(),
      fecha,
    };

    if (
      !data.nombre ||
      !data.categoria ||
      isNaN(data.cantidad) ||
      isNaN(data.precio)
    )
      return;

    onSubmit(data);
    form.reset();
  });

  return container;
}
