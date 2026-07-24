import React from 'react';

/**
 * ⚛️ Molecule: IconRow
 * Fila estandarizada con Icono y contenido.
 * Soporta variantes: 'primary' (bg navy) y 'ghost' (transparent).
 */
export function IconRow({
  icon: Icon,
  children,
  rightContent,
  variant = 'primary',
  className = ""
}) {

  const iconStyles = variant === 'primary'
    ? 'p-2.5 bg-primary-500/10 rounded-xl text-primary-500'
    : 'p-2 bg-primary-500/5 rounded-xl text-primary-500';

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4 text-left truncate">
        <div className={`${iconStyles} shrink-0`}>
          <Icon size={variant === 'primary' ? 20 : 16} />
        </div>
        <div className="truncate">
          {children}
        </div>
      </div>
      {rightContent && (
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0 ml-4">
          {rightContent}
        </span>
      )}
    </div>
  );
}
