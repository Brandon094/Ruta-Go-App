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

/**
 * 👨‍✈️ Component: DriverOverview
 * UI Espejo 1:1 de la App Móvil para conductores (v1.5.1)
 * Enfoque: Deep Navy & Orange Theme
 */
export function DriverOverview({ stats, schedules = [], drivers = [], reservations = [], role, onManage, vehicles = [] }) {
  const [actionLoading, setActionLoading] = useState(null);

  // --- 🛡️ GUARDS ULTRA-RESISTENTES (v1.6.3) ---
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
      // Usar el driverId de la reserva, no el del usuario logueado (importante si confirma un Admin)
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value).replace('COP', 'COP');
  };

  return (
    <div className="min-h-screen bg-[#061426] -m-4 lg:-m-8 p-0 space-y-0 animate-in fade-in duration-700 pb-32">

      {/* 📱 ORGANISMO: MirrorHeader (DRY) */}
      <MirrorHeader
        avatarText={myName.substring(0, 1)}
        avatarBgColor="bg-yellow-400"
        title={myName}
        subtitle={`Placa: ${myPlate}`}
        badgeText="Conductor Activo"
        badgeVariant="dark"
      >
        {/* 🌑 Molécula: Resumen del día (Inyectada) */}
        <div className="bg-[#061426] rounded-[1.5rem] p-6 shadow-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
             <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Resumen del día</h4>
             <RotateCw size={14} className="text-primary-500 cursor-pointer" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="border-r border-white/5">
              <SummaryMetric label="Reservas" value={stats?.todayReservations || 0} color="text-green-400" />
            </div>
            <div className="border-r border-white/5">
              <SummaryMetric label="Libres" value={stats?.totalFreeSeats || 11} color="text-primary-400" />
            </div>
            <div>
              <SummaryMetric label="Ingresos" value={formatCurrency(stats?.totalRevenue || 0)} color="text-amber-400" />
            </div>
          </div>
        </div>
      </MirrorHeader>

      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-10">

        {/* 🎫 SECCIÓN: CONFIRMAR RESERVAS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3 text-white">
                <MapPin className="text-primary-500" size={18} />
                <h3 className="text-lg font-black uppercase tracking-tight">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
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
            <div className="bg-[#0A1F30]/50 p-12 rounded-[2rem] border border-dashed border-white/5 text-center group hover:bg-[#0A1F30] transition-all duration-500">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Ticket size={32} className="text-slate-600 italic" />
               </div>
               <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] italic opacity-40">Todo al día. No tienes solicitudes pendientes.</p>
            </div>
          )}
        </div>

        {/* 🛣️ SECCIÓN: ESTADO POR RUTA */}
        <div className="space-y-6 pb-20">
           <div className="flex items-center gap-3 px-2 text-white">
              <h3 className="text-lg font-black uppercase tracking-tight">Estado por ruta</h3>
           </div>

           {mySchedules.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mySchedules.map(schedule => (
                  <RouteStatusCard
                    key={schedule.id}
                    schedule={schedule}
                    reservations={reservations}
                    onManage={() => onManage(schedule)}
                    vehicles={vehicles}
                    drivers={drivers}
                  />
                ))}
             </div>
           ) : (
             <div className="bg-[#0A1F30] p-8 rounded-[1.5rem] text-center text-slate-500 text-xs italic">
               No hay horarios activos.
             </div>
           )}
        </div>
      </div>

      {/* ➕ FLOATING ACTION BUTTON */}
      <button
        className="fixed bottom-24 right-6 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary-500/40 active:scale-90 transition-all z-40"
      >
        <Plus size={32} />
      </button>
    </div>
  );
}

/** ⚛️ Molecule: PendingReservationCard */
function PendingReservationCard({ res, onConfirm, onCancel, loading }) {
  const seat = res.reservedSeat !== undefined ? res.reservedSeat :
              (res.puestoReservado !== undefined ? res.puestoReservado : res.asientoReservado);
  const name = res.name || res.nombre || res.nombreUsuario || 'Usuario Ruta-Go';
  const phone = res.phone || res.telefono || '---';
  const route = res.ruta || `${res.origin || 'Nátaga'} ➔ ${res.destination || 'La Plata'}`;
  const date = res.departureTime || res.hora || '00:00';

  return (
    <div className="bg-[#0A1F30] p-6 rounded-[1.5rem] border border-white/5 relative group">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-base font-black text-white uppercase max-w-[65%]">{name}</h4>
        <Badge variant="dark" className="!bg-[#061426] !text-white !border-white/10 !rounded-lg lowercase px-2">
          Por confirmar
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
           <PhoneCall size={14} className="text-primary-500" />
           <span className="text-sm font-bold text-slate-300">{phone}</span>
        </div>
        <div className="flex items-center gap-3">
           <MapPin size={14} className="text-primary-500" />
           <span className="text-sm font-black text-white italic">{route}</span>
        </div>
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Clock size={14} className="text-primary-500" />
              <span className="text-xs font-bold text-slate-300">24/07/2026 {date}</span>
           </div>
           <div className="flex items-center gap-2">
              <Armchair size={16} className="text-primary-500" />
              <span className="text-sm font-black text-primary-500 uppercase">A{seat}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-primary-500 text-primary-500 font-black text-[10px] uppercase active:scale-95 transition-all"
        >
          <XCircle size={14} /> Rechazar
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary-500 text-[#061426] font-black text-[10px] uppercase active:scale-95 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={14} /> : <><CheckCircle2 size={14} /> Confirmar</>}
        </button>
      </div>
    </div>
  );
}

/** ⚛️ Molecule: RouteStatusCard */
function RouteStatusCard({ schedule, onManage }) {
  // Las reservas y libres ya vienen calculados del motor de datos central
  const resCount = schedule.reservasCount || 0;
  const libres = schedule.asientosDisponibles;

  return (
    <div
      onClick={onManage}
      className="bg-[#0A1F30]/50 p-5 rounded-[1.2rem] border border-white/5 cursor-pointer hover:bg-[#0A1F30] transition-all shadow-lg hover:ring-1 ring-primary-500/30 group"
    >
      <p className="text-[10px] font-black text-primary-500 uppercase mb-4">
        {schedule.ruta} ({schedule.hora})
      </p>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-slate-400 mb-1 group-hover:text-white transition-colors">
              <Activity size={14} />
              <span className="text-lg font-black">{resCount}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Reservas</span>
        </div>

        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-green-500 mb-1">
              <Armchair size={14} />
              <span className="text-lg font-black">{libres}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Libres</span>
        </div>
      </div>
    </div>
  );
}
