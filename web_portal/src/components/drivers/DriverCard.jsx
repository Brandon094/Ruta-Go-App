import React, { useState } from 'react';
import { Bus, TrendingUp, Edit3, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ContactInfo } from '../ui/ContactInfo';

/**
 * ⚛️ Molecule: DriverCard
 * Gestión de conductores con diseño expansible y cumplimiento DRY.
 */
export function DriverCard({ driver, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBlocked = driver.status === 'blocked';
  const hasSchedules = driver.horariosAsignados && driver.horariosAsignados.length > 0;
  const isResting = (driver.status === 'inactive') || (!hasSchedules && !isBlocked);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none relative cursor-pointer"
    >

      {/* Identidad - Siempre visible */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-inner ${
            isBlocked ? 'bg-red-50 dark:bg-red-500/10 text-red-400' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20'
          }`}>
            <Bus size={28} />
          </div>
          <div className="min-w-0 text-left">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate uppercase italic leading-tight">
              {driver.nombre}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp size={12} className="text-primary-500" />
              <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest truncate">
                Placa: {driver.placaVehiculo || 'N/A'}
              </p>
              {isExpanded ? <ChevronUp size={14} className="text-primary-500" /> : <ChevronDown size={14} className="text-slate-300" />}
            </div>
          </div>
        </div>
        <Badge variant={isBlocked ? 'error' : isResting ? 'warning' : 'success'} className="shrink-0">
          {isBlocked ? 'Bloqueado' : isResting ? 'Descanso' : 'En Ruta'}
        </Badge>
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">

          {/* Información de Contacto (DRY Puro) */}
          <ContactInfo
            email={driver.email}
            phone={driver.telefono}
            className="text-left border-t border-slate-50 dark:border-white/5 pt-6"
          />

          <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">
            <p className="text-[9px] text-slate-400 dark:text-white/40 font-black uppercase tracking-[0.2em] mb-2 px-1 text-left">Turnos Asignados</p>
            <p className="text-xs text-slate-700 dark:text-white/80 font-bold truncate px-1 italic text-left">
              {driver.horariosAsignados ? driver.horariosAsignados.join(' | ') : 'Sin turnos programados'}
            </p>
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
