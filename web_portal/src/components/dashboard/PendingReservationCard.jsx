import React from 'react';
import { PhoneCall, MapPin, Clock, Armchair, XCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

/**
 * ⚛️ Molecule: PendingReservationCard
 * Tarjeta para gestionar reservas entrantes (Mirror Android).
 */
export function PendingReservationCard({ res, onConfirm, onCancel, loading }) {
  const seat = res.reservedSeat !== undefined ? res.reservedSeat :
              (res.puestoReservado !== undefined ? res.puestoReservado : res.asientoReservado);
  const name = res.name || res.nombre || res.nombreUsuario || 'Usuario Ruta-Go';
  const phone = res.phone || res.telefono || '---';
  const route = res.ruta || `${res.origin || 'Nátaga'} ➔ ${res.destination || 'La Plata'}`;
  const date = res.departureTime || res.hora || '00:00';

  return (
    <div className="bg-[#0A1F30] p-6 rounded-[1.5rem] border border-white/5 relative group animate-pop">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-base font-black text-white uppercase max-w-[65%]">{name}</h4>
        <Badge variant="dark" className="!bg-[#061426] !text-white !border-white/10 !rounded-lg lowercase px-2">
          Por confirmar
        </Badge>
      </div>

      <div className="space-y-4 mb-6 text-left">
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
              <span className="text-xs font-bold text-slate-300">{date}</span>
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
