import React, { useState } from 'react';
import { Search, RefreshCw, History } from 'lucide-react';
import { ReservationHistoryCard } from './ReservationHistoryCard';

export function HistoryDirectory({ reservations, role }) {
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = reservations
    .filter(res => {
      const status = (res.estadoReserva || res.reservationStatus || "").toLowerCase();
      if (filter === 'Confirmados' && !(status === 'confirmada' || status === 'confirmado' || status === 'completada')) return false;
      if (filter === 'Cancelados' && status !== 'cancelada') return false;

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
        const route = (res.origen || res.origin || "").toLowerCase() + (res.destino || res.destination || "").toLowerCase();
        return name.includes(search) || route.includes(search);
      }
      return true;
    })
    .sort((a, b) => (b.reservationDate || b.fechaReserva || 0) - (a.reservationDate || a.fechaReserva || 0));

  const stats = {
    confirmed: reservations.filter(r => {
      const s = (r.estadoReserva || r.reservationStatus || "").toLowerCase();
      return s === 'confirmada' || s === 'confirmado' || s === 'completada';
    }).length,
    canceled: reservations.filter(r => (r.estadoReserva || r.reservationStatus || "").toLowerCase() === 'cancelada').length,
    total: reservations.length
  };

  return (
    <div className="animate-in fade-in duration-700 -m-4 lg:-m-8">

      {/* 🟠 HEADER NARANJA */}
      <div className="bg-primary-500 p-6 lg:p-10 pb-20 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10 text-white">
          <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight italic">Historial de Reservas</h3>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Search size={22}/></button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><RefreshCw size={22}/></button>
          </div>
        </div>

        {/* Chips de Filtro */}
        <div className="max-w-4xl mx-auto mt-8 flex gap-3 overflow-x-auto scrollbar-hide pb-2 relative z-10">
          {['Todos', 'Confirmados', 'Cancelados', 'Este Mes'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-lg border ${
                filter === f
                ? 'bg-secondary-900 text-white border-transparent'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto -mt-12 relative z-20 px-4 space-y-8 pb-20">

        {/* 📊 SUMMARY CARD */}
        <div className="card-base bg-[#061426] dark:bg-[#061426] rounded-[2rem] p-6 grid grid-cols-3 gap-4 border-none shadow-2xl">
           <div className="text-center space-y-1">
              <span className="text-2xl font-black text-green-500">{stats.confirmed}</span>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Confirmados</p>
           </div>
           <div className="text-center space-y-1 border-x border-white/5">
              <span className="text-2xl font-black text-red-500">{stats.canceled}</span>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Cancelados</p>
           </div>
           <div className="text-center space-y-1">
              <span className="text-2xl font-black text-orange-500">{stats.total}</span>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Total</p>
           </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase italic tracking-tight px-2">
            Historial de Viajes ({filteredList.length})
          </h4>

          {filteredList.length > 0 ? (
            <div className="space-y-6">
              {filteredList.map(res => (
                <ReservationHistoryCard key={res.id} res={res} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-300 dark:text-white/10 italic">
               <History size={64} className="mb-4 opacity-50" />
               <p>No hay actividad registrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
