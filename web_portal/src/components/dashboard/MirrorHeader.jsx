import React from 'react';
import { Badge } from '../ui/Badge';

/**
 * 📱 Organism: MirrorHeader (Refactored v1.7.8)
 * Cabecera naranja simplificada para Pasajeros y Conductores.
 * Prioriza la Header TopBar para evitar redundancia de nombres.
 */
export function MirrorHeader({
  avatarText,
  badgeText,
  badgeVariant = "info",
  avatarBgColor = "bg-slate-200",
  children
}) {
  return (
    <div className="bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300 shrink-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
        {/* Molécula: Avatar Mirror */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 rounded-2xl border-2 border-white/30 p-1 flex items-center justify-center shadow-inner overflow-hidden">
             <div className={`w-full h-full ${avatarBgColor} rounded-xl flex items-center justify-center text-[#061426] font-black text-xl shadow-sm`}>
               {avatarText}
             </div>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] italic truncate max-w-[150px] md:max-w-none">
              Operación en Tiempo Real
            </p>
          </div>
        </div>

        {/* Átomo: Badge Mirror */}
        <Badge variant={badgeVariant} className="!bg-[#061426]/30 !text-white !border-white/10 backdrop-blur-md shadow-xl hidden sm:flex items-center gap-3 !px-5 !py-2">
           {badgeText}
        </Badge>
      </div>

      {/* Slot para el contenido (KPIs, Stats, etc) */}
      <div className="max-w-4xl mx-auto mt-8">
        {children}
      </div>
    </div>
  );
}
