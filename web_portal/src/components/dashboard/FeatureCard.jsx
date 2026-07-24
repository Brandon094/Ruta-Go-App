import React from 'react';

/**
 * 🏛️ Organism: FeatureCard
 * Tarjeta para módulos destacados o analítica avanzada.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  tags = [],
  className = ""
}) {
  return (
    <div className={`card-base p-10 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary-500/50 transition-all duration-500 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-white/5 ${className}`}>
      <div className="flex items-center gap-6">
        {/* Átomo: Icono Circular */}
        <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform duration-500 shadow-inner">
          <Icon size={40} className="animate-pulse" />
        </div>

        {/* Molécula: Textos Informativos */}
        <div className="text-center md:text-left space-y-2">
          <h4 className="text-xl font-black text-[#061426] dark:text-white uppercase italic tracking-tight leading-none">{title}</h4>
          <p className="text-sm font-medium text-slate-500 dark:text-white/40 max-w-sm">
            {description}
          </p>
        </div>
      </div>

      {/* Molécula: Lista de Tags */}
      <div className="flex gap-3 shrink-0">
        {tags.map((tag, idx) => (
          <div key={idx} className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest border border-slate-200 dark:border-white/5">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
