// ✅ URL base del backend (sin doble barra)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);
  return await res.json();
}

export async function createProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateProducto(id, data) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteProducto(id) {
  await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
}
