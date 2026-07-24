import React from 'react';
import { Badge } from '../ui/Badge';

/**
 * 📱 Organism: MirrorHeader
 * Cabecera naranja que imita la App nativa (Mirror Mode).
 * Sigue principios de Atomic Design.
 */
export function MirrorHeader({
  avatarText,
  title,
  subtitle,
  badgeText,
  badgeVariant = "info",
  avatarBgColor = "bg-slate-200",
  children
}) {
  return (
    <div className="bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300 shrink-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
        {/* Molécula: Perfil Mirror */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 flex items-center justify-center shadow-inner overflow-hidden">
             <div className={`w-full h-full ${avatarBgColor} rounded-full flex items-center justify-center text-[#061426] font-black text-xl lg:text-2xl shadow-sm`}>
               {avatarText}
             </div>
          </div>
          <div className="text-white text-left">
            <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-80 italic">{subtitle}</p>
            <h2 className="text-xl lg:text-2xl font-black tracking-tight uppercase italic">{title}</h2>
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
