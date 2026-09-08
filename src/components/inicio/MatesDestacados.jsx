import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '@/services/productosService';
import ProductCard from "@/components/catalogo/ProductCard";

export default function MatesDestacados() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarDestacados() {
      try {
        const todosLosProductos = await obtenerProductos();
        // Nos quedamos solo con los primeros 4 para la Home
        setProductos(todosLosProductos.slice(0, 4));
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    }

    cargarDestacados();
  }, []);

  if (loading) return null;

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-emerald-800 text-xs font-bold tracking-widest uppercase mb-2 block">
              Selección Especial
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-stone-900 tracking-tight">
              Mates Destacados
            </h2>
          </div>
          
          <Link to="/catalogo" className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 mt-4 md:mt-0 flex items-center gap-1 transition-colors">
            Ver todo el catálogo →
          </Link>
        </div>

        {/* Grilla mapeando  ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productos.map((item) => (
            <ProductCard 
              key={item.id || item.idMate} 
              producto={item} 
              esAdmin={false} 
              onAgregarCarrito={(prod) => {
                console.log("Agregado al carrito:", prod);
                // conectar la lógica del carrito de compras
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}