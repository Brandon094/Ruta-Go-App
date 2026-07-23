import React from 'react';

/**
 * ⚛️ Atom: Badge
 * Unifica los distintivos de estado del portal.
 */
export function Badge({ children, variant = 'success', className = '' }) {
  const variants = {
    success: 'border-green-500/50 text-green-500 bg-green-500/5',
    error: 'border-red-500/50 text-red-500 bg-red-500/5',
    warning: 'border-orange-500/50 text-orange-500 bg-orange-500/5',
    info: 'border-blue-500/50 text-blue-500 bg-blue-500/5',
    dark: 'border-white/10 text-white/40 bg-white/5'
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
