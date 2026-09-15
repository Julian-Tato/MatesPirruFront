import { useState, useEffect } from "react";
import ProductFormModal from "../components/admin/ProductFormModal";

export default function AdminDashboard() {
  // 1. Estados para nuestros datos del Admin (Independientes del catálogo público)
  const [productosAdmin, setProductosAdmin] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [categoriasReales, setCategoriasReales] = useState([]);

  // 2. Traemos Categorías y TODOS los Productos (Activos e Inactivos)
  useEffect(() => {
    // Buscar Categorías
    fetch("https://localhost:7045/api/Categorias")
      .then(res => res.json())
      .then(data => setCategoriasReales(data))
      .catch(err => console.error("Error trayendo categorías:", err));

    // Buscar Productos (El '?activo=' vacío fuerza al backend a traer absolutamente todo)
    fetch("https://localhost:7045/api/productos?activo=")
      .then(res => res.json())
      .then(data => {
        setProductosAdmin(data);
        setLoadingAdmin(false);
      })
      .catch(err => console.error("Error trayendo productos:", err));
  }, []);

  // 3. Estados de la interfaz
  const [activeTab, setActiveTab] = useState("productos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  
  // Filtros
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Activos"); // NUEVO FILTRO

  const categories = ["Todas", ...categoriasReales.map(c => c.descripcion)];

  // 4. Lógica de filtrado combinada
  let filteredProducts = productosAdmin;

  if (category !== "Todas") {
    filteredProducts = filteredProducts.filter(p => (p.categoria?.descripcion || p.categoria) === category);
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));
  }

  // Filtramos por estado (Activo/Inactivo/Todos)
  if (filtroEstado === "Activos") {
    filteredProducts = filteredProducts.filter(p => p.activo === true);
  } else if (filtroEstado === "Inactivos") {
    filteredProducts = filteredProducts.filter(p => p.activo === false);
  }

  // 5. Funciones de Acción
  const handleAbrirAgregar = () => {
    setProductoAEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirEditar = (producto) => {
    setProductoAEditar(producto);
    setIsModalOpen(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés desactivar este mate?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:7045/api/productos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Error al eliminar");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al intentar desactivar el mate.");
    }
  };

  // NUEVA FUNCION: Restaurar Mate
  const handleRestaurar = async (producto) => {
    if (!window.confirm("¿Querés volver a activar este mate en el catálogo?")) return;
    try {
      const token = localStorage.getItem("token");
      // Mandamos el mismo producto pero forzando el activo a true
      const payload = { ...producto, activo: true };

      const response = await fetch(`https://localhost:7045/api/productos/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Error al restaurar");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al intentar restaurar el mate.");
    }
  };

  // Datos falsos para pedidos 
  const orders = [
    { id: "#2401", date: "15 Sep 2026", total: 45000, status: "Pagado" },
    { id: "#2389", date: "14 Sep 2026", total: 38000, status: "Enviado" }
  ];

  const getMockClient = (orderId) => {
    const clients = { "#2401": "Valentina Rossi", "#2389": "Martín Gómez" };
    return clients[orderId] || "Cliente Invitado";
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Pagado":
      case "Entregado": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Pendiente de Pago": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Enviado": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelado": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
            <button onClick={() => setActiveTab("productos")} className={`pb-4 text-sm font-semibold transition-all border-b-2 ${ activeTab === "productos" ? "border-[#143224] text-[#143224]" : "border-transparent text-[#6b7b71] hover:text-[#143224]" }`}>
              Productos
            </button>
            <button onClick={() => setActiveTab("pedidos")} className={`pb-4 text-sm font-semibold transition-all border-b-2 ${ activeTab === "pedidos" ? "border-[#143224] text-[#143224]" : "border-transparent text-[#6b7b71] hover:text-[#143224]" }`}>
              Pedidos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* VISTA 1: PRODUCTOS */}
        {activeTab === "productos" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#143224]">Inventario de Productos</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              
              {/* Input de Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09e97]" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Buscar por nombre..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl outline-none bg-white border border-[#e8e4db] focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all text-[#2c3e35]" />
              </div>
              
              {/* Select de Categoría */}
              <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2.5 text-sm rounded-xl outline-none bg-white border border-[#e8e4db] focus:border-[#143224] transition-all text-[#2c3e35] cursor-pointer min-w-[160px]">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              {/* NUEVO: Select de Estado (Activos/Inactivos) */}
              <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="px-4 py-2.5 text-sm rounded-xl outline-none bg-white border border-[#e8e4db] focus:border-[#143224] transition-all text-[#2c3e35] cursor-pointer min-w-[130px]">
                <option value="Activos">🟢 Activos</option>
                <option value="Inactivos">🔴 Inactivos</option>
                <option value="Todas">Mostrar Todos</option>
              </select>

              {/* Botón Agregar */}
              <button onClick={handleAbrirAgregar} className="flex items-center justify-center gap-2 bg-[#143224] hover:bg-[#1a402e] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_4px_15px_rgba(20,50,36,0.2)] hover:-translate-y-0.5 whitespace-nowrap">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar
              </button>

            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4db] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fdfbf7] border-b border-[#e8e4db]">
                      <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Producto</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#a09e97] uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e4db]">
                    {loadingAdmin ? (
                       <tr><td colSpan={6} className="px-6 py-12 text-center text-[#6b7b71]">Cargando inventario...</td></tr>
                    ) : filteredProducts.map(p => (
                      <tr key={p.id} className={`transition-colors group ${p.activo ? 'hover:bg-[#fcfaf5]' : 'bg-red-50/30 hover:bg-red-50/60'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl overflow-hidden bg-[#f4f1ea] border border-[#e8e4db] shrink-0 ${!p.activo && 'opacity-50 grayscale'}`}>
                              <img src={p.urlImagen} alt={p.nombre} className="w-full h-full object-cover mix-blend-multiply" />
                            </div>
                            <span className={`font-semibold ${p.activo ? 'text-[#143224]' : 'text-neutral-400 line-through'}`}>{p.nombre}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6b7b71]">{p.categoria?.descripcion || p.categoria}</td>
                        <td className="px-6 py-4 text-sm font-medium text-[#2c3e35]">${p.precio.toLocaleString("es-AR")}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold ${p.stock < 5 ? "text-[#d4af37]" : "text-[#2c3e35]"}`}>
                            {p.stock} {p.stock < 5 && <span className="ml-2 text-xs font-normal text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full">Bajo</span>}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {p.activo ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Inactivo
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            {p.activo ? (
                              <>
                                {/* Botones si está ACTIVO */}
                                <button onClick={() => handleAbrirEditar(p)} className="p-2 hover:bg-[#e8e4db] rounded-lg text-[#6b7b71] hover:text-[#143224] transition-colors" title="Editar">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                                <button onClick={() => handleEliminar(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-[#6b7b71] hover:text-red-600 transition-colors" title="Desactivar">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </>
                            ) : (
                              /* Botón si está INACTIVO (Restaurar) */
                              <button onClick={() => handleRestaurar(p)} className="p-2 hover:bg-emerald-50 rounded-lg text-[#6b7b71] hover:text-emerald-600 transition-colors" title="Restaurar Mate">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!loadingAdmin && filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-[#6b7b71]">No se encontraron productos.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: PEDIDOS */}
        {activeTab === "pedidos" && (
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
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-[#fcfaf5] transition-colors group">
                        <td className="px-6 py-4 font-semibold text-[#143224]">{o.id}</td>
                        <td className="px-6 py-4 text-sm text-[#6b7b71]">{o.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#e3e8de] text-[#143224] flex items-center justify-center text-xs font-bold">
                              {getMockClient(o.id).charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-[#2c3e35]">{getMockClient(o.id)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#2c3e35]">${o.total.toLocaleString("es-AR")}</td>
                        <td className="px-6 py-4" >
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(o.status)}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-sm font-medium text-[#d4af37] hover:text-[#b08e26] transition-colors">
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        producto={productoAEditar} 
        categorias={categoriasReales}
      />
    </div>
  );
}