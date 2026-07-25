import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ⚛️ Molecule: SidebarSection
 * Sección colapsable para la barra lateral.
 * Sigue Atomic Design & DRY.
 */
export function SidebarSection({ title, children, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-2 group"
      >
        <h4 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] group-hover:text-primary-500 transition-colors">
          {title}
        </h4>
        <div className="text-slate-300 dark:text-white/10 group-hover:text-primary-500 transition-colors">
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      <div className={`space-y-1 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
}
