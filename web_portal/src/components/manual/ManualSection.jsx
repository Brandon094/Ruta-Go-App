import React from 'react';
import { ManualStep } from './ManualStep';

/**
 * 🏛️ Organism: ManualSection
 * Contenedor de una sección del manual para un rol específico.
 */
export function ManualSection({ title, icon: Icon, steps, color }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/5 pb-6 px-2">
        <div className="w-14 h-14 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-none shadow-sm text-primary-500">
          <Icon size={32} />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight italic leading-none">{title}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Instrucciones paso a paso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, i) => (
          <ManualStep key={i} {...step} color={color} />
        ))}
      </div>
    </div>
  );
}
