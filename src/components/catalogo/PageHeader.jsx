export default function PageHeader({ cantidad }) {
  return (
    // Fondo que ocupa el 100% del ancho con un borde inferior muy sutil para separarlo del catálogo
    <div className="w-full border-b border-stone-200/60 bg-amber-50/70 py-12 md:py-16">
      
      {/* Contenedor interno idéntico al de la grilla (max-w-7xl) para que todo quede en la misma línea imaginaria */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Insignia calcada del Inicio */}
        <span className="mb-4 inline-block rounded-full border border-[#F3E5D8] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 shadow-sm md:text-sm">
          Tienda online
        </span>
        
        {/* Título calcado del Inicio */}
        <h1 className="mb-4 font-serif text-3xl font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
          Catálogo de Productos
        </h1>
        
        {/* Párrafo calcado del Inicio */}
        <p className="text-lg font-normal leading-relaxed text-stone-600 md:text-xl">
          {cantidad} productos disponibles
        </p>
        
      </div>
    </div>
  );
}