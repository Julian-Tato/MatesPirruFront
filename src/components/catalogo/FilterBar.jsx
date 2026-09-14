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
      
      {/* 1. CATEGORÍAS (Tu estructura, colores de Figma) */}
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
                  ? "bg-[#d4af37] text-[#0f1711] shadow-md shadow-[#d4af37]/20 scale-105"
                  : "bg-[#0f1711] text-emerald-100/80 border border-emerald-800/30 hover:bg-[#1a2e21] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 2. BÚSQUEDA Y ORDENAMIENTO (Tu estructura, colores de Figma) */}
      <div className="flex flex-col gap-3 sm:flex-row">
        
        {/* Input de Búsqueda Estilizado */}
        <div className="relative group">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600/60 transition-colors group-focus-within:text-[#d4af37]" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Buscar tu mate ideal..."
            className="w-full rounded-full border border-emerald-900/50 bg-[#0f1711] py-2.5 pl-10 pr-4 text-sm text-white shadow-sm transition-all duration-300 placeholder:text-emerald-600/50 hover:border-emerald-700/50 focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/10 sm:w-64"
          />
        </div>

        {/* Select de Ordenamiento Estilizado */}
        <div className="relative group">
          <select
            value={orden}
            onChange={(e) => onOrdenChange(e.target.value)}
            // 'appearance-none' borra la flecha fea del navegador para usar la nuestra
            className="appearance-none w-full rounded-full border border-emerald-900/50 bg-[#0f1711] px-5 py-2.5 pr-10 text-sm font-medium text-emerald-100 shadow-sm transition-all duration-300 hover:border-emerald-700/50 hover:bg-[#1a2e21] hover:text-white focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/10 cursor-pointer sm:w-auto"
          >
            <option value="relevancia">Ordenar por...</option>
            <option value="precio_asc">Menor precio</option>
            <option value="precio_desc">Mayor precio</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
          {/* Flecha personalizada de Lucide */}
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600/60 transition-colors group-hover:text-[#d4af37]" />
        </div>

      </div>
    </div>
  );
}