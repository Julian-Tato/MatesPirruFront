import { useState, useEffect } from "react";

export default function PedidosTab() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await fetch("https://localhost:7045/api/pedidos/admin", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Error al obtener los pedidos");
        
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  // 1. Convertimos el número que viene de C# a un texto amigable para el cliente
  const getEstadoNombre = (estado) => {
    const estados = {
      0: "Pendiente de Pago",
      1: "Pagado",
      2: "Enviado",
      3: "Entregado",
      4: "Cancelado"
    };
    return estados[estado] || "Desconocido";
  };

  // 2. Evaluamos los colores basándonos en el número (0 a 4) que devuelve la API
  const getOrderStatusColor = (estado) => {
    switch (estado) {
      case 1: // Pagado
      case 3: return "bg-emerald-100 text-emerald-800 border-emerald-200"; // Entregado
      case 0: return "bg-amber-100 text-amber-800 border-amber-200"; // PendientePago
      case 2: return "bg-blue-100 text-blue-800 border-blue-200"; // Enviado
      case 4: return "bg-red-100 text-red-800 border-red-200"; // Cancelado
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // 3. Forzamos el formato de fecha clásico (dd/mm/aaaa) usando 2-digit en el mes
  const formatearFecha = (fechaString) => {
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fechaString).toLocaleDateString('es-AR', opciones);
  };

  if (loading) {
    return <div className="text-center py-10 text-[#6b7b71]">Cargando historial de ventas...</div>;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-[#143224]">Historial de Pedidos</h2>
      </div>
      
      <div className="bg-white rounded-2xl border border-[#e8e4db] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fdfbf7] border-b border-[#e8e4db]">
                <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Nº Orden</th>
                <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4db]">
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#6b7b71]">No hay pedidos registrados aún.</td>
                </tr>
              ) : (
                pedidos.map(o => (
                  <tr key={o.id} className="hover:bg-[#fcfaf5] transition-colors group">
                    <td className="px-6 py-4 font-semibold text-[#143224]">#{o.id}</td>
                    <td className="px-6 py-4 text-sm text-[#6b7b71]">{formatearFecha(o.fecha)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#e3e8de] text-[#143224] flex items-center justify-center text-xs font-bold uppercase">
                          {o.usuario?.nombreApellido?.charAt(0) || "C"}
                        </div>
                        <span className="text-sm font-medium text-[#2c3e35]">
                          {o.usuario?.nombreApellido || "Cliente Desconocido"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2c3e35]">${o.total.toLocaleString("es-AR")}</td>
                    <td className="px-6 py-4" >
                      {/* Dibujamos el color leyendo el número y pintamos el nombre leyendo el mapa de textos */}
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(o.estado)}`}>
                        {getEstadoNombre(o.estado)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-[#d4af37] hover:text-[#b08e26] transition-colors">
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}