const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7045/api";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  const data = await respuesta.json();

  if (!Array.isArray(data)) return [];

  // El backend devuelve categoria como el objeto completo { id, descripcion, estado }.
  // Lo achicamos acá a un string simple para que el resto de la app no tenga
  // que saber nada de esta forma anidada.
  return data.map((producto) => ({
    ...producto,
    categoria: producto.categoria?.descripcion ?? "Sin categoría",
  }));
}
