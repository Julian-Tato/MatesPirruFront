import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OpinionModal({ opinion, onClose }) {
  if (!opinion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-between pr-8">
          <h3 className="font-serif text-xl font-bold text-neutral-900">{opinion.nombre}</h3>
          <span className="text-xs text-neutral-400">{opinion.fecha}</span>
        </div>

        <div className="mt-2 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < opinion.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}`} 
            />
          ))}
        </div>

        <p className="mt-4 text-neutral-700 leading-relaxed text-base">
          "{opinion.comentario}"
        </p>

        {opinion.imagen && (
          <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 max-h-[350px] flex items-center justify-center">
            <img 
              src={opinion.imagen} 
              alt="Foto ampliada del cliente" 
              className="max-h-[350px] w-auto object-contain" 
            />
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onClose}
            className="rounded-xl bg-neutral-900 px-5 py-2 text-white hover:bg-neutral-800 text-xs"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}