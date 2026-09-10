import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { obtenerProductos } from '@/services/productosService';
import ProductCard from "@/components/catalogo/ProductCard";
import { agregarAlCarrito } from "@/lib/utils";

export default function MatesDestacados() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const carruselRef = useRef(null);

  useEffect(() => {
    async function cargarDestacados() {
      try {
        const todosLosProductos = await obtenerProductos();
        // Traemos más de 4 para poder scrollear
        setProductos(todosLosProductos.slice(0, 8));
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    }

    cargarDestacados();
  }, []);

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  const scrollIzquierda = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollDerecha = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  return (
    <section className="relative z-10 w-full bg-transparent px-6 py-24 md:px-12 border-b border-emerald-900/30">
      <div className="mx-auto max-w-7xl">
        
        {/* Cabecera */}
        <div className="mb-16 flex flex-col justify-between items-start md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#d4af37]">
              La Reserva
            </span>
            <h2 className="text-4xl font-semibold text-white md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Mates Destacados
            </h2>
          </div>
          
          <Link 
            to="/catalogo" 
            className="group mt-6 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-emerald-600 transition-all hover:text-emerald-400 md:mt-0"
          >
            Catálogo completo 
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Contenedor principal del Carrusel */}
        <div className="relative group/carrusel">
          
          {/* Botón Izquierda */}
          <button 
            onClick={scrollIzquierda}
            className="absolute -left-5 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/50 bg-emerald-950/90 h-12 w-12 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] backdrop-blur-md transition-all hover:scale-110 hover:bg-emerald-900 hover:text-white md:flex opacity-0 group-hover/carrusel:opacity-100"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Carrusel */}
          <div 
            ref={carruselRef} 
            // items-stretch fuerza a que todas las tarjetas tengan el mismo alto
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 items-stretch [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          >
            {productos.map((item) => (
              <div 
                key={item.id || item.idMate} 
                // Esta línea clona visualmente la grilla: 1 columna en celu, 2 en tablet, 4 en desktop exactas.
                className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] flex-none snap-start"
              >
                <ProductCard 
                  producto={item} 
                  esAdmin={false} 
                  onAgregarCarrito={handleAgregarCarrito}
                />
              </div>
            ))}
          </div>

          {/* Botón Derecha */}
          <button 
            onClick={scrollDerecha}
            className="absolute -right-5 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/50 bg-emerald-950/90 h-12 w-12 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] backdrop-blur-md transition-all hover:scale-110 hover:bg-emerald-900 hover:text-white md:flex opacity-0 group-hover/carrusel:opacity-100"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

        </div>
      </div>
    </section>
  );
}