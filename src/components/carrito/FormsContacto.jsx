import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FormsContacto({ formData, handleChange, handleContinuarAlEnvio, pasoEnvioHabilitado }) {
  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-[#131f17]/85 p-6 shadow-xl backdrop-blur-md">
      <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
        1. <User className="h-5 w-5 text-emerald-400" />Contacto
      </h2>
      <form onSubmit={handleContinuarAlEnvio} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Nombre</label>
            <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Apellido</label>
            <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Correo Electrónico</label>
            <input type="email" name="email" required placeholder="tucorreo@email.com" value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-emerald-200/80">Teléfono / Celular</label>
            <input type="tel" name="telefono" required placeholder="Ej. 11 2345 6789" value={formData.telefono} onChange={handleChange} className="mt-1 w-full rounded-xl border border-emerald-900/50 bg-[#0f1711] px-3 py-2 text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        {!pasoEnvioHabilitado && (
          <Button type="submit" className="w-full mt-4 rounded-xl bg-emerald-800 py-2.5 text-white hover:bg-emerald-900 text-sm font-medium cursor-pointer border border-emerald-700/50">
            Continuar con los datos de envío
          </Button>
        )}
      </form>
    </div>
  );
}