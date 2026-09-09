import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-8 py-4">
      
      {/* Contenedor Izquierdo: Logo y Opciones */}
      <div className="flex items-center gap-10">
        <div className="flex items-center">
          <img 
            src={logoPirru} 
            alt="Mates Pirru Logo" 
            className="h-16 w-16 rounded-full object-cover border border-emerald-900/10 shadow-sm" 
          />
        </div>

        <nav className="hidden gap-8 text-base font-medium text-neutral-700 sm:flex">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-emerald-800 font-semibold underline underline-offset-4" 
                : "hover:text-emerald-900 hover:underline hover:underline-offset-4 transition-all"
            }
          >
            Inicio
          </NavLink>
          <NavLink 
            to="/catalogo" 
            className={({ isActive }) => 
              isActive 
                ? "text-emerald-800 font-semibold underline underline-offset-4" 
                : "hover:text-emerald-900 hover:underline hover:underline-offset-4 transition-all"
            }
          >
            Catálogo
          </NavLink>
          <NavLink 
            to="/opiniones" 
            className={({ isActive }) => 
              isActive 
                ? "text-emerald-800 font-semibold underline underline-offset-4" 
                : "hover:text-emerald-900 hover:underline hover:underline-offset-4 transition-all"
            }
          >
            Opiniones
          </NavLink>
        </nav>
      </div>

      {/* Contenedor Derecho: Ingresar y Carrito */}
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="outline" size="sm" className="rounded-full">
            Ingresar
          </Button>
        </Link>
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