import React, { useState } from 'react';
import { Search, History, ArrowRight } from 'lucide-react';
import { ReservationHistoryCard } from './ReservationHistoryCard';
import { Input } from '../ui/Input';

export function HistoryDirectory({ reservations, role, onNavigate }) {
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
        const plate = (res.vehicleId || res.vehiculoId || "").toLowerCase();
        return name.includes(search) || route.includes(search) || plate.includes(search);
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
      <div className="bg-primary-500 p-6 lg:p-8 pb-20 relative overflow-hidden shadow-2xl transition-all duration-300">
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">

          {/* Barra de Búsqueda Siempre Visible Arriba */}
          <div className="px-2 md:px-0">
            <Input
              placeholder="Buscar por pasajero, ruta o placa..."
              icon={Search}
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
              className="!bg-white/10 !border-white/20 !text-white !placeholder:text-white/40 focus:!ring-white/20 shadow-lg"
            />
          </div>

          {/* Chips de Filtro */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 w-full justify-start px-2 md:px-0">
            {['Todos', 'Confirmados', 'Cancelados', 'Este Mes'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-lg border ${
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
      </div>

      <div className="max-w-3xl mx-auto -mt-15 relative z-20 px-4 space-y-10 pb-20">

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
            <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-[#061426] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl transition-all duration-300">
               <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300 dark:text-white/10 mb-6">
                  <History size={48} className="opacity-50" />
               </div>
               <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight mb-2">No hay actividad registrada</h4>
               <p className="text-slate-400 dark:text-white/40 text-sm font-medium max-w-xs mb-8">Parece que aún no has realizado ninguna reserva. ¡Empieza a viajar con Ruta-Go hoy mismo!</p>

               {role?.type === 'PASSENGER' && (
                 <button
                  onClick={onNavigate}
                  className="flex items-center gap-3 px-8 py-4 bg-primary-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-500/30 hover:bg-primary-600 transition-all active:scale-95 group"
                 >
                   Ver horarios disponibles
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
