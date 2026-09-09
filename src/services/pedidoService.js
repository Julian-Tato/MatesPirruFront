// src/services/pedidoService.js

const API_BASE_URL = "https://localhost:7045/api/pedidos";

export async function enviarPedido(ordenData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay un token de sesión activo. Iniciá sesión nuevamente.");
  }

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // La pulsera VIP para el backend de Tato
    },
    body: JSON.stringify(ordenData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.mensaje || "Error al procesar el pedido en el servidor.");
  }

  return await response.json();
}