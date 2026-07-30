import React, { useRef, useState } from 'react';
import { Share2, MessageSquare, MapPin, Clock, Armchair, Tag, User, Bus, Info, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { IconRow } from '../ui/IconRow';

/**
 * 🎟️ Component: TicketModal
 * UI Espejo 1:1 de la App Nativa para el tiquete digital (v1.6.1 Mirror & DRY)
 */
export function TicketModal({ reservation, role, drivers = [], onClose, onChat }) {
  const ticketRef = useRef(null);
  const [sharing, setSharing] = useState(false);

  if (!reservation) return null;

  // ... (Resolución de Nombres logic remains the same)
  const driverData = drivers.find(d => d.id === reservation.driverId || d.id === reservation.conductorId);
  const resolvedDriverName = driverData?.nombre || reservation.driver || 'Conductor';
  const resolvedPassengerName = reservation.name || reservation.nombre || 'Pasajero';

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

  // --- 📸 Lógica de Compartir (Capture & Web Share) ---
  const handleShareTicket = async () => {
    if (!ticketRef.current || sharing) return;

    setSharing(true);
    try {
      // 1. Capturar el componente como imagen
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#061426', // Color de fondo del ecosistema para el recorte
        scale: 2, // Mejor calidad
        logging: false,
        useCORS: true,
        borderRadius: 32
      });

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], `tiquete_rutago_${reservation.idReservation?.substring(0, 8)}.png`, { type: 'image/png' });

      // 2. Intentar usar Web Share API si el navegador lo permite con archivos
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mi Tiquete Ruta-Go',
          text: `Reserva para ${origin} ➔ ${destination} (${reservation.departureTime || formatTime(date)})`
        });
      } else {
        // 3. Fallback: Descarga directa
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `tiquete_rutago_${reservation.idReservation?.substring(0, 8)}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Error al compartir tiquete:", error);
      alert("No se pudo generar la imagen del tiquete.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} showClose={false} className="!bg-transparent !border-none !shadow-none">
      <div className="p-0 space-y-6">
        {/* TICKET CARD MAIN */}
        <div ref={ticketRef} className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">

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
                   <IconRow icon={User} variant="ghost" className="text-slate-600">
                      <p className="text-xs font-medium truncate"><span className="font-bold opacity-60 mr-1">Pasajero:</span> {resolvedPassengerName}</p>
                   </IconRow>
                   <IconRow icon={Info} variant="ghost" className="text-slate-600">
                      <p className="text-xs font-medium truncate"><span className="font-bold opacity-60 mr-1">Conductor:</span> {resolvedDriverName}</p>
                   </IconRow>
                   <IconRow icon={Bus} variant="ghost" className="text-slate-600">
                      <p className="text-xs font-medium truncate"><span className="font-bold opacity-60 mr-1">Vehículo:</span> {`${reservation.plate || reservation.vehicleId || '---'} (${reservation.model || reservation.vehicleModel || 'N/A'})`}</p>
                   </IconRow>
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
           {isConfirmed && (
             <Button
                variant="primary"
                size="md"
                className="col-span-2 !bg-[#0A1F30] border border-white/10 hover:!bg-white/5 !rounded-2xl"
                icon={MessageSquare}
                onClick={onChat}
             >
                Chat
             </Button>
           )}
           <Button
              variant="ghost"
              size="md"
              className={`${isConfirmed ? 'col-span-3' : 'col-span-5'} !bg-white/5 hover:!bg-white/10 text-white !rounded-2xl border border-white/5`}
              icon={sharing ? Loader2 : Share2}
              isLoading={sharing}
              onClick={handleShareTicket}
           >
              {sharing ? 'Procesando...' : 'Compartir Tiquete'}
           </Button>
        </div>
      </div>
    </Modal>
  );
}
