import React, { useState } from 'react';
import {
  Activity, CheckCircle2, Ticket, Calendar, XCircle, Loader2,
  Phone, MapPin, Clock, Armchair, RotateCw, Plus,
  ChevronRight, PhoneCall
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { reservationService } from '../../../services/reservationService';
import { MirrorHeader } from '../MirrorHeader';
import { SummaryMetric } from '../SummaryMetric';
import { StatsCard } from '../StatsCard';
import { PendingReservationCard } from '../PendingReservationCard';
import { RouteStatusCard } from '../RouteStatusCard';

/**
 * 👨‍✈️ Component: DriverOverview
 * UI Espejo 1:1 de la App Móvil para conductores (v1.7.0 Atomic)
 */
export function DriverOverview({ stats, schedules = [], drivers = [], reservations = [], role, onManage, vehicles = [] }) {
  const [actionLoading, setActionLoading] = useState(null);

  // --- 🛡️ GUARDS ---
  const safeDrivers = Array.isArray(drivers) ? drivers : [];
  const safeSchedules = Array.isArray(schedules) ? schedules : [];
  const safeReservations = Array.isArray(reservations) ? reservations : [];

  const currentDriverData = safeDrivers.find(d => d.id === role?.uid) || {};
  const myName = currentDriverData.nombre || role?.name || 'Conductor';
  const myPlate = currentDriverData.placaVehiculo || currentDriverData.vehiculoId || '---';

  const mySchedules = safeSchedules.filter(s => s.conductorId === role?.uid);

  const pendingReservations = safeReservations.filter(r => {
    const status = (r.estadoReserva || r.reservationStatus || "").toLowerCase();
    return status === 'pendiente' || status === 'por confirmar';
  });

  const handleConfirm = async (res) => {
    setActionLoading(res.id);
    try {
      const price = res.price || res.precio || 12000;
      const targetDriverId = res.driverId || res.conductorId || role.uid;
      await reservationService.confirmReservation(res.id, targetDriverId, price);
    } catch (error) {
      alert("Error al confirmar: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (res) => {
    if (!window.confirm("¿Estás seguro de rechazar esta reserva?")) return;
    setActionLoading(res.id);
    try {
      const scheduleId = res.scheduleId || res.idHorario || res.horarioId;
      const seatNumber = res.reservedSeat !== undefined ? res.reservedSeat :
                        (res.puestoReservado !== undefined ? res.puestoReservado : res.asientoReservado);
      await reservationService.cancelReservation(res.id, scheduleId, seatNumber);
    } catch (error) {
      alert("Error al rechazar: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 📱 ORGANISMO: MirrorHeader (DRY) */}
      <MirrorHeader
        avatarText={myName.substring(0, 1)}
        avatarBgColor="bg-yellow-400"
        badgeText="Conductor Activo"
        badgeVariant="dark"
      >
        {/* ⚛️ Molecule: StatsCard (Refactored) */}
        <StatsCard
          header={
            <div className="flex items-center justify-between w-full">
               <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest leading-none">Resumen del día</h4>
               <RotateCw size={14} className="text-primary-500 cursor-pointer" />
            </div>
          }
        >
          <div className="grid grid-cols-3 gap-2">
            <div className="border-r border-slate-100 dark:border-white/5">
              <SummaryMetric label="Reservas" value={stats?.todayReservations || 0} color="text-green-400" />
            </div>
            <div className="border-r border-slate-100 dark:border-white/5">
              <SummaryMetric label="Libres" value={stats?.totalFreeSeats || 11} color="text-primary-400" />
            </div>
            <div>
              <SummaryMetric label="Ingresos" value={stats?.totalRevenue || 0} color="text-amber-400" isCurrency={true} />
            </div>
          </div>
        </StatsCard>
      </MirrorHeader>

      <div className="max-w-4xl mx-auto pt-4 space-y-10 pb-20">

        {/* 🎫 SECCIÓN: CONFIRMAR RESERVAS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3">
                <MapPin className="text-primary-500" size={18} />
                <h3 className="text-lg font-black uppercase tracking-tight text-[#061426] dark:text-white italic">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-orange-500/20">
               {pendingReservations.length}
             </span>
          </div>

          {pendingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingReservations.map(res => (
                <PendingReservationCard
                  key={res.id}
                  res={res}
                  onConfirm={() => handleConfirm(res)}
                  onCancel={() => handleCancel(res)}
                  loading={actionLoading === res.id}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0A1F30]/50 p-12 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/5 text-center group hover:border-primary-500/50 transition-all duration-500 shadow-sm">
               <div className="w-16 h-16 bg-primary-500/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Ticket size={32} className="text-slate-400 italic" />
               </div>
               <p className="text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-[0.2em] italic">Todo al día. No tienes solicitudes pendientes.</p>
            </div>
          )}
        </div>

        {/* 🛣️ SECCIÓN: ESTADO POR RUTA */}
        <div className="space-y-6">
           <div className="flex items-center gap-3 px-2">
              <h3 className="text-lg font-black uppercase tracking-tight text-[#061426] dark:text-white italic">Estado por ruta</h3>
           </div>

           {mySchedules.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mySchedules.map(schedule => (
                  <RouteStatusCard
                    key={schedule.id}
                    schedule={schedule}
                    onManage={() => onManage(schedule)}
                  />
                ))}
             </div>
           ) : (
             <div className="bg-white dark:bg-[#0A1F30]/50 p-8 rounded-[1.5rem] text-center text-slate-400 text-xs italic border border-slate-100 dark:border-white/5 shadow-sm transition-colors">
               No hay horarios activos asignados para hoy.
             </div>
           )}
        </div>
      </div>

      {/* ➕ FLOATING ACTION BUTTON */}
      <button
        onClick={() => alert("Función de Venta Rápida en desarrollo")}
        className="fixed bottom-24 right-6 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary-500/40 hover:scale-110 active:scale-95 transition-all z-40 border-4 border-white dark:border-[#061426]"
      >
        <Plus size={32} />
      </button>
    </div>
  );
}
