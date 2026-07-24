import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, Clock, Activity, Info } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { ScheduleTable } from '../../schedules/ScheduleTable';
import { Button } from '../../ui/Button';
import { MirrorHeader } from '../MirrorHeader';

export function PassengerOverview({ stats, schedules = [], drivers = [], role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');

  const safeSchedules = Array.isArray(schedules) ? schedules : [];

  const natagaToLaPlata = safeSchedules.filter(s =>
    s.ruta.toLowerCase().includes('nátaga -> la plata') ||
    (s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nátaga') < s.ruta.toLowerCase().indexOf('plata'))
  );

  const laPlataToNataga = safeSchedules.filter(s =>
    s.ruta.toLowerCase().includes('la plata -> nátaga') ||
    (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nátaga'))
  );

  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 📱 ORGANISMO: MirrorHeader (DRY) */}
      <MirrorHeader
        avatarText={role?.uid?.substring(0, 1).toUpperCase() || 'P'}
        title={role?.name || 'Pasajero Ruta-Go'}
        subtitle="¡Bienvenido de nuevo!"
        badgeText="Pasajero Activo"
        badgeVariant="info"
      >
        {/* 🌑 Molécula: Stats Card (Mirror Android) */}
        <div className="card-base rounded-[2.5rem] p-6 lg:p-8 space-y-8 bg-white dark:bg-[#061426] shadow-xl transition-colors duration-300">
          <div className="grid grid-cols-3 gap-4">
            <SummaryMetric label="Confirmadas" value={stats.confirmedReservations} icon={<CheckCircle2 size={16} className="text-orange-500 mb-1"/>} />
            <SummaryMetric label="Canceladas" value={stats.canceledReservations} icon={<XCircle size={16} className="text-red-500 mb-1"/>} />
            <SummaryMetric label="Total" value={stats.totalUserReservations} icon={<CheckCircle2 size={16} className="text-green-500 mb-1"/>} />
          </div>
        </div>
      </MirrorHeader>

      <div className="max-w-4xl mx-auto pt-4 space-y-12 pb-20">

        {/* 🕒 TITULO Y TABS */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Clock className="text-primary-500" size={24} />
            <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-[#061426] dark:text-white italic">Horarios disponibles</h3>
          </div>

          <div className="flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors duration-300">
            <Button
              variant={activeRoute === 'toLaPlata' ? 'primary' : 'ghost'}
              size="md"
              className={`flex-1 ${activeRoute === 'toLaPlata' ? '' : 'text-slate-400 dark:text-white/40'}`}
              onClick={() => setActiveRoute('toLaPlata')}
            >
              NATAGÁ ➔ LA PLATA
            </Button>
            <Button
              variant={activeRoute === 'toNataga' ? 'primary' : 'ghost'}
              size="md"
              className={`flex-1 ${activeRoute === 'toNataga' ? '' : 'text-slate-400 dark:text-white/40'}`}
              onClick={() => setActiveRoute('toNataga')}
            >
              LA PLATA ➔ NATAGÁ
            </Button>
          </div>
        </div>

        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} vehicles={vehicles} />
      </div>
    </div>
  );
}
