import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, MapPin, Navigation, Clock, Bus } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { ScheduleTable } from '../../schedules/ScheduleTable';
import { Button } from '../../ui/Button';
import { MirrorHeader } from '../MirrorHeader';
import { CounterLegend } from '../CounterLegend';
import { StatsCard } from '../StatsCard';

import { FormatUtils } from '../../../utils/FormatUtils';

export function PassengerOverview({ stats, schedules = [], drivers = [], role, onManage, vehicles = [] }) {
  const [selectedOrigin, setSelectedOrigin] = useState('Nátaga');
  const [selectedDestination, setSelectedDestination] = useState('La Plata');
  const [activeTab, setActiveTab] = useState('Nátaga ➔ La Plata');

  // Extraer municipios y rutas únicas presentes en los horarios registrados
  const { origins, destinations, routeChips } = useMemo(() => {
    const oSet = new Set(['Nátaga', 'La Plata', 'Neiva']);
    const dSet = new Set(['La Plata', 'Nátaga', 'Neiva']);
    const chipSet = new Set(['Nátaga ➔ La Plata', 'La Plata ➔ Nátaga']);

    schedules.forEach(s => {
      const r = s.route || s.ruta;
      if (r) {
        const parts = r.replace(/➔/g, '->').split('->');
        if (parts.length === 2) {
          const o = parts[0].trim();
          const d = parts[1].trim();
          if (o) oSet.add(o);
          if (d) dSet.add(d);
          chipSet.add(`${o} ➔ ${d}`);
        }
      }
    });

    return {
      origins: Array.from(oSet),
      destinations: Array.from(dSet),
      routeChips: Array.from(chipSet)
    };
  }, [schedules]);

  const handleSelectRouteChip = (chipLabel) => {
    setActiveTab(chipLabel);
    if (chipLabel === 'all') return;
    const parts = chipLabel.split('➔');
    if (parts.length === 2) {
      setSelectedOrigin(parts[0].trim());
      setSelectedDestination(parts[1].trim());
    }
  };

  const handleOriginChange = (newOrigin) => {
    setSelectedOrigin(newOrigin);
    const newRoute = `${newOrigin} ➔ ${selectedDestination}`;
    setActiveTab(newRoute);
  };

  const handleDestinationChange = (newDest) => {
    setSelectedDestination(newDest);
    const newRoute = `${selectedOrigin} ➔ ${newDest}`;
    setActiveTab(newRoute);
  };

  const currentSchedules = FormatUtils.filterSchedulesByRoute(schedules, activeTab);

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
        {/* ⚛️ Molecule: StatsCard (Refactored) */}
        <StatsCard footer={<CounterLegend />}>
          <div className="grid grid-cols-3 gap-4">
            <SummaryMetric label="Confirmadas" value={stats.confirmedReservations} icon={<CheckCircle2 size={16} className="text-orange-500 mb-1"/>} />
            <SummaryMetric label="Canceladas" value={stats.canceledReservations} icon={<XCircle size={16} className="text-red-500 mb-1"/>} />
            <SummaryMetric label="Total" value={stats.totalUserReservations} icon={<CheckCircle2 size={16} className="text-green-500 mb-1"/>} />
          </div>
        </StatsCard>
      </MirrorHeader>

      <div className="max-w-4xl mx-auto pt-4 space-y-10 pb-20">

        {/* 📍 SELECTOR DINÁMICO DE ORIGEN Y DESTINO */}
        <div className="p-6 bg-white dark:bg-[#061929] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="text-primary-500" size={24} />
            <div>
              <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-[#061426] dark:text-white italic">Buscar Horarios por Ruta</h3>
              <p className="text-xs text-slate-400 dark:text-white/40 font-bold uppercase tracking-wider">Selecciona tu origen y destino para consultar salidas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ORIGEN */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 flex items-center gap-1.5">
                <MapPin size={14} className="text-primary-500" /> Municipio Origen
              </label>
              <select
                value={selectedOrigin}
                onChange={(e) => handleOriginChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
              >
                {origins.map((o, idx) => (
                  <option key={idx} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* DESTINO */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 flex items-center gap-1.5">
                <Navigation size={14} className="text-primary-500" /> Municipio Destino
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
              >
                {destinations.map((d, idx) => (
                  <option key={idx} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CHIPS RÁPIDOS DE RUTA */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
            {routeChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectRouteChip(chip)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeTab === chip
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {chip}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleSelectRouteChip('all')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              Todas las Rutas
            </button>
          </div>
        </div>

        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} vehicles={vehicles} />
      </div>
    </div>
  );
}
