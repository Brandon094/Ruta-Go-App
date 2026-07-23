import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { ScheduleTable } from './ScheduleTable';
import { Button } from '../ui/Button';

export function ScheduleDirectory({ schedules, drivers, role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');
  const natagaToLaPlata = schedules.filter(s => s.ruta.toLowerCase().includes('nátaga -> la plata') || (s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nátaga') < s.ruta.toLowerCase().indexOf('plata')));
  const laPlataToNataga = schedules.filter(s => s.ruta.toLowerCase().includes('la plata -> nátaga') || (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nátaga')));
  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm"><Clock size={28} /></div>
          <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Planilla de Despachos</h3>
        </div>
        <div className="flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
          <Button
            variant={activeRoute === 'toLaPlata' ? 'primary' : 'ghost'}
            size="md"
            className={`flex-1 md:px-8 ${activeRoute === 'toLaPlata' ? '' : 'text-slate-400 dark:text-white/40'}`}
            onClick={() => setActiveRoute('toLaPlata')}
          >
            Nátaga ➔ LP
          </Button>
          <Button
            variant={activeRoute === 'toNataga' ? 'primary' : 'ghost'}
            size="md"
            className={`flex-1 md:px-8 ${activeRoute === 'toNataga' ? '' : 'text-slate-400 dark:text-white/40'}`}
            onClick={() => setActiveRoute('toNataga')}
          >
            LP ➔ Nátaga
          </Button>
        </div>
      </div>
      <div className="px-2">
        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} vehicles={vehicles} />
      </div>
    </div>
  );
}
