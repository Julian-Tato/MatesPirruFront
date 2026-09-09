import { useState, useEffect } from "react";
import { ShoppingBag, Check } from "lucide-react";

export default function CartToast() {
  const [toastInfo, setToastInfo] = useState(null);

  useEffect(() => {
    const handleCartUpdated = (e) => {
      setToastInfo(e.detail);
      const timer = setTimeout(() => {
        setToastInfo(null);
      }, 3500); // Desaparece solo a los 3.5 segundos
      return () => clearTimeout(timer);
    };

    window.addEventListener("cart-updated", handleCartUpdated);
    return () => window.removeEventListener("cart-updated", handleCartUpdated);
  }, []);

  if (!toastInfo) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md transition-all">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-900/10">
        <ShoppingBag className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
          <Check className="h-3.5 w-3.5" /> ¡Agregado al carrito!
        </div>
        <p className="text-xs text-neutral-600 max-w-[210px] truncate font-medium">
          {toastInfo.nombre || toastInfo.name}
        </p>
      </div>
    </div>
  );
}