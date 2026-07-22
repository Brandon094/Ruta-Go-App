import React from 'react';
import { Bus, Clock, CheckCircle2, Mail, TrendingUp, Calendar, Edit3 } from 'lucide-react';

export function DriverCard({ driver, onEdit }) {
  // Lógica de estados sincronizada con firebase_functions/index.js
  const isActive = driver.status === 'active';
  const isBlocked = driver.status === 'blocked';
  const hasSchedules = driver.horariosAsignados && driver.horariosAsignados.length > 0;

  // Un conductor está en descanso real si su status es inactive O si no tiene horarios asignados hoy
  const isResting = (driver.status === 'inactive') || (!hasSchedules && !isBlocked);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group relative">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isBlocked ? 'bg-red-50 text-red-400' : 'bg-slate-100 text-slate-400'}`}>
        <Bus size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 gap-2 pr-10">
          <h4 className="font-bold text-slate-800 text-sm truncate leading-tight">{driver.nombre}</h4>
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${
            isBlocked ? 'bg-red-100 text-red-600' :
            isResting ? 'bg-amber-100 text-amber-600' :
            'bg-green-100 text-green-600'
          }`}>
            {isBlocked ? 'Bloqueado' : isResting ? 'Descanso' : 'En Ruta'}
          </span>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
            <TrendingUp size={12} className="text-slate-300" />
            <span className="text-slate-600 font-bold">Placa: {driver.placaVehiculo || 'N/A'}</span>
          </div>

          <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 mt-1">
            <p className="text-[9px] text-slate-400 font-bold uppercase leading-none mb-1">Turnos</p>
            <p className="text-[11px] text-slate-700 font-bold truncate">
              {driver.horariosAsignados ? driver.horariosAsignados.join(' | ') : 'Sin turnos hoy'}
            </p>
          </div>
        </div>
      </div>

      {/* Botón Flotante de Edición */}
      <button
        onClick={() => onEdit(driver)}
        className="absolute top-4 right-4 p-2 text-slate-300 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
        title="Editar Conductor"
      >
        <Edit3 size={16} />
      </button>
    </div>
  );
}
