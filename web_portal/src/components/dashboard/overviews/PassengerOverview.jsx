import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, Clock, Activity, Info } from 'lucide-react';
import { SummaryMetric } from '../SummaryMetric';
import { ScheduleTable } from '../../schedules/ScheduleTable';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

export function PassengerOverview({ stats, schedules, drivers, role, onManage, vehicles = [] }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');

  const natagaToLaPlata = schedules.filter(s =>
    s.ruta.toLowerCase().includes('nátaga -> la plata') ||
    (s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nátaga') < s.ruta.toLowerCase().indexOf('plata'))
  );

  const laPlataToNataga = schedules.filter(s =>
    s.ruta.toLowerCase().includes('la plata -> nátaga') ||
    (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nátaga'))
  );

  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🟠 HEADER NARANJA */}
      <div className="bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 flex items-center justify-center shadow-inner">
               <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-[#061426] font-black text-xl lg:text-2xl shadow-sm">
                 {role?.uid?.substring(0, 1).toUpperCase() || 'P'}
               </div>
            </div>
            <div className="text-white">
              <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-80 italic">¡Bienvenido de nuevo!</p>
              <h2 className="text-xl lg:text-2xl font-black tracking-tight uppercase italic">{role?.name || 'Pasajero Ruta-Go'}</h2>
            </div>
          </div>
          <Badge variant="info" className="!bg-white/20 !text-white !border-white/10 backdrop-blur-md shadow-xl">
             Pasajero Activo
          </Badge>
        </div>

        {/* 🌑 STATS CARD (Android Style) */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-base rounded-[2.5rem] p-6 lg:p-8 space-y-8 bg-white dark:bg-[#061426] shadow-xl transition-colors duration-300">
            <div className="grid grid-cols-3 gap-4">
              <SummaryMetric label="Confirmadas" value={stats.confirmedReservations} icon={<CheckCircle2 size={16} className="text-orange-500 mb-1"/>} />
              <SummaryMetric label="Canceladas" value={stats.canceledReservations} icon={<XCircle size={16} className="text-red-500 mb-1"/>} />
              <SummaryMetric label="Total" value={stats.totalUserReservations} icon={<CheckCircle2 size={16} className="text-green-500 mb-1"/>} />
            </div>
          </div>
        </div>
      </div>

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

        {role?.type === 'PASSENGER' && (
          <div className="p-8 bg-white dark:bg-[#061929] rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-6 shadow-sm mx-2 group">
            <div className="w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
               <Info size={32} />
            </div>
            <div className="text-center md:text-left space-y-1">
               <h4 className="text-lg font-black text-[#061426] dark:text-white uppercase leading-none italic">Reserva Web en desarrollo</h4>
               <p className="text-slate-500 dark:text-white/40 font-medium text-sm">Estamos trabajando para habilitar el motor de reservas en iPhone muy pronto.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
