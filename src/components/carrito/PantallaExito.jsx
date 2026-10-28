import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PantallaExito({ formData, navigate }) {
  const numeroWhatsApp = "5491123456789"; 
  const mensajeWpp = encodeURIComponent(
    `¡Hola Mates Pirru! 🧉 Acabo de realizar un pedido en la web.\n\n` +
    `👤 *Nombre:* ${formData.nombre} ${formData.apellido}\n` +
    `🚚 *Entrega:* ${formData.metodoEntrega === 'retiro' ? 'Punto de Retiro' : 'Envío'}\n` +
    `💳 *Pago:* ${formData.medioPago}\n\n` +
    `¡Quería coordinar los detalles!`
  );
  const linkWhatsApp = `https://wa.me/${1171514712}?text=${mensajeWpp}`;

  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center text-white">
      <div className="rounded-3xl border border-emerald-900/40 bg-[#131f17]/85 p-10 shadow-xl backdrop-blur-md space-y-6">
        <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto" />
        <div>
          <h1 className="font-serif text-2xl font-bold text-white mb-2">¡Pedido registrado con éxito!</h1>
          <p className="text-sm text-emerald-200/80">
            Te enviamos un correo a <strong className="text-white">{formData.email}</strong> con el resumen.
          </p>
        </div>
        <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-4 text-sm text-emerald-100">
          <p className="mb-3">Para coordinar el pago y la entrega, escribinos por WhatsApp haciendo clic en el botón de abajo:</p>
          <a 
            href={linkWhatsApp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd59] px-6 py-3 font-semibold shadow-lg transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 21.365h-.011c-1.637 0-3.238-.432-4.662-1.25l-.334-.19-3.468.91 3.921-3.38-.2-.317a9.232 9.232 0 01-1.423-4.996C5.854 6.837 9.878 2.8 14.862 2.8c2.427 0 4.708.953 6.425 2.684a9.141 9.141 0 012.671 6.471c-.002 5.042-4.025 9.083-9.009 9.083m5.316-6.536c-.292-.146-1.724-.852-1.992-.95-.268-.097-.463-.146-.658.146-.195.293-.756.95-.927 1.146-.17.195-.341.22-.634.073-.293-.146-1.23-.454-2.344-1.446-.867-.773-1.452-1.728-1.622-2.02-.171-.293-.018-.451.128-.598.132-.132.293-.342.439-.512.146-.17.195-.293.293-.488.097-.195.049-.366-.024-.512-.073-.146-.658-1.586-.902-2.17-.238-.57-.481-.493-.658-.502-.171-.008-.366-.01-.561-.01-.195 0-.512.073-.78.366-.268.293-1.024 1.002-1.024 2.443s1.049 2.834 1.195 3.029c.146.195 2.063 3.15 4.995 4.417 2.932 1.267 2.932.846 3.468.797.537-.049 1.724-.705 1.968-1.387.244-.683.244-1.268.171-1.387-.073-.12-.268-.195-.561-.341" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
        <Button onClick={() => navigate("/")} className="mt-2 w-full rounded-xl bg-transparent text-emerald-400 hover:bg-emerald-950/30 px-6 py-2.5 text-sm cursor-pointer border border-emerald-800/50">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}