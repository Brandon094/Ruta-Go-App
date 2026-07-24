import React from 'react';

/**
 * ⚛️ Molecule: HistoryRow
 * Fila de información con icono y diseño espejo de Android.
 */
export function HistoryRow({ icon: Icon, children, rightContent }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 text-left">
        <div className="p-2.5 bg-primary-500/10 rounded-xl text-primary-500">
          <Icon size={20} />
        </div>
        <span className="text-sm font-black text-white uppercase italic truncate">
          {children}
        </span>
      </div>
      {rightContent && (
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">
          {rightContent}
        </span>
      )}
    </div>
  );
}
