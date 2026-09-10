import React from 'react';
import { Link } from 'react-router-dom';
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Footer() {
  return (
    <footer className="w-full border-t border-emerald-900/30 bg-[#0a100b] py-12 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-emerald-700/60">
        
        {/* Logo circular y nombre institucional */}
        <div className="flex items-center gap-3">
          <img 
            src={logoPirru} 
            alt="Mates Pirru Logo" 
            className="h-9 w-9 rounded-full object-cover border border-emerald-800/50 shadow-sm" 
          />
          <span className="font-semibold tracking-wide text-white text-xl" style={{ fontFamily: "var(--font-display)" }}>
            Mates Pirru
          </span>
        </div>

        {/* Enlaces rápidos útiles */}
        <div className="flex gap-8 font-medium text-emerald-600/80 uppercase tracking-widest text-xs">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-emerald-400 transition-colors">Catálogo</Link>
          <Link to="/opiniones" className="hover:text-emerald-400 transition-colors">Opiniones</Link>
        </div>

        {/* Copyright */}
        <div className="text-emerald-700/60 font-light text-center md:text-right">
          © 2026 Mates Pirru · Inspiración Botánica
        </div>
      </div>
    </footer>
  );
}