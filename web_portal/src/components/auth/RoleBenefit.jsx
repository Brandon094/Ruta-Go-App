import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * ⚛️ Molecule: RoleBenefit
 * Item de beneficio para el proceso de registro.
 */
export function RoleBenefit({ text }) {
  return (
    <li className="flex gap-3 text-[10px] font-bold text-slate-500 dark:text-white/40 leading-relaxed uppercase list-none">
       <CheckCircle2 size={12} className="text-primary-500 shrink-0 mt-0.5" />
       {text}
    </li>
  );
}
