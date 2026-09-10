import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ producto, esAdmin, onAgregarCarrito, onEditar, onEliminar }) {
  const pocasUnidades = producto.stock > 0 && producto.stock <= 4;

  return (
    // Contenedor 'group' para gatillar los efectos de hover en los elementos internos
    <div className="group relative">
      
      {/* 1. El brillo fantasmal que aparece detrás de la tarjeta al hacer hover (Copiado de Figma) */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-900/50 to-[#d4af37]/20 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />
      
      {/* 2. Tarjeta real: Vidrio esmerilado oscuro con borde sutil */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-emerald-900/50 bg-white/5 shadow-sm backdrop-blur-sm transition-all duration-300">
        
        <div className="relative aspect-square overflow-hidden">
          <img
            src={producto.urlImagen}
            alt={producto.nombre}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          
          {/* Insignia de Stock (Adaptada al modo oscuro) */}
          <Badge
            className={`absolute left-2 top-2 border px-2 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur-md ${
              pocasUnidades
                ? "border-amber-700/50 bg-amber-950/80 text-amber-400"
                : "border-emerald-700/50 bg-emerald-950/80 text-emerald-400"
            }`}
          >
            {pocasUnidades ? `Últimas ${producto.stock} u.` : "En stock"}
          </Badge>
          
          {/* Insignia de Categoría en dorado */}
          <Badge className="absolute right-2 top-2 border border-[#d4af37]/30 bg-[#0f1711]/90 px-2 py-0.5 text-[10px] text-[#d4af37] backdrop-blur-md">
            {producto.categoria?.descripcion || producto.categoria}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col justify-between space-y-2 p-4">
          <div>
            <h3 className="text-base font-semibold tracking-wide text-white" style={{ fontFamily: "var(--font-display)" }}>
              {producto.nombre}
            </h3>
            <p className="line-clamp-2 mt-1 text-xs font-light leading-relaxed text-emerald-200/70">
              {producto.descripcion}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-emerald-900/30 pt-3">
            <span className="text-lg font-bold text-[#d4af37]">
              ${producto.precio.toLocaleString("es-AR")}
            </span>

            {esAdmin ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEditar?.(producto)}
                  aria-label="Editar producto"
                  className="rounded-full border border-emerald-800/50 p-2 text-emerald-400 transition-colors hover:bg-emerald-900/50 hover:text-emerald-300"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onEliminar?.(producto)}
                  aria-label="Eliminar producto"
                  className="rounded-full border border-red-900/50 p-2 text-red-400 transition-colors hover:bg-red-950/80 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => onAgregarCarrito?.(producto)}
                className="h-8 rounded-full bg-emerald-600 px-4 text-xs font-medium text-white shadow-[0_0_10px_rgba(52,211,153,0.1)] transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              >
                + Agregar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}