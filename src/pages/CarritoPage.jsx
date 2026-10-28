import { ArrowLeft } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";

// Importamos nuestros nuevos componentes limpios
import ItemCart from "@/components/carrito/ItemCart";
import CartSummary from "@/components/carrito/CartSummary";
import CartToast from "@/components/carrito/CartToast";
import CartEmpty from "@/components/carrito/PantallaCarrito";
import CartSuccess from "@/components/carrito/PantallaExito";
import ContactForm from "@/components/carrito/FormsContacto";
import ShippingPaymentForm from "@/components/carrito/FormsPagoEnvio";

export default function CarritoPage() {
  const {
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
  } = useCheckout();

  const handleLlenarDireccion = (place) => {
    let calle = ""; let numero = ""; let cp = ""; let localidad = ""; let provincia = "";
    place.address_components?.forEach((component) => {
      const types = component.types;
      if (types.includes("route")) calle = component.long_name;
      if (types.includes("street_number")) numero = component.long_name;
      if (types.includes("postal_code")) cp = component.long_name;
      if (types.includes("locality") || types.includes("sublocality") || types.includes("neighborhood") || types.includes("sublocality_level_1")) {
        if (!localidad) localidad = component.long_name; 
      }
      if (types.includes("administrative_area_level_1")) provincia = component.long_name;
    });

    handleChange({ target: { name: "calle", value: calle } });
    handleChange({ target: { name: "numero", value: numero } });
    handleChange({ target: { name: "codigoPostal", value: cp } });
    handleChange({ target: { name: "barrio", value: localidad } });
    handleChange({ target: { name: "ciudad", value: provincia } });
  };

  // RETORNOS CONDICIONALES LIMPIOS
  if (compraFinalizada) return <CartSuccess formData={formData} navigate={navigate} />;
  if (cart.length === 0) return <CartEmpty navigate={navigate} />;

  // RETORNO PRINCIPAL
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 relative text-white">
      <CartToast message={toastMessage} />

      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-medium text-emerald-400/80 hover:text-emerald-300 mb-8 transition-colors cursor-pointer">
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      <h1 className="font-serif text-3xl font-bold tracking-tight text-white mb-8">
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* IZQUIERDA: Formularios */}
        <div className="lg:col-span-7 space-y-6">
          <ContactForm 
            formData={formData} 
            handleChange={handleChange} 
            handleContinuarAlEnvio={handleContinuarAlEnvio} 
            pasoEnvioHabilitado={pasoEnvioHabilitado} 
          />
          
          {pasoEnvioHabilitado && (
            <ShippingPaymentForm 
              formData={formData} 
              handleChange={handleChange} 
              handleLlenarDireccion={handleLlenarDireccion} 
              handleFinalizarCompra={handleFinalizarCompra} 
              total={total} 
            />
          )}
        </div>

        {/* DERECHA: Resumen de compra */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 rounded-2xl border border-emerald-900/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h2 className="font-serif text-lg font-bold text-white border-b border-emerald-900/30 pb-3">
              Resumen del Pedido
            </h2>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
              {cart.map((item, index) => (
                <ItemCart key={item.id || index} item={item} onRemove={eliminarItem} />
              ))}
            </div>
            <CartSummary total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}