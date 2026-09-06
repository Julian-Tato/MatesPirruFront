import ProductCard from "./ProductCard";

export default function ProductGrid({ productos, esAdmin, onAgregarCarrito, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return (
      <p className="px-8 py-16 text-center text-sm text-neutral-500">
        No encontramos productos con ese filtro.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-8 pb-12 sm:grid-cols-3 md:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          esAdmin={esAdmin}
          onAgregarCarrito={onAgregarCarrito}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}
