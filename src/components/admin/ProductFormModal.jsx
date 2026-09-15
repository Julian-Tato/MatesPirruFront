import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Recibimos la prop 'categorias' que nos mandará el Dashboard
export default function ProductFormModal({ isOpen, onClose, producto, categorias = [] }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    urlImagen: "",
    idCategoria: "" // Usamos el ID numérico que exige tu base de datos
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        stock: producto.stock || "",
        urlImagen: producto.urlImagen || "",
        // Atrapamos el IdCategoria real del mate
        idCategoria: producto.idCategoria || producto.categoria?.id || "" 
      });
    } else {
      setFormData({ nombre: "", descripcion: "", precio: "", stock: "", urlImagen: "", idCategoria: "" });
    }
  }, [producto, isOpen]);

  const handleChange = (e) => {
    // Si el input es el select de categoría, convertimos el valor a número
    const value = e.target.name === "idCategoria" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos listos para enviar al backend:", formData);
    onClose();
  };

  const esEdicion = !!producto;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden border-[#e8e4db] bg-[#f9f8f4] p-8 shadow-2xl rounded-3xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#143224]/20 hover:[&::-webkit-scrollbar-thumb]:bg-[#143224]/40"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(20, 50, 36, 0.2) transparent" }}
      >
        <DialogTitle className="text-2xl font-bold text-[#143224]" style={{ fontFamily: "var(--font-display)" }}>
          {esEdicion ? "Editar Producto" : "Agregar Producto"}
        </DialogTitle>
        <DialogDescription className="text-sm text-[#6b7b71] mb-6">
          {esEdicion ? "Modificá los datos y guardá los cambios." : "Completá la ficha técnica del nuevo producto."}
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#143224]">Nombre del Producto</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required
                className="w-full rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
            </div>

            {/* NUEVO CAMPO: Select de Categoría */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#143224]">Categoría</label>
              <select 
                name="idCategoria" 
                value={formData.idCategoria} 
                onChange={handleChange} 
                required
                className="w-full cursor-pointer rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]"
              >
                <option value="" disabled>Seleccioná una categoría...</option>
                {/* Mapeamos las categorías reales de la base de datos */}
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#143224]">Precio ($)</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min="0"
                className="w-full rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#143224]">Stock Inicial</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0"
                className="w-full rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#143224]">URL de la Imagen</label>
              <input type="url" name="urlImagen" value={formData.urlImagen} onChange={handleChange} required
                className="w-full rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#143224]">Descripción Corta</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required rows="3"
                className="w-full resize-none rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-[#e8e4db]">
            <button type="button" onClick={onClose} className="rounded-xl px-5 py-2.5 text-sm font-medium text-[#6b7b71] transition-colors hover:bg-[#e8e4db]">
              Cancelar
            </button>
            <button type="submit" className="rounded-xl bg-[#143224] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1a402e]">
              {esEdicion ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}