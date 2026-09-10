import { useProductos } from "../hooks/useProductos";
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

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    // Usamos pb-12 en vez de py-12 para que el encabezado arranque pegado al Navbar sin huecos arriba
    <div className="w-full min-h-screen bg-[#94FF68] pb-12">

      {/* El PageHeader ahora está AFUERA del contenedor centrado para expandirse a los bordes */}
      <PageHeader cantidad={productos.length} />
      
      {/* Contenedor central (max-w-7xl) exclusivo para alinear los filtros y la grilla */}
      <div className="mx-auto mt-8 max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
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