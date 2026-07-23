import React from 'react';

export function StatCard({ label, value, icon, trend }) {
  return (
    <div className="card-base p-6 md:p-8 rounded-[2rem] hover:-translate-y-1 transition-all duration-300">
      <div className="mb-4 bg-slate-50 dark:bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center scale-90 md:scale-100 origin-left shadow-inner">
        {icon}
      </div>
      <p className="text-[10px] md:text-xs text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline flex-wrap gap-2 mt-1">
        <h4 className="text-2xl md:text-3xl font-black text-[#061426] dark:text-white tracking-tighter uppercase italic">{value}</h4>
        {trend && <span className="text-[9px] md:text-[10px] font-bold text-green-500 uppercase">{trend}</span>}
      </div>
    </div>
  );
}
