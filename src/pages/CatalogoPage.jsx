import { useProductos } from "../hooks/useProductos";
import PageHeader from "../components/catalogo/PageHeader";
import FilterBar from "../components/catalogo/FilterBar";
import ProductGrid from "../components/catalogo/ProductGrid";
import Pagination from "../components/catalogo/Paginacion"; // <-- 1. Importamos el componente
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
    // <-- 2. Extraemos los nuevos estados que vamos a agregar al hook
    paginaActual, 
    totalPaginas,
    setPaginaActual
  } = useProductos();

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f8f4] pb-12">
      {/* Podemos usar productos.length temporalmente o traer el totalItems del hook después */}
      <PageHeader cantidad={productos.length} /> 
      
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
          <>
            <ProductGrid
              productos={productos}
              esAdmin={esAdmin}
              onAgregarCarrito={handleAgregarCarrito}
              onEditar={(p) => console.log("Editar:", p.nombre)}
              onEliminar={(p) => console.log("Eliminar:", p.nombre)}
            />
            
            {/* <-- 3. Agregamos la botonera debajo de la grilla */}
            <Pagination 
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
            />
          </>
        )}
      </div>
    </div>
  );
}