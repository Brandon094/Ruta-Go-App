import React from 'react';
import { Clock, User, MapPin, Armchair, Tag, Ticket, MessageSquare, Star } from 'lucide-react';
import { Badge } from '../ui/Badge';

/**
 * 🎫 Component: ReservationHistoryCard
 * UI Espejo 1:1 de la App Nativa para el historial (v1.7.4 Mirror)
 */
export function ReservationHistoryCard({ res, role, onViewTicket }) {
  const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
  const isConfirmed = status === 'confirmada' || status === 'confirmado' || status === 'completada' || status === 'confirmed';
  const isCanceled = status === 'cancelada' || status === 'canceled';
  const isRated = res.rated || res.calificada;

  const seat = res.puestoReservado !== undefined ? res.puestoReservado : (res.reservedSeat !== undefined ? res.reservedSeat : res.asientoReservado);
  const date = res.fechaReserva || res.reservationDate || res.travelDate;

  // Mapeo robusto de ruta
  const origin = res.origen || res.origin || res.ruta?.split('➔')[0]?.trim() || res.ruta?.split('->')[0]?.trim() || '---';
  const destination = res.destino || res.destination || res.ruta?.split('➔')[1]?.trim() || res.ruta?.split('->')[1]?.trim() || '---';

  const isPassenger = role?.type === 'PASSENGER';
  const personName = isPassenger ? (res.driver || "Conductor") : (res.name || res.nombre || "Pasajero");
  const personPhone = isPassenger ? (res.phoneC || "---") : (res.phone || res.telefono || "---");
  const price = res.price || res.precio || 12000;

  const formatDate = (d) => {
    if (!d) return '-- --- ---- - --:--';
    const dateObj = new Date(d);
    return dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + ' - ' +
           dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="bg-[#0A1F30] rounded-[2.5rem] p-6 lg:p-8 space-y-6 border border-white/5 shadow-2xl relative overflow-hidden transition-all duration-300 group">

      {/* Header Row: Date & Badge */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3 text-primary-500">
            <Clock size={18} />
            <span className="text-xs font-black uppercase tracking-widest">{formatDate(date)}</span>
         </div>
         <Badge variant={isConfirmed ? 'success' : isCanceled ? 'error' : 'warning'} className="!rounded-xl px-4 py-1.5 lowercase first-letter:uppercase">
           {res.estadoReserva || res.reservationStatus || 'Pendiente'}
         </Badge>
      </div>

      {/* Info Body */}
      <div className="space-y-4">
         {/* Name Row */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-left">
               <div className="p-2.5 bg-primary-500/10 rounded-xl text-primary-500">
                  <User size={20} />
               </div>
               <span className="text-sm font-black text-white uppercase italic">{personName}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{personPhone}</span>
         </div>

         {/* Route Row */}
         <div className="flex items-center gap-4 text-left">
            <div className="p-2.5 bg-primary-500/10 rounded-xl text-primary-500">
               <MapPin size={20} />
            </div>
            <span className="text-sm font-black text-white uppercase italic">{origin} ➔ {destination}</span>
         </div>

         {/* Seat & Price Row */}
         <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-left">
               <div className="p-2.5 bg-primary-500/10 rounded-xl text-primary-500">
                  <Armchair size={20} />
               </div>
               <span className="text-lg font-black text-white">{seat !== -1 && seat !== undefined ? `A${seat}` : '---'}</span>
            </div>
            <div className="flex items-center gap-2 text-primary-500 font-black">
               <Tag size={16} />
               <span className="text-lg tracking-tighter">$ {new Intl.NumberFormat('es-CO').format(price)} COP</span>
            </div>
         </div>
      </div>

      {/* Action Buttons Grid */}
      <div className={`grid ${isConfirmed ? 'grid-cols-2' : 'grid-cols-1'} gap-4 pt-2`}>
         <button
           onClick={onViewTicket}
           className="flex items-center justify-center gap-3 py-4 bg-transparent border-2 border-primary-500 text-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-500 hover:text-[#061426] transition-all shadow-lg active:scale-95"
         >
            <Ticket size={18} />
            Tiquete
         </button>

         {isConfirmed && (
           <button className="flex items-center justify-center gap-3 py-4 bg-primary-500 text-[#061426] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              <MessageSquare size={18} />
              Chat
           </button>
         )}
      </div>

      {/* Calificar Button (Only for Confirmed + Passenger + Not Rated) */}
      {isConfirmed && isPassenger && !isRated && (
        <button
          onClick={() => alert("Módulo de Calificación en desarrollo")}
          className="w-full py-5 bg-primary-500 text-[#061426] rounded-[1.8rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/40 hover:bg-primary-600 transition-all active:scale-95"
        >
           Calificar Viaje
        </button>
      )}

      {/* Rated Info (Optional: if already rated, show stars) */}
      {isRated && (
        <div className="flex items-center justify-center gap-2 py-3 bg-white/5 rounded-2xl border border-white/5">
           <Star className="text-amber-400 fill-amber-400" size={14} />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Viaje Calificado</span>
        </div>
      )}

    </div>
  );
}
