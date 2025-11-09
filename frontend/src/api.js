const API_URL = "http://localhost:4000/api/productos";

export async function getProductos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createProducto(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateProducto(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteProducto(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
