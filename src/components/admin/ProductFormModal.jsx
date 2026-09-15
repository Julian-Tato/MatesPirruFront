import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ProductFormModal({ isOpen, onClose, producto, categorias = [] }) {
  // 1. Ampliamos el estado inicial para incluir modelo y material
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    urlImagen: "",
    idCategoria: "",
    modelo: "",
    material: ""
  });

  const [guardando, setGuardando] = useState(false);

  // 2. Rellenamos los campos extra si estamos editando
  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        stock: producto.stock || "",
        urlImagen: producto.urlImagen || "",
        idCategoria: producto.idCategoria || producto.categoria?.id || "",
        modelo: producto.modelo || "",
        material: producto.material || ""
      });
    } else {
      setFormData({ 
        nombre: "", descripcion: "", precio: "", stock: "", 
        urlImagen: "", idCategoria: "", modelo: "", material: "" 
      });
    }
  }, [producto, isOpen]);

  const handleChange = (e) => {
    const value = e.target.name === "idCategoria" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const esEdicion = !!producto;
      const url = esEdicion
        ? `https://localhost:7045/api/productos/${producto.id}`
        : "https://localhost:7045/api/productos";
      const method = esEdicion ? "PUT" : "POST";

      // 3. Ya no hardcodeamos nada, usamos los datos reales del form
      const payload = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        idCategoria: Number(formData.idCategoria),
        activo: true
      };

      if (esEdicion) {
        payload.id = producto.id;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("El backend rechazó la petición. Revisá los permisos o los datos.");
      }

      console.log(esEdicion ? "¡Mate actualizado!" : "¡Mate creado!");
      onClose();
      window.location.reload();

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un problema al guardar. Mirá la consola para más detalles.");
    } finally {
      setGuardando(false);
    }
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
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.descripcion}
                  </option>
                ))}
              </select>
            </div>

            {/* NUEVOS CAMPOS: Modelo y Material */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#143224]">Modelo</label>
              <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required placeholder="Ej: Camionero Liso"
                className="w-full rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#143224]">Material</label>
              <input type="text" name="material" value={formData.material} onChange={handleChange} required placeholder="Ej: Madera de Algarrobo"
                className="w-full rounded-xl border border-[#e8e4db] bg-white px-4 py-2.5 text-sm text-[#2c3e35] focus:border-[#143224] focus:outline-none focus:ring-1 focus:ring-[#143224]" />
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
            <button type="button" onClick={onClose} disabled={guardando} className="rounded-xl px-5 py-2.5 text-sm font-medium text-[#6b7b71] transition-colors hover:bg-[#e8e4db] disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={guardando} className="rounded-xl bg-[#143224] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1a402e] disabled:opacity-50 disabled:hover:translate-y-0">
              {guardando ? "Guardando..." : (esEdicion ? "Guardar Cambios" : "Crear Producto")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}