import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, Clock, Activity, Info } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { ScheduleTable } from '../../schedules/ScheduleTable';
import { Button } from '../../ui/Button';
import { MirrorHeader } from '../MirrorHeader';
import { CounterLegend } from '../CounterLegend';
import { StatsCard } from '../StatsCard';

import { FormatUtils } from '../../../utils/FormatUtils';

export function PassengerOverview({ stats, schedules = [], drivers = [], role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');

  const currentSchedules = FormatUtils.filterSchedulesByRoute(schedules, activeRoute);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 📱 ORGANISMO: MirrorHeader (DRY) */}
      <MirrorHeader
        avatarText={role?.uid?.substring(0, 1).toUpperCase() || 'P'}
        badgeText="Pasajero Activo"
        badgeVariant="info"
      >
        {/* ⚛️ Molecule: StatsCard (Refactored) */}
        <StatsCard footer={<CounterLegend />}>
          <div className="grid grid-cols-3 gap-4">
            <SummaryMetric label="Confirmadas" value={stats.confirmedReservations} icon={<CheckCircle2 size={16} className="text-orange-500 mb-1"/>} />
            <SummaryMetric label="Canceladas" value={stats.canceledReservations} icon={<XCircle size={16} className="text-red-500 mb-1"/>} />
            <SummaryMetric label="Total" value={stats.totalUserReservations} icon={<CheckCircle2 size={16} className="text-green-500 mb-1"/>} />
          </div>
        </StatsCard>
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
