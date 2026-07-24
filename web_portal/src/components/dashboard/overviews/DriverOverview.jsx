import React, { useState } from 'react';
import {
  Activity, CheckCircle2, Ticket, Calendar, XCircle, Loader2,
  Phone, MapPin, Clock, Armchair, RotateCw, Plus, Milestone,
  ChevronRight, PhoneCall, MapPinned
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { reservationService } from '../../../services/reservationService';

/**
 * 👨‍✈️ Component: DriverOverview
 * UI Espejo 1:1 de la App Móvil para conductores (v1.5.1)
 * Enfoque: Deep Navy & Orange Theme
 */
export function DriverOverview({ stats, schedules, drivers, reservations = [], role, onManage, vehicles = [] }) {
  const [actionLoading, setActionLoading] = useState(null);

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
      const price = res.price || res.precio || 12000;
      await reservationService.confirmReservation(res.id, role.uid, price);
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

      {/* 🟠 TOP HEADER & PROFILE (Android Style) */}
      <div className="bg-primary-500 p-6 lg:p-10 pt-8 pb-20 relative overflow-hidden rounded-b-[3rem] shadow-2xl">
        {/* Logo superior */}
        <div className="flex justify-start mb-8">
           <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-10 h-10 object-contain invert brightness-0" />
        </div>

        <div className="flex items-center justify-between relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-yellow-400 rounded-full border-2 border-white/30 flex items-center justify-center shadow-inner overflow-hidden">
               <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
                 <img src="/assets/default_avatar.png" alt="avatar" className="w-12 h-12 opacity-80"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                 <span className="hidden font-black text-3xl text-[#061426]">{myName.substring(0, 1)}</span>
               </div>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-black tracking-tight uppercase leading-none mb-1">{myName}</h2>
              <p className="text-white/80 font-bold text-xs">Placa: {myPlate}</p>
            </div>
          </div>
          <Badge variant="dark" className="!bg-[#061426]/30 !text-white/90 !border-white/10 backdrop-blur-md py-1 px-4 !rounded-2xl lowercase lowercase-first">
             Conductor Activo
          </Badge>
        </div>

        {/* 🌑 RESUMEN DEL DÍA CARD (Inyectada en el header) */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-[#061426] rounded-[1.5rem] p-6 shadow-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Resumen del día</h4>
               <RotateCw size={14} className="text-primary-500 cursor-pointer" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center border-r border-white/5">
                <p className="text-2xl font-black text-green-400 leading-none mb-1">{stats?.todayReservations || 0}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Reservas</p>
              </div>
              <div className="text-center border-r border-white/5">
                <p className="text-2xl font-black text-primary-500 leading-none mb-1">{stats?.totalFreeSeats || 11}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Libres</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-amber-400 leading-none mb-1">{formatCurrency(stats?.totalRevenue || 0)}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Ingresos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-10">

        {/* 🎫 SECCIÓN: CONFIRMAR RESERVAS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3 text-white">
                <Milestone className="text-primary-500" size={18} />
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
            <div className="bg-[#0A1F30] p-12 rounded-[2rem] border border-dashed border-white/5 text-center opacity-40">
               <p className="text-white text-xs font-bold uppercase tracking-widest italic">Sin reservas pendientes</p>
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
           <MapPinned size={14} className="text-primary-500" />
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
function RouteStatusCard({ schedule, reservations, onManage, vehicles, drivers }) {
  const driver = drivers.find(d => d.id === schedule.conductorId);
  const vehicleId = schedule.vehiculoId || driver?.vehiculoId || driver?.placaVehiculo;
  const vehicle = vehicles.find(v => v.id === vehicleId || v.placa === vehicleId);
  const totalSeats = vehicle?.capacidad || 13;
  const libres = schedule.asientosDisponibles ?? schedule.asientosLibres ?? totalSeats;

  // Reservas confirmadas para este turno
  const resCount = reservations.filter(r =>
    (r.scheduleId === schedule.id || r.horarioId === schedule.id) &&
    (r.reservationStatus?.toLowerCase() === 'confirmada' || r.estadoReserva?.toLowerCase() === 'confirmada')
  ).length;

  return (
    <div
      onClick={onManage}
      className="bg-[#0A1F30]/50 p-5 rounded-[1.2rem] border border-white/5 cursor-pointer hover:bg-[#0A1F30] transition-all"
    >
      <p className="text-[10px] font-black text-primary-500 uppercase mb-4">
        {schedule.ruta} ({schedule.hora})
      </p>

      <div className="flex items-center justify-start gap-10">
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Activity size={14} />
              <span className="text-lg font-black text-white">{resCount}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Reservas</span>
        </div>

        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-green-500 mb-1">
              <Armchair size={14} />
              <span className="text-lg font-black text-green-500">{libres}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Libres</span>
        </div>
      </div>
    </div>
  );
}
