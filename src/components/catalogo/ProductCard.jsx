import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


export default function ProductCard({ producto, esAdmin, onAgregarCarrito, onEditar, onEliminar }) {
  const pocasUnidades = producto.stock > 0 && producto.stock <= 4;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="relative aspect-square">
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="h-full w-full object-cover"
        />
        <Badge
          className={`absolute left-1.5 top-1.5 border-none px-1.5 py-0 text-[10px] ${
            pocasUnidades
              ? "bg-amber-100 text-amber-800"
              : "bg-white/90 text-emerald-800"
          }`}
        >
          {pocasUnidades ? `Últimas ${producto.stock} u.` : "En stock"}
        </Badge>
        <Badge className="absolute right-1.5 top-1.5 border-none bg-neutral-900/80 px-1.5 py-0 text-[10px] text-white">
          {producto.categoria}
        </Badge>
      </div>

      <div className="space-y-1 p-3">
        <h3 className="text-sm font-medium text-neutral-900">{producto.nombre}</h3>
        <p className="line-clamp-2 text-xs text-neutral-500">
          {producto.descripcion}
        </p>

        <div className="flex items-center justify-between pt-1.5">
          <span className="text-sm font-semibold text-amber-900">
            ${producto.precio.toLocaleString("es-AR")}
          </span>

          {esAdmin ? (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onEditar?.(producto)}
                aria-label="Editar producto"
                className="rounded-full border border-neutral-200 p-1.5 text-neutral-600 hover:bg-neutral-50"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onEliminar?.(producto)}
                aria-label="Eliminar producto"
                className="rounded-full border border-neutral-200 p-1.5 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => onAgregarCarrito?.(producto)}
              className="h-7 rounded-full bg-emerald-800 px-3 text-xs hover:bg-emerald-900"
            >
              + Agregar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
