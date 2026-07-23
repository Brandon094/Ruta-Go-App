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
    <div className="space-y-4">
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
        <div className="py-20 text-center space-y-4 opacity-30">
          <Clock size={48} className="mx-auto text-slate-400" />
          <p className="font-black uppercase tracking-widest text-xs text-slate-500 dark:text-white">Sin horarios disponibles</p>
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
  const isExternal = role?.type === 'OWNER' && !drivers.some(d => d.id === schedule.conductorId);

  return (
    <div className={`card-base rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 group relative overflow-hidden ${isNext ? 'ring-2 ring-primary-500 shadow-orange-500/10' : ''}`}>

      {/* Badge Siguiente */}
      {isNext && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary-500 text-white text-[8px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-lg animate-pulse">
            Siguiente
          </div>
        </div>
      )}

      <div className="flex items-center gap-6">

        {/* 🕒 Círculo de Tiempo */}
        <div className="relative flex-shrink-0">
           <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-colors duration-500 shadow-inner ${
             isNext
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
              : 'border-slate-100 dark:border-white/5 bg-white dark:bg-white/5'
           }`}>
              <span className={`text-lg font-black leading-none ${isNext ? 'text-primary-600 dark:text-primary-500' : 'text-slate-700 dark:text-white'}`}>{timeStr}</span>
              <span className="text-[10px] font-black text-primary-500 uppercase mt-1">{ampm}</span>
           </div>
        </div>

        {/* ℹ️ Info Central */}
        <div className="flex-1 min-w-0 space-y-2">
          <h4 className="text-sm md:text-base font-black text-[#061426] dark:text-white tracking-tight truncate uppercase italic">
            {schedule.ruta}
          </h4>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
               <Bus size={14} className="text-primary-500" />
               <span className={`text-[11px] font-bold uppercase tracking-tight ${isFull ? 'text-red-500' : 'text-slate-500 dark:text-[#B5C5CD]'}`}>
                 {isFull ? 'Vehículo Lleno' : `${available} disponibles`}
               </span>
            </div>

            <div className="flex items-center gap-2 text-primary-500 font-black">
               <Tag size={14} />
               <span className="text-xs tracking-tighter">$ 12.000 COP</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
             <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isFull ? 'badge-error' : 'badge-success'}`}>
               {isFull ? 'Completado' : 'Disponible'}
             </span>
             {!(role?.type === 'OWNER' && isExternal) && driver && (
              <div className="flex items-center gap-2 text-slate-400 dark:text-white/30 italic">
                 <User size={12} />
                 <span className="text-[10px] font-bold uppercase tracking-tighter truncate max-w-[100px]">
                   {isMe ? 'Tú manejas' : driver.nombre}
                 </span>
              </div>
            )}
          </div>
        </div>

        {/* 🔘 Botón de Acción */}
        <div className="shrink-0">
           {isMe && onManage ? (
             <button
               onClick={() => onManage(schedule)}
               className="w-14 h-14 bg-primary-500 text-white rounded-full shadow-2xl shadow-primary-500/40 hover:bg-primary-600 transition-all transform active:scale-90 flex items-center justify-center group/btn"
             >
               <Plus size={28} className="group-hover/btn:rotate-90 transition-transform" />
             </button>
           ) : role?.type === 'PASSENGER' ? (
             <button
               onClick={() => onManage && onManage(schedule)}
               className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-secondary-800 text-[#061426] dark:text-white border border-[#061426] dark:border-white/10 rounded-2xl shadow-xl hover:bg-primary-500 hover:text-white dark:hover:bg-black transition-all active:scale-95 font-black text-[10px] uppercase tracking-widest"
             >
               Reservar <ChevronRight size={14} />
             </button>
           ) : null}
        </div>
      </div>
    </div>
  );
}
