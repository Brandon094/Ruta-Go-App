import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, UserPlus, Info, Bus } from 'lucide-react';
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from '../../firebase';

export function SeatManagementModal({ schedule, onClose }) {
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!schedule?.id) return;

    const seatRef = ref(db, `disponibilidadAsientos/${schedule.id}/asientosOcupados`);
    const unsub = onValue(seatRef, (snap) => {
      if (snap.exists()) {
        setSeats(snap.val());
      } else {
        setSeats({});
      }
      setLoading(false);
    });

    return () => unsub();
  }, [schedule]);

  const toggleSeat = async (seatId) => {
    if (updating) return;
    setUpdating(true);

    const isOccupied = seats[seatId] === true;
    const seatStatusRef = ref(db, `disponibilidadAsientos/${schedule.id}`);

    try {
      await runTransaction(seatStatusRef, (currentData) => {
        if (currentData) {
          if (!currentData.asientosOcupados) currentData.asientosOcupados = {};

          // Cambiar estado
          const newStatus = !isOccupied;
          currentData.asientosOcupados[seatId] = newStatus;

          // Actualizar contador
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

  // Generamos una grilla de 16 asientos (estándar de la App)
  const seatGrid = Array.from({ length: 16 }, (_, i) => (i + 1).toString());

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-secondary-900/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
               <Bus size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Venta Física de Pasajes</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{schedule.hora} • {schedule.ruta}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bus Layout */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Mapa de Asientos</h4>
                 <div className="flex gap-4">
                    <Legend item="Libre" color="bg-green-100 border-green-200" />
                    <Legend item="Vendido" color="bg-orange-500 border-orange-600" />
                 </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative">
                {loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary-500" size={32} />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {/* El volante (Fila 0) */}
                    <div className="col-start-4 bg-slate-200/50 rounded-xl h-10 flex items-center justify-center text-slate-400">
                       <div className="w-6 h-6 rounded-full border-4 border-slate-300"></div>
                    </div>

                    {seatGrid.map(id => (
                      <button
                        key={id}
                        disabled={updating}
                        onClick={() => toggleSeat(id)}
                        className={`
                          h-12 rounded-xl border-b-4 font-black text-sm transition-all transform active:scale-90
                          ${seats[id] === true
                            ? 'bg-primary-500 border-orange-700 text-white shadow-lg shadow-primary-500/20'
                            : 'bg-white border-slate-200 text-slate-400 hover:border-green-400 hover:text-green-500'}
                        `}
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              <div className="bg-secondary-900 rounded-[2.5rem] p-8 text-white space-y-4">
                <div className="flex items-center gap-3">
                   <UserPlus className="text-primary-500" size={20} />
                   <h4 className="font-black uppercase text-sm tracking-tight">Instrucciones</h4>
                </div>
                <ul className="space-y-3">
                  <ListItem text="Toca un número para marcar el asiento como ocupado (Venta de calle)." />
                  <ListItem text="Vuelve a tocar para liberarlo si el pasajero cancela." />
                  <ListItem text="Los cambios son instantáneos para los pasajeros en la App." />
                </ul>
              </div>

              <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                <Info className="text-amber-500 shrink-0" size={20} />
                <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                  <strong>IMPORTANTE:</strong> Asegúrate de cobrar el pasaje antes de marcar el asiento. Esta acción actualiza el inventario global de Ruta-Go.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Finalizar Gestión
          </button>
        </div>
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
