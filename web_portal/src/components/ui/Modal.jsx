import React from 'react';
import { X } from 'lucide-react';

/**
 * ⚛️ Atom: Modal
 * Componente base para diálogos y ventanas emergentes.
 * Maneja el overlay, backdrop-blur y animaciones estándar.
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = 'max-w-md',
  showClose = true,
  className = ""
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop Átomo */}
      <div
        className="absolute inset-0 bg-[#061426]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Container Molécula */}
      <div className={`relative w-full ${maxWidth} bg-[#0A1F30] rounded-[2.5rem] shadow-2xl flex flex-col max-h-[95vh] border border-white/5 animate-in zoom-in-95 duration-300 overflow-hidden ${className}`}>

        {/* Header (Opcional) */}
        {title && (
          <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{title}</h3>
            {showClose && (
              <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all">
                <X size={24} />
              </button>
            )}
          </div>
        )}

        {/* Close Button Absolute (Opcional, estilo Ticket/Rating) */}
        {!title && showClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 text-slate-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}

        {/* Slot para el contenido */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
