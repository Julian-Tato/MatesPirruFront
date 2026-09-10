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
    <header className="flex items-center justify-between border-b border-emerald-900/30 bg-[#0f1711]/80 px-8 py-4 shadow-sm backdrop-blur-md sticky top-0 z-50">
      
      {/* Contenedor Izquierdo: Logo y Opciones */}
      <div className="flex items-center gap-10">
        
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logoPirru} 
            alt="Mates Pirru Logo" 
            className="h-9 w-9 rounded-full object-cover border border-emerald-800/40 shadow-[0_0_15px_rgba(52,211,153,0.1)]" 
          />
          <span className="font-bold text-white text-base tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
            Mates Pirru
          </span>
        </Link>

        {/* Navegación estilo selva */}
        <nav className="hidden gap-6 font-medium text-emerald-200/80 sm:flex">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-emerald-400 transition-colors">Catálogo</Link>
          <Link to="/opiniones" className="hover:text-emerald-400 transition-colors">Opiniones</Link>
        </nav>
      </div>

      {/* Contenedor Derecho: Dinámico (Login vs Saludo) y Carrito */}
      <div className="flex items-center gap-4">
        {usuario ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-100 bg-emerald-950/80 border border-emerald-800/50 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.05)]">
              <User className="h-4 w-4 text-[#d4af37]" />
              <span>Hola, <strong className="text-white font-semibold">{usuario}</strong></span>
            </div>
            <button 
              onClick={handleCerrarSesion}
              title="Cerrar sesión"
              className="rounded-full border border-emerald-900/50 p-2 text-emerald-500 hover:bg-red-950/80 hover:text-red-400 hover:border-red-900/50 transition-all"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline" size="sm" className="rounded-full border-emerald-800/60 bg-emerald-900/40 hover:bg-emerald-800 text-emerald-100 hover:text-white transition-all backdrop-blur-sm">
              Ingresar
            </Button>
          </Link>
        )}
        
        {/* Botón de Carrito */}
        <Link to="/carrito" aria-label="Ver carrito">
          <button
            type="button"
            className="relative flex items-center justify-center rounded-full border border-emerald-800/60 bg-emerald-900/20 p-2.5 text-emerald-100 transition-all hover:bg-emerald-800/60 hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-[#0f1711] shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}