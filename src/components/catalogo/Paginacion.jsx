// src/components/catalogo/Pagination.jsx
export default function Pagination({ paginaActual, totalPaginas, onCambiarPagina }) {
  // Si hay una sola página, ocultamos la botonera para mantener limpio el diseño
  if (totalPaginas <= 1) return null;

  // Construimos un array dinámico [1, 2, 3...] según el total de páginas
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center space-x-2 pb-8">
      <button
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="rounded-md border border-stone-200 bg-[#f9f8f4] px-4 py-2 text-sm font-medium text-[#143224] transition-colors hover:bg-stone-200 disabled:pointer-events-none disabled:opacity-50"
      >
        Anterior
      </button>

      {paginas.map((num) => (
        <button
          key={num}
          onClick={() => onCambiarPagina(num)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            paginaActual === num
              ? "bg-[#143224] text-[#f9f8f4] shadow-sm"
              : "border border-stone-200 bg-[#f9f8f4] text-[#143224] hover:bg-stone-200"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="rounded-md border border-stone-200 bg-[#f9f8f4] px-4 py-2 text-sm font-medium text-[#143224] transition-colors hover:bg-stone-200 disabled:pointer-events-none disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}