import React from 'react';
import { Menu, User as UserIcon } from 'lucide-react';

/**
 * 🔝 Header Component - Barra Superior Responsiva
 *
 * @param {string} title - Título de la vista actual
 * @param {string} userEmail - Email del usuario logueado
 * @param {function} onMenuClick - Disparador para abrir el sidebar en móviles
 */
export function Header({ title, userEmail, onMenuClick }) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30">
      <div className="flex items-center gap-4">
        {/* Botón Hamburguesa: Solo visible en móviles (< 1024px) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight truncate max-w-[200px] md:max-w-none">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-[11px] font-black text-slate-700 leading-none truncate max-w-[150px]">
            {userEmail}
          </p>
          <p className="text-[9px] text-primary-500 font-bold uppercase tracking-tighter mt-1">Sesión Root</p>
        </div>

        {/* Avatar Compacto */}
        <div className="w-10 h-10 lg:w-11 lg:h-11 bg-primary-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary-500/20 text-sm">
          {userEmail?.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
