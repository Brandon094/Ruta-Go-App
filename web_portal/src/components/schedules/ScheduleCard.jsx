import React from 'react';
import { User, Bus, Tag, Plus } from 'lucide-react';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * ⚛️ Molecule: ScheduleCard
 * Tarjeta individual de horario sincronizada con UI Android.
 * Sigue Atomic Design & DRY.
 */
export function ScheduleCard({
  schedule,
  drivers = [],
  role,
  onManage,
  isNext,
  hasPassed,
  vehicles = [],
  innerRef,
  hideActions = false
}) {
  const [timeStr, ampm] = schedule.hora.split(' ');
  const safeDrivers = Array.isArray(drivers) ? drivers : [];
  const driver = safeDrivers.find(d => d.id === schedule.conductorId);

  const vehicleId = schedule.vehiculoId || driver?.vehiculoId || driver?.placaVehiculo;
  const vehicle = vehicles.find(v => v.id === vehicleId || v.placa === vehicleId);
  const totalSeats = vehicle?.capacidad || 13;

  const dbTotal = schedule.totalAsientos || 0;
  const dbAvailable = schedule.asientosDisponibles !== undefined ? schedule.asientosDisponibles : schedule.asientosLibres;

  const available = (dbTotal > 0) ? dbAvailable : totalSeats;
  const isFull = (dbTotal > 0) && dbAvailable === 0;

  const isMe = schedule.conductorId === role?.uid;
  const isManagement = role?.type === 'ADMIN' || role?.type === 'OWNER';
  const isExternal = role?.type === 'OWNER' && !safeDrivers.some(d => d.id === schedule.conductorId);

  return (
    <div
      ref={innerRef}
      className={`card-base rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 group relative ${isNext ? 'ring-2 ring-primary-500 shadow-orange-500/10' : ''} ${hasPassed ? 'opacity-40 grayscale' : ''}`}
    >
      {/* 🏷️ Badge Siguiente (Atom integrated) */}
      {isNext && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary-500 text-white text-[10px] font-black uppercase px-6 py-1.5 rounded-bl-3xl rounded-tr-[2.5rem] shadow-lg animate-pulse tracking-widest">
            Siguiente
          </div>
        </div>
      )}

      <div className="flex items-center gap-8 md:gap-12">
        {/* 🕒 Molécula: Círculo de Tiempo */}
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
                 <span className="text-sm tracking-tighter">{FormatUtils.formatPrice(12000)}</span>
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
        {!hideActions && (
          <div className="shrink-0 overflow-hidden">
             {onManage ? (
               <button
                 disabled={hasPassed || (isFull && !isManagement)}
                 onClick={() => {
                   if (hasPassed) return;
                   onManage(schedule);
                 }}
                 className={`w-16 h-16 rounded-full shadow-2xl transition-all transform active:scale-90 flex items-center justify-center group/btn ${
                   hasPassed
                    ? 'bg-primary-500/20 text-primary-500/40 cursor-not-allowed animate-bus-departure'
                    : (isFull && !isManagement)
                      ? 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-white/10 cursor-not-allowed'
                      : 'bg-primary-500 text-white shadow-primary-500/40 hover:bg-primary-600'
                 }`}
               >
                 {hasPassed ? (
                   <Bus size={32} />
                 ) : (
                   <Plus size={32} className="group-hover/btn:rotate-90 transition-transform" />
                 )}
               </button>
             ) : (
               <div className="w-16 h-16" />
             )}
          </div>
        )}
      </div>
    </div>
  );
}
