import React from 'react';
import { DriverCard } from './DriverCard';

export function DriverDirectory({ drivers, onEditDriver, onAddDriver }) {
  const active = drivers.filter(d => d.status === 'active' && d.horariosAsignados?.length > 0);
  const inactive = drivers.filter(d => d.status !== 'active' || !d.horariosAsignados?.length);

  return (
    <div className="space-y-10 pb-20 px-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between card-base p-6 rounded-[2.5rem] gap-4">
        <h3 className="text-xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Gestión de Operadores</h3>
        <button onClick={onAddDriver} className="px-6 py-4 bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary-500/20 active:scale-95 transition-all">Registrar Conductor</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-green-500 ml-2 tracking-widest">En Ruta ({active.length})</h4>
          {active.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-slate-400 dark:text-white/20 ml-2 tracking-widest">Fuera de Servicio ({inactive.length})</h4>
          {inactive.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
      </div>
    </div>
  );
}
