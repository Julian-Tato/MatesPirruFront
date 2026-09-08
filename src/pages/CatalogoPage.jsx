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
    // 1. Contenedor exterior: Ocupa el 100% del ancho (w-full) y aplica el mismo color de fondo de tu Inicio.
    <div className="w-full min-h-screen bg-[#F7F4EE] py-12">
      
      {/* 2. Contenedor interior: Centra el contenido y le pone un tope de ancho para que no se deforme en pantallas gigantes. */}
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
            onAgregarCarrito={(p) => console.log("Agregar al carrito:", p.nombre)}
            onEditar={(p) => console.log("Editar:", p.nombre)}
            onEliminar={(p) => console.log("Eliminar:", p.nombre)}
          />
        )}
      </div>
    </div>
  );
}
