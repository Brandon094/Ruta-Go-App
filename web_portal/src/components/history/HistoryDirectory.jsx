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
      <div className="bg-primary-500 p-6 lg:p-8 pb-32 relative overflow-hidden shadow-2xl transition-all duration-300">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

          {/* Chips de Filtro */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 w-full md:w-auto justify-center md:justify-start">
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

          {/* Botones de Acción */}
          <div className="flex gap-4 shrink-0">
            <button className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-2xl border border-white/10 transition-all shadow-lg group">
              <Search size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-2xl border border-white/10 transition-all shadow-lg group">
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto -mt-0 relative z-20 px-4 space-y-10 pb-20">

        {/* 📊 SUMMARY CARD */}
        <div className="card-base rounded-[2.5rem] p-8 md:p-10 grid grid-cols-3 gap-8 border-none shadow-2xl bg-white dark:bg-[#061426] transition-colors duration-300">
           <div className="text-center space-y-2">
              <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Confirmados</p>
              <span className="text-4xl font-black text-green-500 dark:text-green-400 block">{stats.confirmed}</span>
           </div>
           <div className="text-center space-y-2 border-x border-slate-100 dark:border-white/5 px-4">
              <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Cancelados</p>
              <span className="text-4xl font-black text-red-500 dark:text-red-400 block">{stats.canceled}</span>
           </div>
           <div className="text-center space-y-2">
              <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Total</p>
              <span className="text-4xl font-black text-orange-500 dark:text-orange-400 block">{stats.total}</span>
           </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase italic tracking-tight px-2 transition-colors">
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
