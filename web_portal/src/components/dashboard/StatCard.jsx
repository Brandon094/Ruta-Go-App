import React from 'react';

export function StatCard({ label, value, icon, trend }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40">
      <div className="mb-4 bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center">{icon}</div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{value}</h4>
        <span className="text-[10px] font-bold text-green-500 uppercase">{trend}</span>
      </div>
    </div>
  );
}
