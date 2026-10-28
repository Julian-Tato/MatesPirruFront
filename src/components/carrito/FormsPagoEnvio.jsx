import { Truck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlacesWidget } from "react-google-autocomplete";

export function InputGoogleMaps({ calle, handleChange, handleLlenarDireccion }) {
  const { ref: buscadorRef } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: handleLlenarDireccion,
    options: { types: ["address"], componentRestrictions: { country: "ar" } },
  });

  return (
    <div className="col-span-2">
      <label className="block text-xs font-medium text-emerald-200/80">Calle y Número (Buscador Automático)</label>
      <input
        ref={buscadorRef} type="text" name="calle" required defaultValue={calle} onBlur={handleChange}
        placeholder="Empezá a escribir tu dirección..."
        className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
}

export default function FormsPagoEnvio({ formData, handleChange, handleLlenarDireccion, handleFinalizarCompra, total }) {
  return (
    <div className="rounded-2xl border border-emerald-800/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
      <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-emerald-400" /> 2. Datos de Envío y Pago
      </h2>
      <form onSubmit={handleFinalizarCompra} className="space-y-4">
        
        <InputGoogleMaps calle={formData.calle} handleChange={handleChange} handleLlenarDireccion={handleLlenarDireccion} />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Número / Piso / Depto</label>
            <input type="text" name="numero" required value={formData.numero} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Código Postal</label>
            <input type="text" name="codigoPostal" required value={formData.codigoPostal} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Barrio / Localidad</label>
            <input type="text" name="barrio" required value={formData.barrio} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Provincia</label>
            <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        {/* Métodos de Entrega */}
        <div className="pt-4 border-t border-emerald-900/40">
          <label className="block text-xs font-medium text-emerald-200/80 mb-2">Método de Envío / Retiro</label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoEntrega === 'correo' ? 'border-emerald-500 bg-emerald-950/60' : 'border-emerald-900/50 bg-[#0f1711]'}`}>
              <input type="radio" name="metodoEntrega" value="correo" checked={formData.metodoEntrega === 'correo'} onChange={handleChange} className="text-emerald-500" />
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <Truck className="h-4 w-4 text-emerald-400" /> Envío Coordinado
              </div>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoEntrega === 'retiro' ? 'border-emerald-500 bg-emerald-950/60' : 'border-emerald-900/50 bg-[#0f1711]'}`}>
              <input type="radio" name="metodoEntrega" value="retiro" checked={formData.metodoEntrega === 'retiro'} onChange={handleChange} className="text-emerald-500" />
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <Store className="h-4 w-4 text-emerald-400" /> Punto de retiro
              </div>
            </label>
          </div>
          <div className="mt-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 px-3 py-2 text-xs text-emerald-200/80">
            <span className="text-emerald-400 font-bold">Importante: </span> 
            Tanto el envío como el punto de retiro se coordinan directamente por <strong className="text-emerald-300">WhatsApp</strong> una vez finalizado el pedido.
          </div>
        </div>

        {/* Medios de Pago */}
        <div className="pt-4 border-t border-emerald-900/40 space-y-3">
          <label className="block text-xs font-medium text-emerald-200/80">Medio de Pago</label>
          <select name="medioPago" value={formData.medioPago} onChange={handleChange} className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none">
            <option value="transferencia">Transferencia Bancaria (10% de descuento)</option>
            <option value="mercadopago">Mercado Pago (Tarjetas / Dinero en cuenta)</option>
            <option value="efectivo">Efectivo (Solo en punto de retiro)</option>
          </select>

          {formData.medioPago === 'efectivo' && (
            <div className="p-4 rounded-xl bg-[#0f1711] border border-emerald-900/50 space-y-2">
              <label className="block text-xs font-medium text-emerald-200/80">¿Con qué monto vas a abonar? (Para calcular el vuelto)</label>
              <input type="text" name="montoEfectivo" placeholder="Ej. $10.000" value={formData.montoEfectivo} onChange={handleChange} className="w-full rounded-xl border border-emerald-900/50 bg-[#131f17] px-3 py-2 text-sm text-white focus:outline-none" />
            </div>
          )}

          {formData.medioPago === 'transferencia' && (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/50 space-y-3">
              <div className="text-xs text-emerald-200 space-y-1 font-medium">
                <p>🏦 <strong>Datos para realizar la transferencia:</strong></p>
                <p>Alias: <span className="font-mono bg-[#0f1711] px-2 py-0.5 rounded border border-emerald-800 text-emerald-300">mates.pirru.mp</span></p>
                <p>CBU: <span className="font-mono bg-[#0f1711] px-2 py-0.5 rounded border border-emerald-800 text-emerald-300">0000003100000000000000</span></p>
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-200/80 mb-1">CBU / Alias o DNI desde el que transferís</label>
                <input type="text" name="cbuOrigen" placeholder="Ej. tu.alias o CBU" value={formData.cbuOrigen} onChange={handleChange} className="w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none" />
              </div>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-sm font-medium mt-6 cursor-pointer border border-emerald-700/50">
          Confirmar y Pagar ${total.toLocaleString()}
        </Button>
      </form>
    </div>
  );
}