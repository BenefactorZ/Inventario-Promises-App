// === REGISTRAR PRODUCTO ===
export function registrarProducto(onSubmit) {
  const container = document.createElement("div");
  container.className = "card mt-4 p-4 shadow";
  container.style.backgroundColor = "#1a1a1a";
  container.style.border = "1px solid #9b5de5";
  container.style.borderRadius = "12px";
  container.innerHTML = `
    <h2 class="fw-bold mb-4" style="color:#9b5de5;">Registrar producto</h2>
    <form id="productoForm" class="row g-3 align-items-end" autocomplete="off">
      <div class="col-md-3">
        <label class="form-label fw-semibold" style="color:#fff;">Nombre</label>
        <input name="nombre" class="form-control" placeholder="Nombre del producto"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5;" required>
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold" style="color:#fff;">Cantidad</label>
        <input name="cantidad" type="number" class="form-control" placeholder="Cantidad"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5;" required>
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold" style="color:#fff;">Precio ($)</label>
        <input name="precio" type="number" step="0.01" class="form-control" placeholder="Precio"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5;" required>
      </div>
      <div class="col-md-3">
        <label class="form-label fw-semibold" style="color:#fff;">Categoría</label>
        <select name="categoria" class="form-select"
          style="background-color:#2b2b2b; color:#fff; border:1px solid #9b5de5;">
          <option value="">Seleccionar...</option>
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
      <div class="col-md-2 text-end">
        <button type="submit" class="btn w-100 fw-semibold"
          style="background-color:#9b5de5; color:white; border:none; border-radius:8px;">
          Registrar
        </button>
      </div>
    </form>
  `;

  container.querySelector("#productoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: e.target.nombre.value.trim(),
      cantidad: Number(e.target.cantidad.value),
      precio: Number(e.target.precio.value),
      categoria: e.target.categoria.value || "Otros",
      fecha: new Date().toISOString(),
    };

    onSubmit(data);
    e.target.reset();
  });

  return container;
}
