import React, { useState } from 'react';
import { Activity, CheckCircle2, Ticket, Calendar, XCircle, Loader2, Phone, MapPin, Clock, Armchair, RotateCw, Plus, Milestone } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { reservationService } from '../../../services/reservationService';

/**
 * 👨‍✈️ Component: DriverOverview
 * UI Espejo de la App Móvil para conductores (v1.5.1)
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
    <div className="min-h-screen bg-secondary-900 -m-4 lg:-m-8 p-4 lg:p-8 space-y-8 animate-in fade-in duration-700 pb-32">

      {/* 🟠 HEADER NARANJA (Android Mirror) */}
      <div className="bg-primary-500 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl shadow-primary-500/20">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full border-4 border-white/30 p-1 shadow-inner backdrop-blur-sm">
               <div className="w-full h-full bg-amber-100 rounded-full flex items-center justify-center font-black text-2xl text-[#061426]">
                 {myName.substring(0, 1)}
               </div>
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-2">{myName}</h2>
              <p className="text-white/70 font-bold text-sm uppercase tracking-[0.2em]">Placa: {myPlate}</p>
            </div>
          </div>
          <Badge variant="info" className="!bg-[#061426]/40 !text-white !border-white/10 backdrop-blur-md shadow-xl py-2 px-6">
             Conductor Activo
          </Badge>
        </div>

        {/* 🌑 RESUMEN DEL DÍA */}
        <div className="mt-10 bg-[#061426] rounded-[2rem] p-8 shadow-2xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
             <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em]">Resumen del día</h4>
             <RotateCw size={18} className="text-primary-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <SummaryItem value={stats?.todayReservations || 0} label="Reservas" color="text-green-400" />
            <SummaryItem value={stats?.totalFreeSeats || 0} label="Libres" color="text-primary-400" />
            <SummaryItem value={formatCurrency(stats?.totalRevenue || 0)} label="Ingresos" color="text-amber-400" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">

        {/* 🎫 SECCIÓN: CONFIRMAR RESERVAS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3 text-white">
                <Milestone className="text-primary-500 rotate-90" size={22} />
                <h3 className="text-xl font-black uppercase tracking-tight italic">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-primary-500/30">
               {pendingReservations.length}
             </span>
          </div>

          {pendingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="bg-[#0A1F30] p-16 rounded-[3rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-40">
               <Ticket size={48} className="text-slate-500 mb-4" />
               <p className="text-white text-sm font-black uppercase tracking-widest italic">Sin reservas por confirmar</p>
            </div>
          )}
        </div>

        {/* 🛣️ SECCIÓN: ESTADO POR RUTA */}
        <div className="space-y-6 pb-20">
           <div className="flex items-center gap-3 px-2 text-white">
              <Activity className="text-primary-500" size={22} />
              <h3 className="text-xl font-black uppercase tracking-tight italic">Estado por ruta</h3>
           </div>

           {mySchedules.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
             <div className="bg-[#0A1F30] p-12 rounded-[2.5rem] border border-white/5 text-center opacity-30 italic">
               No tienes horarios asignados para hoy.
             </div>
           )}
        </div>
      </div>

      {/* ➕ FLOATING ACTION BUTTON */}
      <button
        onClick={() => alert("Módulo de Venta Directa en desarrollo")}
        className="fixed bottom-10 right-10 w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary-500/40 hover:scale-110 active:scale-90 transition-all z-50 group"
      >
        <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
}

/** ⚛️ Molecule: SummaryItem */
function SummaryItem({ value, label, color }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className={`text-2xl lg:text-3xl font-black ${color} tracking-tighter`}>{value}</span>
      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mt-1">{label}</span>
    </div>
  );
}

