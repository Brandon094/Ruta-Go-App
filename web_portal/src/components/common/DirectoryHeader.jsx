import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search } from 'lucide-react';

/**
 * ⚛️ Molecule: DirectoryHeader (Refactored v1.7.8)
 * Barra de acciones estandarizada para directorios.
 * Removido el título redundante para priorizar la Header TopBar.
 */
export function DirectoryHeader({
  searchTerm,
  setSearchTerm,
  onAction,
  actionLabel,
  actionIcon,
  subtitle
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8 transition-all duration-300">
      <div className="text-left flex-1 min-w-0">
        {subtitle && (
          <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] italic truncate">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Realizar búsqueda rápida..."
            icon={Search}
            value={searchTerm}
            onChange={(val) => setSearchTerm(val)}
            className="shadow-sm"
          />
        </div>
        {onAction && (
          <Button
            icon={actionIcon}
            onClick={onAction}
            className="w-full sm:w-auto !rounded-2xl shadow-lg shadow-primary-500/10"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
