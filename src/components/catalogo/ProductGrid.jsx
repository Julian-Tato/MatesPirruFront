import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";

export default function ProductGrid({ productos, esAdmin, onAgregarCarrito, onEditar, onEliminar }) {
  // Estado para controlar qué producto se muestra en el modal (Tu lógica intacta)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // ESTADO VACÍO: Estilo premium copiado de Figma
  if (productos.length === 0) {
    return (
      <div className="mx-4 mb-12 rounded-3xl border border-[#e8e4db] bg-white/40 py-32 text-center shadow-sm backdrop-blur-sm">
        <p className="mb-6 text-6xl opacity-80">🌿</p>
        <p className="mb-2 text-2xl font-semibold text-[#0f1711]" style={{ fontFamily: "var(--font-display)" }}>
          No encontramos resultados
        </p>
        <p className="mx-auto max-w-sm text-emerald-800/70">
          Probá ajustando los filtros o la búsqueda para encontrar el mate perfecto para vos.
        </p>
      </div>
    );
  }

  // GRILLA: Tu estructura de mapeo original con un gap ajustado para que las tarjetas respiren
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 pb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            esAdmin={esAdmin}
            onAgregarCarrito={onAgregarCarrito}
            onEditar={onEditar}
            onEliminar={onEliminar}
            onSeleccionar={setProductoSeleccionado} // Le pasamos la función al componente hijo
          />
        ))}
      </div>

      {/* El Modal Inteligente sigue funcionando igual */}
      <ProductDetailModal 
        producto={productoSeleccionado} 
        isOpen={!!productoSeleccionado} 
        onClose={() => setProductoSeleccionado(null)}
        onAgregarCarrito={onAgregarCarrito}
      />
    </>
  );
}