import { Search, ChevronDown } from "lucide-react";

export default function FilterBar({
  categorias,
  categoriaActiva,
  onCategoriaChange,
  busqueda,
  onBusquedaChange,
  orden,
  onOrdenChange,
}) {
  return (
    <div className="flex flex-col gap-5 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
      
      {/* 1. CATEGORÍAS (Tu estilo elegido de Píldoras) */}
      <div className="flex flex-wrap gap-2">
        {categorias.map((cat) => {
          const activa = cat === categoriaActiva;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoriaChange(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 shadow-sm ${
                activa
                  ? "bg-emerald-900 text-white shadow-emerald-900/30 scale-105"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-emerald-700/50 hover:bg-emerald-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 2. BÚSQUEDA Y ORDENAMIENTO */}
      <div className="flex flex-col gap-3 sm:flex-row">
        
        {/* Input de Búsqueda Estilizado */}
        <div className="relative group">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 transition-colors group-hover:text-emerald-700" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Buscar tu mate ideal..."
            className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-700 shadow-sm transition-all duration-300 placeholder:text-stone-400 hover:border-emerald-700/50 hover:bg-emerald-50/30 focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10 sm:w-64"
          />
        </div>

        {/* Select de Ordenamiento Estilizado */}
        <div className="relative group">
          <select
            value={orden}
            onChange={(e) => onOrdenChange(e.target.value)}
            // 'appearance-none' borra la flecha fea del navegador para usar la nuestra
            className="appearance-none w-full rounded-full border border-stone-200 bg-white px-5 py-2.5 pr-10 text-sm font-medium text-stone-600 shadow-sm transition-all duration-300 hover:border-emerald-700/50 hover:bg-emerald-50/30 hover:text-emerald-900 focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10 cursor-pointer sm:w-auto"
          >
            <option value="relevancia">Ordenar por...</option>
            <option value="precio_asc">Menor precio</option>
            <option value="precio_desc">Mayor precio</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
          {/* Flecha personalizada de Lucide */}
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 transition-colors group-hover:text-emerald-700" />
        </div>

      </div>
    </div>
  );
}