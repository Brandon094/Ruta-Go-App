import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

/**
 * ⚛️ Molecule: SolutionCard
 * Tarjeta de propuesta de valor para la landing page.
 */
export function SolutionCard({ icon, title, desc, color, features, actions, isStatic }) {
  return (
    <div
      className={`card-base p-8 md:p-10 rounded-3xl md:rounded-[3rem] group h-full flex flex-col ${
        isStatic ? 'hover:shadow-2xl hover:-translate-y-2' : ''
      }`}
    >
      <div className={`mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-white/5 ${color} group-hover:scale-110 transition-transform duration-500 shadow-inner shrink-0`}>
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-black text-[#061426] dark:text-white mb-3 md:mb-4 uppercase italic leading-none">{title}</h3>
      <p className="text-sm md:text-base text-slate-700 dark:text-white/80 leading-relaxed mb-6 md:mb-8 min-h-[3.5rem] font-medium">{desc}</p>

      <ul className="space-y-2 md:space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 md:gap-3 text-xs font-bold text-slate-600 dark:text-white/70 uppercase tracking-wide list-none">
            <CheckCircle2 size={14} className="text-green-500 md:size-4 shrink-0" /> {f}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        {actions.map((act, i) => (
          act.link ? (
            <a
              key={i}
              href={act.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${
                act.type === 'primary'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
              }`}
            >
              {act.label} <ChevronRight size={14} />
            </a>
          ) : (
            <button
              key={i}
              onClick={act.action}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                act.type === 'primary'
                  ? 'bg-[#061426] dark:bg-primary-500 text-white shadow-lg shadow-slate-900/30 dark:shadow-primary-500/20 hover:bg-black dark:hover:bg-primary-600'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
              }`}
            >
              {act.label} <ChevronRight size={14} />
            </button>
          )
        ))}
      </div>
    </div>
  );
}
