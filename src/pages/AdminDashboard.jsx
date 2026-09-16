import { useState } from "react";
import ProductosTab from "../components/admin/ProductosTab";
import PedidosTab from "../components/admin/PedidosTab";

export default function AdminDashboard() {
  // Estado único para controlar la navegación interna
  const [activeTab, setActiveTab] = useState("productos");

  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#2c3e35] selection:bg-[#d4af37] selection:text-white pb-20">
      
      {/* Cabecera y Sub-navegación */}
      <div className="bg-white border-b border-[#e8e4db] pt-8 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-[#143224]" style={{ fontFamily: "var(--font-display)" }}>
                Panel de Administración
              </h1>
              <p className="text-sm text-[#6b7b71] mt-1">Gestioná tu inventario y las ventas de la tienda.</p>
            </div>
          </div>

          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab("productos")} 
              className={`pb-4 text-sm font-semibold transition-all border-b-2 ${ activeTab === "productos" ? "border-[#143224] text-[#143224]" : "border-transparent text-[#6b7b71] hover:text-[#143224]" }`}
            >
              Productos
            </button>
            <button 
              onClick={() => setActiveTab("pedidos")} 
              className={`pb-4 text-sm font-semibold transition-all border-b-2 ${ activeTab === "pedidos" ? "border-[#143224] text-[#143224]" : "border-transparent text-[#6b7b71] hover:text-[#143224]" }`}
            >
              Pedidos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Renderizado Condicional: Solo dibuja el componente que elegimos */}
        {activeTab === "productos" ? <ProductosTab /> : <PedidosTab />}
      </div>
      
    </div>
  );
}