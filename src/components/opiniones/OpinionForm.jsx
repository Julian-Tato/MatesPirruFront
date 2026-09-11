import { MessageSquarePlus, CheckCircle, Camera } from "lucide-react";
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
    <div className="sticky top-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-neutral-900">
        <MessageSquarePlus className="h-5 w-5 text-emerald-800" /> Dejanos tu opinión
      </h2>
      <p className="mt-1 text-xs text-neutral-500">
        Subí tu foto y contanos qué te pareció tu mate.
      </p>

      {enviado && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-800">
          <CheckCircle className="h-4 w-4" /> ¡Gracias por tu reseña! Ya fue publicada.
        </div>
      )}

      <form onSubmit={agregarOpinion} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-700">Tu Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej. Juan Pérez"
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm text-neutral-900 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700">Calificación</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm text-neutral-900 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5 - Excelente)</option>
            <option value="4">⭐⭐⭐⭐ (4 - Muy bueno)</option>
            <option value="3">⭐⭐⭐ (3 - Bueno)</option>
            <option value="2">⭐⭐ (2 - Regular)</option>
            <option value="1">⭐ (1 - Malo)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700">Comentario</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            rows={3}
            placeholder="Contá qué te pareció el mate..."
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm text-neutral-900 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">Subir Foto (Opcional)</label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors w-full justify-center">
            <Camera className="h-4 w-4 text-emerald-800" />
            <span>Sacar foto / Elegir archivo</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              onChange={handleImagenChange} 
              className="hidden" 
            />
          </label>
          {imagen && (
            <div className="mt-2 flex items-center justify-between rounded-xl bg-neutral-100 p-2">
              <span className="text-xs text-neutral-600 truncate max-w-[200px]">Imagen seleccionada</span>
              <button type="button" onClick={() => setImagen(null)} className="text-red-500 text-xs font-semibold hover:underline">
                Quitar
              </button>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl bg-emerald-800 py-2.5 text-white hover:bg-emerald-900"
        >
          Publicar Opinión
        </Button>
      </form>
    </div>
  );
}	