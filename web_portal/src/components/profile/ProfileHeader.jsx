import React from 'react';
import { User, Camera } from 'lucide-react';
import { Badge } from '../ui/Badge';

/**
 * 🏛️ Organism: ProfileHeader
 * Cabecera del perfil con avatar y estado.
 * Estilo Mobile Mirror v1.7.0
 */
export function ProfileHeader({ name, roleLabel, avatarUrl }) {
  return (
    <div className="bg-primary-500 pt-12 pb-20 relative overflow-hidden flex flex-col items-center text-center transition-colors duration-300">
      <div className="relative group">
        <div className="w-40 h-40 bg-amber-400 rounded-full border-4 border-slate-900/10 dark:border-[#061426] flex items-center justify-center text-[#061426] shadow-2xl relative transition-all duration-300">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={80} strokeWidth={1.5} />
          )}

          {/* Botón Cámara (Átomo de Acción) */}
          <button className="absolute bottom-1 right-1 bg-slate-900 dark:bg-[#061426] p-2.5 rounded-full border-2 border-white text-white hover:bg-black transition-all shadow-xl active:scale-90">
             <Camera size={18} />
          </button>
        </div>
      </div>

      {/* Identidad de Usuario */}
      <div className="mt-6 space-y-3 relative z-10">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
          {name}
        </h2>
        <Badge
          variant="success"
          className="!bg-white/10 dark:!bg-[#061426]/40 !border-white/20 dark:!border-green-500/50 backdrop-blur-md !px-6 shadow-xl text-white"
        >
           {roleLabel}
        </Badge>
      </div>
    </div>
  );
}
