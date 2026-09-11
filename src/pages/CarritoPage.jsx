import { ShoppingBag, ArrowLeft, Mail, User, Truck, Store, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useCheckout";

import ItemCart from "@/components/carrito/ItemCart";
import CartSummary from "@/components/carrito/CartSummary";
import CartToast from "@/components/carrito/CartToast";

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

  if (compraFinalizada) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center text-white">
        <div className="rounded-3xl border border-emerald-900/40 bg-[#131f17]/85 p-10 shadow-xl backdrop-blur-md space-y-4">
          <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-white">¡Compra realizada con éxito!</h1>
          <p className="text-sm text-emerald-200/70">
            Te enviamos los detalles a <strong className="text-white">{formData.email}</strong>. ¡Gracias por elegir Mates Pirru!
          </p>
          <Button onClick={() => navigate("/")} className="mt-4 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 px-6 py-2.5 text-sm cursor-pointer border border-emerald-700/50">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center space-y-4 text-white">
        <ShoppingBag className="h-16 w-16 text-emerald-500/40 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-white">Tu carrito está vacío</h1>
        <p className="text-sm text-emerald-200/70">Todavía no agregaste ningún mate a tu carrito.</p>
        <Button onClick={() => navigate("/catalogo")} className="rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 px-6 py-2.5 text-sm cursor-pointer border border-emerald-700/50">
          Ver catálogo
        </Button>
      </div>
    );
  }

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
          
          {/* PASO 1 */}
          <div className="rounded-2xl border border-emerald-900/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md">
            <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-emerald-400" /> 1. Contacto y Ubicación
            </h2>
            <form onSubmit={handleContinuarAlEnvio} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-emerald-200/80">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="tucorreo@email.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white placeholder-emerald-700 focus:border-emerald-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-200/80">Código Postal</label>
                <input 
                  type="text" 
                  name="codigoPostal" 
                  required 
                  placeholder="Ej. 1646" 
                  value={formData.codigoPostal} 
                  onChange={handleChange} 
                  className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white placeholder-emerald-700 focus:border-emerald-500 focus:outline-none" 
                />
              </div>
              {!pasoEnvioHabilitado && (
                <Button type="submit" className="w-full rounded-xl bg-emerald-800 py-2.5 text-white hover:bg-emerald-900 text-sm font-medium cursor-pointer border border-emerald-700/50">
                  Continuar con los datos de envío
                </Button>
              )}
            </form>
          </div>

          {/* PASO 2: Solapa Desplegable */}
          {pasoEnvioHabilitado && (
            <div className="rounded-2xl border border-emerald-800/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-400" /> 2. Datos de Envío y Pago
              </h2>
              <form onSubmit={handleFinalizarCompra} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-emerald-200/80">Nombre</label>
                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-emerald-200/80">Apellido</label>
                    <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-emerald-200/80">Teléfono / Celular</label>
                  <input type="tel" name="telefono" required placeholder="Ej. 11 2345 6789" value={formData.telefono} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                </div>

                {/* Código postal pre-cargado */}
                <div>
                  <label className="block text-xs font-medium text-emerald-200/80">Código Postal (Pre-cargado)</label>
                  <input type="text" disabled value={formData.codigoPostal} className="mt-1 w-full rounded-xl border border-emerald-900/40 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-400 cursor-not-allowed" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-emerald-200/80">Calle</label>
                    <input type="text" name="calle" required value={formData.calle} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-emerald-200/80">Número</label>
                    <input type="text" name="numero" required value={formData.numero} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-emerald-200/80">Barrio / Localidad</label>
                    <input type="text" name="barrio" required value={formData.barrio} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-emerald-200/80">Ciudad / Provincia</label>
                    <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                </div>

                {/* Métodos de Entrega */}
                <div className="pt-4 border-t border-emerald-900/40">
                  <label className="block text-xs font-medium text-emerald-200/80 mb-2">Método de Envío / Retiro</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoEntrega === 'correo' ? 'border-emerald-500 bg-emerald-950/60' : 'border-emerald-900/50 bg-[#0f1711]'}`}>
                      <input type="radio" name="metodoEntrega" value="correo" checked={formData.metodoEntrega === 'correo'} onChange={handleChange} className="text-emerald-500" />
                      <div className="flex items-center gap-2 text-xs font-medium text-white">
                        <Truck className="h-4 w-4 text-emerald-400" /> Envío por correo
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoEntrega === 'retiro' ? 'border-emerald-500 bg-emerald-950/60' : 'border-emerald-900/50 bg-[#0f1711]'}`}>
                      <input type="radio" name="metodoEntrega" value="retiro" checked={formData.metodoEntrega === 'retiro'} onChange={handleChange} className="text-emerald-500" />
                      <div className="flex items-center gap-2 text-xs font-medium text-white">
                        <Store className="h-4 w-4 text-emerald-400" /> Punto de retiro
                      </div>
                    </label>
                  </div>
                </div>

                {/* Medios de Pago Dinámicos */}
                <div className="pt-4 border-t border-emerald-900/40 space-y-3">
                  <label className="block text-xs font-medium text-emerald-200/80">Medio de Pago</label>
                  <select name="medioPago" value={formData.medioPago} onChange={handleChange} className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none">
                    <option value="transferencia">Transferencia Bancaria (10% de descuento)</option>
                    <option value="mercadopago">Mercado Pago (Tarjetas / Dinero en cuenta)</option>
                    <option value="efectivo">Efectivo (Solo en punto de retiro)</option>
                  </select>

                  {/* Solapa Efectivo */}
                  {formData.medioPago === 'efectivo' && (
                    <div className="p-4 rounded-xl bg-[#0f1711] border border-emerald-900/50 space-y-2">
                      <label className="block text-xs font-medium text-emerald-200/80">¿Con qué monto vas a abonar? (Para calcular el vuelto)</label>
                      <input type="text" name="montoEfectivo" placeholder="Ej. $10.000" value={formData.montoEfectivo} onChange={handleChange} className="w-full rounded-xl border border-emerald-900/50 bg-[#131f17] px-3 py-2 text-sm text-white focus:outline-none" />
                    </div>
                  )}

                  {/* Solapa Transferencia */}
                  {formData.medioPago === 'transferencia' && (
                    <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/50 space-y-3">
                      <div className="text-xs text-emerald-200 space-y-1 font-medium">
                        <p>🏦 <strong>Datos para realizar la transferencia:</strong></p>
                        <p>• Alias: <span className="font-mono bg-[#0f1711] px-2 py-0.5 rounded border border-emerald-800 text-emerald-300">mates.pirru.mp</span></p>
                        <p>• CBU: <span className="font-mono bg-[#0f1711] px-2 py-0.5 rounded border border-emerald-800 text-emerald-300">0000003100000000000000</span></p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-emerald-200/80 mb-1">CBU / Alias o DNI desde el que transferís</label>
                        <input type="text" name="cbuOrigen" placeholder="Ej. tu.alias o CBU" value={formData.cbuOrigen} onChange={handleChange} className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {/* Solapa Mercado Pago */}
                  {formData.medioPago === 'mercadopago' && (
                    <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs text-sky-200 space-y-1">
                      <p>🚀 <strong>Mercado Pago:</strong></p>
                      <p>Al confirmar el pedido, serás redirigido a la pasarela de pagos segura.</p>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-sm font-medium mt-6 cursor-pointer border border-emerald-700/50">
                  Confirmar y Pagar ${total.toLocaleString()}
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* DERECHA: Resumen usando ItemCart y CartSummary */}
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