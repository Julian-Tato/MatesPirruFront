import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ producto, esAdmin, onAgregarCarrito, onEditar, onEliminar, onSeleccionar }) {
  const pocasUnidades = producto.stock > 0 && producto.stock <= 4;

  return (
    // Contenedor Principal: Usa el fondo oscuro y el padding (p-4) del diseño de Figma
    <div 
      className="group relative h-full flex flex-col cursor-pointer rounded-3xl bg-[#0f1711] p-4 border border-emerald-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,17,0.15)]" 
      onClick={() => onSeleccionar?.(producto)}
    >
      
      {/* Contenedor de Imagen */}
      <div className="relative mb-5 w-full aspect-square overflow-hidden rounded-2xl bg-[#1a2e21]">
        {/* Overlay de gradiente oscuro copiado de Figma para darle profundidad */}
        <div className="absolute inset-0 z-0 mix-blend-multiply bg-gradient-to-tr from-[#0f1711]/80 to-transparent opacity-50" />
        
        <img 
          src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : "https://placehold.co/600x600/cccccc/000000?text=Sin+Foto"} 
          alt={producto.nombre} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
        />
        
        {/* Sombra al hacer hover */}
        <div className="absolute inset-0 z-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Insignia de Categoría (Izquierda) */}
        <Badge className="absolute left-3 top-3 z-10 border border-emerald-800/50 bg-[#1a2e21]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] shadow-md backdrop-blur-md">
          {producto.categoria?.descripcion || producto.categoria}
        </Badge>
        
        {/* Insignia de Stock (Derecha) */}
        <Badge
          className={`absolute right-3 top-3 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md ${
            pocasUnidades
              ? "border-none bg-[#d4af37] text-[#0f1711]"
              : "border border-emerald-800/50 bg-[#1a2e21]/90 text-emerald-400 backdrop-blur-md"
          }`}
        >
          {pocasUnidades ? `Últimas ${producto.stock} u.` : "En stock"}
        </Badge>
      </div>

      {/* Contenido (Textos) */}
      <div className="flex flex-1 flex-col justify-between px-2 pb-2">
        <div>
          <h3 className="mb-2 text-xl font-semibold leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            {producto.nombre}
          </h3>
          <p className="line-clamp-2 min-h-[2.5rem] text-sm font-light leading-relaxed text-emerald-200/70">
            {producto.descripcion}
          </p>
        </div>

        {/* Zona Inferior: Precio y Botones */}
        <div className="mt-6 flex items-end justify-between">
          
          {/* Bloque de Precio */}
          <div className="flex flex-col">
            <span className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-400/80">
              Precio
            </span>
            <span className="text-xl font-bold text-[#d4af37]">
              ${producto.precio.toLocaleString("es-AR")}
            </span>
          </div>

          {/* Renderizado condicional de botones */}
          {esAdmin ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEditar?.(producto); }}
                aria-label="Editar producto"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-800/50 bg-[#1a2e21] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0f1711] hover:shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEliminar?.(producto); }}
                aria-label="Eliminar producto"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-900/50 bg-red-950/40 text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_4px_15px_rgba(239,68,68,0.3)]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={(e) => { 
                e.stopPropagation(); 
                onSeleccionar?.(producto); // 👈 Ahora abre el modal en lugar de agregar directo
              }}
              className="h-10 rounded-full border border-emerald-800/50 bg-[#1a2e21] px-5 text-sm font-semibold text-[#d4af37] shadow-md transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0f1711] hover:shadow-[0_4px_15px_rgba(212,175,55,0.3)] active:scale-95"
            >
              + Agregar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}