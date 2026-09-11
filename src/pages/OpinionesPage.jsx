import { useOpiniones } from "@/hooks/useOpiniones";
import OpinionCard from "@/components/opiniones/OpinionCard";
import OpinionForm from "@/components/opiniones/OpinionForm";
import OpinionModal from "@/components/opiniones/OpinionModal";

export default function OpinionesPage() {
  const {
    opiniones,
    nombre, setNombre,
    comentario, setComentario,
    rating, setRating,
    imagen, setImagen,
    enviado,
    opinionSeleccionada, setOpinionSeleccionada,
    handleImagenChange,
    agregarOpinion
  } = useOpiniones();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 relative">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Lo que dicen nuestros materos
        </h1>
        <p className="mt-2 text-neutral-500">
          Experiencias reales y fotos de quienes eligen nuestros mates cada día.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {opiniones.map((op) => (
            <OpinionCard 
              key={op.id} 
              opinion={op} 
              onClick={() => setOpinionSeleccionada(op)} 
            />
          ))}
        </div>

        <div>
          <OpinionForm 
            nombre={nombre} setNombre={setNombre}
            comentario={comentario} setComentario={setComentario}
            rating={rating} setRating={setRating}
            imagen={imagen} setImagen={setImagen}
            enviado={enviado}
            handleImagenChange={handleImagenChange}
            agregarOpinion={agregarOpinion}
          />
        </div>
      </div>

      <OpinionModal 
        opinion={opinionSeleccionada} 
        onClose={() => setOpinionSeleccionada(null)} 
      />
    </div>
  );
}