import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Navbar() {
  const [totalItems, setTotalItems] = useState(0);

  const calcularTotalItems = () => {
    const cart = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  };

  useEffect(() => {
    // Calculamos al cargar la página
    calcularTotalItems();

    // Escuchamos cuando se agreguen productos desde cualquier lado
    const handleCartChange = () => calcularTotalItems();
    window.addEventListener("storage", handleCartChange);
    window.addEventListener("cart-updated", handleCartChange);

    return () => {
      window.removeEventListener("storage", handleCartChange);
      window.removeEventListener("cart-updated", handleCartChange);
    };
  }, []);

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
        
        <Link to="/carrito" aria-label="Ver carrito">
          <button
            type="button"
            className="rounded-full border border-neutral-200 p-2 text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-center relative"
          >
            <ShoppingBag className="h-4 w-4" />
            
            {/* Burbuja con el contador dinámico */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-[10px] font-bold text-white shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}