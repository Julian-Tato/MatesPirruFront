import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const [cart, setCart] = useState([]);
  const [pasoEnvioHabilitado, setPasoEnvioHabilitado] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setTimeout(() => setToastMessage(null), 3500);
  };

  const eliminarItem = (id) => {
    const nuevoCart = cart.filter(item => item.id !== id);
    setCart(nuevoCart);
    localStorage.setItem("mates_pirru_cart", JSON.stringify(nuevoCart));
    window.dispatchEvent(new CustomEvent("cart-updated"));
    mostrarAlerta("Producto eliminado del carrito");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinuarAlEnvio = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
      mostrarAlerta("Por favor completá tus datos de contacto.");
      return;
    }
    setPasoEnvioHabilitado(true);
  };

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const pedidoPayload = {
        nombreCliente: `${formData.nombre} ${formData.apellido}`,
        emailCliente: formData.email,
        telefonoCliente: formData.telefono,
        metodoEntrega: formData.metodoEntrega,
        direccionEnvio: `${formData.calle} ${formData.numero}`,
        barrio: formData.barrio,
        provincia: formData.ciudad,
        codigoPostal: formData.codigoPostal,
        medioPago: formData.medioPago,
        cbuOrigen: formData.cbuOrigen || "",
        montoEfectivo: formData.montoEfectivo || "",
        detalles: cart.map((item) => ({
          idProducto: Number(item.id || item.idMate),
          cantidad: Number(item.quantity || item.cantidad || 1)
        }))
      };

      const headers = {
        "Content-Type": "application/json"
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("https://localhost:7045/api/pedidos", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(pedidoPayload)
      });

      // Validamos si el servidor devolvió un error (400, 500, etc.)
      if (!response.ok) {
        let mensajeError = "No se pudo procesar el pedido.";
        try {
          const errorData = await response.json();
          mensajeError = errorData.mensaje || mensajeError;
        } catch {
          // Si el error no vino en formato JSON, leemos el texto plano o status
          mensajeError = `Error del servidor (Código: ${response.status})`;
        }
        throw new Error(mensajeError);
      }

      // Intentamos leer el JSON de éxito de forma segura (si viene vacío no rompe)
      let data = {};
      try {
        const text = await response.text();
        if (text) data = JSON.parse(text);
      } catch {
        data = {};
      }

      // ¡Éxito! Limpiamos el carrito y finalizamos
      localStorage.removeItem("mates_pirru_cart");
      window.dispatchEvent(new CustomEvent("cart-updated"));
      setCompraFinalizada(true);

      if (formData.medioPago === "mercadopago" && data.urlMercadoPago) {
        // Lo mandamos a poner la tarjeta
        window.location.href = data.urlMercadoPago;
      } else {
        // Le mostramos el check verde porque arregló por transferencia/efectivo
        setCompraFinalizada(true);
      }

    } catch (error) {
      console.error("Error al crear el pedido:", error);
      mostrarAlerta(error.message || "Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
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
    loading,
    handleChange,
    handleContinuarAlEnvio,
    handleFinalizarCompra,
    eliminarItem,
    navigate
  };
}