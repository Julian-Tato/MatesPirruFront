import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailModal({ producto, isOpen, onClose, onAgregarCarrito }) {
  const stockDisponible = producto?.stock ?? 0;
  
  const [cantidad, setCantidad] = useState(1);
  const [imagenActiva, setImagenActiva] = useState(0);

  // Resetea los valores cada vez que se abre un producto nuevo
  useEffect(() => {
    if (isOpen) {
      setCantidad(stockDisponible > 0 ? 1 : 0);
      setImagenActiva(0);
    }
  }, [isOpen, producto, stockDisponible]);

  if (!producto) return null;

  // Extracción segura de la galería de imágenes
  const galeria = producto.imagenes?.length > 0 
    ? producto.imagenes.map(img => (typeof img === 'string' ? img : img.url)) 
    : [producto.urlImagen || "https://placehold.co/600x600/cccccc/000000?text=Sin+Foto"];
  
  const pocasUnidades = stockDisponible > 0 && stockDisponible <= 4;

  const handleSumar = () => {
    if (cantidad < stockDisponible) {
      setCantidad(c => c + 1);
    }
  };

  const handleRestar = () => {
    if (cantidad > 1) {
      setCantidad(c => c - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden border-emerald-900/50 bg-[#0f1711]/95 p-0 text-emerald-50 shadow-2xl backdrop-blur-xl rounded-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/50 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-700/80"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#065f46 transparent" }}>
        <DialogTitle className="sr-only">{producto.nombre}</DialogTitle>
        <DialogDescription className="sr-only">{producto.descripcion}</DialogDescription>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* COLUMNA IZQUIERDA: Galería de Imágenes limpia */}
          <div className="flex flex-col bg-white/5 p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-emerald-900/30 bg-[#0a100b]">
              <img 
                src={galeria[imagenActiva]} 
                alt={`${producto.nombre} - vista ${imagenActiva + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Tira de Miniaturas */}
            {galeria.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                {galeria.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setImagenActiva(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      imagenActiva === index ? "border-[#d4af37]" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: Datos Comerciales */}
          <div className="flex flex-col justify-between p-8">
            <div className="space-y-6">
              
              <div>
                <Badge className="mb-3 border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20">
                  {producto.categoria?.descripcion || producto.categoria}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {producto.nombre}
                </h2>
                <div className="mt-4 text-3xl font-semibold text-[#d4af37]">
                  ${producto.precio.toLocaleString("es-AR")}
                </div>
              </div>

              <div className="space-y-4 border-y border-emerald-900/40 py-6">
                <p className="text-sm font-light leading-relaxed text-emerald-200/80">
                  {producto.descripcion}
                </p>
                {producto.material && (
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <span className="font-semibold text-emerald-600">Material:</span> {producto.material}
                  </div>
                )}
                {producto.modelo && (
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <span className="font-semibold text-emerald-600">Modelo:</span> {producto.modelo}
                  </div>
                )}
              </div>
            </div>

            {/* Zona de Compra con Validación de Stock */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${stockDisponible === 0 ? "text-red-400 font-semibold" : "text-emerald-500"}`}>
                  {stockDisponible === 0 
                    ? "❌ Producto agotado temporalmente" 
                    : pocasUnidades 
                      ? `¡Últimas ${stockDisponible} unidades!` 
                      : `Stock disponible: ${stockDisponible} u.`}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Selector de cantidad */}
                <div className="flex h-12 items-center rounded-xl border border-emerald-800/50 bg-emerald-950/50">
                  <button 
                    onClick={handleRestar} 
                    disabled={cantidad <= 1 || stockDisponible === 0} 
                    className="flex h-full w-12 items-center justify-center text-emerald-400 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex w-8 justify-center text-sm font-medium text-white">{cantidad}</span>
                  <button 
                    onClick={handleSumar} 
                    disabled={cantidad >= stockDisponible || stockDisponible === 0} 
                    className="flex h-full w-12 items-center justify-center text-emerald-400 hover:text-white disabled:opacity-30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Botón principal */}
                <Button 
                  onClick={() => {
                    if (stockDisponible <= 0 || cantidad > stockDisponible) return;
                    
                    // Aseguramos que la imagen viaje normalizada al carrito
                    const imagenPrincipal = galeria[imagenActiva] || galeria[0] || "";

                    onAgregarCarrito?.({ 
                      ...producto, 
                      quantity: cantidad,
                      imageUrl: imagenPrincipal,
                      imagen: imagenPrincipal 
                    });
                    
                    onClose();
                  }}
                  disabled={stockDisponible <= 0}
                  className={`h-12 flex-1 rounded-xl font-medium text-white shadow-lg transition-all ${
                    stockDisponible <= 0 
                      ? "bg-stone-700 opacity-50 cursor-not-allowed" 
                      : "bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95"
                  }`}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {stockDisponible <= 0 ? "Sin Stock" : "Agregar al Carrito"}
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}