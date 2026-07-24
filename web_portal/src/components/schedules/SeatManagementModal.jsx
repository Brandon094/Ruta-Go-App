import React, { useState, useEffect, useMemo } from 'react';
import {
  X, Loader2, CheckCircle2, UserPlus, Info, Bus, Ticket, User,
  Armchair, SteeringWheel, RotateCw, AlertTriangle
} from 'lucide-react';
import { ref, onValue, runTransaction, set, push, get, serverTimestamp, increment } from "firebase/database";
import { db } from '../../firebase';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

/**
 * 💺 Componente: SeatManagementModal
 * UI Espejo de la App Móvil para gestión de asientos (v1.5.1)
 */
export function SeatManagementModal({ schedule, onClose, role }) {
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState({ asientosOcupados: {}, totalAsientos: 13, asientosDisponibles: 13 });
  const [reservations, setReservations] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [successReservation, setSuccessReservation] = useState(false);
  const [routePrice, setRoutePrice] = useState(12000);

  const isPassenger = role?.type === 'PASSENGER';
  const isManagement = role?.type === 'ADMIN' || role?.type === 'OWNER' || role?.type === 'DRIVER';

  useEffect(() => {
    if (!schedule?.id) return;

    // 1. Escuchar Disponibilidad Técnica
    const dispRef = ref(db, `disponibilidadAsientos/${schedule.id}`);
    const unsubDisp = onValue(dispRef, (snap) => {
      if (snap.exists()) setAvailability(snap.val());
      setLoading(false);
    });

    // 2. Escuchar Reservas (Para diferenciar App de Local)
    const resRef = ref(db, `reservas`);
    const unsubRes = onValue(resRef, (snap) => {
      if (snap.exists()) {
        const list = Object.values(snap.val()).filter(r => r.scheduleId === schedule.id && r.reservationStatus !== 'Cancelada');
        setReservations(list);
      }
    });

    // 3. Obtener Precio de la Ruta
    const fetchPrice = async () => {
      const parts = schedule.ruta.toLowerCase().split(/ -> | ➔ /);
      if (parts.length === 2) {
        const pSnap = await get(ref(db, `precios/${parts[0].trim()}/${parts[1].trim()}`));
        if (pSnap.exists()) setRoutePrice(pSnap.val());
      }
    };
    fetchPrice();

    return () => {
      unsubDisp();
      unsubRes();
    };
  }, [schedule]);

  // --- 🧠 Lógica de Clasificación de Asientos ---
  const seatStates = useMemo(() => {
    const states = {};
    const occupiedIds = Object.keys(availability.asientosOcupados || {}).filter(k => availability.asientosOcupados[k] === true);

    occupiedIds.forEach(id => {
      const res = reservations.find(r => r.reservedSeat.toString() === id.toString());
      if (res) {
        states[id] = 'APP'; // Ocupado por aplicación
      } else {
        states[id] = 'LOCAL'; // Venta física (bloqueado por conductor)
      }
    });
    return states;
  }, [availability.asientosOcupados, reservations]);

  // --- 🛒 Venta Física (Bloqueo/Liberación) ---
  const handlePhysicalToggle = async (seatId) => {
    if (updating || isPassenger) return;
    const currentState = seatStates[seatId];

    if (currentState === 'APP') {
      alert("⚠️ Este asiento está reservado por la App. No puede modificarse manualmente.");
      return;
    }

    const action = currentState === 'LOCAL' ? 'liberar' : 'bloquear';
    if (!window.confirm(`¿Deseas ${action} el asiento #${seatId} para venta física?`)) return;

    setUpdating(true);
    const dispRef = ref(db, `disponibilidadAsientos/${schedule.id}`);
    const today = new Date().toISOString().split('T')[0];

    try {
      await runTransaction(dispRef, (current) => {
        if (!current) return current;
        if (!current.asientosOcupados) current.asientosOcupados = {};

        const isCurrentlyLocal = current.asientosOcupados[seatId] === true;
        current.asientosOcupados[seatId] = !isCurrentlyLocal;
        current.asientosDisponibles = isCurrentlyLocal
          ? (current.asientosDisponibles || 0) + 1
          : Math.max(0, (current.asientosDisponibles || 0) - 1);

        return current;
      });

      // Si bloqueamos, registramos en estadísticas del conductor (Si el rol lo permite)
      if (action === 'bloquear' && role.type === 'DRIVER') {
        const statsRef = ref(db, `estadisticas/${role.uid}/${today}`);
        await runTransaction(statsRef, (s) => {
          if (!s) s = { ingresosDiarios: 0, reservasConfirmadas: 0, ultimaActualizacion: Date.now() };
          s.ingresosDiarios = (s.ingresosDiarios || 0) + routePrice;
          s.reservasConfirmadas = (s.reservasConfirmadas || 0) + 1;
          s.ultimaActualizacion = serverTimestamp();
          return s;
        });
      }
    } catch (err) {
      console.error("Error en venta física:", err);
    } finally {
      setUpdating(false);
    }
  };

  // --- 🎫 Reserva Pasajero ---
  const handlePassengerReserve = async () => {
    if (!selectedSeat || updating) return;
    setUpdating(true);

    const dispRef = ref(db, `disponibilidadAsientos/${schedule.id}`);
    try {
      const result = await runTransaction(dispRef, (current) => {
        if (current && current.asientosOcupados?.[selectedSeat]) return; // Ya se ocupó
        if (current) {
          if (!current.asientosOcupados) current.asientosOcupados = {};
          current.asientosOcupados[selectedSeat] = true;
          current.asientosDisponibles = Math.max(0, (current.asientosDisponibles || 0) - 1);
        }
        return current;
      });

      if (result.committed) {
        const resRef = push(ref(db, 'reservas'));
        const parts = schedule.ruta.split(/ -> | ➔ /);
        await set(resRef, {
          idReservation: resRef.key,
          userId: role.uid,
          scheduleId: schedule.id,
          driverId: schedule.conductorId || "",
          vehicleId: schedule.vehiculoId || "",
          reservedSeat: parseInt(selectedSeat),
          reservationStatus: 'Por confirmar',
          origin: parts[0] || "Nátaga",
          destination: parts[1] || "La Plata",
          departureTime: schedule.hora,
          price: routePrice,
          reservationDate: Date.now(),
          name: role?.name || "Pasajero Web",
          phone: role?.phone || ""
        });
        setSuccessReservation(true);
      }
    } catch (err) {
      alert("Error en reserva: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (successReservation) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#061426]/95 backdrop-blur-xl" />
        <div className="relative max-w-sm w-full bg-[#0A1F30] rounded-[3rem] p-10 text-center space-y-8 animate-in zoom-in-95 duration-500 border border-white/5 shadow-2xl">
           <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white mx-auto animate-bounce shadow-lg shadow-primary-500/20">
              <CheckCircle2 size={48} />
           </div>
           <div className="space-y-3">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">¡Reserva Enviada!</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Tu solicitud para el asiento <span className="text-primary-500 font-black">#{selectedSeat}</span> está en manos del conductor. Te notificaremos al confirmar.</p>
           </div>
           <Button onClick={onClose} variant="primary" size="full" className="rounded-2xl">Entendido</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#061426]/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#061426] rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] border border-white/5 animate-in slide-in-from-bottom-4 duration-500">

        {/* Header (Android Style) */}
        <div className="bg-primary-500 p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white shadow-inner">
               {isPassenger ? <Ticket size={24} /> : <Bus size={24} />}
            </div>
            <div className="text-white">
              <h3 className="text-xl font-black uppercase tracking-tight italic">
                {isPassenger ? 'Selecciona tu Asiento' : 'Gestión de Inventario'}
              </h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{schedule.ruta} • {schedule.hora}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors"><X size={28} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex flex-col md:flex-row gap-10">

          {/* BUS LAYOUT (Android Mirror) */}
          <div className="flex-1 space-y-8">
            <div className="bg-[#0A1F30] rounded-[3rem] p-10 border border-white/5 shadow-inner">
               <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Cabina del Vehículo</p>

               {loading ? (
                 <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-primary-500" size={40} /></div>
               ) : (
                 <div className="space-y-12">
                   {/* Cabina: [Driver] [1] [2] / [3] [4] [5] */}
                   <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-[#061426] shadow-lg shadow-amber-500/10">
                         <SteeringWheel size={32} />
                      </div>
                      <Seat seatId="1" state={seatStates["1"]} selected={selectedSeat === "1"} onClick={() => isPassenger ? setSelectedSeat("1") : handlePhysicalToggle("1")} />
                      <Seat seatId="2" state={seatStates["2"]} selected={selectedSeat === "2"} onClick={() => isPassenger ? setSelectedSeat("2") : handlePhysicalToggle("2")} />
                      <Seat seatId="3" state={seatStates["3"]} selected={selectedSeat === "3"} onClick={() => isPassenger ? setSelectedSeat("3") : handlePhysicalToggle("3")} />
                      <Seat seatId="4" state={seatStates["4"]} selected={selectedSeat === "4"} onClick={() => isPassenger ? setSelectedSeat("4") : handlePhysicalToggle("4")} />
                      <Seat seatId="5" state={seatStates["5"]} selected={selectedSeat === "5"} onClick={() => isPassenger ? setSelectedSeat("5") : handlePhysicalToggle("5")} />
                   </div>

                   <div className="w-24 h-px bg-white/5 mx-auto" />

                   <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Zona de Pasajeros</p>

                   {/* Zona Trasera Layout */}
                   <div className="grid grid-cols-5 gap-4 max-w-sm mx-auto">
                      <Seat seatId="6" state={seatStates["6"]} selected={selectedSeat === "6"} onClick={() => isPassenger ? setSelectedSeat("6") : handlePhysicalToggle("6")} />
                      <Seat seatId="7" state={seatStates["7"]} selected={selectedSeat === "7"} onClick={() => isPassenger ? setSelectedSeat("7") : handlePhysicalToggle("7")} />
                      <div className="col-span-1" /> {/* Pasillo */}
                      <Seat seatId="10" state={seatStates["10"]} selected={selectedSeat === "10"} onClick={() => isPassenger ? setSelectedSeat("10") : handlePhysicalToggle("10")} />
                      <Seat seatId="11" state={seatStates["11"]} selected={selectedSeat === "11"} onClick={() => isPassenger ? setSelectedSeat("11") : handlePhysicalToggle("11")} />

                      <Seat seatId="8" state={seatStates["8"]} selected={selectedSeat === "8"} onClick={() => isPassenger ? setSelectedSeat("8") : handlePhysicalToggle("8")} />
                      <Seat seatId="9" state={seatStates["9"]} selected={selectedSeat === "9"} onClick={() => isPassenger ? setSelectedSeat("9") : handlePhysicalToggle("9")} />
                      <div className="col-span-1" /> {/* Pasillo */}
                      <Seat seatId="12" state={seatStates["12"]} selected={selectedSeat === "12"} onClick={() => isPassenger ? setSelectedSeat("12") : handlePhysicalToggle("12")} />
                      <Seat seatId="13" state={seatStates["13"]} selected={selectedSeat === "13"} onClick={() => isPassenger ? setSelectedSeat("13") : handlePhysicalToggle("13")} />
                   </div>
                 </div>
               )}
            </div>

            {/* LEYENDA */}
            <div className="flex justify-center gap-6 bg-[#0A1F30] py-4 rounded-2xl border border-white/5">
               <Legend label="Libre" color="bg-[#061426] border-white/10" />
               <Legend label="App" color="bg-red-500" />
               <Legend label="Local" color="bg-primary-500" />
               {isPassenger && <Legend label="Tuyo" color="bg-green-500" />}
            </div>
          </div>

          {/* SIDE PANEL: INFO & ACCIONES */}
          <div className="w-full md:w-80 space-y-6">
             <div className="bg-[#0A1F30] p-8 rounded-[2rem] border border-white/5 space-y-6">
                <div className="flex items-center gap-3">
                   <Info className="text-primary-500" size={20} />
                   <h4 className="text-sm font-black text-white uppercase italic tracking-tight">Estado del Despacho</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-[#061426] p-4 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Disponibles</p>
                      <span className="text-2xl font-black text-white">{availability.asientosDisponibles}</span>
                   </div>
                   <div className="bg-[#061426] p-4 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Capacidad</p>
                      <span className="text-2xl font-black text-slate-400">{availability.totalAsientos || 13}</span>
                   </div>
                </div>

                {isPassenger ? (
                  <div className="space-y-6 pt-4 border-t border-white/5">
                    {selectedSeat ? (
                      <>
                        <div className="text-center">
                           <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Asiento Seleccionado</p>
                           <span className="text-5xl font-black text-white">#{selectedSeat}</span>
                        </div>
                        <div className="flex items-center justify-between text-white bg-[#061426] p-4 rounded-2xl">
                           <span className="text-xs font-bold opacity-60 uppercase">Valor:</span>
                           <span className="text-lg font-black text-primary-500">${routePrice.toLocaleString()}</span>
                        </div>
                        <Button
                          variant="primary"
                          size="full"
                          onClick={handlePassengerReserve}
                          isLoading={updating}
                          className="!bg-primary-500 !text-[#061426] !py-6"
                        >
                          Confirmar Reserva
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-6 opacity-30 italic text-slate-400 text-xs">
                        Toca un asiento libre para continuar con tu reserva.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                     <p className="text-xs font-bold text-slate-400 leading-relaxed">
                        Toca un asiento para marcarlo como <span className="text-primary-500">Venta Local</span> o para liberarlo si ya fue vendido físicamente.
                     </p>
                     <div className="p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10 flex items-start gap-3">
                        <AlertTriangle className="text-primary-500 shrink-0" size={14} />
                        <p className="text-[10px] text-primary-400 font-bold uppercase">Los asientos de la App están protegidos.</p>
                     </div>
                  </div>
                )}
             </div>

             <div className="p-6 bg-[#0A1F30] rounded-2xl border border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sincronización</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-bold text-green-500 uppercase">En Vivo</span>
                </div>
             </div>
          </div>
        </div>

        {!isPassenger && (
          <div className="p-6 border-t border-white/5 flex justify-end">
             <Button onClick={onClose} variant="ghost" className="text-slate-400">Cerrar Gestión</Button>
          </div>
        )}
      </div>
    </div>
  );
}

/** ⚛️ Molecule: Seat */
function Seat({ seatId, state, selected, onClick }) {
  const base = "w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg transition-all transform active:scale-90 relative overflow-hidden";

  const styles = {
    'AVAILABLE': "bg-[#061426] border-2 border-white/10 text-slate-500 hover:border-primary-500/50",
    'APP': "bg-red-500 text-white shadow-lg shadow-red-500/20 cursor-not-allowed",
    'LOCAL': "bg-primary-500 text-[#061426] shadow-lg shadow-primary-500/20",
    'SELECTED': "bg-green-500 text-white shadow-lg shadow-green-500/20 ring-4 ring-green-500/30 scale-105"
  };

  const currentState = selected ? 'SELECTED' : (state || 'AVAILABLE');

  return (
    <button onClick={onClick} className={`${base} ${styles[currentState]}`}>
      <span className="relative z-10">{seatId}</span>
      <Armchair size={40} className="absolute inset-0 m-auto opacity-10 scale-150 rotate-12" />
    </button>
  );
}

/** ⚛️ Atom: Legend Item */
function Legend({ label, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color} border border-white/10`} />
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
    </div>
  );
}
