import { useState, useEffect } from "react";
import { ShoppingBag, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Navbar() {
  const [totalItems, setTotalItems] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Función para chequear si hay usuario logueado
  const verificarSesion = () => {
    const token = localStorage.getItem("token");
    const datosUsuario = localStorage.getItem("usuario");
    
    if (token && datosUsuario) {
      try {
        const parsed = JSON.parse(datosUsuario);
        // Usamos el nombre que devuelva el backend, o el email si no tiene nombre
        setUsuario(parsed.nombre || parsed.email || "Cliente");
      } catch {
        setUsuario("Cliente");
      }
    } else {
      setUsuario(null);
    }
  };

  const calcularTotalItems = () => {
    const cart = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  };

  useEffect(() => {
    calcularTotalItems();
    verificarSesion();

    const handleActualizarEstado = () => {
      calcularTotalItems();
      verificarSesion();
    };

    window.addEventListener("storage", handleActualizarEstado);
    window.addEventListener("cart-updated", handleActualizarEstado);
    window.addEventListener("user-logged-in", handleActualizarEstado);

    return () => {
      window.removeEventListener("storage", handleActualizarEstado);
      window.removeEventListener("cart-updated", handleActualizarEstado);
      window.removeEventListener("user-logged-in", handleActualizarEstado);
    };
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.dispatchEvent(new CustomEvent("user-logged-in"));
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-8 py-4 shadow-xs">
      
      {/* Contenedor Izquierdo: Logo y Opciones */}
      <div className="flex items-center gap-10">
        <div className="flex items-center">
          <img 
            src={logoPirru} 
            alt="Mates Pirru Logo" 
            className="h-14 w-14 rounded-full object-cover border border-emerald-900/10 shadow-sm" 
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

      {/* Contenedor Derecho: Dinámico (Login vs Saludo) y Carrito */}
      <div className="flex items-center gap-4">
        {usuario ? (
          // Si está logueado: Muestra saludo y botón de salir
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 bg-neutral-100 px-3 py-1.5 rounded-full">
              <User className="h-4 w-4 text-emerald-800" />
              <span>Hola, <strong className="text-emerald-900">{usuario}</strong></span>
            </div>
            <button 
              onClick={handleCerrarSesion}
              title="Cerrar sesión"
              className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          // Si NO está logueado: Muestra el botón de Ingresar clásico
          <Link to="/login">
            <Button variant="outline" size="sm" className="rounded-full border-neutral-300 hover:bg-neutral-100">
              Ingresar
            </Button>
          </Link>
        )}
        
        {/* Botón de Carrito */}
        <Link to="/carrito" aria-label="Ver carrito">
          <button
            type="button"
            className="rounded-full border border-neutral-200 p-2.5 text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-center relative"
          >
            <ShoppingBag className="h-4 w-4" />
            
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