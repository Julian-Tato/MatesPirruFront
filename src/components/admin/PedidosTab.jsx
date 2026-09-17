import { useState, useEffect } from "react";
// Importamos el modal que armamos recién (ajustá la ruta si está en otra carpeta)
import OrderDetailModal from "./OrderDetailModal"; 

export default function PedidosTab() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Estado para controlar qué pedido se está viendo en el modal
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  // Extraemos la llamada a la API a una función para poder reutilizarla al actualizar estados
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

  useEffect(() => {
    fetchPedidos();
  }, []);

  // 2. Función que recibe el modal para actualizar el estado en C#
  const handleUpdateStatus = async (pedidoId, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");
      
      // Asumiendo que tenés una ruta PUT para cambiar el estado. 
      // Si la URL es distinta en tu backend, ajustala acá:
      const response = await fetch(`https://localhost:7045/api/pedidos/${pedidoId}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(nuevoEstado) // Mandamos el número del enum (0, 1, 2...)
      });

      if (!response.ok) throw new Error("Error al actualizar el estado");

      // Refrescamos la tabla para ver el nuevo color y estado
      fetchPedidos();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un problema al actualizar el estado del pedido.");
    }
  };

  // Convertimos el número que viene de C# a un texto amigable
  const getEstadoNombre = (estado) => {
    const estados = { 0: "Pendiente de Pago", 1: "Pagado", 2: "Enviado", 3: "Entregado", 4: "Cancelado" };
    return estados[estado] || "Desconocido";
  };

  // Evaluamos los colores basándonos en el número (0 a 4)
  const getOrderStatusColor = (estado) => {
    switch (estado) {
      case 1: 
      case 3: return "bg-emerald-100 text-emerald-800 border-emerald-200"; 
      case 0: return "bg-amber-100 text-amber-800 border-amber-200"; 
      case 2: return "bg-blue-100 text-blue-800 border-blue-200"; 
      case 4: return "bg-red-100 text-red-800 border-red-200"; 
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Forzamos el formato de fecha clásico (dd/mm/aaaa)
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
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(o.estado)}`}>
                        {getEstadoNombre(o.estado)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* 3. El botón ahora inyecta el objeto 'o' (pedido completo) en el estado */}
                      <button 
                        onClick={() => setPedidoSeleccionado(o)}
                        className="text-sm font-medium text-[#d4af37] hover:text-[#b08e26] transition-colors"
                      >
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

      {/* 4. Renderizamos el Modal pasándole el estado */}
      <OrderDetailModal 
        isOpen={!!pedidoSeleccionado} 
        onClose={() => setPedidoSeleccionado(null)} 
        pedido={pedidoSeleccionado}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}