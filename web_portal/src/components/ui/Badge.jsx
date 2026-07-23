import React from 'react';

/**
 * ⚛️ Atom: Badge
 * Unifica los distintivos de estado del portal.
 */
export function Badge({ children, variant = 'success', className = '' }) {
  const variants = {
    success: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20',
    error: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
    warning: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
    info: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    dark: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-white/5 dark:text-white/40 dark:border-white/10'
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
