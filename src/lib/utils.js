export { cn } from "cn"

export function agregarAlCarrito(producto) {
  const carritoActual = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
  const prodId = producto.id || producto.idMate;
  const index = carritoActual.findIndex(item => item.id === prodId);

  if (index >= 0) {
    carritoActual[index].quantity += 1;
  } else {
    carritoActual.push({
      id: prodId,
      name: producto.nombre,
      price: producto.precio,
      quantity: 1,
      image: producto.urlImagen || producto.image,
      details: producto.descripcion || producto.details
    });
  }

  localStorage.setItem("mates_pirru_cart", JSON.stringify(carritoActual));

  // Disparamos el evento para que el Navbar se entere al instante y actualice el numerito
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: producto }));
}