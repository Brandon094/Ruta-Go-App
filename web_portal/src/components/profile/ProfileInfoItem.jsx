import React from 'react';

export function ProfileInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5">
      <div className="p-3 bg-primary-500/5 dark:bg-orange-500/10 rounded-2xl text-orange-500 transition-colors">
         {icon}
      </div>
      <div className="space-y-0.5 min-w-0">
         <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{label}</p>
         <p className="text-sm font-black text-slate-800 dark:text-white truncate transition-colors">{value}</p>
      </div>
    </div>
  );
}
