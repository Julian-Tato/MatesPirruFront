import { Search, ShoppingBag, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-8 py-4">
      
      {/* Sección del Logo */}
      <div className="flex items-center gap-2.5">
        <img 
          src={logoPirru} 
          alt="Mates Pirru Logo" 
          className="h-8 w-auto object-contain" 
        />
        <span className="font-serif text-lg font-semibold text-emerald-900">
          Mates Pirru
        </span>
      </div>

      <nav className="hidden gap-8 text-sm font-medium text-neutral-600 sm:flex">
        <Link to="/" className="hover:text-emerald-800">Inicio</Link>
        <Link to="/catalogo" className="text-emerald-800">Catálogo</Link>
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="rounded-full">
          Ingresar
        </Button>
        <button
          type="button"
          aria-label="Ver carrito"
          className="rounded-full border border-neutral-200 p-2 text-neutral-700 hover:bg-neutral-50"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}