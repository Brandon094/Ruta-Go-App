import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { ScheduleTable } from './ScheduleTable';
import { AddScheduleModal } from './AddScheduleModal';
import { Button } from '../ui/Button';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { FormatUtils } from '../../utils/FormatUtils';

export function ScheduleDirectory({ schedules = [], drivers = [], role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredBySearch = schedules.filter(s => {
    const search = searchTerm.toLowerCase();
    const condId = s.driverId || s.conductorId;
    const conductor = drivers.find(d => d.id === condId)?.name?.toLowerCase()
      || drivers.find(d => d.id === condId)?.nombre?.toLowerCase() || '';
    const placa = (s.vehicleId || s.vehiculoId || '')?.toLowerCase();
    const hora = (s.time || s.hora || '').toLowerCase();
    return conductor.includes(search) || placa.includes(search) || hora.includes(search);
  });

  const natagaToLaPlata = FormatUtils.filterSchedulesByRoute(filteredBySearch, 'toLaPlata');
  const laPlataToNataga = FormatUtils.filterSchedulesByRoute(filteredBySearch, 'toNataga');

  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DirectoryHeader
          subtitle="Cronograma global de horarios y asignaciones"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {role?.type === 'ADMIN' && (
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="shadow-lg shadow-[#FF7A1A]/20"
          >
            <Plus size={18} className="mr-2" />
            Programar Horario
          </Button>
        )}
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

      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        drivers={drivers}
        vehicles={vehicles}
      />
    </div>
  );
}
