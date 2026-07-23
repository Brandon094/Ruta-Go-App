import React from 'react';
import { Bus, Clock, CheckCircle2, Mail, TrendingUp, Calendar, Edit3 } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function DriverCard({ driver, onEdit }) {
  const isActive = driver.status === 'active';
  const isBlocked = driver.status === 'blocked';
  const hasSchedules = driver.horariosAsignados && driver.horariosAsignados.length > 0;
  const isResting = (driver.status === 'inactive') || (!hasSchedules && !isBlocked);

  return (
    <div className="card-base p-4 rounded-2xl flex gap-4 group relative">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        isBlocked ? 'bg-red-50 dark:bg-red-500/10 text-red-400' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20'
      }`}>
        <Bus size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 gap-2 pr-10">
          <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate leading-tight uppercase italic">{driver.nombre}</h4>
          <div className="flex items-center gap-2">
            {isBlocked ? (
              <Badge variant="error">Bloqueado</Badge>
            ) : isResting ? (
              <Badge variant="warning">Descanso</Badge>
            ) : (
              <Badge variant="success">En Ruta</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-[11px] font-medium">
            <TrendingUp size={12} className="text-slate-300 dark:text-white/20" />
            <span className="text-slate-600 dark:text-white/60 font-bold">Placa: {driver.placaVehiculo || 'N/A'}</span>
          </div>

          <div className="p-2 bg-slate-50 dark:bg-black/20 rounded-lg border border-slate-100 dark:border-white/5 mt-1 shadow-inner">
            <p className="text-[9px] text-slate-400 dark:text-white/40 font-bold uppercase leading-none mb-1">Turnos</p>
            <p className="text-[11px] text-slate-700 dark:text-white/80 font-bold truncate">
              {driver.horariosAsignados ? driver.horariosAsignados.join(' | ') : 'Sin turnos hoy'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onEdit(driver)}
        className="absolute top-4 right-4 p-2 text-slate-300 dark:text-white/20 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-primary-500/10 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
        title="Editar Conductor"
      >
        <Edit3 size={16} />
      </button>
    </div>
  );
}
