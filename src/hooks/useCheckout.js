import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const [cart, setCart] = useState([]);
  const [pasoEnvioHabilitado, setPasoEnvioHabilitado] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    codigoPostal: "",
    nombre: "",
    apellido: "",
    telefono: "",
    calle: "",
    numero: "",
    barrio: "",
    ciudad: "",
    metodoEntrega: "correo",
    medioPago: "transferencia",
    montoEfectivo: "",
    cbuOrigen: ""
  });

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("mates_pirru_cart")) || [];
    setCart(guardado);
  }, []);

  const mostrarAlerta = (mensaje) => {
    setToastMessage(mensaje);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const eliminarItem = (id) => {
    const nuevoCart = cart.filter(item => item.id !== id);
    setCart(nuevoCart);
    localStorage.setItem("mates_pirru_cart", JSON.stringify(nuevoCart));
    window.dispatchEvent(new CustomEvent("cart-updated"));
    mostrarAlerta("Producto eliminado del carrito");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinuarAlEnvio = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.codigoPostal) return;
    setPasoEnvioHabilitado(true);
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    localStorage.removeItem("mates_pirru_cart");
    window.dispatchEvent(new CustomEvent("cart-updated"));
    setCompraFinalizada(true);
  };

  const total = cart.reduce((acc, item) => {
    const precio = Number(item.precio || item.price || 0);
    const cantidad = Number(item.quantity || item.cantidad || 1);
    return acc + (precio * cantidad);
  }, 0);

  return {
    cart,
    formData,
    pasoEnvioHabilitado,
    compraFinalizada,
    toastMessage,
    total,
    handleChange,
    handleContinuarAlEnvio,
    handleFinalizarCompra,
    eliminarItem,
    navigate
  };
}