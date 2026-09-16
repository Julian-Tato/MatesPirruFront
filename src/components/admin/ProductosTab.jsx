import { useState, useEffect } from "react";
import ProductFormModal from "./ProductFormModal";
import ActionModal from "./ActionModal"; // Importamos el nuevo modal

export default function ProductosTab() {
  const [productosAdmin, setProductosAdmin] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [categoriasReales, setCategoriasReales] = useState([]);

  // Estados de la interfaz
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Activos");

  // NUEVO: Estado para nuestro Modal de Acción (Eliminar/Restaurar/Feedback)
  const [modalAccion, setModalAccion] = useState({
    isOpen: false,
    tipo: "confirmacion",
    accion: "", // "eliminar" o "restaurar"
    producto: null,
    titulo: "",
    mensaje: "",
    cargando: false
  });

  const actualizarCatalogo = () => {
    const token = localStorage.getItem("token");
    fetch("https://localhost:7045/api/productos/admin", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setProductosAdmin(data);
        else setProductosAdmin([]);
        setLoadingAdmin(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setProductosAdmin([]);
        setLoadingAdmin(false);
      });
  };

  useEffect(() => {
    fetch("https://localhost:7045/api/Categorias")
      .then(res => res.json())
      .then(data => setCategoriasReales(data))
      .catch(err => console.error("Error trayendo categorías:", err));

    actualizarCatalogo(); 
  }, []);

  const categories = ["Todas", ...categoriasReales.map(c => c.descripcion)];

  let filteredProducts = productosAdmin;
  if (category !== "Todas") filteredProducts = filteredProducts.filter(p => (p.categoria?.descripcion || p.categoria) === category);
  if (search) filteredProducts = filteredProducts.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));
  if (filtroEstado === "Activos") filteredProducts = filteredProducts.filter(p => p.activo === true);
  else if (filtroEstado === "Inactivos") filteredProducts = filteredProducts.filter(p => p.activo === false);

  const handleAbrirAgregar = () => {
    setProductoAEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirEditar = (producto) => {
    setProductoAEditar(producto);
    setIsModalOpen(true);
  };

  // --- NUEVA LÓGICA DE ELIMINAR / RESTAURAR ---

  // 1. Preparamos el Modal para Desactivar
  const confirmarEliminar = (producto) => {
    setModalAccion({
      isOpen: true,
      tipo: "confirmacion",
      accion: "eliminar",
      producto,
      titulo: "¿Desactivar Mate?",
      mensaje: `¿Estás seguro de que querés desactivar el "${producto.nombre}"? Dejará de mostrarse en el catálogo público.`,
      cargando: false
    });
  };

  // 2. Preparamos el Modal para Restaurar
  const confirmarRestaurar = (producto) => {
    setModalAccion({
      isOpen: true,
      tipo: "confirmacion",
      accion: "restaurar",
      producto,
      titulo: "Restaurar Mate",
      mensaje: `¿Querés volver a activar el "${producto.nombre}" para que esté disponible en la tienda?`,
      cargando: false
    });
  };

  // 3. Ejecutamos la petición a la API (Se llama cuando el usuario hace clic en Aceptar en el modal)
  const ejecutarAccion = async () => {
    setModalAccion(prev => ({ ...prev, cargando: true }));
    const { accion, producto } = modalAccion;
    const token = localStorage.getItem("token");

    try {
      let response;
      if (accion === "eliminar") {
        response = await fetch(`https://localhost:7045/api/productos/${producto.id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      } else {
        // Restaurar
        const payload = { ...producto, activo: true };
        response = await fetch(`https://localhost:7045/api/productos/${producto.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) throw new Error("Error en el servidor");

      // Refrescamos la tabla por detrás
      actualizarCatalogo();
      
      // Transformamos el modal en un mensaje de éxito
      setModalAccion({
        isOpen: true,
        tipo: "exito",
        titulo: "¡Acción exitosa!",
        mensaje: accion === "eliminar" ? "El mate fue desactivado correctamente." : "El mate volvió al catálogo público.",
        cargando: false
      });

    } catch (error) {
      console.error(error);
      // Transformamos el modal en un mensaje de error
      setModalAccion({
        isOpen: true,
        tipo: "error",
        titulo: "Ocurrió un problema",
        mensaje: "No pudimos comunicarnos con el servidor. Revisá tu conexión e intentá de nuevo.",
        cargando: false
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#143224]">Inventario de Productos</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09e97]" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Buscar por nombre..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl outline-none bg-white border border-[#e8e4db] focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all text-[#2c3e35]" />
        </div>
        
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2.5 text-sm rounded-xl outline-none bg-white border border-[#e8e4db] focus:border-[#143224] transition-all text-[#2c3e35] cursor-pointer min-w-[160px]">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="px-4 py-2.5 text-sm rounded-xl outline-none bg-white border border-[#e8e4db] focus:border-[#143224] transition-all text-[#2c3e35] cursor-pointer min-w-[130px]">
          <option value="Activos">🟢 Activos</option>
          <option value="Inactivos">🔴 Inactivos</option>
          <option value="Todas">Mostrar Todos</option>
        </select>

        <button onClick={handleAbrirAgregar} className="flex items-center justify-center gap-2 bg-[#143224] hover:bg-[#1a402e] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_4px_15px_rgba(20,50,36,0.2)] hover:-translate-y-0.5 whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
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
                        <img src={p.imagenes && p.imagenes.length > 0 ? p.imagenes[0].url : "https://placehold.co/600x600/cccccc/000000?text=Sin+Foto"} alt={p.nombre} className="w-full h-full object-cover" />
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
                          <button onClick={() => handleAbrirEditar(p)} className="p-2 hover:bg-[#e8e4db] rounded-lg text-[#6b7b71] hover:text-[#143224] transition-colors" title="Editar">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>
                          {/* CAMBIAMOS ESTE ONCLICK */}
                          <button onClick={() => confirmarEliminar(p)} className="p-2 hover:bg-red-50 rounded-lg text-[#6b7b71] hover:text-red-600 transition-colors" title="Desactivar">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </>
                      ) : (
                        /* CAMBIAMOS ESTE ONCLICK */
                        <button onClick={() => confirmarRestaurar(p)} className="p-2 hover:bg-emerald-50 rounded-lg text-[#6b7b71] hover:text-emerald-600 transition-colors" title="Restaurar Mate">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        producto={productoAEditar} 
        categorias={categoriasReales}
        onGuardar={actualizarCatalogo}
      />

      {/* RENDERIZAMOS EL NUEVO MODAL DE ACCIONES Y FEEDBACK */}
      <ActionModal 
        isOpen={modalAccion.isOpen}
        tipo={modalAccion.tipo}
        titulo={modalAccion.titulo}
        mensaje={modalAccion.mensaje}
        cargando={modalAccion.cargando}
        esDestructivo={modalAccion.accion === "eliminar"}
        textoConfirmar={modalAccion.accion === "eliminar" ? "Desactivar" : "Activar"}
        onClose={() => setModalAccion(prev => ({ ...prev, isOpen: false }))}
        onConfirm={ejecutarAccion}
      />
    </div>
  );
}