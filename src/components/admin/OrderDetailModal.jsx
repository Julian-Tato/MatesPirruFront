import { useState, useEffect } from "react";

export default function OrderDetailModal({ isOpen, onClose, pedido, onUpdateStatus }) {
  const [newStatus, setNewStatus] = useState(0);
  
  useEffect(() => {
    if (pedido) setNewStatus(pedido.estado);
  }, [pedido]);

  if (!isOpen || !pedido) return null;

  const getStatusColor = (estado) => {
    switch (estado) {
      case 1: 
      case 3: return "bg-emerald-100 text-emerald-800 border-emerald-200"; 
      case 0: return "bg-amber-100 text-amber-800 border-amber-200"; 
      case 2: return "bg-blue-100 text-blue-800 border-blue-200"; 
      case 4: return "bg-red-100 text-red-800 border-red-200"; 
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusName = (estado) => {
    const estados = { 0: "Pendiente de Pago", 1: "Pagado", 2: "Enviado", 3: "Entregado", 4: "Cancelado" };
    return estados[estado] || "Desconocido";
  };

  // --- EXTRACCIÓN INTELIGENTE DE DATOS (Invitado o Usuario Registrado) ---
  const clientName = pedido.nombreCliente || pedido.usuario?.nombreApellido || "Cliente Invitado";
  const clientEmail = pedido.emailCliente || pedido.usuario?.email || "Sin email registrado";
  const clientPhone = pedido.telefonoCliente || "Sin teléfono";

  // Datos de envío y pago
  const metodoEntregaTexto = pedido.metodoEntrega === "retiro" ? "Punto de Retiro" : "Envío Coordinado";
  const direccionCompleta = pedido.direccionEnvio ? `${pedido.direccionEnvio}, ${pedido.barrio || ""}, ${pedido.provincia || ""}` : "Retiro en local";
  
  let pagoTexto = pedido.medioPago || "No especificado";
  if (pedido.medioPago === "transferencia") {
    pagoTexto = `Transferencia Bancaria (Alias/CBU origen: ${pedido.cbuOrigen || "No informado"})`;
  } else if (pedido.medioPago === "efectivo") {
    pagoTexto = `Efectivo en local (Abona con: ${pedido.montoEfectivo || "Cambio justo"})`;
  }

  const subtotal = pedido.detalles?.reduce((acc, item) => acc + (item.precioUnitario * item.cantidad), 0) || 0;
  const shipping = pedido.costoEnvio || 0;
  const total = pedido.total || 0;

  const handleUpdate = () => {
    if (Number(newStatus) !== pedido.estado) {
      onUpdateStatus(pedido.id, Number(newStatus));
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 17, 0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-[800px] max-h-[92vh] overflow-y-auto rounded-[24px] shadow-[0_32px_80px_rgba(15,23,17,0.22)] flex flex-col [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#143224]/20"
        style={{ background: "#f9f8f4" }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#e8e4db] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-[#143224] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Pedido #{pedido.id}
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(pedido.estado)}`}>
                {getStatusName(pedido.estado)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#e8e4db] text-[#6b7b71] hover:text-[#143224] transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8 flex flex-col gap-8">
          {/* Cards (Cliente y Envío) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1. DATOS DEL CLIENTE */}
            <div className="bg-white border border-[#e8e4db] rounded-[12px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <h3 className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider mb-4">
                Datos de Contacto / Cliente
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f4f1ea] text-[#143224] flex items-center justify-center font-bold text-lg border border-[#e8e4db] uppercase">
                  {clientName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#143224]">{clientName}</p>
                  <p className="text-sm text-[#6b7b71]">📧 {clientEmail}</p>
                  <p className="text-sm text-[#6b7b71]">📱 {clientPhone}</p>
                </div>
              </div>
            </div>

            {/* 2. DATOS DE ENVÍO Y PAGO */}
            <div className="bg-white border border-[#e8e4db] rounded-[12px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <h3 className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider mb-4">
                Método y Entrega
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f4f1ea] text-[#6b7b71] flex items-center justify-center border border-[#e8e4db] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-[#143224]">🚚 {metodoEntregaTexto}</p>
                  <p className="text-[#6b7b71]"><strong className="text-[#143224]">Dirección:</strong> {direccionCompleta}</p>
                  {pedido.codigoPostal && <p className="text-[#6b7b71]"><strong className="text-[#143224]">CP:</strong> {pedido.codigoPostal}</p>}
                  <p className="text-[#6b7b71] pt-1 border-t border-[#e8e4db] mt-1">
                    <strong className="text-[#143224]">Pago:</strong> {pagoTexto}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Lista de Productos */}
          <div>
            <h3 className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider mb-3">
              Artículos del Pedido
            </h3>
            <div className="bg-white border border-[#e8e4db] rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[#fdfbf7] border-b border-[#e8e4db]">
                      <th className="px-5 py-3 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Producto</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Precio Unit.</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#a09e97] uppercase tracking-wider text-center">Cant.</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#a09e97] uppercase tracking-wider text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e4db]">
                    {pedido.detalles?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#fcfaf5] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-[12px] overflow-hidden border border-[#e8e4db] shrink-0 bg-[#f4f1ea]">
                              <img 
                                src={item.producto?.imagenes?.[0]?.url || item.producto?.urlImagen || "https://placehold.co/100x100?text=Mate"} 
                                alt={item.producto?.nombre} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <span className="font-semibold text-[#143224] text-sm">{item.producto?.nombre || "Producto"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#6b7b71]">
                          ${item.precioUnitario.toLocaleString("es-AR")}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="text-sm font-semibold text-[#143224] bg-[#f4f1ea] px-2.5 py-1 rounded-md">
                            x{item.cantidad}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-[#143224] text-right">
                          ${(item.precioUnitario * item.cantidad).toLocaleString("es-AR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Totales */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-3">
              <div className="flex items-center justify-between text-sm text-[#6b7b71]">
                <span>Subtotal</span>
                <span className="font-medium text-[#143224]">${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#6b7b71]">
                <span>Costo de Envío</span>
                <span className="font-medium text-[#143224]">${shipping.toLocaleString("es-AR")}</span>
              </div>
              <div className="pt-3 border-t border-[#e8e4db] flex items-center justify-between">
                <span className="text-base font-semibold text-[#143224]">Total</span>
                <span className="text-2xl font-bold text-[#143224]">${total.toLocaleString("es-AR")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer (Acciones) */}
        <div className="px-8 py-5 border-t border-[#e8e4db] bg-[#fdfbf7] rounded-b-[24px] flex items-center justify-between shrink-0 flex-wrap gap-4">
          <button className="px-5 py-2.5 rounded-[12px] text-sm font-medium text-[#143224] bg-white border border-[#e8e4db] hover:bg-[#f4f1ea] transition-colors shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir Remito
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(Number(e.target.value))}
                className="pl-4 pr-10 py-2.5 rounded-[12px] bg-white border border-[#e8e4db] text-[#143224] text-sm font-medium outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value={0}>Pendiente de Pago</option>
                <option value={1}>Pagado</option>
                <option value={2}>Enviado</option>
                <option value={3}>Entregado</option>
                <option value={4}>Cancelado</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7b71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button
              onClick={handleUpdate}
              className="px-6 py-2.5 rounded-[12px] text-sm font-semibold bg-[#143224] text-white shadow-[0_4px_16px_rgba(20,50,36,0.22)] hover:bg-[#1a402e] hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              Actualizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}