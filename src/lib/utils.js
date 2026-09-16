export { cn } from "cn"

export function agregarAlCarrito(producto) {
  const carritoActual = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
  const prodId = producto.id || producto.idMate;
  const index = carritoActual.findIndex(item => item.id === prodId);

  // Leemos la cantidad que trae el producto. Si viene vacío, asume 1.
  const cantidadAAgregar = producto.quantity || 1;

  // Extracción robusta de la imagen sin importar cómo venga de la base de datos
  const imagenFinal = 
    producto.imageUrl || 
    producto.imagen || 
    producto.img || 
    producto.image || 
    producto.urlImagen ||
    producto.foto ||
    (producto.imagenes?.[0]?.url) || 
    (typeof producto.imagenes?.[0] === 'string' ? producto.imagenes[0] : null) || 
    "https://placehold.co/600x600/131f17/d4af37?text=Mate";

  if (index >= 0) {
    // Si ya existe, sumamos la cantidad y aseguramos que tenga la imagen actualizada
    carritoActual[index].quantity += cantidadAAgregar;
    carritoActual[index].image = carritoActual[index].image || imagenFinal;
    carritoActual[index].imageUrl = carritoActual[index].imageUrl || imagenFinal;
  } else {
    // Si es nuevo, guardamos el objeto completo con su imagen asegurada
    carritoActual.push({
      id: prodId,
      name: producto.nombre || producto.name,
      price: producto.precio || producto.price,
      quantity: cantidadAAgregar,
      image: imagenFinal,
      imageUrl: imagenFinal,
      details: producto.descripcion || producto.details
    });
  }

  localStorage.setItem("mates_pirru_cart", JSON.stringify(carritoActual));

  // Disparamos el evento para que el Navbar y el Drawer se enteren al instante
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: producto }));
}