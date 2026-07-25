import React from 'react';
import { Mail, Phone } from 'lucide-react';

/**
 * ⚛️ Molecule: ContactInfo
 * Muestra información de contacto (email y teléfono) de forma estandarizada.
 * Sigue Atomic Design & DRY.
 */
export function ContactInfo({ email, phone, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3 text-slate-500 dark:text-white/40 text-xs">
        <Mail size={14} className="text-primary-500 shrink-0" />
        <span className="truncate font-medium">{email || 'Sin correo'}</span>
      </div>
      <div className="flex items-center gap-3 text-slate-500 dark:text-white/40 text-xs">
        <Phone size={14} className="text-primary-500 shrink-0" />
        <span className="font-medium">{phone || 'N/A'}</span>
      </div>
    </div>
  );
}
