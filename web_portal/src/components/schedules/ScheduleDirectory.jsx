import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { ScheduleTable } from './ScheduleTable';
import { Button } from '../ui/Button';
import { DirectoryHeader } from '../common/DirectoryHeader';

export function ScheduleDirectory({ schedules = [], drivers, role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBySearch = schedules.filter(s => {
    const search = searchTerm.toLowerCase();
    const conductor = drivers.find(d => d.id === s.conductorId)?.nombre?.toLowerCase() || '';
    const placa = s.vehiculoId?.toLowerCase() || '';
    const hora = s.hora.toLowerCase();
    return conductor.includes(search) || placa.includes(search) || hora.includes(search);
  });

  const natagaToLaPlata = filteredBySearch.filter(s => s.ruta.toLowerCase().includes('nátaga -> la plata') || (s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nátaga') < s.ruta.toLowerCase().indexOf('plata')));
  const laPlataToNataga = filteredBySearch.filter(s => s.ruta.toLowerCase().includes('la plata -> nátaga') || (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nátaga')));

  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="px-2">
        <DirectoryHeader
          subtitle="Cronograma global de horarios y asignaciones"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="flex justify-center px-4">
        <div className="flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors w-full max-w-md">
          <Button
            variant={activeRoute === 'toLaPlata' ? 'primary' : 'ghost'}
            size="md"
            className={`flex-1 ${activeRoute === 'toLaPlata' ? '' : 'text-slate-400 dark:text-white/40'}`}
            onClick={() => setActiveRoute('toLaPlata')}
          >
            Nátaga ➔ LP
          </Button>
          <Button
            variant={activeRoute === 'toNataga' ? 'primary' : 'ghost'}
            size="md"
            className={`flex-1 ${activeRoute === 'toNataga' ? '' : 'text-slate-400 dark:text-white/40'}`}
            onClick={() => setActiveRoute('toNataga')}
          >
            LP ➔ Nátaga
          </Button>
        </div>
      </div>

      <div className="px-2">
        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} vehicles={vehicles} hideActions={true} />
      </div>
    </div>
  );
}
