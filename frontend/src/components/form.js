// === FORMULARIO (Registrar producto) ===
export function createForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "p-4 rounded-3";
  form.style.backgroundColor = "#1a1a1a";
  form.style.border = "1px solid #9b5de5";
  form.style.color = "#fff";

  form.innerHTML = `
    <h5 class="fw-bold mb-4" style="color:#9b5de5;">Registrar nuevo producto</h5>
    <div class="row g-3">

      <div class="col-md-3">
        <label for="nombre" class="form-label fw-semibold" style="color:#fff;">Nombre del producto</label>
        <input 
          id="nombre"
          name="nombre"
          type="text"
          class="form-control"
          placeholder="Nombre del producto"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5; border-radius:6px;"
          required
        />
      </div>

      <div class="col-md-3">
        <label for="cantidad" class="form-label fw-semibold" style="color:#fff;">Cantidad</label>
        <input 
          id="cantidad"
          name="cantidad"
          type="number"
          min="0"
          class="form-control"
          placeholder="Cantidad"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5; border-radius:6px;"
          required
        />
      </div>

      <div class="col-md-3">
        <label for="precio" class="form-label fw-semibold" style="color:#fff;">Precio ($)</label>
        <input 
          id="precio"
          name="precio"
          type="number"
          step="0.01"
          min="0"
          class="form-control"
          placeholder="Precio"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5; border-radius:6px;"
          required
        />
      </div>

      <div class="col-md-3">
        <label for="categoria" class="form-label fw-semibold" style="color:#fff;">Categoría</label>
        <select 
          id="categoria"
          name="categoria"
          class="form-select"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5; border-radius:6px;"
          required
        >
          <option value="" disabled selected>Seleccionar categoría</option>
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
      <button 
        type="submit" 
        class="btn fw-semibold px-4"
        style="background-color:#9b5de5; color:white; border:none; border-radius:8px;"
      >
        Registrar producto
      </button>
    </div>
  `;

  // === Evento Submit ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Se capturan los datos usando los IDs correctos
    const data = {
      nombre: form.querySelector("#nombre").value.trim(),
      cantidad: Number(form.querySelector("#cantidad").value),
      precio: Number(form.querySelector("#precio").value),
      categoria: form.querySelector("#categoria").value,
    };

    // Enviar datos al callback (que llama al API)
    onSubmit(data);
    form.reset();
  });

  return form;
}
