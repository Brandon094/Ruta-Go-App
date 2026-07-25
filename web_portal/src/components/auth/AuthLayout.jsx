import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * 🏛️ Organism: AuthLayout
 * Estructura base compartida para Login y Registro.
 * Implementa el diseño de dos columnas: Branding Hero + Formulario.
 */
export function AuthLayout({
  children,
  onBack,
  heroIcon: HeroIcon,
  heroTitle,
  heroSubtitle,
  heroHighlight,
  footerText = "ChopCode Solutions • Engineering for Productivity"
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100 transition-colors duration-300">

      {/* 🚀 Lado Izquierdo: Branding & Context (Oculto en móvil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#061426] to-[#0B2B3F] p-20 flex-col justify-between relative border-r border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          {HeroIcon && <HeroIcon size={600} className="text-white absolute -right-20 -bottom-20 rotate-12" />}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <img src="/assets/logo_icon.png" alt="Ruta-Go Logo" className="w-12 h-12 object-contain" />
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Ruta-Go</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight tracking-tight uppercase">
            {heroTitle} <br />
            {heroHighlight && <span className="text-primary-500 text-7xl italic">{heroHighlight}</span>}
            {heroHighlight && <br />}
            {heroSubtitle}
          </h2>
          <div className="flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6 max-w-md">
            La plataforma inteligente que conecta el sur del Huila. <br />
            Eficiencia y tecnología en cada kilómetro.
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          {footerText}
        </div>
      </div>

      {/* 📝 Lado Derecho: Contenido Dinámico (Formularios) */}
      <div className="flex-1 bg-transparent p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500">

        {/* Botón Volver Universal */}
        <div className="absolute top-8 left-8 lg:left-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            icon={ArrowLeft}
            className="!p-3 rounded-full group"
          />
        </div>

        <div className="max-w-md mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
