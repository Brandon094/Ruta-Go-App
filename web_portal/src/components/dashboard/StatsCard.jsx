import React from 'react';

/**
 * ⚛️ Molecule: StatsCard
 * Contenedor estandarizado para métricas en Dashboards.
 * Sigue principios de Atomic Design.
 */
export function StatsCard({ children, header, footer, className = "", variant = "solid" }) {

  const variants = {
    solid: "bg-white dark:bg-[#061426] border-slate-200/60 dark:border-white/5 shadow-xl",
    glass: "bg-white/60 dark:bg-white/5 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none"
  };

  return (
    <div className={`rounded-[2.5rem] overflow-hidden transition-colors duration-300 border ${variants[variant]} ${className}`}>
      {header && (
        <div className="px-6 pt-6 flex items-center justify-between">
          {header}
        </div>
      )}

      <div className="p-6 lg:p-8">
        {children}
      </div>

      {footer && (
        <div className="bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5">
          {footer}
        </div>
      )}
    </div>
  );
}
