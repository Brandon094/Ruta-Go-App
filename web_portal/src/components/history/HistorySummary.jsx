import React from 'react';
import { StatsCard } from '../dashboard/StatsCard';

/**
 * ⚛️ Molecule: HistorySummary
 * Resumen de estadísticas del historial (Confirmados, Cancelados, Total).
 * Sigue Atomic Design & DRY.
 */
export function HistorySummary({ stats }) {
  return (
    <StatsCard className="!p-8 md:!p-10 !border-none shadow-2xl bg-white dark:bg-[#061426]">
      <div className="grid grid-cols-3 gap-8">
        <StatItem label="Confirmados" value={stats.confirmed} color="text-green-500 dark:text-green-400" />
        <StatItem label="Cancelados" value={stats.canceled} color="text-red-500 dark:text-red-400" isMiddle />
        <StatItem label="Total" value={stats.total} color="text-orange-500 dark:text-orange-400" />
      </div>
    </StatsCard>
  );
}

function StatItem({ label, value, color, isMiddle }) {
  return (
    <div className={`text-center space-y-2 ${isMiddle ? 'border-x border-slate-100 dark:border-white/5 px-4' : ''}`}>
      <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">
        {label}
      </p>
      <span className={`text-4xl font-black block transition-all duration-500 ${color}`}>
        {value}
      </span>
    </div>
  );
}