/** ⚛️ Molecule: PendingReservationCard */
function PendingReservationCard({ res, onConfirm, onCancel, loading }) {
  const seat = res.puestoReservado !== undefined ? res.puestoReservado :
              (res.reservedSeat !== undefined ? res.reservedSeat : res.asientoReservado);
  const name = res.name || res.nombre || res.nombreUsuario || 'Usuario Ruta-Go';
  const phone = res.telefono || res.phone || '300 000 0000';
  const route = res.ruta || `${res.origen} -> ${res.destino}` || 'Ruta no especificada';
  const date = res.fechaReserva ? new Date(res.fechaReserva).toLocaleString() : 'Recién';

  return (
    <div className="bg-[#0A1F30] p-8 rounded-[2.5rem] border border-white/5 shadow-xl hover:border-primary-500/20 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-lg font-black text-white uppercase italic leading-tight max-w-[70%]">{name}</h4>
        <Badge variant="warning" className="!bg-primary-500/10 !text-primary-500 !border-primary-500/20 shadow-none">
          Por confirmar
        </Badge>
      </div>

      <div className="space-y-4 mb-8">
        <InfoLine icon={Phone} text={phone} color="text-primary-500" />
        <InfoLine icon={Milestone} text={route} color="text-primary-500" />
        <div className="flex items-center justify-between">
           <InfoLine icon={Clock} text={date} color="text-primary-500" />
           <div className="flex items-center gap-2 bg-primary-500/10 px-4 py-2 rounded-2xl border border-primary-500/20">
              <Armchair size={14} className="text-primary-500" />
              <span className="text-sm font-black text-primary-500 uppercase">A{seat}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <Button
          variant="outline"
          size="md"
          icon={XCircle}
          onClick={onCancel}
          disabled={loading}
          className="!border-primary-500 !text-primary-500 hover:!bg-primary-500 hover:!text-white rounded-[1.2rem]"
        >
          Rechazar
        </Button>
        <Button
          variant="primary"
          size="md"
          icon={CheckCircle2}
          onClick={onConfirm}
          isLoading={loading}
          className="!bg-primary-500 !text-white rounded-[1.2rem] shadow-primary-500/20"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}

/** ⚛️ Molecule: RouteStatusCard */
function RouteStatusCard({ schedule, reservations, onManage, vehicles, drivers }) {
  // Calcular reservas confirmadas para este horario
  const resCount = reservations.filter(r =>
    (r.scheduleId === schedule.id || r.horarioId === schedule.id) &&
    (r.estadoReserva?.toLowerCase() === 'confirmada' || r.reservationStatus?.toLowerCase() === 'confirmada')
  ).length;

  const driver = drivers.find(d => d.id === schedule.conductorId);
  const vehicleId = schedule.vehiculoId || driver?.vehiculoId || driver?.placaVehiculo;
  const vehicle = vehicles.find(v => v.id === vehicleId || v.placa === vehicleId);
  const totalSeats = vehicle?.capacidad || 13;

  const dbTotal = schedule.totalAsientos || 0;
  const libres = (dbTotal > 0) ? (schedule.asientosDisponibles ?? schedule.asientosLibres ?? totalSeats) : totalSeats;

  return (
    <div
      onClick={onManage}
      className="bg-[#0A1F30] p-6 rounded-[2rem] border border-white/5 cursor-pointer hover:border-primary-500/30 transition-all hover:scale-[1.02] active:scale-95 group"
    >
      <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-4 italic">
        {schedule.ruta} ({schedule.hora})
      </p>

      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center gap-1">
           <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
              <Activity size={16} />
              <span className="text-xl font-black">{resCount}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Reservas</span>
        </div>

        <div className="w-px h-8 bg-white/5" />

        <div className="flex flex-col items-center gap-1">
           <div className="flex items-center gap-2 text-green-500">
              <Armchair size={16} />
              <span className="text-xl font-black">{libres}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Libres</span>
        </div>
      </div>
    </div>
  );
}

function InfoLine({ icon: Icon, text, color }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} className={`${color} shrink-0`} />
      <span className="text-xs font-bold text-slate-300 truncate">{text}</span>
    </div>
  );
}
