import { Star, Camera } from "lucide-react";

export default function OpinionCard({ opinion, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="rounded-3xl border border-emerald-900/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md cursor-pointer transition-all hover:border-emerald-700/60"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-base font-bold text-white">{opinion.nombre}</h3>
        <span className="text-xs text-emerald-400/80">{opinion.fecha || "Reciente"}</span>
      </div>

      {/* Estrellas */}
      <div className="flex gap-1 text-[#d4af37] mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < opinion.rating ? "fill-[#d4af37]" : "text-neutral-600"}`} 
          />
        ))}
      </div>

      <p className="text-sm text-emerald-100/90 italic mb-4">"{opinion.comentario}"</p>

      {opinion.imagen && (
        <div className="flex items-center gap-3">
          <img 
            src={opinion.imagen} 
            alt="Foto de opinión" 
            className="h-16 w-16 rounded-xl object-cover border border-emerald-900/50 shadow-sm" 
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/50">
            <Camera className="h-3.5 w-3.5 text-[#d4af37]" /> Incluye foto real
          </span>
        </div>
      )}
    </div>
  );
}