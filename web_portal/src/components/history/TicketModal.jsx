import React from 'react';
import { X, Share2, MessageSquare, MapPin, Clock, Armchair, Tag, User, Bus, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

/**
 * 🎟️ Component: TicketModal
 * UI Espejo 1:1 de la App Nativa para el tiquete digital (v1.8.0 Mirror)
 */
export function TicketModal({ reservation, onClose }) {
  if (!reservation) return null;

  const status = (reservation.estadoReserva || reservation.reservationStatus || "").toLowerCase();
  const isConfirmed = status === 'confirmada' || status === 'confirmado' || status === 'completada' || status === 'confirmed';
  const isCanceled = status === 'cancelada' || status === 'canceled';

  const seat = reservation.puestoReservado !== undefined ? reservation.puestoReservado : (reservation.reservedSeat !== undefined ? reservation.reservedSeat : reservation.asientoReservado);
  const date = reservation.fechaReserva || reservation.reservationDate || reservation.travelDate;

  // Mapeo robusto de ruta
  const origin = reservation.origen || reservation.origin || reservation.ruta?.split('➔')[0]?.trim() || reservation.ruta?.split('->')[0]?.trim() || '---';
  const destination = reservation.destino || reservation.destination || reservation.ruta?.split('➔')[1]?.trim() || reservation.ruta?.split('->')[1]?.trim() || '---';

  const formatDate = (d) => {
    if (!d) return '-- --- ----';
    return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (d) => {
    if (!d) return '--:--';
    return new Date(d).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#061426]/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0A1F30] rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] border border-white/5 animate-in zoom-in-95 duration-300">

        {/* Top Handle / Close for Mobile */}
        <div className="flex justify-center pt-4 pb-2 lg:hidden">
           <div className="w-12 h-1.5 bg-white/10 rounded-full" />
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TICKET CARD MAIN */}
          <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">

             {/* HEADER NARANJA */}
             <div className="bg-primary-500 p-8 flex flex-col items-center gap-4 text-white">
                <div className="w-20 h-20 bg-secondary-900 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                   <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-10 h-10 object-contain" />
                </div>
                <div className="text-center">
                   <h3 className="text-2xl font-black uppercase tracking-tighter italic">E-Ticket</h3>
                   <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em] mb-3">Comprobante de viaje</p>
                   <Badge variant={isConfirmed ? 'success' : isCanceled ? 'error' : 'warning'} className="!bg-secondary-900/40 !text-white !border-white/20 !px-6 !py-1.5 shadow-xl">
                      {reservation.estadoReserva || reservation.reservationStatus || 'Pendiente'}
                   </Badge>
                </div>
             </div>

             {/* TICKET BODY */}
             <div className="p-8 space-y-6 bg-white text-secondary-900">

                {/* Route Section */}
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trayecto</p>
                   <h4 className="text-xl font-black uppercase italic leading-tight">{origin} ➔ {destination}</h4>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Grid Info */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</p>
                      <p className="text-sm font-black uppercase">{formatDate(date)}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hora Salida</p>
                      <p className="text-sm font-black uppercase">{reservation.departureTime || formatTime(date)}</p>
                      <p className="text-[9px] font-bold text-slate-400 italic">Est.: 60 min</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asiento</p>
                      <p className="text-3xl font-black text-primary-500 italic leading-none">A{seat}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Pagado</p>
                      <p className="text-xl font-black uppercase italic leading-none">$ {new Intl.NumberFormat('es-CO').format(reservation.price || 12000)}</p>
                   </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Detailed Info */}
                <div className="space-y-3 text-left">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Información del Viaje</p>
                   <DetailRow icon={User} label="Pasajero" value={reservation.name || '---'} />
                   <DetailRow icon={Info} label="Conductor" value={reservation.driver || '---'} />
                   <DetailRow icon={Bus} label="Vehículo" value={`${reservation.plate || reservation.vehicleId || '---'} (${reservation.model || reservation.vehicleModel || 'N/A'})`} />
                </div>
             </div>

             {/* DOTTED DIVIDER */}
             <div className="relative h-6 bg-white overflow-hidden flex items-center">
                <div className="absolute -left-3 w-6 h-6 bg-[#0A1F30] rounded-full shadow-inner" />
                <div className="flex-1 border-t-4 border-dotted border-slate-100 mx-4" />
                <div className="absolute -right-3 w-6 h-6 bg-[#0A1F30] rounded-full shadow-inner" />
             </div>

             {/* TICKET ID FOOTER */}
             <div className="bg-slate-50 p-6 flex flex-col items-center gap-1 text-slate-400">
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">ID de Transacción</span>
                <span className="text-[10px] font-bold font-mono uppercase opacity-60">#{reservation.idReservation?.substring(0, 13).toUpperCase() || '---'}</span>
             </div>
          </div>

          {/* ACTIONS FOOTER (Screenshot Mirror) */}
          <div className="grid grid-cols-5 gap-3">
             <Button
                variant="primary"
                size="md"
                className="col-span-2 !bg-[#0A1F30] border border-white/10 hover:!bg-white/5 !rounded-2xl"
                icon={MessageSquare}
                onClick={() => alert("Chat en desarrollo")}
             >
                Chat
             </Button>
             <Button
                variant="ghost"
                size="md"
                className="col-span-3 !bg-white/5 hover:!bg-white/10 text-white !rounded-2xl border border-white/5"
                icon={Share2}
                onClick={() => alert("Compartir en desarrollo")}
             >
                Compartir Tiquete
             </Button>
          </div>
        </div>

        {/* Close Button Desktop */}
        <button
          onClick={onClose}
          className="absolute -top-12 -right-12 hidden lg:flex w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-all shadow-xl"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-slate-600">
       <Icon size={14} className="text-primary-500 shrink-0" />
       <p className="text-xs font-medium truncate">
          <span className="font-bold opacity-60 mr-1">{label}:</span> {value}
       </p>
    </div>
  );
}
