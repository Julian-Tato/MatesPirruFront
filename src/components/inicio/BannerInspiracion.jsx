import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import fotoInspiracion from '@/assets/img/Banner-Inspiracion.png';

export default function BannerInspiracion() {
  return (
    <section className="w-full px-4 md:px-8 py-6">
      {/* Tarjeta principal panorámica un poco más alta para dar aire */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-sm border border-stone-200/70 h-[380px] md:h-[460px] flex items-center bg-stone-900">
        
        {/* 1. FONDO DIFUMINADO */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={fotoInspiracion} 
            alt="" 
            className="w-full h-full object-cover filter blur-2xl opacity-50 scale-125"
          />
        </div>

        {/* 2. TARJETA INTERNA: Más grande (h-[92%]) y desplazada más a la izquierda */}
        <div className="absolute right-2 md:right-8 top-0 h-full w-3/5 md:w-2/3 flex items-center justify-end z-10 p-3 md:p-4">
          <div className="relative h-[92%] w-auto max-w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-stone-950/40 backdrop-blur-sm">
            <img 
              src={fotoInspiracion} 
              alt="El ritual del mate" 
              className="h-full w-auto object-contain scale-100"
            />
          </div>
        </div>
        
        {/* 3. GRADIENTE DE TEXTO: Protege la lectura a la izquierda abarcando un poco más */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/20 z-20 pointer-events-none" />

        {/* 4. CONTENIDO DE TEXTO */}
        <div className="relative z-30 px-8 sm:px-12 md:px-20 max-w-lg space-y-3 md:space-y-4">
          <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase block">
            Herencia y Tradición
          </span>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            El ritual del mate, elevado.
          </h2>
          
          <p className="text-stone-200 text-sm md:text-base leading-relaxed font-light">
            Desde calabazas curadas a mano hasta accesorios seleccionados. Calidad que se siente en cada sorbo.
          </p>
          
          <div className="pt-2">
            <Link to="/catalogo">
              <Button className="bg-[#1b4332] hover:bg-[#132e22] text-white px-6 py-5 rounded-xl font-medium text-xs md:text-sm shadow-sm transition-all cursor-pointer">
                Explorar productos →
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}