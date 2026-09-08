import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 bg-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-stone-500">
        <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-base">
          <span>🫖</span> Mates Pirru
        </div>
        <div>
          © 2026 Mates Pirru - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}