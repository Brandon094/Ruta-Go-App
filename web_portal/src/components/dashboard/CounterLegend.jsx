import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ⚛️ Molecule: CounterLegend
 * Menú desplegable que explica el significado de los contadores del Dashboard.
 * Mirror de la lógica en PassengerHomeActivity.java
 */
export function CounterLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t border-slate-100 dark:border-white/5 mt-4">
      {/* Header clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
      >
        <span className="text-[11px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest">
          Significado de cada contador
        </span>
        {isExpanded ? (
          <ChevronUp size={16} className="text-slate-400 dark:text-white/30 group-hover:text-primary-500" />
        ) : (
          <ChevronDown size={16} className="text-slate-400 dark:text-white/30 group-hover:text-primary-500" />
        )}
      </button>

      {/* Expandable Content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 space-y-3">
          <LegendItem color="bg-primary-500" title="Confirmadas" desc="Validadas por el conductor" />
          <LegendItem color="bg-red-500" title="Canceladas" desc="Anuladas por el conductor" />
          <LegendItem color="bg-green-500" title="Total" desc="Suma de confirmadas + canceladas" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, title, desc }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
      <p className="text-xs font-medium text-slate-600 dark:text-white/60">
        <span className="font-black text-[#061426] dark:text-white uppercase mr-1">{title}:</span>
        {desc}
      </p>
    </div>
  );
}
