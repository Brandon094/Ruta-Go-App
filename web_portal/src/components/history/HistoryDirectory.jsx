import React, { useState } from 'react';
import { Search, History, ArrowRight } from 'lucide-react';
import { ReservationHistoryCard } from './ReservationHistoryCard';
import { TicketModal } from './TicketModal';
import { RatingModal } from './RatingModal';
import { ChatModal } from './ChatModal';
import { HistoryHeader } from './HistoryHeader';
import { HistorySummary } from './HistorySummary';

export function HistoryDirectory({ type = 'personal', reservations, role, drivers = [], onNavigate }) {
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ratingTarget, setRatingTarget] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  const isBusiness = type === 'business';

  const filteredList = (reservations || [])
    .filter(res => {
      const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
      const isConfirmed = status === 'confirmada' || status === 'confirmado' || status === 'completada' || status === 'confirmed';
      if (filter === 'Confirmados' && !isConfirmed) return false;
      if (filter === 'Cancelados' && status !== 'cancelada' && status !== 'canceled') return false;

      if (filter === 'Este Mes') {
        const date = res.fechaReserva || res.reservationDate || res.travelDate;
        if (!date) return false;
        const resDate = new Date(date);
        const now = new Date();
        if (resDate.getMonth() !== now.getMonth() || resDate.getFullYear() !== now.getFullYear()) return false;
      }

      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const name = (res.name || res.nombre || res.nombreUsuario || "").toLowerCase();
        const route = (res.origen || res.origin || res.ruta || "").toLowerCase() + (res.destino || res.destination || "").toLowerCase();
        const plate = (res.vehicleId || res.vehiculoId || res.plate || "").toLowerCase();
        return name.includes(search) || route.includes(search) || plate.includes(search);
      }
      return true;
    })
    .sort((a, b) => (b.reservationDate || b.fechaReserva || 0) - (a.reservationDate || a.fechaReserva || 0));

  const stats = {
    confirmed: (reservations || []).filter(r => {
      const s = (r.estadoReserva || r.reservationStatus || "").toLowerCase();
      return s === 'confirmada' || s === 'confirmado' || s === 'completada' || s === 'confirmed';
    }).length,
    canceled: (reservations || []).filter(r => {
      const s = (r.estadoReserva || r.reservationStatus || "").toLowerCase();
      return s === 'cancelada' || s === 'canceled';
    }).length,
    total: (reservations || []).length
  };

  return (
    <div className="animate-in fade-in duration-700 -m-4 lg:-m-8 flex flex-col min-h-full">

      {/* 🏛️ Organism: HistoryHeader (Atomic Refactor) */}
      <HistoryHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="max-w-3xl mx-auto -mt-15 relative z-20 px-4 space-y-10 pb-20 w-full">

        {/* ⚛️ Molecule: HistorySummary (Atomic Refactor) */}
        <HistorySummary stats={stats} />

        <div className="space-y-6">
          <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase italic tracking-tight px-2 transition-colors">
            {isBusiness ? 'Monitor de Despachos' : 'Historial de Viajes'} ({filteredList.length})
          </h4>

          {filteredList.length > 0 ? (
            <div className="space-y-6">
              {filteredList.map(res => (
                <ReservationHistoryCard
                  key={res.id}
                  res={res}
                  role={role}
                  drivers={drivers}
                  onViewTicket={() => setSelectedTicket(res)}
                  onRate={() => setRatingTarget(res)}
                  onChat={() => setActiveChat(res)}
                />
              ))}
            </div>
          ) : (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-[#061426] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl transition-all duration-300">
               <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300 dark:text-white/10 mb-6 animate-pulse">
                  <History size={48} className="opacity-50" />
               </div>
               <div className="space-y-2 max-w-sm">
                 <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight">
                   {isBusiness ? 'Sin despachos registrados' : 'No hay actividad registrada'}
                 </h4>
                 <p className="text-slate-400 dark:text-white/40 text-sm font-medium">
                   {isBusiness
                     ? 'Aún no hay movimientos en la planilla de despachos. Las reservas confirmadas aparecerán aquí.'
                     : 'Parece que aún no has realizado ninguna reserva personal. ¡Empieza a viajar con Ruta-Go hoy mismo!'}
                 </p>
               </div>

               {!isBusiness && (
                 <button
                  onClick={onNavigate}
                  className="mt-8 flex items-center gap-3 px-8 py-4 bg-primary-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-500/30 hover:bg-primary-600 transition-all active:scale-95 group"
                 >
                   Ver horarios disponibles
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
               )}
            </div>
          )}
        </div>
      </div>

      {selectedTicket && (
        <TicketModal
          reservation={selectedTicket}
          role={role}
          drivers={drivers} // <-- PASAMOS LA LISTA PARA LOOKUP
          onClose={() => setSelectedTicket(null)}
          onChat={() => {
            setSelectedTicket(null);
            setActiveChat(selectedTicket);
          }}
        />
      )}

      {ratingTarget && (
        <RatingModal
          reservation={ratingTarget}
          onClose={() => setRatingTarget(null)}
        />
      )}

      {activeChat && (
        <ChatModal
          reservation={activeChat}
          role={role}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}
