// === FORMULARIO (Registrar producto) ===
export function createForm(onSubmit) {
  const container = document.createElement("div");
  container.className = "form-container card p-4 bg-dark text-light rounded-3 shadow-sm";

  container.innerHTML = `
    <h5 class="mb-3 text-purple fw-bold">Registrar nuevo producto</h5>
    <form id="itemForm" autocomplete="off">
      <div class="row g-3">

        <div class="col-md-3">
          <label class="form-label fw-semibold">Nombre del Producto</label>
          <input 
            id="nombre"
            name="nombre" 
            class="form-control input-theme" 
            placeholder="Nombre del producto"
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Cantidad</label>
          <input 
            id="cantidad"
            name="cantidad" 
            type="number" 
            class="form-control input-theme" 
            min="0" 
            placeholder="Cantidad"
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Precio ($)</label>
          <input 
            id="precio"
            name="precio" 
            type="number" 
            step="0.01" 
            class="form-control input-theme" 
            min="0" 
            placeholder="Precio"
            required 
          />
        </div>

        <div class="col-md-3">
          <label class="form-label fw-semibold">Categoría</label>
          <select id="categoria" name="categoria" class="form-select input-theme" required>
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

  // === Manejar envío (Netlify-compatible) ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: form.querySelector("#nombre").value.trim(),
      cantidad: Number(form.querySelector("#cantidad").value),
      precio: Number(form.querySelector("#precio").value),
      categoria: form.querySelector("#categoria").value,
      fecha: new Date().toISOString(),
    };

    onSubmit(data);
    form.reset();
  });

  return container;
}
