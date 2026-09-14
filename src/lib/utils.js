export { cn } from "cn"

export function agregarAlCarrito(producto) {
  const carritoActual = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
  const prodId = producto.id || producto.idMate;
  const index = carritoActual.findIndex(item => item.id === prodId);

  // LA MAGIA: Leemos la cantidad que trae el producto. Si viene vacío (botón rápido), asume 1.
  const cantidadAAgregar = producto.quantity || 1;

  if (index >= 0) {
    // Reemplazamos el "+= 1" rígido por la variable dinámica
    carritoActual[index].quantity += cantidadAAgregar;
  } else {
    carritoActual.push({
      id: prodId,
      name: producto.nombre,
      price: producto.precio,
      // Reemplazamos el "1" rígido por la variable dinámica
      quantity: cantidadAAgregar,
      image: producto.urlImagen || producto.image,
      details: producto.descripcion || producto.details
    });
  }

  localStorage.setItem("mates_pirru_cart", JSON.stringify(carritoActual));

  // Disparamos el evento para que el Navbar se entere al instante y actualice el numerito
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: producto }));
}