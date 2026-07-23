import React from 'react';
import { Menu, User as UserIcon, Moon, Sun } from 'lucide-react';

/**
 * 🔝 Header Component - Barra Superior Responsiva
 *
 * @param {string} title - Título de la vista actual
 * @param {string} userEmail - Email del usuario logueado
 * @param {function} onMenuClick - Disparador para abrir el sidebar en móviles
 * @param {object} role - Objeto de rol del usuario
 * @param {string} theme - Tema actual ('dark' | 'light')
 * @param {function} onToggleTheme - Función para cambiar de tema
 */
export function Header({ title, userEmail, onMenuClick, role, theme, onToggleTheme }) {
  const isRoot = role?.type === 'ADMIN';
  const isOwner = role?.type === 'OWNER';
  const isLoading = !role?.type;

  return (
    <header className="h-20 bg-white dark:bg-[#061929] border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Botón Hamburguesa */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all active:scale-90"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white tracking-tight truncate max-w-[200px] md:max-w-none uppercase italic">
          {isLoading ? 'Verificando...' : title}
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-3 text-slate-400 dark:text-white/20 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all group"
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="group-hover:text-amber-400 transition-colors" />
          ) : (
            <Moon size={20} className="group-hover:text-indigo-600 transition-colors" />
          )}
        </button>

        <div className="text-right hidden sm:block">
          <p className="text-[11px] font-black text-slate-700 dark:text-white leading-none truncate max-w-[150px]">
            {role?.name || userEmail}
          </p>
          <p className={`text-[9px] font-bold uppercase tracking-tighter mt-1 ${
            isLoading ? 'text-slate-300' :
            isRoot ? 'text-primary-500' :
            role?.type === 'DRIVER' ? 'text-amber-500' :
            role?.type === 'PASSENGER' ? 'text-green-500' : 'text-blue-500'
          }`}>
            {isLoading ? 'Cargando Perfil' :
             isRoot ? 'Sesión Root' :
             role?.type === 'OWNER' ? 'Sesión Dueño' :
             role?.type === 'DRIVER' ? 'Sesión Conductor' :
             'Sesión Pasajero'}
          </p>
        </div>

        {/* Avatar Compacto */}
        <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm transition-colors duration-500 ${
          isLoading ? 'bg-slate-200 shadow-none' :
          isRoot ? 'bg-primary-500 shadow-primary-500/20' :
          role?.type === 'DRIVER' ? 'bg-amber-500 shadow-amber-500/20' :
          role?.type === 'PASSENGER' ? 'bg-green-600 shadow-green-500/20' : 'bg-blue-600 shadow-blue-500/20'
        }`}>
          {(role?.name || userEmail)?.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
