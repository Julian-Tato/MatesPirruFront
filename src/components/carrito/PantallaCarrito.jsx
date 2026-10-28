import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PantallaCarrito({ navigate }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center space-y-4 text-white">
      <ShoppingBag className="h-16 w-16 text-emerald-500/40 mx-auto" />
      <h1 className="font-serif text-2xl font-bold text-white">Tu carrito está vacío</h1>
      <p className="text-sm text-emerald-200/70">Todavía no agregaste ningún mate a tu carrito.</p>
      <Button onClick={() => navigate("/catalogo")} className="rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 px-6 py-2.5 text-sm cursor-pointer border border-emerald-700/50">
        Ver catálogo
      </Button>
    </div>
  );
}