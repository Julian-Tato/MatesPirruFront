import { Star, Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OpinionForm({
  nombre, setNombre,
  comentario, setComentario,
  rating, setRating,
  imagen, setImagen,
  enviado,
  handleImagenChange,
  agregarOpinion
}) {
  return (
    <div className="rounded-3xl border border-emerald-900/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md sticky top-24">
      <h2 className="font-serif text-lg font-bold text-white mb-1">
        Dejanos tu opinión
      </h2>
      <p className="text-xs text-emerald-200/70 mb-5">
        Subí tu foto y contanos qué te pareció tu mate.
      </p>

      {enviado && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-950/80 p-3 text-xs text-emerald-300 border border-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
          <span>¡Gracias por tu opinión! Fue publicada con éxito.</span>
        </div>
      )}

      <form onSubmit={agregarOpinion} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-emerald-200/80 mb-1">Tu Nombre</label>
          <input 
            type="text" 
            required
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white placeholder-emerald-700 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-emerald-200/80 mb-1">Calificación</label>
          <select 
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:border-emerald-600 focus:outline-none"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5 - Excelente)</option>
            <option value={4}>⭐⭐⭐⭐ (4 - Muy bueno)</option>
            <option value={3}>⭐⭐⭐ (3 - Bueno)</option>
            <option value={2}>⭐⭐ (2 - Regular)</option>
            <option value={1}>⭐ (1 - Malo)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-emerald-200/80 mb-1">Comentario</label>
          <textarea 
            required
            rows={3}
            placeholder="Contá qué te pareció el mate..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white placeholder-emerald-700 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-emerald-200/80 mb-1">Subir Foto (Opcional)</label>
          <label className="flex items-center justify-center gap-2 w-full rounded-xl border border-dashed border-emerald-800/60 bg-[#0f1711] px-3 py-3 text-xs text-emerald-300 hover:bg-emerald-950/50 transition-colors cursor-pointer">
            <Upload className="h-4 w-4 text-[#d4af37]" />
            <span>{imagen ? "Foto cargada con éxito" : "Sacar foto / Elegir archivo"}</span>
            <input type="file" accept="image/*" onChange={handleImagenChange} className="hidden" />
          </label>
        </div>

        <Button 
          type="submit"
          className="w-full h-11 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-sm font-medium cursor-pointer shadow-lg"
        >
          Publicar Opinión
        </Button>
      </form>
    </div>
  );
}