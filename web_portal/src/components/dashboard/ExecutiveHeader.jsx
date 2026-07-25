import React from 'react';
import { Badge } from '../ui/Badge';
import { StatsCard } from './StatsCard';

/**
 * 🏛️ Organism: ExecutiveHeader
 * Cabecera de alto nivel para perfiles administrativos (Admin/Owner).
 * Sigue principios de Atomic Design.
 */
export function ExecutiveHeader({
  icon: Icon,
  title,
  subtitle,
  badgeText,
  badgeVariant = "info",
  children
}) {
  return (
    <div className="bg-white dark:bg-[#061426] -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300 shrink-0">
      {/* Elemento Atómico: Fondo Decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Molécula: Perfil de Identidad */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-500/10 rounded-[2.5rem] border-2 border-primary-500/20 p-1 flex items-center justify-center shadow-inner">
             <div className="w-full h-full bg-secondary-900 dark:bg-white/10 rounded-[2.3rem] flex items-center justify-center text-primary-500 font-black text-xl lg:text-2xl shadow-sm">
               <Icon size={32} />
             </div>
          </div>
          <div className="text-[#061426] dark:text-white text-left">
            <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-60 italic">{subtitle}</p>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase italic">{title}</h2>
          </div>
        </div>

        {/* Átomo: Badge con Estado */}
        <Badge variant={badgeVariant} className="!bg-primary-500/10 !text-primary-500 !border-primary-500/20 shadow-xl hidden sm:flex items-center gap-3 !px-5 !py-2">
           <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
           {badgeText}
        </Badge>
      </div>

      {/* ⚛️ Molecule: StatsCard Glass (Refactored) */}
      <div className="max-w-7xl mx-auto mt-8">
        <StatsCard variant="glass" className="!rounded-[2.5rem]">
          {children}
        </StatsCard>
      </div>
    </div>
  );
}
