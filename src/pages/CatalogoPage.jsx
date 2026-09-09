import { useProductos } from "../hooks/useProductos";
import Navbar from "../components/layout/Navbar";
import PageHeader from "../components/catalogo/PageHeader";
import FilterBar from "../components/catalogo/FilterBar";
import ProductGrid from "../components/catalogo/ProductGrid";
import { agregarAlCarrito } from "@/lib/utils";

export default function CatalogoPage({ esAdmin = false }) {
  const {
    productos,
    categorias,
    loading,
    error,
    categoriaActiva,
    setCategoriaActiva,
    busqueda,
    setBusqueda,
    orden,
    setOrden,
  } = useProductos();

  // Función simplificada: delega toda la lógica limpia a la librería utils
  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F4EE] py-12">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        
        <PageHeader cantidad={productos.length} />
        
        <FilterBar
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          onCategoriaChange={setCategoriaActiva}
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
          orden={orden}
          onOrdenChange={setOrden}
        />

        {loading && (
          <p className="px-8 py-16 text-center text-sm text-stone-500">
            Cargando productos...
          </p>
        )}

        {error && (
          <p className="px-8 py-16 text-center text-sm text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <ProductGrid
            productos={productos}
            esAdmin={esAdmin}
            onAgregarCarrito={handleAgregarCarrito}
            onEditar={(p) => console.log("Editar:", p.nombre)}
            onEliminar={(p) => console.log("Eliminar:", p.nombre)}
          />
        )}
      </div>
    </div>
  );
}