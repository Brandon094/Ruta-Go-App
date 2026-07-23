import React from 'react';
import { User, Mail, Phone, Trash2, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function UserCard({ user }) {
  if (!user) return null;

  const hasRequestedDeletion = user.solicitudBorrado === true;

  return (
    <div className={`card-base p-4 rounded-2xl flex gap-4 group ${hasRequestedDeletion ? 'opacity-60 grayscale-[0.5]' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        hasRequestedDeletion ? 'bg-red-50 dark:bg-red-500/10 text-red-400' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
      }`}>
        <User size={22} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 gap-2">
          <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate leading-tight uppercase italic">
            {user.nombre || user.name || 'Usuario sin nombre'}
          </h4>
          {hasRequestedDeletion ? (
            <Badge variant="error" icon={Trash2}>Borrado</Badge>
          ) : (
            <Badge variant="info">Activo</Badge>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-2 text-slate-500 dark:text-white/40 text-[11px]">
            <Mail size={12} className="text-slate-300 dark:text-white/20" />
            <span className="truncate">{user.email || 'Sin correo'}</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2 text-slate-500 dark:text-white/40 text-[11px]">
              <Phone size={12} className="text-slate-300 dark:text-white/20" />
              <span>{user.telefono || user.phone || 'N/A'}</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-100 dark:border-amber-500/20 shadow-sm">
              <Award size={10} className="text-amber-500" />
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-500">{user.puntosGo || 0} pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
