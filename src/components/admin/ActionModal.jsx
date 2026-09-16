export default function ActionModal({
  isOpen,
  tipo = "confirmacion", // Puede ser: "confirmacion", "exito", "error"
  titulo,
  mensaje,
  onClose,
  onConfirm,
  textoConfirmar = "Confirmar",
  cargando = false,
  esDestructivo = false // Si es true, el botón de confirmar será rojo
}) {
  if (!isOpen) return null;

  // Renderizamos el ícono dinámicamente según el estado del modal
  const renderIcono = () => {
    if (tipo === "exito") {
      return (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    if (tipo === "error") {
      return (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    }
    // Por defecto: Icono de Advertencia (Confirmación)
    return (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4" 
      style={{ backgroundColor: "rgba(15, 23, 17, 0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && !cargando && onClose()}
    >
      <div className="w-full max-w-sm rounded-3xl bg-[#f9f8f4] p-8 text-center shadow-[0_32px_80px_rgba(15,23,17,0.22)] animate-in zoom-in-95 duration-200">
        {renderIcono()}
        
        <h3 className="mt-5 text-xl font-semibold text-[#143224]" style={{ fontFamily: "var(--font-display)" }}>
          {titulo}
        </h3>
        <p className="mt-2 text-sm text-[#6b7b71] leading-relaxed">
          {mensaje}
        </p>

       <div className="mt-8 flex justify-center gap-3">
          {tipo === "confirmacion" ? (
            <>
              <button 
                onClick={onClose} 
                disabled={cargando} 
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-[#6b7b71] hover:bg-[#e8e4db] transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button 
                onClick={onConfirm} 
                disabled={cargando} 
                className={
                  esDestructivo 
                    ? "rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all disabled:opacity-50 bg-[#dc2626] hover:bg-[#b91c1c]" 
                    : "rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all disabled:opacity-50 bg-[#143224] hover:bg-[#1a402e]"
                }
              >
                {cargando ? "Procesando..." : textoConfirmar}
              </button>
            </>
          ) : (
            <button 
              onClick={onClose} 
              className="rounded-xl bg-[#143224] px-8 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#1a402e] transition-all"
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}