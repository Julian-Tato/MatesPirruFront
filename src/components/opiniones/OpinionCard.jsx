import { Star, Eye } from "lucide-react";

export default function OpinionCard({ opinion, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition-all hover:border-emerald-800 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
          {opinion.nombre}
          <span className="text-xs font-normal text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> Ver detalle
          </span>
        </h3>
        <span className="text-xs text-neutral-400">{opinion.fecha}</span>
      </div>

      <div className="mt-1 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < opinion.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}`} 
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-2">
        "{opinion.comentario}"
      </p>

      {opinion.imagen && (
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
            <img src={opinion.imagen} alt="Foto del cliente" className="h-full w-full object-cover" />
          </div>
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
            Incluye foto real 📸
          </span>
        </div>
      )}
    </div>
  );
}