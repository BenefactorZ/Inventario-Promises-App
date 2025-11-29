const API_URL = "https://inventario-promises-app.onrender.com/api";

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
