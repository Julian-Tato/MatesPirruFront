import React from 'react';
import { Link } from 'react-router-dom';
import mateHero from '@/assets/img/IMG_9222.jpeg';

export default function BannerPrincipal() {
  return (
    <>
      <section className="relative flex w-full min-h-[85vh] items-center py-20 z-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-12">
          
          {/* Columna Izquierda: Textos y Botones */}
          <div className="space-y-8">
            
            {/* Insignia Botánica */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/50 bg-emerald-950/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]"></span>
              Nueva Colección Botánica
            </div>
            
            {/* Título Principal (con tipografía display inyectada) */}
            <h1 className="leading-[1.05] tracking-tight text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.75rem, 6vw, 4.5rem)", fontWeight: 700 }}>
              El verde profundo<br />
              <span className="font-light italic text-emerald-400">de nuestras raíces.</span>
            </h1>
            
            {/* Párrafo */}
            <p className="max-w-md text-lg font-light leading-relaxed text-emerald-200/80">
              Descubrí una estética inspirada en la selva misionera. Materiales nobles, detalles en bronce y la pureza del mate artesanal.
            </p>
            
            {/* Botones de Acción (Reemplazan a los anteriores pero mantienen el ruteo) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              >
                Explorar Colección →
              </Link>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-800/60 px-8 py-4 text-sm font-medium text-emerald-100 backdrop-blur-md transition-all duration-300 hover:bg-emerald-900/40"
              >
                Unirse al Club
              </Link>
            </div>

            {/* Estadísticas de Valoración Integradas */}
            <div className="flex items-center gap-8 border-t border-emerald-900/50 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">4.9</span>
                <span className="text-xs uppercase tracking-wider text-emerald-400">Valoración</span>
              </div>
              <div className="h-8 w-px bg-emerald-900/50"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">+10k</span>
                <span className="text-xs uppercase tracking-wider text-emerald-400">Mates vendidos</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Fotográfica con UI flotante */}
          {/* 1. Agregamos 'group' al contenedor padre para que todo reaccione al unísono */}
          <div className="relative hidden items-center justify-end md:flex md:pl-6 group cursor-pointer">
            
            {/* 2. Halo de luz de neón que aparece detrás de la tarjeta al hacer hover (estilo Figma) */}
            <div className="absolute right-0 aspect-[4/5] w-full max-w-md rounded-[2rem] bg-gradient-to-r from-emerald-900/60 to-[#d4af37]/30 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100" />

            {/* 3. Contenedor de la foto: Le sumamos hover:-translate-y-2 para que "flote" y más sombra */}
            <div className="relative z-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-emerald-800/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:-translate-y-2 group-hover:border-emerald-700/60 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <img
                src={mateHero}
                alt="Mate premium en la naturaleza"
                // 4. Cambiamos hover:scale-105 por group-hover:scale-110
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              {/* 5. Agregamos pointer-events-none al degradado para que deje pasar el mouse hacia la foto */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1711] via-transparent to-transparent" />
            </div>
            
            {/* 6. Tarjeta flotante ("Calabaza Brasileña") - Flota hacia arriba junto con la foto */}
            <div className="absolute -left-8 bottom-12 z-20 rounded-2xl border border-emerald-800/40 bg-[#1a2e21]/90 px-6 py-4 shadow-2xl backdrop-blur-md transition-transform duration-700 group-hover:-translate-y-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-800 bg-emerald-950 text-xl shadow-inner">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-400">Calabaza Brasileña</p>
                  <p className="font-semibold text-white">Imperial Premium</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cinta Inferior (Features Strip) del diseño de Figma */}
      <div className="relative z-10 border-y border-emerald-900/30 bg-[#0a100b] py-6 overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 text-xs font-medium uppercase tracking-widest text-emerald-600/80 md:gap-12">
          <span>Hecho a mano</span>
          <span className="hidden text-emerald-800 md:inline">•</span>
          <span>Acero Inoxidable Quirúrgico</span>
          <span className="hidden text-emerald-800 md:inline">•</span>
          <span>Cuero Crudo Legítimo</span>
          <span className="hidden text-emerald-800 md:inline">•</span>
          <span>Envíos a todo el país</span>
        </div>
      </div>
    </>
  );
}