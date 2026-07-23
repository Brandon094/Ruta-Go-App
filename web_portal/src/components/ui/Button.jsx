import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * ⚛️ Atom: Button
 * Componente base para todas las acciones del portal.
 * Soporta variantes: primary, secondary, danger, ghost, outline.
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button'
}) {

  const baseStyles = "relative flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const variants = {
    primary: "bg-[#061426] dark:bg-primary-500 text-white hover:bg-black dark:hover:bg-primary-600 shadow-xl shadow-slate-900/10 dark:shadow-primary-500/20",
    secondary: "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20 shadow-lg",
    success: "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 border border-green-100 dark:border-green-500/20 shadow-lg",
    outline: "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white shadow-lg shadow-primary-500/10",
    ghost: "bg-transparent text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-[8px] rounded-xl",
    md: "px-8 py-4 text-[10px] rounded-2xl",
    lg: "px-10 py-5 text-xs rounded-[1.5rem]",
    full: "w-full py-4 text-[10px] rounded-2xl"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {children}
        </>
      )}
    </button>
  );
}
