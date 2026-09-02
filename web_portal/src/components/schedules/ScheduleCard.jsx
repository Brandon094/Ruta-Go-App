import React from 'react';
import { User, Bus, Tag, Plus, Pencil, Lock } from 'lucide-react';
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
  onEdit,
  isNext,
  hasPassed,
  vehicles = [],
  innerRef,
  hideActions = false
}) {
  const timeText = schedule.time || schedule.hora || '08:00 AM';
  const [timeStr, ampm] = timeText.split(' ');
  const safeDrivers = Array.isArray(drivers) ? drivers : [];
  const driverId = schedule.driverId || schedule.conductorId;
  const driver = safeDrivers.find(d => d.id === driverId);
  const driverName = driver?.name || driver?.nombre || schedule.driverName || schedule.conductorNombre || schedule.driver || schedule.conductor || "";

  const vehicleId = schedule.vehicleId || schedule.vehiculoId || driver?.vehicleId || driver?.vehiculoId || driver?.placaVehiculo;
  const vehicle = vehicles.find(v => v.id === vehicleId || v.plate === vehicleId || v.placa === vehicleId);
  const totalSeats = vehicle?.capacity || vehicle?.capacidad || 13;

  const dbTotal = schedule.totalAsientos || schedule.totalSeats || 0;
  const dbAvailable = schedule.asientosDisponibles !== undefined ? schedule.asientosDisponibles : (schedule.availableSeats !== undefined ? schedule.availableSeats : schedule.asientosLibres);

  const available = (dbTotal > 0) ? dbAvailable : totalSeats;
  const isFull = (dbTotal > 0) && dbAvailable === 0;

  const isMe = driverId === role?.uid;
  const isManagement = role?.type === 'ADMIN' || role?.type === 'OWNER';
  const isExternal = role?.type === 'OWNER' && !safeDrivers.some(d => d.id === schedule.conductorId);
  const isWithoutDriver = !driverId;

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

      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0">
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
              {schedule.route || schedule.ruta}
            </h4>
            {!(role?.type === 'OWNER' && isExternal) && (
              <div className="flex items-center gap-2 text-slate-400 dark:text-white/30 italic">
                 <User size={12} />
                 <span className="text-[10px] font-bold uppercase tracking-tighter truncate max-w-[150px]">
                   {driverName ? (isMe ? 'Tú manejas' : driverName) : 'Sin Conductor Asignado'}
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
                 <span className="text-sm tracking-tighter">{FormatUtils.formatPrice(schedule.price || schedule.precio || 12000)}</span>
              </div>
            </div>

            <div className="shrink-0">
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                 hasPassed ? 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/40' :
                 isWithoutDriver ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                 isFull ? 'badge-error' : 'badge-success'
               }`}>
                 {hasPassed ? 'Finalizado' : isWithoutDriver ? 'Sin Conductor' : isFull ? 'Completado' : 'Disponible'}
               </span>
            </div>
          </div>
        </div>

        {/* 🔘 Botones de Acción (Admin Edit & Managing) */}
        <div className="shrink-0 flex items-center gap-2">
           {role?.type === 'ADMIN' && onEdit && (
             <button
               type="button"
               onClick={() => onEdit(schedule)}
               title="Editar Horario"
               className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-primary-500 text-slate-600 dark:text-white hover:text-white transition-all duration-200 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm"
             >
               <Pencil size={18} />
             </button>
           )}

           {!hideActions && onManage && (
             <button
               type="button"
               disabled={hasPassed || isWithoutDriver || (isFull && !isManagement)}
               onClick={() => {
                 if (hasPassed || isWithoutDriver) return;
                 onManage(schedule);
               }}
               title={
                 hasPassed ? "Horario finalizado" :
                 isWithoutDriver ? "Horario sin conductor asignado" :
                 isFull ? "Horario completo" : "Seleccionar asientos"
               }
               className={`w-16 h-16 rounded-full shadow-2xl transition-all transform flex items-center justify-center group/btn ${
                 hasPassed
                  ? 'bg-primary-500/20 text-primary-500/40 cursor-not-allowed animate-bus-departure'
                  : isWithoutDriver
                    ? 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/30 cursor-not-allowed shadow-none border border-slate-200 dark:border-white/10'
                    : (isFull && !isManagement)
                      ? 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-white/10 cursor-not-allowed'
                      : 'bg-primary-500 text-white shadow-primary-500/40 hover:bg-primary-600 active:scale-90'
               }`}
             >
               {hasPassed ? (
                 <Bus size={32} />
               ) : isWithoutDriver ? (
                 <Lock size={26} />
               ) : (
                 <Plus size={32} className="group-hover/btn:rotate-90 transition-transform" />
               )}
             </button>
           )}
        </div>
      </div>
    </div>
  );
}
