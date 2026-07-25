import React from 'react';
import { Activity, Armchair } from 'lucide-react';

/**
 * ⚛️ Molecule: RouteStatusCard
 * Muestra el resumen de ocupación de una ruta específica.
 */
export function RouteStatusCard({ schedule, onManage }) {
  const resCount = schedule.reservasCount || 0;
  const libres = schedule.asientosDisponibles;

  return (
    <div
      onClick={onManage}
      className="bg-[#0A1F30]/50 p-5 rounded-[1.2rem] border border-white/5 cursor-pointer hover:bg-[#0A1F30] transition-all shadow-lg hover:ring-1 ring-primary-500/30 group"
    >
      <p className="text-[10px] font-black text-primary-500 uppercase mb-4 text-left">
        {schedule.ruta} ({schedule.hora})
      </p>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-slate-400 mb-1 group-hover:text-white transition-colors">
              <Activity size={14} />
              <span className="text-lg font-black">{resCount}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Reservas</span>
        </div>

        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-green-500 mb-1">
              <Armchair size={14} />
              <span className="text-lg font-black">{libres}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Libres</span>
        </div>
      </div>
    </div>
  );
}
