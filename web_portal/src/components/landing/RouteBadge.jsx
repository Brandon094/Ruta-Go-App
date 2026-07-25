import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * ⚛️ Molecule: RouteBadge
 * Insignia de ciudad para la sección de rutas.
 */
export function RouteBadge({ city }) {
  return (
    <div className="px-6 md:px-10 py-4 md:py-6 bg-white dark:bg-white/5 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex items-center gap-3 md:gap-4 group hover:bg-white dark:hover:bg-white/10 hover:shadow-xl transition-all duration-500 shadow-sm">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-secondary-900 rounded-xl md:rounded-2xl shadow-inner flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform">
        <MapPin size={20} className="md:size-6" />
      </div>
      <span className="text-lg md:text-2xl font-black text-[#061426] dark:text-white uppercase italic tracking-tighter">{city}</span>
    </div>
  );
}
