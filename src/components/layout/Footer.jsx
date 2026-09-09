import React from 'react';
import { Link } from 'react-router-dom';
import logoPirru from '@/assets/img/Logo-Matespirru.png';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-neutral-500">
        
        {/* Logo circular y nombre institucional */}
        <div className="flex items-center gap-3">
          <img 
            src={logoPirru} 
            alt="Mates Pirru Logo" 
            className="h-9 w-9 rounded-full object-cover border border-emerald-900/10 shadow-sm" 
          />
          <span className="font-serif font-bold text-emerald-900 text-base">
            Mates Pirru
          </span>
        </div>

        {/* Enlaces rápidos útiles */}
        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-emerald-800 transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-emerald-800 transition-colors">Catálogo</Link>
          <Link to="/opiniones" className="hover:text-emerald-800 transition-colors">Opiniones</Link>
        </div>

        {/* Copyright */}
        <div className="text-neutral-400 text-center sm:text-right">
          © 2026 Mates Pirru - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}