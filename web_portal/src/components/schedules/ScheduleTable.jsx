import React, { useEffect, useRef } from 'react';
import { Clock, MapPin, User, Users as UsersIcon, CheckCircle2, AlertCircle, Plus, ChevronRight, Tag, Bus, Info } from 'lucide-react';

/**
 * 🚌 Componente: ScheduleTable (Totalmente Sincronizado con UI Android v1.5.0)
 */
export function ScheduleTable({ schedules, drivers, role, onManage, vehicles = [] }) {
  const nextTripRef = useRef(null);

  const getTripMinutes = (horaStr) => {
    const [time, ampm] = horaStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const getNextTripId = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let closestTrip = null;
    let minDiff = Infinity;

    schedules.forEach(s => {
      const tripMinutes = getTripMinutes(s.hora);
      const diff = tripMinutes - currentMinutes;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        closestTrip = s.id;
      }
    });
    return closestTrip;
  };

  const nextTripId = getNextTripId();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Auto-scroll al viaje siguiente
  useEffect(() => {
    if (nextTripRef.current) {
      setTimeout(() => {
        nextTripRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 500);
    }
  }, [nextTripId]);

  return (
    <div className="space-y-4">
      {schedules.length > 0 ? (
        schedules.map((schedule) => {
          const hasPassed = getTripMinutes(schedule.hora) < currentMinutes;
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
         <p className="text-[11px] text-blue-800/60 dark:text-blue-400/60 font-medium leading-relaxed italic">
            Los horarios finalizados se habilitarán para el día de mañana tras el reinicio de las 7:00 PM.
         </p>
      </div>
    </div>
  );
}

function ScheduleCard({ schedule, drivers, role, onManage, isNext, hasPassed, vehicles = [], innerRef }) {
  const [timeStr, ampm] = schedule.hora.split(' ');
  const available = schedule.asientosDisponibles || 0;

  // Buscar vehículo para obtener capacidad real
  const vehicle = vehicles.find(v => v.id === schedule.vehiculoId || v.placa === schedule.vehiculoId);
  const totalSeats = vehicle?.capacidad || 13;
  const isFull = available === 0;

  const driver = drivers.find(d => d.id === schedule.conductorId);
  const isMe = schedule.conductorId === role?.uid;
  const isExternal = role?.type === 'OWNER' && !drivers.some(d => d.id === schedule.conductorId);

  return (
    <div
      ref={innerRef}
      className={`card-base rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 group relative overflow-hidden ${isNext ? 'ring-2 ring-primary-500 shadow-orange-500/10' : ''} ${hasPassed ? 'opacity-40 grayscale pointer-events-none' : ''}`}
    >

      {/* Badge Siguiente */}
      {isNext && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary-500 text-white text-[10px] font-black uppercase px-6 py-1.5 rounded-bl-3xl shadow-lg animate-pulse tracking-widest">
            Siguiente
          </div>
        </div>
      )}

      <div className="flex items-center gap-8 md:gap-12">

        {/* 🕒 Círculo de Tiempo */}
        <div className="relative flex-shrink-0">
           <div className={`w-24 h-24 rounded-full border-[6px] flex flex-col items-center justify-center transition-colors duration-500 shadow-inner ${
             isNext
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
              : hasPassed
                ? 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5'
                : 'border-slate-100 dark:border-white/5 bg-white dark:bg-white/5'
           }`}>
              <span className={`text-2xl font-black leading-none ${isNext ? 'text-primary-600 dark:text-primary-500' : hasPassed ? 'text-slate-400' : 'text-slate-700 dark:text-white'}`}>{timeStr}</span>
              <span className={`text-xs font-black uppercase mt-1 ${hasPassed ? 'text-slate-300' : 'text-primary-500'}`}>{ampm}</span>
           </div>
        </div>

        {/* ℹ️ Info Central */}
        <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm md:text-lg font-black text-[#061426] dark:text-white tracking-tight truncate uppercase italic">
              {schedule.ruta}
            </h4>
            {!(role?.type === 'OWNER' && isExternal) && driver && (
              <div className="flex items-center gap-2 text-slate-400 dark:text-white/30 italic">
                 <User size={12} />
                 <span className="text-[10px] font-bold uppercase tracking-tighter truncate max-w-[150px]">
                   {isMe ? 'Tú manejas' : driver.nombre}
                 </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <Bus size={16} className={hasPassed ? 'text-slate-300' : 'text-primary-500'} />
                 <span className={`text-xs font-bold uppercase tracking-tight ${hasPassed ? 'text-slate-400' : 'text-slate-500 dark:text-[#B5C5CD]'}`}>
                   {hasPassed ? 'Finalizado' : `${available} Cupos`}
                 </span>
              </div>

              <div className={`flex items-center gap-2 font-black ${hasPassed ? 'text-slate-300' : 'text-primary-500'}`}>
                 <Tag size={16} />
                 <span className="text-sm tracking-tighter">$ 12.000 COP</span>
              </div>
            </div>

            <div className="shrink-0">
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                 hasPassed ? 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/40' :
                 isFull ? 'badge-error' : 'badge-success'
               }`}>
                 {hasPassed ? 'Finalizado' : isFull ? 'Completado' : 'Disponible'}
               </span>
            </div>
          </div>
        </div>

        {/* 🔘 Botón de Acción (Android Style) */}
        <div className="shrink-0">
           {role?.type === 'DRIVER' && isMe && onManage ? (
             <button
               disabled={hasPassed}
               onClick={() => !hasPassed && onManage(schedule)}
               className={`w-16 h-16 rounded-full shadow-2xl transition-all transform active:scale-90 flex items-center justify-center group/btn ${
                 hasPassed
                 ? 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-white/10 cursor-not-allowed'
                 : 'bg-primary-500 text-white shadow-primary-500/40 hover:bg-primary-600'
               }`}
             >
               <Plus size={32} className="group-hover/btn:rotate-90 transition-transform" />
             </button>
           ) : (
             <button
               disabled={true}
               className={`w-16 h-16 rounded-full shadow-2xl transition-all flex items-center justify-center ${
                 hasPassed
                 ? 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-white/10 cursor-not-allowed border border-slate-200 dark:border-white/5'
                 : 'bg-primary-500 text-white shadow-primary-500/40 opacity-50 cursor-not-allowed'
               }`}
             >
               <Plus size={32} />
             </button>
           )}
        </div>
      </div>
    </div>
  );
}
