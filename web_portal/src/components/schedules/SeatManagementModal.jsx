import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, UserPlus, Info, Bus, Ticket, User } from 'lucide-react';
import { ref, onValue, runTransaction, set, push } from "firebase/database";
import { db } from '../../firebase';

/**
 * 💺 Componente: SeatManagementModal
 * Soporta dos modos:
 * 1. DRIVER/ADMIN: Gestión total (Venta física, liberación).
 * 2. PASSENGER: Selección y creación de reserva oficial.
 */
export function SeatManagementModal({ schedule, onClose, role }) {
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState({});
  const [updating, setUpdating] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [successReservation, setSuccessReservation] = useState(false);

  const isPassenger = role?.type === 'PASSENGER';

  useEffect(() => {
    if (!schedule?.id) return;

    const seatRef = ref(db, `disponibilidadAsientos/${schedule.id}/asientosOcupados`);
    const unsub = onValue(seatRef, (snap) => {
      if (snap.exists()) setSeats(snap.val());
      else setSeats({});
      setLoading(false);
    });

    return () => unsub();
  }, [schedule]);

  // --- LÓGICA DE CONDUCTOR (Venta Física) ---
  const togglePhysicalSeat = async (seatId) => {
    if (updating) return;
    setUpdating(true);

    const isOccupied = seats[seatId] === true;
    const seatStatusRef = ref(db, `disponibilidadAsientos/${schedule.id}`);

    try {
      await runTransaction(seatStatusRef, (currentData) => {
        if (currentData) {
          if (!currentData.asientosOcupados) currentData.asientosOcupados = {};
          const newStatus = !isOccupied;
          currentData.asientosOcupados[seatId] = newStatus;
          const currentAvailable = currentData.asientosDisponibles || 0;
          currentData.asientosDisponibles = newStatus
            ? Math.max(0, currentAvailable - 1)
            : currentAvailable + 1;
        }
        return currentData;
      });
    } catch (err) {
      console.error("Error toggling seat:", err);
    } finally {
      setUpdating(false);
    }
  };

  // --- LÓGICA DE PASAJERO (Reserva Oficial) ---
  const handlePassengerReservation = async () => {
    if (!selectedSeat || updating) return;
    setUpdating(true);

    const seatStatusRef = ref(db, `disponibilidadAsientos/${schedule.id}`);

    try {
      const result = await runTransaction(seatStatusRef, (currentData) => {
        if (currentData) {
          if (!currentData.asientosOcupados) currentData.asientosOcupados = {};

          // Doble verificación: ¿Alguien lo ganó mientras yo pensaba?
          if (currentData.asientosOcupados[selectedSeat]) return; // Abortar

          // Marcar ocupado
          currentData.asientosOcupados[selectedSeat] = true;
          currentData.asientosDisponibles = Math.max(0, (currentData.asientosDisponibles || 0) - 1);
        }
        return currentData;
      });

      if (result.committed) {
        // Crear el registro oficial en /reservas
        const resRef = push(ref(db, 'reservas'));
        await set(resRef, {
          id: resRef.key,
          usuarioId: role.uid,
          conductorId: schedule.conductorId || "",
          vehiculoId: schedule.vehiculoId || "",
          asientoReservado: selectedSeat,
          estadoReserva: 'Confirmada',
          precio: 12000,
          reservationDate: Date.now(),
          travelDate: Date.now(), // Para simplificar demo
          origen: schedule.ruta.split(' -> ')[0],
          destino: schedule.ruta.split(' -> ')[1],
          nombreUsuario: role?.name || "Pasajero Web"
        });
        setSuccessReservation(true);
      }
    } catch (err) {
      console.error("Error en reserva pasajero:", err);
    } finally {
      setUpdating(false);
    }
  };

  const seatGrid = Array.from({ length: 16 }, (_, i) => (i + 1).toString());

  if (successReservation) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-secondary-900/90 backdrop-blur-xl" />
        <div className="relative max-w-sm w-full bg-white rounded-[3rem] p-10 text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce">
              <CheckCircle2 size={40} />
           </div>
           <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">¡Reserva Exitosa!</h2>
              <p className="text-slate-500 text-sm font-medium">Tu asiento #{selectedSeat} ha sido bloqueado. Presenta tu tiquete digital al abordar.</p>
           </div>
           <button onClick={onClose} className="w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs">
              Ver mis viajes
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
      <div className="absolute inset-0 bg-secondary-900/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${isPassenger ? 'bg-blue-600 shadow-blue-500/20' : 'bg-primary-500 shadow-primary-500/20'}`}>
               {isPassenger ? <Ticket size={24} /> : <Bus size={24} />}
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                {isPassenger ? 'Selecciona tu Asiento' : 'Venta Física de Pasajes'}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{schedule.hora} • {schedule.ruta}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Bus Layout */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Esquema del Bus</h4>
                 <div className="flex gap-4">
                    <Legend item="Libre" color="bg-green-100 border-green-200" />
                    <Legend item="Ocupado" color="bg-orange-500 border-orange-600" />
                 </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative">
                {loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary-500" size={32} />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {/* Volante */}
                    <div className="col-start-4 bg-slate-200/50 rounded-xl h-10 flex items-center justify-center text-slate-400 mb-4">
                       <div className="w-6 h-6 rounded-full border-4 border-slate-300"></div>
                    </div>

                    {seatGrid.map(id => {
                      const isOccupied = seats[id] === true;
                      const isSelected = selectedSeat === id;

                      return (
                        <button
                          key={id}
                          disabled={updating || (isPassenger && isOccupied)}
                          onClick={() => isPassenger ? setSelectedSeat(id) : togglePhysicalSeat(id)}
                          className={`
                            h-12 rounded-xl border-b-4 font-black text-sm transition-all transform active:scale-90
                            ${isOccupied
                              ? 'bg-primary-500 border-orange-700 text-white shadow-lg'
                              : isSelected
                                ? 'bg-blue-600 border-blue-800 text-white shadow-xl scale-105'
                                : 'bg-white border-slate-200 text-slate-400 hover:border-green-400 hover:text-green-500'}
                          `}
                        >
                          {id}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Instruction / Confirmation */}
            <div className="space-y-6">
              {isPassenger ? (
                <div className="card-navy rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                     <User className="text-primary-500" size={20} />
                     <h4 className="font-black uppercase text-sm tracking-tight text-white">Tu Selección</h4>
                  </div>

                  {selectedSeat ? (
                    <div className="space-y-6">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                         <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Asiento Seleccionado</p>
                         <p className="text-5xl font-black text-white mt-2">#{selectedSeat}</p>
                      </div>
                      <div className="flex items-center justify-between text-white">
                         <span className="text-xs font-bold text-white/40 uppercase">Valor Pasaje:</span>
                         <span className="text-lg font-black text-primary-500">$ 12.000</span>
                      </div>
                      <button
                        onClick={handlePassengerReservation}
                        disabled={updating}
                        className="w-full py-5 btn-primary rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
                      >
                        {updating ? <Loader2 className="animate-spin" /> : "Confirmar Reserva"}
                      </button>
                    </div>
                  ) : (
                    <p className="text-white/30 text-xs italic text-center py-10">Toca un asiento disponible para continuar.</p>
                  )}
                </div>
              ) : (
                <div className="bg-secondary-900 rounded-[2.5rem] p-8 text-white space-y-4">
                  <div className="flex items-center gap-3">
                     <UserPlus className="text-primary-500" size={20} />
                     <h4 className="font-black uppercase text-sm tracking-tight">Venta Manual</h4>
                  </div>
                  <ul className="space-y-3">
                    <ListItem text="Toca para vender o liberar cupos." />
                    <ListItem text="Sincronización instantánea con la App." />
                  </ul>
                </div>
              )}

              <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                <Info className="text-blue-500 shrink-0" size={20} />
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  {isPassenger
                    ? "Al confirmar, tu reserva será visible para el conductor y se generará tu tiquete digital."
                    : "Asegúrate de recibir el pago antes de marcar el asiento como vendido."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer for non-passengers */}
        {!isPassenger && (
          <div className="p-8 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/50">
            <button onClick={onClose} className="px-10 py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs">
              Finalizar Gestión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Legend({ item, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded ${color} border`}></div>
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item}</span>
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li className="flex gap-3 text-xs text-white/60 leading-relaxed font-medium">
      <CheckCircle2 className="text-primary-500 shrink-0" size={14} />
      {text}
    </li>
  );
}
