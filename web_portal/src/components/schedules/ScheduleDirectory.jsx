import React, { useState, useMemo } from 'react';
import { Clock, Plus } from 'lucide-react';
import { ScheduleTable } from './ScheduleTable';
import { AddScheduleModal } from './AddScheduleModal';
import { EditScheduleModal } from './EditScheduleModal';
import { Button } from '../ui/Button';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { FormatUtils } from '../../utils/FormatUtils';

export function ScheduleDirectory({ schedules = [], drivers = [], role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('Nátaga ➔ La Plata');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  // Extraer dinámicamente todas las rutas de los horarios existentes
  const availableRouteTabs = useMemo(() => {
    const routeSet = new Set();
    schedules.forEach(s => {
      const r = s.route || s.ruta;
      if (r) {
        const formatted = r.replace(/->/g, '➔').trim();
        routeSet.add(formatted);
      }
    });

    const tabs = Array.from(routeSet);
    // Garantizar que las rutas base estén disponibles
    const hasNL = tabs.some(t => {
      const norm = FormatUtils.normalizeText(t);
      return norm.includes('nataga') && norm.includes('la plata') && norm.indexOf('nataga') < norm.indexOf('la plata');
    });
    const hasLN = tabs.some(t => {
      const norm = FormatUtils.normalizeText(t);
      return norm.includes('nataga') && norm.includes('la plata') && norm.indexOf('la plata') < norm.indexOf('nataga');
    });

    if (!hasNL) tabs.unshift('Nátaga ➔ La Plata');
    if (!hasLN) tabs.push('La Plata ➔ Nátaga');

    return tabs;
  }, [schedules]);

  const filteredBySearch = schedules.filter(s => {
    const search = searchTerm.toLowerCase();
    const condId = s.driverId || s.conductorId;
    const conductor = drivers.find(d => d.id === condId)?.name?.toLowerCase()
      || drivers.find(d => d.id === condId)?.nombre?.toLowerCase() || '';
    const placa = (s.vehicleId || s.vehiculoId || '')?.toLowerCase();
    const hora = (s.time || s.hora || '').toLowerCase();
    const ruta = (s.route || s.ruta || '').toLowerCase();
    return conductor.includes(search) || placa.includes(search) || hora.includes(search) || ruta.includes(search);
  });

  const currentSchedules = FormatUtils.filterSchedulesByRoute(filteredBySearch, activeRoute);

  const isAdmin = role?.type === 'ADMIN';

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DirectoryHeader
          subtitle="Cronograma global de horarios y asignaciones"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {isAdmin && (
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

      <div className="sticky top-0 z-20 flex justify-center px-4 py-2 bg-secondary-50/90 dark:bg-secondary-900/90 backdrop-blur-md transition-all">
        <div className="flex flex-wrap justify-center gap-2 bg-white/95 dark:bg-[#061929]/95 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-md transition-colors w-full max-w-3xl">
          {availableRouteTabs.map((tabLabel, idx) => (
            <Button
              key={idx}
              variant={activeRoute === tabLabel ? 'primary' : 'ghost'}
              size="md"
              className={`flex-1 min-w-[130px] text-xs font-bold ${activeRoute === tabLabel ? '' : 'text-slate-400 dark:text-white/40'}`}
              onClick={() => setActiveRoute(tabLabel)}
            >
              {tabLabel}
            </Button>
          ))}
          {availableRouteTabs.length > 2 && (
            <Button
              variant={activeRoute === 'all' ? 'primary' : 'ghost'}
              size="md"
              className={`min-w-[80px] text-xs font-bold ${activeRoute === 'all' ? '' : 'text-slate-400 dark:text-white/40'}`}
              onClick={() => setActiveRoute('all')}
            >
              Todas
            </Button>
          )}
        </div>
      </div>

      <div className="px-2">
        <ScheduleTable
          schedules={currentSchedules}
          drivers={drivers}
          role={role}
          onManage={isAdmin ? onManage : null}
          onEdit={isAdmin ? (schedule) => setEditingSchedule(schedule) : null}
          vehicles={vehicles}
          hideActions={!isAdmin}
        />
      </div>

      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        drivers={drivers}
        vehicles={vehicles}
      />

      <EditScheduleModal
        isOpen={!!editingSchedule}
        onClose={() => setEditingSchedule(null)}
        schedule={editingSchedule}
        drivers={drivers}
        vehicles={vehicles}
      />
    </div>
  );
}
