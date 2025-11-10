// src/components/form.js

export function createForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <input type="text" id="nombre" placeholder="Nombre del producto" required />
    <input type="number" id="cantidad" placeholder="Cantidad" required />
    <input type="text" id="descripcion" placeholder="Descripción" />
    <button type="submit">Guardar</button>
  `;
  return form;
}
