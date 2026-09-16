import { Trash2 } from "lucide-react";

export default function ItemCart({ item, onRemove }) {
  const nombreItem = item.name || item.nombre || "Mate artesanal";
  const precioItem = Number(item.price || item.precio || 0);
  const cantidadItem = Number(item.quantity || item.cantidad || 1);
  
  const imagenItem = item.image || item.imageUrl || "https://placehold.co/600x600/131f17/d4af37?text=Mate";

  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-emerald-900/40">
      {/* Imagen más limpia y con mejor borde */}
      <img 
        src={imagenItem} 
        alt={nombreItem} 
        className="h-16 w-16 rounded-2xl object-cover border border-emerald-800/60 shadow-md bg-[#0a100b]" 
      />
      
      {/* Información principal con letra más legible */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white tracking-wide truncate">{nombreItem}</h4>
        <p className="text-xs text-emerald-300/90 mt-0.5">
          Cantidad: <span className="font-semibold text-white">{cantidadItem}</span>
        </p>
      </div>

      {/* Precio y botón de eliminar alineados */}
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-sm font-semibold text-[#d4af37]">
          ${(precioItem * cantidadItem).toLocaleString("es-AR")}
        </span>
        {onRemove && (
          <button 
            onClick={() => onRemove(item.id)} 
            className="text-emerald-500/60 hover:text-red-400 p-1 transition-colors cursor-pointer rounded-lg hover:bg-red-500/10"
            title="Eliminar producto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}