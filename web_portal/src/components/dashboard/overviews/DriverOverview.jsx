import React, { useState } from 'react';
import { Activity, CheckCircle2, Ticket, Calendar, XCircle, Loader2 } from 'lucide-react';
import { ScheduleTable } from '../../schedules/ScheduleTable';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { reservationService } from '../../../services/reservationService';

export function DriverOverview({ stats, schedules, drivers, reservations = [], role, onManage, vehicles = [] }) {
  const [actionLoading, setActionLoading] = useState(null); // id de la reserva en proceso

  const currentDriverData = drivers.find(d => d.id === role.uid) || {};
  const myName = currentDriverData.nombre || 'Cargando...';
  const myPlate = currentDriverData.placaVehiculo || currentDriverData.vehiculoId || '---';
  const mySchedules = schedules.filter(s => s.conductorId === role.uid);

  const pendingReservations = reservations.filter(r => {
    const status = (r.estadoReserva || r.reservationStatus || "").toLowerCase();
    return status === 'pendiente' || status === 'por confirmar';
  });

  const handleConfirm = async (res) => {
    setActionLoading(res.id);
    try {
      const price = res.precio || res.price || 12000;
      await reservationService.confirmReservation(res.id, role.uid, price);
    } catch (error) {
      alert("Error al confirmar: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (res) => {
    if (!window.confirm("¿Estás seguro de cancelar esta reserva? El asiento se liberará.")) return;

    setActionLoading(res.id);
    try {
      const scheduleId = res.scheduleId || res.idHorario || res.horarioId;
      const seatNumber = res.puestoReservado !== undefined ? res.puestoReservado :
                        (res.reservedSeat !== undefined ? res.reservedSeat : res.asientoReservado);

      await reservationService.cancelReservation(res.id, scheduleId, seatNumber);
    } catch (error) {
      alert("Error al cancelar: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <div className="bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10 text-white">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 shadow-inner">
               <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center font-black text-xl lg:text-2xl text-[#061426]">
                 {myName.substring(0, 1)}
               </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase italic">{myName}</h2>
              <p className="text-white/80 font-bold text-sm uppercase tracking-wider">Placa: {myPlate}</p>
            </div>
          </div>
          <Badge variant="info" className="!bg-white/20 !text-white !border-white/10 backdrop-blur-md shadow-xl">
             Conductor Activo
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-base rounded-[2.5rem] p-6 lg:p-8 bg-white dark:bg-[#061426] shadow-xl transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Resumen del día</h4>
               <Activity size={16} className="text-primary-500" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <span className="text-xl lg:text-2xl font-black text-green-500">{stats?.todayReservations || 0}</span>
                <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Reservas</p>
              </div>
              <div className="space-y-1 border-x border-slate-100 dark:border-white/5">
                <span className="text-xl lg:text-2xl font-black text-primary-500">{currentDriverData.asientosLibres || 13}</span>
                <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Libres</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl lg:text-2xl font-black text-amber-500">{formatCurrency(stats?.totalRevenue || 0)}</span>
                <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Ingresos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 pb-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3 text-[#061426] dark:text-white">
                <CheckCircle2 className="text-primary-500" size={18} />
                <h3 className="text-lg font-black uppercase tracking-tight leading-none italic">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-primary-500/20">{pendingReservations.length}</span>
          </div>
          {pendingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              {pendingReservations.map(res => (
                <div key={res.id} className="card-base p-6 rounded-[2rem] flex items-center justify-between group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:text-primary-500 transition-colors">
                      <Ticket size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#061426] dark:text-white">
                        Asiento #{res.puestoReservado !== undefined ? res.puestoReservado : (res.reservedSeat !== undefined ? res.reservedSeat : res.asientoReservado)}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">
                        Pasajero: {res.name || res.nombre || res.nombreUsuario || 'User'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                      onClick={() => handleCancel(res)}
                      disabled={!!actionLoading}
                    >
                      <XCircle size={18} />
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleConfirm(res)}
                      isLoading={actionLoading === res.id}
                      disabled={!!actionLoading && actionLoading !== res.id}
                      icon={CheckCircle2}
                    >
                      Confirmar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-base p-12 rounded-[2.5rem] flex items-center justify-center text-center mx-2 opacity-60">
               <p className="text-slate-400 dark:text-white/40 text-xs font-bold uppercase italic tracking-widest">Sin reservas activas</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-3 px-2 text-[#061426] dark:text-white">
              <Calendar className="text-primary-500" size={18} />
              <h3 className="text-lg font-black uppercase tracking-tight italic">Mi Itinerario</h3>
           </div>
           <ScheduleTable schedules={mySchedules} drivers={drivers} role={role} onManage={onManage} vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
}
