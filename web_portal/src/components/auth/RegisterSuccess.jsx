import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * ⚛️ Molecule: RegisterSuccess
 * Vista de éxito tras el registro de usuario.
 */
export function RegisterSuccess({ name, onBack }) {
  return (
    <div className="max-w-md w-full bg-white dark:bg-secondary-800 rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in-95 duration-500 border border-slate-100 dark:border-white/5 mx-auto">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 rounded-3xl flex items-center justify-center text-green-600 dark:text-green-500 mx-auto animate-bounce shadow-inner">
        <CheckCircle2 size={40} />
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic">
          ¡Bienvenido!
        </h2>
        <p className="text-slate-500 dark:text-white/60 font-medium leading-relaxed">
          Hola <span className="text-primary-500 font-bold">{name}</span>, tu cuenta ha sido creada exitosamente.
        </p>
        <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl border border-primary-100 dark:border-primary-500/20 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
          Ya puedes iniciar sesión y explorar el portal.
        </div>
      </div>
      <Button
        onClick={onBack}
        variant="primary"
        size="full"
      >
        Ir al Inicio
      </Button>
    </div>
  );
}
