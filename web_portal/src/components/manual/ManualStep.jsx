import React from 'react';

/**
 * ⚛️ Molecule: ManualStep
 * Un paso detallado de la guía con icono y descripción explícita.
 */
export function ManualStep({ title, description, icon: Icon, color = "primary" }) {
  const colorMap = {
    primary: "text-primary-500 bg-primary-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-green-500 bg-green-500/10",
    amber: "text-amber-500 bg-amber-500/10"
  };

  return (
    <div className="card-base p-8 rounded-[2.5rem] bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-white/5 shadow-xl group hover:ring-2 ring-primary-500/20 transition-all duration-300">
      <div className="flex items-start gap-6">
        <div className={`p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-500 ${colorMap[color] || colorMap.primary}`}>
          <Icon size={28} />
        </div>
        <div className="space-y-3 text-left">
          <h4 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-widest leading-tight">
            {title}
          </h4>
          <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
