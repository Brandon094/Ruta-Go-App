import React from 'react';
import { StatsCard } from '../dashboard/StatsCard';

/**
 * ⚛️ Molecule: ProfileCard
 * Contenedor de información para el perfil.
 * Soporta grids (vehículo) o listas (personal).
 */
export function ProfileCard({ title, children, className = "" }) {
  return (
    <StatsCard className={`!p-8 lg:!p-10 shadow-2xl bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none ${className}`}>
      <h3 className="text-orange-500 font-black uppercase text-sm tracking-widest italic mb-8">
        {title}
      </h3>
      {children}
    </StatsCard>
  );
}
