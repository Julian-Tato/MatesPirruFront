import { Plus, Minus, Trash2 } from "lucide-react";

export default function ItemCart({ item, onAumentar, onDisminuir, onEliminar }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-20 w-20 rounded-xl object-cover border border-neutral-100" 
        />
        <div>
          <h3 className="font-semibold text-neutral-900">{item.name}</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs">{item.details}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-50 p-1">
          <button onClick={() => onDisminuir(item.id)} className="rounded-lg p-1 text-neutral-600 hover:bg-white">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium text-neutral-900">{item.quantity}</span>
          <button onClick={() => onAumentar(item.id)} className="rounded-lg p-1 text-neutral-600 hover:bg-white">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <span className="font-semibold text-neutral-900 min-w-[90px] text-right">
          ${(item.price * item.quantity).toLocaleString('es-AR')}
        </span>

        <button onClick={() => onEliminar(item.id)} className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}