import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';  
import InsigniasInicio from './InsigniasInicio';
import mateHero from '@/assets/img/IMG_9222.jpeg';

export default function BannerPrincipal() {
  return (
    <section className="w-full bg-[#F7F4EE] border-b border-stone-200/60 min-h-[88vh] md:min-h-[90vh] py-24 md:py-36 flex items-center">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        
        {/* Columna Izquierda: Textos, Botones e Insignias */}
        <div className="space-y-6 md:space-y-8">
          
          <span className="text-amber-800 text-xs md:text-sm font-bold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full border border-[#F3E5D8] inline-block shadow-sm">
            + TRADICIÓN ARTESANAL ARGENTINA
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-[1.15] tracking-tight mb-4">
            Si te acompaña MatesPirru <br />
            <span className="text-[#1b4332]">Elegiste bien</span>
          </h1>

          <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-xl font-normal">
            Mates artesanales, bombillas y accesorios seleccionados. Calidad que se siente desde el primer mate.
          </p>

        {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* 2. Envolvemos el botón con Link apuntando a la ruta del catálogo */}
            <Link to="/catalogo">
              <Button className="bg-[#1b4332] hover:bg-[#132e22] text-white px-7 py-6 rounded-xl font-medium text-base shadow-md hover:shadow-lg transition-all cursor-pointer">
                Ver Catálogo →
              </Button>
            </Link>

            <Button variant="outline" className="border-stone-300 bg-white hover:bg-stone-50 text-stone-800 px-7 py-6 rounded-xl font-medium text-base shadow-sm transition-all">
              Crear cuenta
            </Button>
          </div>

          <InsigniasInicio />
        </div>

        {/* Columna Derecha: Tarjeta con tu foto real y badge flotante más abajo */}
        <div className="relative flex justify-start md:pl-6 pb-10">
          
          {/* Tarjeta contenedora de la imagen */}
          <div className="relative w-full max-w-sm lg:max-w-[340px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src={mateHero} 
              alt="Mate artesanal Mates Pirru" 
              className="w-full h-[480px] object-cover opacity-95 hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Badge flotante con mayor desplazamiento hacia abajo (-bottom-8) */}
          <div className="absolute -bottom-8 left-2 sm:left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-stone-200/80 flex flex-col z-20">
            <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider">Vendidos este mes</span>
            <span className="text-amber-900 font-serif font-bold text-xl md:text-2xl">+340 mates</span>
          </div>

        </div>
      </div>
    </section>
  );
}