const STORAGE_KEY = "mates_pirru_opiniones";

export const opinionesService = {
  obtenerOpiniones: () => {
    const guardadas = localStorage.getItem(STORAGE_KEY);
    return guardadas ? JSON.parse(guardadas) : [
      { 
        id: 1, 
        nombre: "Mariana Gómez", 
        rating: 5, 
        comentario: "¡Hermoso el mate imperial! La alpaca y el cuero impecables. Llegó rapidísimo.", 
        fecha: "Hace 2 días",
        imagen: null 
      },
      { 
        id: 2, 
        nombre: "Lucas Benítez", 
        rating: 5, 
        comentario: "Excelente atención y calidad. Mantiene el calor del agua un montón.", 
        fecha: "Hace 1 semana",
        imagen: null 
      }
    ];
  },

  guardarOpiniones: (opiniones) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opiniones));
  }
};