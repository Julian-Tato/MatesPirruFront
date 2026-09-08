import React from 'react';

export default function InsigniasInicio() {
  return (
    <div className="flex flex-wrap items-center gap-6 pt-8 text-sm md:text-base text-stone-600 border-t border-stone-200/80">
      <div className="flex items-center gap-2 font-medium">
        <span className="text-lg">🚚</span> Envío gratis +$8000
      </div>
      <div className="flex items-center gap-2 font-medium">
        <span className="text-lg">🎁</span> Empaque artesanal
      </div>
      <div className="flex items-center gap-2 font-medium">
        <span className="text-lg">⭐</span> 4.9 / 5 estrellas
      </div>
    </div>
  );
}