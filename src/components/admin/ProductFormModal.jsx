import { useState, useRef, useCallback, useEffect } from "react";

export default function ProductFormModal({ isOpen, onClose, producto, categorias = [], onGuardar }) {
  const [dragging, setDragging] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const fileInputRef = useRef(null);

  // Estados del formulario y las imágenes
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    idCategoria: "",
    modelo: "",
    material: "",
    precio: "",
    stock: "",
    descripcion: "",
  });

  // Efecto para rellenar los datos cuando se abre para EDITAR
  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || "",
        idCategoria: producto.idCategoria || producto.categoria?.id || "",
        modelo: producto.modelo || "",
        material: producto.material || "",
        precio: producto.precio || "",
        stock: producto.stock || "",
        descripcion: producto.descripcion || "",
      });

      // Si el mate ya tenía imágenes, las cargamos en la galería
      if (producto.imagenes && producto.imagenes.length > 0) {
        setImages(
          producto.imagenes.map((img, idx) => ({
            id: img.id?.toString() || Math.random().toString(),
            url: img.url,
            name: `Imagen guardada ${idx + 1}`
          }))
        );
      } else {
        setImages([]);
      }
    } else {
      // Limpiamos todo si es crear NUEVO
      setForm({ nombre: "", idCategoria: "", modelo: "", material: "", precio: "", stock: "", descripcion: "" });
      setImages([]);
    }
  }, [producto, isOpen]);

  // Lógica del Drag & Drop y lectura de archivos locales
  const handleFiles = useCallback((files) => {
    if (!files) return;
    Array.from(files).slice(0, 6 - images.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [
          ...prev,
          { id: Math.random().toString(36).slice(2), url: e.target?.result, name: file.name }
        ]);
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    });
  }, [images.length]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = (id) => setImages(prev => prev.filter(img => img.id !== id));

  // LÓGICA DE ENVÍO AL BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const esEdicion = !!producto;
      const url = esEdicion
        ? `https://localhost:7045/api/productos/${producto.id}`
        : "https://localhost:7045/api/productos";
      const method = esEdicion ? "PUT" : "POST";

      // Armamos el paquete mapeando las imágenes de la galería
      const payload = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        stock: Number(form.stock),
        idCategoria: Number(form.idCategoria),
        modelo: form.modelo,
        material: form.material,
        activo: true,
        imagenes: images.map(img => ({ url: img.url })) // Mandamos el Array que pide C#
      };

      if (esEdicion) payload.id = producto.id;

      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("El backend rechazó la petición.");

      onClose();
      if (onGuardar) {
        onGuardar();
      } // Recargamos para ver los cambios
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un problema al guardar. Mirá la consola.");
    } finally {
      setGuardando(false);
    }
  };

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 17, 0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-[0_32px_80px_rgba(15,23,17,0.22)] flex flex-col [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#143224]/20 hover:[&::-webkit-scrollbar-thumb]:bg-[#143224]/40"
        style={{ background: "#f9f8f4", scrollbarWidth: "thin" }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#e8e4db] shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#143224] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {producto ? "Editar Producto" : "Agregar Producto"}
              </h2>
              <p className="mt-1 text-sm text-[#6b7b71]">
                Completá los datos técnicos del mate artesanal.
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={guardando}
              className="mt-0.5 p-2 rounded-xl hover:bg-[#e8e4db] text-[#6b7b71] hover:text-[#143224] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body (Formulario) */}
        <form id="productForm" onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5">
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Nombre del Producto</label>
            <input
              type="text"
              required
              placeholder="Ej: Mate Imperial Cuero Repujado"
              value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e8e4db] text-[#143224] placeholder:text-[#c0bbb4] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all"
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Categoría</label>
            <div className="relative">
              <select
                required
                value={form.idCategoria}
                onChange={e => setForm(f => ({ ...f, idCategoria: e.target.value }))}
                className="w-full px-4 py-3 pr-10 rounded-xl bg-white border border-[#e8e4db] text-[#143224] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Seleccioná una categoría...</option>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.descripcion}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7b71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Modelo + Material */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Modelo</label>
              <input
                type="text"
                required
                placeholder="Ej: Artesanal N°3"
                value={form.modelo}
                onChange={e => setForm(f => ({ ...f, modelo: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#e8e4db] text-[#143224] placeholder:text-[#c0bbb4] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Material</label>
              <input
                type="text"
                required
                placeholder="Ej: Cuero y Calabaza"
                value={form.material}
                onChange={e => setForm(f => ({ ...f, material: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#e8e4db] text-[#143224] placeholder:text-[#c0bbb4] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all"
              />
            </div>
          </div>

          {/* Precio + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Precio ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#a09e97]">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="0"
                  value={form.precio}
                  onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-[#e8e4db] text-[#143224] placeholder:text-[#c0bbb4] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Stock Inicial</label>
              <input
                type="number"
                required
                min="0"
                placeholder="0"
                value={form.stock}
                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#e8e4db] text-[#143224] placeholder:text-[#c0bbb4] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all"
              />
            </div>
          </div>

          {/* Carga de imágenes (DRAG & DROP) */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Fotos del Producto</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center gap-3 w-full py-9 rounded-2xl cursor-pointer transition-all border-2 border-dashed ${
                dragging
                  ? "border-[#143224] bg-[#143224]/5"
                  : "border-[#c8c3bb] bg-white hover:border-[#143224] hover:bg-[#143224]/[0.02]"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragging ? "bg-[#143224]/10" : "bg-[#f0ece4]"}`}>
                <svg className={`w-6 h-6 transition-colors ${dragging ? "text-[#143224]" : "text-[#6b7b71]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 16.5v.75A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25V16.5M16.5 12V4.875a.375.375 0 00-.375-.375h-4.5a.375.375 0 00-.375.375V12M3 3l18 18" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v9.75" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-[#143224]">
                  Arrastrá tus fotos acá o <span className="text-[#d4af37] underline underline-offset-2">explorar</span>
                </p>
                <p className="text-xs text-[#a09e97] mt-1">Soporta JPG, PNG · Máximo 6 imágenes</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />
            </div>

            {/* Galería de Miniaturas */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-1">
                {images.map((img, idx) => (
                  <div key={img.id} className="relative group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#e8e4db] bg-[#f0ece4]">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </div>
                    {idx === 0 && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wider bg-[#d4af37] text-white px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                        Portada
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-[#e8e4db] shadow-sm flex items-center justify-center text-[#6b7b71] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-[#c8c3bb] bg-white hover:border-[#143224] hover:bg-[#143224]/[0.02] flex items-center justify-center text-[#a09e97] hover:text-[#143224] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6b7b71] uppercase tracking-wider">Descripción Corta</label>
            <textarea
              required
              rows={3}
              placeholder="Describí las características del mate..."
              value={form.descripcion}
              onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#e8e4db] text-[#143224] placeholder:text-[#c0bbb4] text-sm outline-none focus:border-[#143224] focus:ring-2 focus:ring-[#143224]/10 transition-all resize-none leading-relaxed"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#e8e4db] flex items-center justify-end gap-3 bg-[#f9f8f4] rounded-b-3xl shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={guardando}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#6b7b71] hover:bg-[#e8e4db] hover:text-[#143224] transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="productForm"
            disabled={guardando}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#143224] text-white shadow-[0_4px_16px_rgba(20,50,36,0.22)] hover:bg-[#1a402e] hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {guardando ? "Guardando..." : (producto ? "Guardar Cambios" : "Crear Producto")}
          </button>
        </div>
      </div>
    </div>
  );
}