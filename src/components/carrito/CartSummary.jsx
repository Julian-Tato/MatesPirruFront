export default function CartSummary({ total = 0 }) {
  const subtotalSeguro = Number(total || 0);

  return (
    <div className="border-t border-emerald-900/40 pt-4 space-y-2 text-white">
      <div className="flex justify-between text-sm text-emerald-200/80">
        <span>Subtotal</span>
        <span className="text-white">${subtotalSeguro.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm text-emerald-200/80">
        <span>Envío</span>
        <span className="text-emerald-400 font-medium">A calcular / Gratis</span>
      </div>
      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-emerald-900/30">
        <span>Total</span>
        <span className="text-emerald-400">${subtotalSeguro.toLocaleString()}</span>
      </div>
    </div>
  );
}