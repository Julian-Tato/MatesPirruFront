import { useState, useEffect } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const cargarCarrito = () => {
    const guardado = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
    setCart(guardado);
  };

  useEffect(() => {
    cargarCarrito();
    window.addEventListener("cart-updated", cargarCarrito);
    return () => window.removeEventListener("cart-updated", cargarCarrito);
  }, []);

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => {
    const precio = Number(item.precio || item.price || 0);
    const cantidad = Number(item.quantity || item.cantidad || 1);
    return acc + (precio * cantidad);
  }, 0);

  const eliminarItem = (id) => {
    const nuevoCart = cart.filter(item => item.id !== id);
    setCart(nuevoCart);
    localStorage.setItem("mates_pirru_cart", JSON.stringify(nuevoCart));
    window.dispatchEvent(new CustomEvent("cart-updated"));
  };

  const handleIniciarCompra = () => {
    onClose();
    navigate("/carrito");
  };

  const handleVerMasProductos = () => {
    onClose();
    navigate("/catalogo");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#131f17] border-l border-emerald-900/40 shadow-2xl flex flex-col text-white">
          
          {/* Cabecera del Panel */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-900/40">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-white">
              <ShoppingBag className="h-5 w-5 text-emerald-400" />
              <span>Tu Carrito</span>
            </div>
            <button 
              onClick={onClose} 
              className="rounded-full p-2 text-emerald-400/70 hover:bg-emerald-950 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Listado de Productos en el Panel */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-emerald-400/60 space-y-4">
                <ShoppingBag className="h-12 w-12 mx-auto opacity-30" />
                <p className="text-sm">Tu carrito está vacío</p>
                <Button 
                  onClick={handleVerMasProductos}
                  className="rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs px-4 py-2 border border-emerald-700/50 cursor-pointer"
                >
                  Explorar catálogo
                </Button>
              </div>
            ) : (
              cart.map((item, index) => {
                const nombreItem = item.nombre || item.name || "Mate artesanal";
                const precioItem = Number(item.precio || item.price || 0);
                const cantidadItem = Number(item.quantity || item.cantidad || 1);
                const tipoItem = item.tipo || item.material || item.categoria;
                const imagenItem = item.imagen || item.img || item.image || "/placeholder.jpg";

                return (
                  <div key={item.id || index} className="flex items-center gap-4 py-3 border-b border-emerald-900/30">
                    <img 
                      src={imagenItem} 
                      alt={nombreItem} 
                      className="h-16 w-16 rounded-xl object-cover border border-emerald-900/50" 
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{nombreItem}</h4>
                      
                      {tipoItem && (
                        <p className="text-xs text-emerald-400 font-medium">Tipo: {tipoItem}</p>
                      )}

                      <p className="text-xs text-emerald-200/70">Cantidad: {cantidadItem}</p>
                      <p className="text-sm font-medium text-emerald-300 mt-1">
                        ${(precioItem * cantidadItem).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => eliminarItem(item.id)} 
                      className="text-emerald-500/70 hover:text-red-400 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Pie de Página / Subtotal y Botones de Acción */}
          {cart.length > 0 && (
            <div className="border-t border-emerald-900/40 px-6 py-5 bg-[#0f1711] space-y-3">
              <div className="flex items-center justify-between text-base font-semibold text-white">
                <span>Subtotal:</span>
                <span className="text-emerald-400">${total.toLocaleString()}</span>
              </div>
              
              <Button 
                onClick={handleIniciarCompra}
                className="w-full h-11 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-emerald-700/50"
              >
                <span>Iniciar compra</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button 
                onClick={handleVerMasProductos}
                variant="outline"
                className="w-full h-11 rounded-xl border-emerald-900/60 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60 hover:text-white flex items-center justify-center gap-2 text-sm font-medium cursor-pointer backdrop-blur-sm"
              >
                <Store className="h-4 w-4 text-emerald-400" />
                <span>Ver más productos</span>
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}