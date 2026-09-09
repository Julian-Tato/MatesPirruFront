import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartSummary({ direccion, setDireccion, subtotal, envio, total, loading, onCheckout }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 h-fit space-y-6">
      <h3 className="font-serif text-xl font-bold text-neutral-900">Resumen del pedido</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">Dirección de envío</label>
          <input 
            type="text" 
            value={direccion} 
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-emerald-800"
          />
        </div>

        <div className="space-y-2 text-sm text-neutral-600 pt-2 border-t border-neutral-200">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-900">${subtotal.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío estimado</span>
            <span className="font-medium text-neutral-900">${envio.toLocaleString('es-AR')}</span>
          </div>
          <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-bold text-neutral-900">
            <span>Total</span>
            <span className="text-emerald-900">${total.toLocaleString('es-AR')}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={onCheckout} 
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 text-base font-medium text-white hover:bg-emerald-900 disabled:opacity-50"
      >
        <span>{loading ? "Procesando..." : "Confirmar y Comprar"}</span>
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-xs text-neutral-400">
        Arquitectura desacoplada Front / Back (.NET)
      </p>
    </div>
  );
}