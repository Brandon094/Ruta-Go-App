import React from 'react';
import { Info } from 'lucide-react';

/**
 * ⚛️ Molecule: InfoTip
 * Cuadro informativo para sugerencias o advertencias en los Dashboards.
 */
export function InfoTip({ title, message, className = "" }) {
  return (
    <div className={`mx-2 p-6 bg-slate-50 dark:bg-[#061426] rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-xl transition-all duration-300 ${className}`}>
      <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-500 shrink-0">
        <Info size={24} />
      </div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 text-left">
        <span className="font-black text-primary-500 uppercase mr-1">{title}:</span>
        {message}
      </p>
    </div>
  );
}
