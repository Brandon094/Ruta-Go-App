import React from 'react';
import { Calendar, CheckCircle2, Ticket } from 'lucide-react';
import { ScheduleTable } from '../schedules/ScheduleTable';
import { Button } from '../ui/Button';

/**
 * 👨‍✈️ Component: DriverItinerary
 * Interfaz operativa para que el conductor gestione sus turnos y haga check-in.
 */
export function DriverItinerary({ schedules = [], drivers = [], reservations = [], role, onManage, vehicles = [] }) {
  const mySchedules = schedules.filter(s => s.conductorId === role.uid);
  const pendingReservations = reservations.filter(r => (r.estadoReserva === 'Por confirmar' || r.reservationStatus === 'Por confirmar' || r.estadoReserva === 'Pendiente' || r.reservationStatus === 'Pendiente'));

  return (
    <div className="space-y-12 pb-20 px-2 animate-in fade-in duration-500">

      {/* Sección 1: Check-in de Pasajeros */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6">
          <div className="flex items-center gap-3">
             <h4 className="text-xs font-black uppercase tracking-widest text-primary-500 italic">Check-in de Abordaje</h4>
             <span className="bg-primary-500/10 text-primary-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                {pendingReservations.length} Solicitudes
             </span>
          </div>
        </div>

        {pendingReservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingReservations.map(res => (
              <div key={res.id} className="card-base p-6 rounded-[2.5rem] flex items-center justify-between group bg-white dark:bg-[#0A1F30]">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 dark:text-white/20 group-hover:text-primary-500 transition-colors">
                    <Ticket size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#061426] dark:text-white">Asiento #{res.puestoReservado || res.reservedSeat}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase truncate max-w-[120px]">{res.name || res.nombre}</p>
                  </div>
                </div>
                <Button variant="success" size="sm" icon={CheckCircle2}>Confirmar</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
            <CheckCircle2 size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="font-black uppercase tracking-widest text-xs">No hay abordajes pendientes</p>
          </div>
        )}
      </div>

      {/* Sección 2: Itinerario de Turnos */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-slate-200 dark:border-white/5 pb-6 text-left">
           <h4 className="text-xs font-black uppercase tracking-widest text-primary-500 italic">Cronograma de Turnos</h4>
        </div>
        <ScheduleTable schedules={mySchedules} drivers={drivers} role={role} onManage={onManage} vehicles={vehicles} />
      </div>
    </div>
  );
}
