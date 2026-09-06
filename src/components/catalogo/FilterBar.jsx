import { Search, ShoppingBag, Pencil, Trash2 } from "lucide-react";



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
    <div className="flex flex-col gap-4 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {categorias.map((cat) => {
          const activa = cat === categoriaActiva;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoriaChange(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activa
                  ? "bg-emerald-800 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Buscar..."
            className="w-48 rounded-full border border-neutral-200 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <select
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value)}
          className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        >
          <option value="relevancia">Ordenar</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre A-Z</option>
        </select>
      </div>
    </div>
  );
}
