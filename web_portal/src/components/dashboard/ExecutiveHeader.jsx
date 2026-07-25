import React from 'react';
import { Badge } from '../ui/Badge';
import { StatsCard } from './StatsCard';

/**
 * 🏛️ Organism: ExecutiveHeader (Refactored v1.7.8)
 * Cabecera de alto nivel para perfiles administrativos.
 * Removidos títulos redundantes para priorizar la Header TopBar.
 */
export function ExecutiveHeader({
  icon: Icon,
  badgeText,
  badgeVariant = "info",
  children
}) {
  return (
    <div className="bg-white dark:bg-[#061426] -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300 shrink-0 border-b border-slate-100 dark:border-white/5">
      {/* Elemento Atómico: Fondo Decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Molécula: Icono de Contexto */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary-500/10 rounded-2xl border-2 border-primary-500/20 p-1 flex items-center justify-center shadow-inner">
             <div className="w-full h-full bg-secondary-900 dark:bg-white/10 rounded-xl flex items-center justify-center text-primary-500 font-black shadow-sm">
               <Icon size={24} />
             </div>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] italic">
              Consolidado de Inteligencia
            </p>
          </div>
        </div>

        {/* Átomo: Badge con Estado */}
        <Badge variant={badgeVariant} className="!bg-primary-500/10 !text-primary-500 !border-primary-500/20 shadow-xl hidden sm:flex items-center gap-3 !px-5 !py-2">
           <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
           {badgeText}
        </Badge>
      </div>

      {/* ⚛️ Molecule: StatsCard Glass */}
      <div className="max-w-7xl mx-auto mt-8">
        <StatsCard variant="glass" className="!rounded-[2.5rem]">
          {children}
        </StatsCard>
      </div>
    </div>
  );
}
