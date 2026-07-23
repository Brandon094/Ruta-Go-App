import React from 'react';
import { Clock, User, Milestone, Armchair, Tag, Ticket, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function ReservationHistoryCard({ res }) {
  const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
  const isConfirmed = status === 'confirmada' || status === 'confirmado' || status === 'completada';
  const seat = res.puestoReservado !== undefined ? res.puestoReservado : (res.reservedSeat !== undefined ? res.reservedSeat : res.asientoReservado);
  const date = res.fechaReserva || res.reservationDate || res.travelDate;
  const origin = res.origen || res.origin || 'La Plata';
  const destination = res.destino || res.destination || 'Nátaga';
  const passengerName = res.name || res.nombre || res.nombreUsuario || 'Pasajero Ruta-Go';
  const passengerPhone = res.phone || res.telefono || '---';
  const price = res.price || res.precio || 12000;

  const formatDate = (d) => {
    if (!d) return '-- --- ---- - --:--';
    const dateObj = new Date(d);
    return dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + ' - ' +
           dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="card-base bg-[#0A1F30] dark:bg-[#0A1F30] border-none rounded-[2.5rem] p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden group">

      {/* Time & Status Row */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3 text-orange-400">
            <Clock size={18} />
            <span className="text-xs font-black uppercase tracking-widest">{formatDate(date)}</span>
         </div>
         <Badge variant={isConfirmed ? 'success' : 'error'}>
           {res.estadoReserva || res.reservationStatus || 'Pendiente'}
         </Badge>
      </div>

      {/* Info Rows */}
      <div className="space-y-4">
         {/* Passenger */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500">
                  <User size={20} />
               </div>
               <span className="text-sm font-black text-white uppercase italic">{passengerName}</span>
            </div>
            <span className="text-[10px] font-bold text-white/40">{passengerPhone}</span>
         </div>

         {/* Route */}
         <div className="flex items-center gap-4">
            <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500">
               <Milestone size={20} />
            </div>
            <span className="text-sm font-black text-white uppercase italic">{origin} ➔ {destination}</span>
         </div>

         {/* Seat & Price */}
         <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500">
                  <Armchair size={20} />
               </div>
               <span className="text-lg font-black text-white">{seat !== -1 && seat !== undefined ? `A${seat}` : '---'}</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
               <Tag size={16} />
               <span className="text-lg font-black">$ {new Intl.NumberFormat('es-CO').format(price)} COP</span>
            </div>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-4">
         <button className="flex items-center justify-center gap-3 py-4 bg-transparent border-2 border-orange-500 text-orange-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-orange-500/10">
            <Ticket size={18} />
            Tiquete
         </button>
         <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            <MessageSquare size={18} />
            Chat
         </button>
      </div>

      <button className="w-full py-5 bg-primary-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/30 hover:bg-primary-600 transition-all active:scale-95">
         Calificar Viaje
      </button>

    </div>
  );
}
