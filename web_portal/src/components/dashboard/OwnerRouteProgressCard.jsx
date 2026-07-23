import React from 'react';
import { MapPin } from 'lucide-react';

export function OwnerRouteProgressCard({ name, reservations, available, icon, color }) {
  const total = reservations + available;
  const percentage = total > 0 ? Math.round((reservations / total) * 100) : 0;

  return (
    <div className="card-base p-8 rounded-[2.5rem] space-y-6 group hover:scale-[1.02] transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h4 className="font-black text-sm text-[#061426] dark:text-white uppercase italic">{name}</h4>
        </div>
        <div className="text-right">
           <span className="text-2xl font-black text-[#061426] dark:text-white">{percentage}%</span>
           <p className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">Ocupación</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200/50 dark:border-white/5">
          <div
            className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-tighter">Reservas</span>
            <span className="text-sm font-black text-[#061426] dark:text-white">{reservations}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-tighter">Disponibles</span>
            <span className="text-sm font-black text-green-500">{available}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
