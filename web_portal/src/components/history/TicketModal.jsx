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
  const driverData = drivers.find(d => d.id === (reservation.driverId || reservation.conductorId));
  const resolvedDriverName = reservation.driverName || driverData?.name || driverData?.nombre || reservation.driver || 'Conductor';
  const resolvedPassengerName = reservation.passengerName || reservation.name || reservation.nombre || 'Pasajero';

  const status = (reservation.status || reservation.estadoReserva || reservation.reservationStatus || "").toLowerCase();
  const isConfirmed = status === 'confirmada' || status === 'confirmado' || status === 'completada' || status === 'confirmed';
  const isCanceled = status === 'cancelada' || status === 'canceled';
  const statusLabel = isConfirmed ? 'Confirmada' : isCanceled ? 'Cancelada' : 'Pendiente';

  const isPassengerUser = role?.uid === (reservation.userId || reservation.usuarioId);
  const isDriverUser = role?.uid === (reservation.driverId || reservation.conductorId);
  const canChat = isConfirmed && (isPassengerUser || isDriverUser);

  const seat = reservation.reservedSeat !== undefined ? reservation.reservedSeat : (reservation.puestoReservado !== undefined ? reservation.puestoReservado : reservation.asientoReservado);
  const date = reservation.reservationDate || reservation.fechaReserva || reservation.travelDate;

  // Mapeo robusto de ruta
  const origin = (reservation.origin || reservation.origen || reservation.ruta?.split('➔')[0]?.trim() || reservation.ruta?.split('->')[0]?.trim() || '---').toUpperCase();
  const destination = (reservation.destination || reservation.destino || reservation.ruta?.split('➔')[1]?.trim() || reservation.ruta?.split('->')[1]?.trim() || '---').toUpperCase();

  const plate = reservation.vehiclePlate || reservation.plate || reservation.vehicleId || reservation.vehiculoId || driverData?.vehiclePlate || '---';
  const model = reservation.vehicleModel || reservation.model || reservation.modelo || 'Vehículo';
  const ticketId = reservation.id || reservation.idReservation || reservation.idReserva || '---';

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
      const isDarkMode = document.documentElement.classList.contains('dark');

      // 1. Capturar el componente como imagen (Optimizado para modo actual)
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: isDarkMode ? '#061426' : '#FFFFFF',
        scale: 3, // Mayor resolución para WhatsApp
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('ticket-capture-area');
          if (el) el.style.borderRadius = '0px';
        }
      });

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
      const file = new File([blob], `tiquete_rutago_${reservation.idReservation?.substring(0, 8)}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mi Tiquete Ruta-Go',
          text: `Tiquete Digital: ${origin} ➔ ${destination}`
        });
      } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0);
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

        {/* AREA DE CAPTURA (Estilo App Nativa Dinámico) */}
        <div
          ref={ticketRef}
          id="ticket-capture-area"
          className="bg-white dark:bg-[#061426] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-white/5"
          style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
        >

           {/* HEADER NARANJA NATIVO */}
           <div className="bg-primary-500 p-10 flex flex-col items-center gap-4 text-white relative">
              <div className="w-24 h-24 bg-[#061426] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10">
                 <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-12 h-12 object-contain" />
              </div>
              <div className="text-center space-y-1">
                 <h3 className="text-3xl font-black uppercase tracking-widest italic leading-none">Ruta-Go</h3>
                 <div className="pt-2 flex justify-center">
                    <span className="inline-block bg-secondary-900/90 text-white text-[10px] font-black px-6 py-2 rounded-full border border-white/10 uppercase tracking-widest shadow-xl whitespace-nowrap">
                      {reservation.estadoReserva || reservation.reservationStatus || 'Confirmada'}
                    </span>
                 </div>
              </div>
           </div>

           {/* TICKET BODY (DINÁMICO) */}
           <div className="p-10 space-y-8 bg-white dark:bg-[#061426] text-slate-900 dark:text-white">

              {/* Route Section */}
              <div className="space-y-1.5">
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Trayecto</p>
                 <h4 className="text-2xl font-black uppercase italic leading-tight tracking-tighter text-slate-900 dark:text-white">{origin} ➔ {destination}</h4>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5" />

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Fecha</p>
                    <p className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">{formatDate(date)}</p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Hora</p>
                    <p className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">{reservation.departureTime || formatTime(date)}</p>
                    <p className="text-[9px] font-bold text-slate-500 italic">60 min</p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Asiento</p>
                    <p className="text-4xl font-black text-primary-500 italic leading-none">A{seat}</p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Valor</p>
                    <p className="text-xl font-black uppercase italic leading-none text-slate-900 dark:text-white">$ {new Intl.NumberFormat('es-CO').format(reservation.price || 12000)} <span className="text-[10px] opacity-60">COP</span></p>
                 </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5" />

                {/* Detailed Info */}
                <div className="space-y-4 text-left">
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Información del Viaje</p>
                   <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200"><span className="font-bold text-slate-400 dark:text-slate-500 mr-2 uppercase text-[10px] tracking-widest">Pasajero:</span> {resolvedPassengerName}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200"><span className="font-bold text-slate-400 dark:text-slate-500 mr-2 uppercase text-[10px] tracking-widest">Conductor:</span> {resolvedDriverName}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200"><span className="font-bold text-slate-400 dark:text-slate-500 mr-2 uppercase text-[10px] tracking-widest">Vehículo:</span> {`${reservation.vehiclePlate || reservation.plate || reservation.vehicleId || reservation.vehiculoId || driverData?.vehiclePlate || '---'} (${reservation.vehicleModel || reservation.model || reservation.modelo || 'Vehículo'})`}</p>
                   </div>
                </div>
           </div>

           {/* FOOTER DINÁMICO */}
           <div className="bg-slate-50 dark:bg-[#040D1A] p-8 flex flex-col items-center gap-2 border-t border-slate-100 dark:border-white/5">
              <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">ID de Reserva:</span>
              <span className="text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase opacity-80 break-all text-center">
                {reservation.id || reservation.idReservation || reservation.idReserva || '---'}
              </span>
           </div>
        </div>

        {/* ACTIONS FOOTER (Mirror Nativo) */}
        <div className="grid grid-cols-5 gap-4">
           {canChat && (
             <Button
                variant="primary"
                size="md"
                className="col-span-2 !bg-primary-500 !text-white !rounded-[1.2rem] shadow-lg shadow-primary-500/20"
                icon={MessageSquare}
                onClick={onChat}
             >
                Chat
             </Button>
           )}
           <Button
              variant="outline"
              size="md"
              className={`${canChat ? 'col-span-3' : 'col-span-5'} !rounded-[1.2rem] !border-primary-500 !text-primary-500 hover:!bg-primary-500/5`}
              icon={sharing ? Loader2 : Share2}
              isLoading={sharing}
              onClick={handleShareTicket}
           >
              {sharing ? 'Procesando...' : 'Compartir'}
           </Button>
        </div>
      </div>
    </Modal>
  );
}
