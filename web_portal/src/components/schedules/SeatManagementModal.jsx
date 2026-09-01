import React, { useState, useEffect, useMemo } from 'react';
import {
  Loader2, CheckCircle2, Info, Bus, Ticket, User,
  Armchair, RotateCw, AlertTriangle, Lock, ChevronDown, ChevronUp,
  MapPin, Clock, XCircle, UserCheck, Milestone, X, MessageSquare, Send
} from 'lucide-react';
import { ref, onValue, runTransaction, get, serverTimestamp, increment } from "firebase/database";
import { db } from '../../firebase';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { reservationService } from '../../services/reservationService';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 💺 Component: SeatManagementModal
 * UI Espejo 1:1 de la App Móvil NoSQL v2.0
 */
export function SeatManagementModal({ schedule, onClose, role, user, drivers = [], vehicles = [], activeTab }) {
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState({ occupiedSeats: {}, totalSeats: 13, availableSeats: 13 });
  const [reservations, setReservations] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [successReservation, setSuccessReservation] = useState(false);
  const [routePrice, setRoutePrice] = useState(12000);

  const isPassengerMode = role?.type === 'PASSENGER' || activeTab === 'passenger_view';

  useEffect(() => {
    if (!schedule?.id) return;

    // 1. Escuchar Disponibilidad Técnica en /seatAvailability/
    const dispRef = ref(db, `seatAvailability/${schedule.id}`);
    const unsubDisp = onValue(dispRef, (snap) => {
      if (snap.exists()) setAvailability(snap.val());
      setLoading(false);
    });

    // 2. Escuchar Reservas Activas en /reservations/
    const resRef = ref(db, `reservations`);
    const unsubRes = onValue(resRef, (snap) => {
      if (snap.exists()) {
        const list = Object.values(snap.val()).filter(r =>
          r.scheduleId === schedule.id && (r.status !== 'cancelled' && r.status !== 'Cancelada')
        );
        setReservations(list);
      }
    });

    // 3. Obtener Precio de la Ruta en /prices/
    const fetchPrice = async () => {
      const rutaNorm = FormatUtils.normalizeText(schedule.route || schedule.ruta || "").replace(/➔/g, '->');
      const parts = rutaNorm.split('->');
      if (parts.length === 2) {
        const pSnap = await get(ref(db, `prices/${parts[0].trim()}/${parts[1].trim()}`));
        if (pSnap.exists()) setRoutePrice(pSnap.val());
      }
    };
    fetchPrice();

    return () => { unsubDisp(); unsubRes(); };
  }, [schedule.id]);

  const driver = drivers.find(d => d.id === (schedule.driverId || schedule.conductorId)) || {};
  const vehicle = vehicles.find(v => v.id === (schedule.vehicleId || schedule.vehiculoId) || v.plate === (schedule.vehicleId || schedule.vehiculoId)) || {};

  // --- 🧠 Lógica de Clasificación de Asientos ---
  const seatStates = useMemo(() => {
    const states = {};
    const occupiedData = availability.occupiedSeats || availability.asientosOcupados || {};
    const occupiedIds = Array.isArray(occupiedData)
      ? occupiedData.map((val, idx) => val === true ? idx.toString() : null).filter(Boolean)
      : Object.keys(occupiedData).filter(k => occupiedData[k] === true);

    occupiedIds.forEach(id => {
      const res = reservations.find(r => (r.reservedSeat || r.puestoReservado)?.toString() === id.toString());
      states[id] = res ? 'APP' : 'LOCAL';
    });
    return states;
  }, [availability.occupiedSeats, availability.asientosOcupados, reservations]);

  // --- 🖱️ Orquestador de Clicks ---
  const handleSeatClick = (seatId) => {
    if (updating) return;
    if (isPassengerMode) {
      if (seatStates[seatId]) return;
      setSelectedSeat(selectedSeat === seatId ? null : seatId);
    } else {
      handlePhysicalToggle(seatId);
    }
  };

  // --- 🛒 Venta Física (Bloqueo/Liberación) ---
  const handlePhysicalToggle = async (seatId) => {
    const currentState = seatStates[seatId];
    if (currentState === 'APP') {
      alert("⚠️ Reserva de App protegida. Debes cancelarla desde el historial.");
      return;
    }

    const action = currentState === 'LOCAL' ? 'liberar' : 'bloquear';
    if (!window.confirm(`¿Deseas ${action} el asiento #${seatId}?`)) return;

    setUpdating(true);
    try {
      const dispRef = ref(db, `seatAvailability/${schedule.id}`);
      await runTransaction(dispRef, (current) => {
        if (!current) return current;
        if (!current.occupiedSeats) current.occupiedSeats = {};

        const idx = parseInt(seatId);

        if (Array.isArray(current.occupiedSeats)) {
          current.occupiedSeats[idx] = (action === 'bloquear');
        } else {
          current.occupiedSeats[seatId] = (action === 'bloquear');
        }

        const total = current.totalSeats || 13;
        const occupiedCount = Object.values(current.occupiedSeats).filter(v => v === true).length;
        current.availableSeats = Math.max(0, total - occupiedCount);

        return current;
      });

      if (action === 'bloquear' && (role.type === 'DRIVER' || role.type === 'OWNER')) {
        const targetUid = role.type === 'DRIVER' ? role.uid : (schedule.driverId || schedule.conductorId || role.uid);
        await reservationService.confirmReservation("VENTA_FISICA_" + Date.now(), targetUid, routePrice);
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // --- 🎫 Reserva Pasajero ---
  const handlePassengerReserve = async () => {
    if (!selectedSeat || updating) return;

    const timeText = schedule.time || schedule.hora || "";
    if (FormatUtils.isPastSchedule(timeText)) {
      alert("Este horario ya no está disponible para reservas.");
      onClose();
      return;
    }

    setUpdating(true);
    try {
      const rutaNorm = FormatUtils.normalizeText(schedule.route || schedule.ruta || "").replace(/➔/g, '->');
      const parts = rutaNorm.split('->');
      const reservationData = {
        userId: role.uid,
        passengerName: role?.name || "Pasajero Web",
        passengerPhone: role?.phone || "",
        driverId: schedule.driverId || schedule.conductorId || "",
        driverName: driver.name || driver.nombre || "Conductor",
        vehiclePlate: vehicle.plate || vehicle.placa || schedule.vehicleId || schedule.vehiculoId || "",
        vehicleModel: vehicle.model || vehicle.modelo || "Vehículo",
        origin: parts[0]?.trim() || "Nátaga",
        destination: parts[1]?.trim() || "La Plata",
        departureTime: timeText,
        price: routePrice,
        paymentMethod: 'efectivo'
      };

      await reservationService.createReservation(reservationData, schedule.id, selectedSeat);
      setSuccessReservation(true);
    } catch (err) { alert(err.message); } finally { setUpdating(false); }
  };

  if (successReservation) {
    return (
      <Modal isOpen={true} onClose={onClose} maxWidth="max-w-sm">
        <div className="p-10 text-center space-y-8">
           <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white mx-auto animate-bounce shadow-lg shadow-primary-500/20">
              <CheckCircle2 size={48} />
           </div>
           <div className="space-y-3 text-white">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">¡Reserva Enviada!</h2>
              <p className="text-slate-400 text-sm font-medium">Asiento #{selectedSeat} en proceso de confirmación.</p>
           </div>
           <Button onClick={onClose} variant="primary" size="full" className="rounded-2xl">Entendido</Button>
        </div>
      </Modal>
    );
  }

  const totalSeats = availability.totalSeats || availability.totalAsientos || 13;
  const availSeats = availability.availableSeats !== undefined ? availability.availableSeats : (availability.asientosDisponibles ?? 13);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      maxWidth="max-w-2xl"
      showClose={false}
      className="!bg-[#061426] h-full lg:h-auto"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-primary-500 p-6 flex items-center justify-between shrink-0 shadow-lg">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-1 text-white hover:bg-white/10 rounded-full transition-all">
              <X size={28} />
            </button>
            <h3 className="text-xl font-black text-white tracking-tight italic">
              {isPassengerMode ? 'Selecciona tu asiento' : 'Gestión de Asientos'}
            </h3>
          </div>
          {!isPassengerMode && <RotateCw size={24} className="text-white/60" />}
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">

          {/* Info Card */}
          <div className="bg-[#0A1F30] rounded-3xl border border-white/5 p-6 space-y-4 shadow-inner">
             {isPassengerMode ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                       <ChevronUp size={18} className="text-primary-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-80 text-white">Detalles de reserva</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <InfoLine icon={MapPin} title={schedule.route || schedule.ruta} sub="Ruta Directa - Tiempo est.: 60 min" />
                    <InfoLine icon={Clock} title={schedule.time || schedule.hora} sub="Hoy" />
                    <InfoLine icon={Bus} title={`Placa: ${vehicle.plate || vehicle.placa || '---'} - ${vehicle.model || vehicle.modelo || 'Vehículo'}`} sub={`Capacidad: ${totalSeats} personas | Disponibles: ${availSeats}`} />
                    <InfoLine icon={UserCheck} title="Conductor" sub={driver.name || driver.nombre || 'Sin asignar'} />
                  </div>
                </>
             ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-primary-500/10 rounded-xl text-primary-500"><Milestone size={20} /></div>
                     <span className="text-lg font-black text-white uppercase italic">{schedule.route || schedule.ruta}</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-primary-500/10 rounded-xl text-primary-500"><Clock size={20} /></div>
                     <span className="text-sm font-bold text-slate-300">Horario: {schedule.time || schedule.hora}</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-primary-500/10 rounded-xl text-primary-500"><Armchair size={20} /></div>
                     <span className="text-sm font-bold text-slate-300 font-black">Disponibles: {availSeats}</span>
                  </div>
                </div>
             )}
          </div>

          {/* Mapa del Vehículo */}
          <div className="bg-[#0A1F30] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
             <p className="text-center text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Cabina</p>
             <div className="space-y-12 relative z-10">
               <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
                  <div className="w-16 h-16 bg-[#061426] border-2 border-white/10 rounded-2xl flex items-center justify-center text-primary-500 shadow-lg"><User size={32} /></div>
                  {[1, 2, 3, 4, 5].map(id => <Seat key={id} seatId={id.toString()} state={seatStates[id.toString()]} selected={selectedSeat === id.toString()} isPassenger={isPassengerMode} onClick={() => handleSeatClick(id.toString())} />)}
               </div>
               <div className="w-24 h-px bg-white/5 mx-auto" />
               <p className="text-center text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Zona Trasera</p>
               <div className="grid grid-cols-5 gap-4 max-w-sm mx-auto">
                  {[6, 7].map(id => <Seat key={id} seatId={id.toString()} state={seatStates[id.toString()]} selected={selectedSeat === id.toString()} isPassenger={isPassengerMode} onClick={() => handleSeatClick(id.toString())} />)}
                  <div className="col-span-1" />
                  {[10, 11].map(id => <Seat key={id} seatId={id.toString()} state={seatStates[id.toString()]} selected={selectedSeat === id.toString()} isPassenger={isPassengerMode} onClick={() => handleSeatClick(id.toString())} />)}
                  {[8, 9].map(id => <Seat key={id} seatId={id.toString()} state={seatStates[id.toString()]} selected={selectedSeat === id.toString()} isPassenger={isPassengerMode} onClick={() => handleSeatClick(id.toString())} />)}
                  <div className="col-span-1" />
                  {[12, 13].map(id => <Seat key={id} seatId={id.toString()} state={seatStates[id.toString()]} selected={selectedSeat === id.toString()} isPassenger={isPassengerMode} onClick={() => handleSeatClick(id.toString())} />)}
               </div>
             </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0A1F30] rounded-3xl p-6 flex justify-around border border-white/5 shadow-xl">
               <LegendItem label="Libre" color="bg-[#061426] border-white/10" icon={<Armchair size={18} className="text-slate-500" />} />
               <LegendItem label={isPassengerMode ? "Tuyo" : "App"} color={isPassengerMode ? "bg-green-500" : "bg-[#061426] border-red-500/30"} icon={isPassengerMode ? <Armchair size={18} className="text-white" /> : <X size={18} className="text-red-500" />} />
               <LegendItem label={isPassengerMode ? "Ocupado" : "Local"} color={isPassengerMode ? "bg-[#061426] border-red-500/30" : "bg-primary-500"} icon={isPassengerMode ? <X size={18} className="text-red-500" /> : <User size={18} className="text-[#061426]" />} />
            </div>
            {!isPassengerMode && <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest opacity-80 animate-pulse">Toca un asiento para gestionar su estado</p>}
          </div>
        </div>

        {isPassengerMode && (
          <div className="p-6 bg-[#061426] border-t border-white/5 grid grid-cols-2 gap-4 shrink-0 pb-10">
             <button onClick={onClose} className="flex items-center justify-center gap-3 py-5 rounded-[1.8rem] border-2 border-primary-500 text-primary-500 font-black text-sm uppercase active:scale-95 transition-all shadow-lg shadow-orange-500/10"><XCircle size={22} /> Cancelar</button>
             <button onClick={handlePassengerReserve} disabled={!selectedSeat || updating} className="flex items-center justify-center gap-3 py-5 rounded-[1.8rem] bg-primary-500 text-[#061426] font-black text-sm uppercase shadow-2xl shadow-primary-500/40 transition-all active:scale-95 disabled:opacity-50">
               {updating ? <Loader2 className="animate-spin" size={22} /> : <><CheckCircle2 size={22} /> Confirmar</>}
             </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function InfoLine({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-primary-500/10 rounded-xl text-primary-500 mt-1"><Icon size={18} /></div>
      <div>
        <p className="text-white font-black text-sm uppercase tracking-tight leading-none mb-1">{title}</p>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{sub}</p>
      </div>
    </div>
  );
}

function Seat({ seatId, state, selected, isPassenger, onClick }) {
  const isApp = state === 'APP';
  const isLocal = state === 'LOCAL';

  let content = <Armchair size={32} className={selected ? 'text-white' : 'text-slate-500'} />;
  let styles = "bg-[#061426] border-2 border-white/10";

  if (isApp) {
    content = <X size={24} className="text-red-500" />;
    styles = "bg-[#061426] border-2 border-red-500/30 cursor-not-allowed";
  } else if (isLocal) {
    if (isPassenger) {
      content = <X size={24} className="text-red-500" />;
      styles = "bg-[#061426] border-2 border-red-500/30 cursor-not-allowed";
    } else {
      content = <User size={28} className="text-[#061426]" />;
      styles = "bg-primary-500 shadow-lg shadow-primary-500/20";
    }
  } else if (selected) {
    styles = "bg-green-500 shadow-lg shadow-green-500/20 ring-4 ring-green-500/20 scale-105";
  }

  const delay = parseInt(seatId) * 30;

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`w-16 h-16 rounded-2xl flex items-center justify-center relative transition-all transform active:scale-95 overflow-hidden animate-pop ${styles}`}
    >
      <span className="relative z-10">{content}</span>
      <span className={`absolute bottom-1 right-2 text-[8px] font-black ${selected || (isLocal && !isPassenger) ? 'text-white/50' : 'text-slate-700'}`}>{seatId}</span>
    </button>
  );
}

function LegendItem({ label, color, icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}
