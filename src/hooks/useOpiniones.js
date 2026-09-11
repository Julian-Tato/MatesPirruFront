import { useState, useEffect } from "react";
import { opinionesService } from "@/services/opinionesService";

export function useOpiniones() {
  const [opiniones, setOpiniones] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(5);
  const [imagen, setImagen] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [opinionSeleccionada, setOpinionSeleccionada] = useState(null);

  useEffect(() => {
    const cargadas = opinionesService.obtenerOpiniones();
    setOpiniones(cargadas);
  }, []);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const agregarOpinion = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !comentario.trim()) return;

    const nueva = {
      id: Date.now(),
      nombre,
      rating: Number(rating),
      comentario,
      fecha: "Reciente",
      imagen: imagen || null
    };

    const actualizadas = [nueva, ...opiniones];
    setOpiniones(actualizadas);
    opinionesService.guardarOpiniones(actualizadas);

    // Reset
    setNombre("");
    setComentario("");
    setRating(5);
    setImagen(null);
    setEnviado(true);

    setTimeout(() => setEnviado(false), 4000);
  };

  return {
    opiniones,
    nombre, setNombre,
    comentario, setComentario,
    rating, setRating,
    imagen, setImagen,
    enviado,
    opinionSeleccionada, setOpinionSeleccionada,
    handleImagenChange,
    agregarOpinion
  };
}