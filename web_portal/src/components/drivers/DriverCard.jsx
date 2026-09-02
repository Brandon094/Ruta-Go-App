import React, { useState } from 'react';
import { Bus, TrendingUp, Edit3, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

/**
 * ⚛️ Molecule: DriverCard
 * Tarjeta informativa para la gestión de conductores con vista expansible.
 */
export function DriverCard({ driver, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBlocked = driver.status === 'blocked';
  const schedulesList = driver.assignedSchedules || driver.horariosAsignados || [];
  const hasSchedules = Array.isArray(schedulesList) && schedulesList.length > 0;
  const isResting = (driver.status === 'inactive') || (!hasSchedules && !isBlocked);

  const driverName = driver.name || driver.nombre || 'Conductor sin nombre';
  const vehiclePlate = driver.vehiclePlate || driver.vehicleId || driver.placaVehiculo || driver.vehiculoId || 'Sin Placa';

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none relative cursor-pointer"
    >

      {/* Header - Siempre visible */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-inner ${
            isBlocked ? 'bg-red-50 dark:bg-red-500/10 text-red-400' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20'
          }`}>
            <Bus size={28} />
          </div>
          <div className="min-w-0 text-left">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate uppercase italic leading-tight">
              {driverName}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[11px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                <Star size={11} className="fill-amber-400" />
                {driver.avgRating || '5.0'} ★ ({driver.totalRatings || 0})
              </span>
              <TrendingUp size={12} className="text-primary-500 ml-1" />
              <p className="text-[11px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest truncate">
                Placa: {vehiclePlate}
              </p>
              {isExpanded ? <ChevronUp size={14} className="text-primary-500" /> : <ChevronDown size={14} className="text-slate-300" />}
            </div>
          </div>
        </div>
        <Badge variant={isBlocked ? 'error' : isResting ? 'warning' : 'success'} className="shrink-0">
          {isBlocked ? 'Bloqueado' : isResting ? 'Sin Turno' : 'En Ruta'}
        </Badge>
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-white/80">
              <span className="text-slate-400 dark:text-white/30 text-[9px] uppercase font-black">Correo:</span>
              <span className="truncate max-w-[200px]">{driver.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-white/80 border-t border-slate-100 dark:border-white/5 pt-2">
              <span className="text-slate-400 dark:text-white/30 text-[9px] uppercase font-black">Teléfono:</span>
              <span>{driver.phone || driver.telefono || 'N/A'}</span>
            </div>
            <div className="border-t border-slate-100 dark:border-white/5 pt-2 text-left">
              <p className="text-[9px] text-slate-400 dark:text-white/40 font-black uppercase tracking-[0.2em] mb-1">Turnos Asignados</p>
              <p className="text-xs text-slate-700 dark:text-white/80 font-bold truncate italic">
                {schedulesList.length > 0 ? schedulesList.join(' | ') : 'Sin turnos programados'}
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="full"
            icon={Edit3}
            onClick={(e) => { e.stopPropagation(); onEdit(driver); }}
            className="!rounded-2xl shadow-lg"
          >
            Gestionar Operador
          </Button>
        </div>
      )}
    </div>
  );
}
