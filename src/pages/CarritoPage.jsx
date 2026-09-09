import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enviarPedido } from "@/services/pedidoService";
import ItemCart from "@/components/carrito/ItemCart";
import CartSummary from "@/components/carrito/CartSummary";

export default function CarritoPage() {
  const navigate = useNavigate();

  // Leemos directamente del localStorage que alimentamos desde el catálogo e inicio
  const [cartItems, setCartItems] = useState(() => {
    const guardado = localStorage.getItem("mates_pirru_cart");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [direccion, setDireccion] = useState("Av. Mitre 750, General Pacheco");
  const [loading, setLoading] = useState(false);

  const aumentarCantidad = (id) => {
    const nuevoCarrito = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(nuevoCarrito);
    localStorage.setItem("mates_pirru_cart", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new CustomEvent("cart-updated"));
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(nuevoCarrito);
    localStorage.setItem("mates_pirru_cart", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new CustomEvent("cart-updated"));
  };

  const eliminarItem = (id) => {
    const nuevoCarrito = cartItems.filter(item => item.id !== id);
    setCartItems(nuevoCarrito);
    localStorage.setItem("mates_pirru_cart", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new CustomEvent("cart-updated"));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const envio = subtotal > 0 ? 3500 : 0;
  const total = subtotal + envio;

  const handleCheckout = async () => {
    // Estructura exacta que espera el CrearPedidoDTO y CrearDetallePedidoDTO en C#
    const ordenData = {
      direccionEnvio: direccion,
      detalles: cartItems.map(item => ({
        idProducto: item.id,
        cantidad: item.quantity
      }))
    };

    setLoading(true);

    try {
      const data = await enviarPedido(ordenData);
      alert(`¡Compra realizada con éxito! ID de pedido: ${data.pedidoId || data.id}`);
      
      // Limpiamos el carrito tras una compra exitosa
      setCartItems([]);
      localStorage.removeItem("mates_pirru_cart");
      window.dispatchEvent(new CustomEvent("cart-updated"));
      
      navigate("/");
    } catch (err) {
      alert("Hubo un error: " + err.message);
      if (err.message.includes("token") || err.message.includes("sesión")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-neutral-900">Tu carrito está vacío</h2>
        <p className="mt-2 text-neutral-500">¿Todavía no elegiste tu próximo mate? Pasate por el catálogo.</p>
        <div className="mt-8">
          <Link to="/catalogo">
            <Button className="rounded-xl bg-emerald-800 px-8 py-3 text-white hover:bg-emerald-900">
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900">
          Carrito de Compras
        </h1>
        <Link to="/catalogo" className="flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Seguir comprando
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Listado de Productos modularizado */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <ItemCart 
              key={item.id} 
              item={item} 
              onAumentar={aumentarCantidad} 
              onDisminuir={disminuirCantidad} 
              onEliminar={eliminarItem} 
            />
          ))}
        </div>

        {/* Resumen modularizado */}
        <CartSummary 
          direccion={direccion}
          setDireccion={setDireccion}
          subtotal={subtotal}
          envio={envio}
          total={total}
          loading={loading}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}