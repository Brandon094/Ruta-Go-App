import React, { useEffect, useRef } from 'react';
import { Clock, Info } from 'lucide-react';
import { ScheduleCard } from './ScheduleCard';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🚌 Organism: ScheduleTable
 * Orquestador de la planilla de horarios.
 * Implementa lógica de 'Next Trip' y '7 PM Reset'.
 * Sigue Atomic Design & DRY.
 */
export function ScheduleTable({ schedules, drivers, role, onManage, vehicles = [], hideActions = false }) {
  const nextTripRef = useRef(null);

  const getTripMinutes = (horaStr) => {
    try {
      const [time, ampm] = horaStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    } catch (e) {
      return 0;
    }
  };

  const getNextTripId = () => {
    if (!schedules || schedules.length === 0) return null;

    const now = new Date();
    const hAct = now.getHours();
    const currentMinutes = hAct * 60 + now.getMinutes();
    const isAfterReset = hAct >= 19;

    if (isAfterReset) {
      // Regla de Oro: Después de las 7 PM, el próximo viaje es el primero de mañana
      let firstTrip = schedules[0];
      let earliest = getTripMinutes(schedules[0].hora);
      schedules.forEach(s => {
        const m = getTripMinutes(s.hora);
        if (m < earliest) {
          earliest = m;
          firstTrip = s;
        }
      });
      return firstTrip?.id;
    }

    let closestTripId = null;
    let minDiff = Infinity;
    schedules.forEach(s => {
      const tripMinutes = getTripMinutes(s.hora);
      const diff = tripMinutes - currentMinutes;
      // Solo consideramos viajes que no han pasado
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        closestTripId = s.id;
      }
    });
    return closestTripId;
  };

  const nextTripId = getNextTripId();

  // Auto-scroll al viaje siguiente
  useEffect(() => {
    const timer = setTimeout(() => {
      if (nextTripRef.current) {
        nextTripRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [nextTripId]);

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {schedules.length > 0 ? (
        schedules.map((schedule) => {
          const hasPassed = FormatUtils.isPastSchedule(schedule.hora);
          const isNext = schedule.id === nextTripId;

          return (
            <ScheduleCard
              key={schedule.id}
              innerRef={isNext ? nextTripRef : null}
              schedule={schedule}
              drivers={drivers}
              role={role}
              onManage={onManage}
              isNext={isNext}
              hasPassed={hasPassed}
              vehicles={vehicles}
              hideActions={hideActions}
            />
          );
        })
      ) : (
        <div className="py-20 text-center space-y-4 opacity-30">
          <Clock size={48} className="mx-auto text-slate-400" />
          <p className="font-black uppercase tracking-widest text-xs text-slate-500 dark:text-white">Sin horarios disponibles</p>
        </div>
      )}

      {/* Info Message (Mobile Style) */}
      <div className="mt-10 p-6 bg-blue-50/50 dark:bg-blue-500/5 rounded-[2rem] border border-blue-100 dark:border-blue-500/10 flex items-start gap-4">
         <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
         <p className="text-[11px] text-blue-800/60 dark:text-blue-400/60 font-medium leading-relaxed italic text-left">
            Los horarios finalizados se habilitarán para el día de mañana tras el reinicio de las 7:00 PM.
         </p>
      </div>
    </div>
  );
}
