import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * 🛰️ Molecule: SplashScreen
 * Pantalla de carga premium con el branding de Ruta-Go.
 * Se muestra durante la autenticación inicial y resolución de roles.
 */
export function SplashScreen({ message = "Iniciando Ecosistema..." }) {
  return (
    <div className="h-screen w-full bg-secondary-50 dark:bg-[#061426] flex flex-col items-center justify-center gap-8 transition-colors duration-500 overflow-hidden relative">

      {/* Efectos de Fondo (Branding) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative group scale-110 md:scale-125">
        {/* Logo con Animación de Giro Suave */}
        <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-[#061426] dark:bg-white/5 rounded-3xl flex items-center justify-center shadow-2xl border border-white/5 transition-transform duration-700 group-hover:rotate-12">
          <img
            src="/assets/logo_icon.png"
            alt="Ruta-Go"
            className="w-16 h-16 md:w-20 md:h-20 object-contain animate-bounce-slow"
          />
        </div>

        {/* Loader Orbitando el Logo */}
        <div className="absolute -inset-4 border-2 border-dashed border-primary-500/20 rounded-[2.5rem] animate-spin-slow"></div>

        <div className="absolute -bottom-2 -right-2 bg-primary-500 p-2 rounded-xl shadow-lg shadow-primary-500/40 animate-bounce">
           <Loader2 className="text-white animate-spin" size={20} />
        </div>
      </div>

      <div className="text-center space-y-3 relative z-10">
        <h2 className="text-2xl font-black text-secondary-900 dark:text-white uppercase italic tracking-tighter animate-in fade-in slide-in-from-bottom-2 duration-700">
          Ruta-Go <span className="text-primary-500">Portal</span>
        </h2>
        <div className="flex flex-col items-center gap-1">
          <p className="text-slate-400 dark:text-white/20 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            {message}
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full mt-2"></div>
        </div>
      </div>

      {/* Footer del Splash */}
      <div className="absolute bottom-12 text-[8px] font-black text-slate-300 dark:text-white/5 uppercase tracking-[0.5em]">
        ChopCode Solutions • Engineering for Productivity
      </div>
    </div>
  );
}
