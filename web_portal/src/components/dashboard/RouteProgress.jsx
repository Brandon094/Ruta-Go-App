import React from 'react';

export function RouteProgress({ label, value, color, icon }) {
  const percentage = Math.min((value / 50) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${color} text-white`}>{icon}</div>
          <span className="font-bold text-slate-700">{label}</span>
        </div>
        <span className="text-xl font-black text-slate-800">{value} <small className="text-[10px] text-slate-400 uppercase">Pax</small></span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out shadow-lg`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Ocupación estimada del día</p>
    </div>
  );
}
