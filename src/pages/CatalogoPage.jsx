import { useProductos } from "../hooks/useProductos";
import Navbar from "../components/layout/Navbar";
import PageHeader from "../components/catalogo/PageHeader";
import FilterBar from "../components/catalogo/FilterBar";
import ProductGrid from "../components/catalogo/ProductGrid";

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

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
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
        <p className="px-8 py-16 text-center text-sm text-neutral-500">
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
          onAgregarCarrito={(p) => console.log("Agregar al carrito:", p.nombre)}
          onEditar={(p) => console.log("Editar:", p.nombre)}
          onEliminar={(p) => console.log("Eliminar:", p.nombre)}
        />
      )}
    </div>
  );
}
