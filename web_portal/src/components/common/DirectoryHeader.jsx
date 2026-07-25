import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search } from 'lucide-react';

/**
 * 🏛️ Organism: DirectoryHeader
 * Encabezado estandarizado para directorios (Socios, Vehículos, Conductores, Pasajeros).
 * Sigue Atomic Design & DRY.
 */
export function DirectoryHeader({
  icon: Icon,
  title,
  subtitle,
  searchTerm,
  setSearchTerm,
  onAction,
  actionLabel,
  actionIcon
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm">
          <Icon size={28} />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic leading-none">{title}</h3>
          <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
        <div className="w-full sm:w-64">
          <Input
            placeholder="Buscar..."
            icon={Search}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        {onAction && (
          <Button icon={actionIcon} onClick={onAction} className="w-full sm:w-auto">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
