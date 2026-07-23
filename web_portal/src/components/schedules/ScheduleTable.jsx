import React from 'react';
import { Clock, MapPin, User, Users as UsersIcon, CheckCircle2, AlertCircle } from 'lucide-react';

export function ScheduleTable({ schedules, drivers, role }) {
  // Función para obtener la información del conductor y si le pertenece al dueño actual
  const getDriverDisplay = (conductorId) => {
    if (!conductorId) return { name: "Sin asignar", isExternal: false };

    const driver = drivers.find(d => d.id === conductorId);

    if (role?.type === 'ADMIN') {
      return { name: driver ? driver.nombre : "Cargando...", isExternal: false };
    }

    // Si es OWNER, verificamos si el conductor le pertenece (está en su lista filtrada)
    const isMyDriver = drivers.some(d => d.id === conductorId);

    return {
      name: driver ? driver.nombre : "Conductor Externo",
      isExternal: !isMyDriver
    };
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hora & Ruta</th>
              <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Conductor Asignado</th>
              <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Disponibilidad</th>
              <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {schedules.map((schedule) => {
              const driverInfo = getDriverDisplay(schedule.conductorId);
              const total = schedule.totalAsientos || 0;
              const available = schedule.asientosDisponibles || 0;
              const occupied = total - available;
              const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;
              const isFull = available === 0 && total > 0;
              const noDriver = !schedule.conductorId;

              return (
                <tr key={schedule.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-50 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-primary-600 shrink-0">
                        <Clock size={14} className="md:size-4" />
                        <span className="text-[8px] md:text-[10px] font-black mt-0.5 uppercase tracking-tighter leading-none">
                          {schedule.hora.split(' ')[1]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-black text-slate-800 leading-tight mb-0.5">{schedule.hora.split(' ')[0]}</p>
                        <div className="flex items-center gap-1 text-slate-400">
                          <MapPin size={10} className="shrink-0" />
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight truncate">{schedule.ruta}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0 ${noDriver ? 'bg-red-50 text-red-400' : driverInfo.isExternal ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                        <User size={14} className="md:size-4" />
                      </div>
                      <span className={`text-xs md:text-sm font-bold truncate max-w-[120px] md:max-w-none ${noDriver ? 'text-red-500 italic' : driverInfo.isExternal ? 'text-slate-400 italic font-medium' : 'text-slate-700'}`}>
                        {driverInfo.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex justify-center">
                      {role?.type !== 'ADMIN' && driverInfo.isExternal ? (
                        <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest italic leading-none">
                           <div className="w-6 md:w-8 h-1 bg-slate-100 rounded-full"></div>
                           Privado
                        </div>
                      ) : (
                        <div className="space-y-1.5 w-full max-w-[100px] md:max-w-[140px]">
                          <div className="flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase tracking-tighter">
                            <span className={isFull ? 'text-red-500' : 'text-slate-400'}>
                              {isFull ? 'Agotado' : `${available} Libres`}
                            </span>
                            <span className="text-slate-800">{occupancyRate}%</span>
                          </div>
                          <div className="h-1 md:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ${isFull ? 'bg-red-500' : 'bg-primary-500 shadow-[0_0_8px_rgba(255,109,0,0.3)]'}`}
                              style={{ width: `${occupancyRate}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 md:px-6 py-4 md:py-5 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shrink-0">
                      {noDriver ? (
                        <span className="bg-red-100 text-red-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none">
                          <AlertCircle size={10} /> Pendiente
                        </span>
                      ) : isFull ? (
                        <span className="bg-slate-800 text-white px-2 md:px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-slate-800/20 leading-none">
                          Completado
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none">
                          <CheckCircle2 size={10} /> En Venta
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
