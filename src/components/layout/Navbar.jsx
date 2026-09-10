import { useState, useEffect } from "react";
import { ShoppingBag, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Navbar() {
  const [totalItems, setTotalItems] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const verificarSesion = () => {
    const token = localStorage.getItem("token");
    const datosUsuario = localStorage.getItem("usuario");
    
    if (token && datosUsuario) {
      try {
        const parsed = JSON.parse(datosUsuario);
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
      
      {/* Contenedor Izquierdo: Logo y Opciones (Estilo Footer) */}
      <div className="flex items-center gap-10">
        
        {/* Logo con texto incorporado */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logoPirru} 
            alt="Mates Pirru Logo" 
            className="h-9 w-9 rounded-full object-cover border border-emerald-900/10 shadow-sm" 
          />
          <span className="font-serif font-bold text-emerald-900 text-base">
            Mates Pirru
          </span>
        </Link>

        {/* Navegación limpia y sutil */}
        <nav className="hidden gap-6 font-medium text-neutral-500 sm:flex">
          <Link to="/" className="hover:text-emerald-800 transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-emerald-800 transition-colors">Catálogo</Link>
          <Link to="/opiniones" className="hover:text-emerald-800 transition-colors">Opiniones</Link>
        </nav>
      </div>

      {/* Contenedor Derecho: Dinámico (Login vs Saludo) y Carrito (Intacto) */}
      <div className="flex items-center gap-4">
        {usuario ? (
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
            className="relative flex items-center justify-center rounded-full border border-neutral-200 p-2.5 text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            <ShoppingBag className="h-4 w-4" />
            
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-[10px] font-bold text-white shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}