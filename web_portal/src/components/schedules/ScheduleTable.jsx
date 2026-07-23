import React from 'react';
import { Clock, MapPin, User, Users as UsersIcon, CheckCircle2, AlertCircle, Plus, ChevronRight, Tag, Bus } from 'lucide-react';

/**
 * 🚌 Componente: ScheduleTable (Totalmente Sincronizado con UI Android v1.5.0)
 */
export function ScheduleTable({ schedules, drivers, role, onManage }) {

  const getNextTripId = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let closestTrip = null;
    let minDiff = Infinity;

    schedules.forEach(s => {
      const [time, ampm] = s.hora.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      const tripMinutes = hours * 60 + minutes;
      const diff = tripMinutes - currentMinutes;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        closestTrip = s.id;
      }
    });
    return closestTrip;
  };

  const nextTripId = getNextTripId();

  return (
    <div className="space-y-4 px-2">
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            drivers={drivers}
            role={role}
            onManage={onManage}
            isNext={schedule.id === nextTripId}
          />
        ))
      ) : (
        <div className="py-20 text-center space-y-4 opacity-20">
          <Clock size={48} className="mx-auto" />
          <p className="font-black uppercase tracking-widest text-xs">Sin horarios disponibles</p>
        </div>
      )}
    </div>
  );
}

function ScheduleCard({ schedule, drivers, role, onManage, isNext }) {
  const [timeStr, ampm] = schedule.hora.split(' ');
  const available = schedule.asientosDisponibles || 0;
  const isFull = available === 0 && (schedule.totalAsientos || 0) > 0;

  const driver = drivers.find(d => d.id === schedule.conductorId);
  const isMe = schedule.conductorId === role?.uid;

  return (
    <div className={`card-navy rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 group relative overflow-hidden ${isNext ? 'ring-2 ring-primary-500/50' : ''}`}>

      <div className="flex items-center gap-6">

        {/* 🕒 Círculo de Tiempo (Fiel a Android) */}
        <div className="relative flex-shrink-0">
           <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-colors duration-500 ${isNext ? 'border-primary-500 shadow-[0_0_15px_rgba(255,109,0,0.3)]' : 'border-primary-500/30'}`}>
              <span className="text-lg font-black text-white leading-none">{timeStr}</span>
              <span className="text-[10px] font-black text-primary-500 uppercase mt-1">{ampm}</span>
           </div>
        </div>

        {/* ℹ️ Info Central */}
        <div className="flex-1 min-w-0 space-y-2">
          <h4 className="text-sm md:text-base font-black text-white tracking-tight truncate uppercase">
            {schedule.ruta}
          </h4>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-navy-light">
               <Bus size={14} className="text-primary-500" />
               <span className="text-[11px] font-bold uppercase tracking-tight">
                 {isFull ? 'Agotado' : `${available} disponibles`}
               </span>
            </div>

            <div className="flex items-center gap-2 text-primary-500 font-black">
               <Tag size={14} />
               <span className="text-xs tracking-tighter">$ 12.000 COP</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
             <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isFull ? 'bg-red-500/20 text-red-500' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
               {isFull ? 'Lleno' : 'Disponible'}
             </span>
             {isNext && (
               <span className="bg-slate-700 text-white text-[8px] font-black uppercase px-2 py-1 rounded-md animate-pulse">
                 Siguiente
               </span>
             )}
          </div>
        </div>

        {/* 🔘 Botón FAB Estilo Android */}
        <div className="shrink-0">
           {(isMe || role?.type === 'PASSENGER') && (
             <button
               onClick={() => onManage ? onManage(schedule) : null}
               className="w-14 h-14 bg-primary-500 text-white rounded-full shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all transform active:scale-90 flex items-center justify-center group/btn"
             >
               <Plus size={28} className="group-hover/btn:rotate-90 transition-transform" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
}
