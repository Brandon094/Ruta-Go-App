import React, { useState } from 'react';
import { Clock, User, MapPin, Armchair, Tag, Ticket, MessageSquare, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { IconRow } from '../ui/IconRow';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * 🎫 Organism: ReservationHistoryCard
 * UI Espejo 1:1 de la App Nativa para el historial con diseño expansible (v1.7.6)
 */
export function ReservationHistoryCard({ res, role, drivers = [], onViewTicket, onRate, onChat }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = (res.status || res.estadoReserva || res.reservationStatus || "").toLowerCase();
  const isConfirmed = status === 'confirmada' || status === 'confirmado' || status === 'completada' || status === 'confirmed';
  const isCanceled = status === 'cancelada' || status === 'canceled';
  const isRated = res.rated || res.calificada || res.isRated;

  const seat = res.reservedSeat !== undefined ? res.reservedSeat : (res.puestoReservado !== undefined ? res.puestoReservado : res.asientoReservado);
  const date = res.reservationDate || res.fechaReserva || res.travelDate;

  // Mapeo robusto de ruta
  const origin = res.origin || res.origen || res.ruta?.split('➔')[0]?.trim() || res.ruta?.split('->')[0]?.trim() || '---';
  const destination = res.destination || res.destino || res.ruta?.split('➔')[1]?.trim() || res.ruta?.split('->')[1]?.trim() || '---';

  const isPassengerUser = role?.uid === (res.userId || res.usuarioId);
  const isDriverUser = role?.uid === (res.driverId || res.conductorId);
  const canChat = isConfirmed && (isPassengerUser || isDriverUser);

  const isPassenger = role?.type === 'PASSENGER';

  // --- 🧠 Resolución Dinámica de Identidad ---
  const driverData = drivers.find(d => d.id === (res.driverId || res.conductorId));
  const resolvedDriverName = res.driverName || driverData?.name || driverData?.nombre || res.driver || "Conductor";
  const resolvedPassengerName = res.passengerName || res.name || res.nombre || res.nombreUsuario || "Pasajero";

  const personName = isPassenger ? resolvedDriverName : resolvedPassengerName;
  const personPhone = isPassenger
    ? (driverData?.phone || driverData?.telefono || res.phoneC || "---")
    : (res.passengerPhone || res.phone || res.telefono || "---");
  const price = res.price || res.precio || 12000;
  const statusLabel = isConfirmed ? 'Confirmada' : isCanceled ? 'Cancelada' : 'Pendiente';

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-[#0A1F30] rounded-[2.5rem] p-6 lg:p-8 space-y-6 border border-white/5 shadow-2xl relative overflow-hidden transition-all duration-300 group animate-pop cursor-pointer hover:ring-2 ring-primary-500/20"
    >

      {/* Header Row: Date & Badge (Siempre Visible) */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3 text-primary-500">
            <Clock size={18} />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black uppercase tracking-widest">
                {date ? new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : '-- ---'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">
                  {date ? new Date(date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}
                </span>
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
           <Badge variant={isConfirmed ? 'success' : isCanceled ? 'error' : 'warning'} className="!rounded-xl px-4 py-1.5 lowercase first-letter:uppercase">
             {statusLabel}
           </Badge>
         </div>
      </div>

      {/* Identidad y Ruta (Siempre Visible de forma compacta) */}
      <div className="flex flex-col gap-2 text-left">
        <div className="flex items-center gap-3">
          <User size={14} className="text-slate-500" />
          <span className="text-sm font-black text-white uppercase italic truncate">{personName}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={14} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-300 uppercase italic truncate">{origin} ➔ {destination}</span>
        </div>
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300 border-t border-white/5 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-left">
               <div className="p-2.5 bg-primary-500/10 rounded-xl text-primary-500">
                  <Armchair size={20} />
               </div>
               <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Asiento</span>
                 <span className="text-lg font-black text-white leading-none">{seat !== -1 && seat !== undefined ? `A${seat}` : '---'}</span>
               </div>
            </div>
            <div className="flex items-center gap-4 text-right">
               <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valor Pagado</span>
                 <span className="text-lg text-primary-500 font-black tracking-tighter leading-none">{FormatUtils.formatPrice(price)}</span>
               </div>
               <div className="p-2.5 bg-primary-500/10 rounded-xl text-primary-500">
                  <Tag size={20} />
               </div>
            </div>
          </div>

          <IconRow icon={User} rightContent={personPhone} className="!bg-white/5 !p-4 !rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Contacto</span>
            <span className="text-xs font-black text-white uppercase">{personName}</span>
          </IconRow>

          {/* Botones de Acción */}
          <div className={`grid ${canChat ? 'grid-cols-2' : 'grid-cols-1'} gap-4 pt-2`}>
             <Button
               variant="ghost"
               size="full"
               className="!border-2 !border-primary-500 !text-primary-500 !rounded-2xl !py-4 hover:!bg-primary-500 hover:!text-[#061426]"
               icon={Ticket}
               onClick={(e) => { e.stopPropagation(); onViewTicket(); }}
             >
                Tiquete
             </Button>

             {canChat && (
               <Button
                 variant="primary"
                 size="full"
                 className="!rounded-2xl !py-4 shadow-lg shadow-orange-500/10"
                 icon={MessageSquare}
                 onClick={(e) => { e.stopPropagation(); onChat(); }}
               >
                  Chat
               </Button>
             )}
          </div>

          {isConfirmed && isPassenger && !isRated && (
            <Button
              variant="primary"
              size="full"
              className="!rounded-[1.8rem] !py-5 tracking-[0.2em] shadow-2xl shadow-primary-500/40"
              onClick={(e) => { e.stopPropagation(); onRate(); }}
            >
               Calificar Viaje
            </Button>
          )}

          {isRated && (
            <div className="flex items-center justify-center gap-2 py-3 bg-white/5 rounded-2xl border border-white/5">
               <Star className="text-amber-400 fill-amber-400" size={14} />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Viaje Calificado</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
