import React from 'react';

export function SummaryMetric({ label, value, icon, color }) {
  return (
    <div className="flex flex-col items-center text-center space-y-1">
      {icon}
      <span className={`text-xl lg:text-2xl font-black ${color}`}>{value}</span>
      <span className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">{label}</span>
    </div>
  );
}
