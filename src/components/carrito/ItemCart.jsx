import { Trash2 } from "lucide-react";

export default function ItemCart({ item, onRemove }) {
  const nombreItem = item.nombre || item.name || "Mate artesanal";
  const precioItem = Number(item.precio || item.price || 0);
  const cantidadItem = Number(item.quantity || item.cantidad || 1);
  const tipoItem = item.tipo || item.material || item.categoria;
  const imagenItem = item.imagen || item.img || item.image || "/placeholder.jpg";

  return (
    <div className="flex items-center gap-3 py-2 border-b border-emerald-900/30">
      <img 
        src={imagenItem} 
        alt={nombreItem} 
        className="h-14 w-14 rounded-xl object-cover border border-emerald-900/50" 
      />
      <div className="flex-1">
        <h4 className="text-xs font-semibold text-white">{nombreItem}</h4>
        {tipoItem && <p className="text-[10px] text-emerald-400">Tipo: {tipoItem}</p>}
        <p className="text-[10px] text-emerald-200/70">Cant: {cantidadItem}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-emerald-300">
          ${(precioItem * cantidadItem).toLocaleString()}
        </span>
        {onRemove && (
          <button 
            onClick={() => onRemove(item.id)} 
            className="text-emerald-500/70 hover:text-red-400 p-1 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}