import React, { useState, useEffect } from 'react';
import {
  Bus,
  TrendingUp,
  Users,
  ChevronRight,
  Star
} from 'lucide-react';
import { SolutionCard } from './components/landing/SolutionCard';
import { RouteBadge } from './components/landing/RouteBadge';
import { BrandLogo } from './components/ui/BrandLogo';

/**
 * 🚀 Componente: LandingPage
 *
 * Ficha de presentación pública de Ruta-Go.
 * Expone la propuesta de valor para Pasajeros, Conductores y Dueños.
 */
export default function LandingPage({ onLogin, onRegisterOwner, onRegisterPassenger, onViewTerms, onViewPrivacy, onViewManual }) {
  const [activeSolution, setActiveCard] = useState(0);

  const solutions = [
    {
      icon: <Users size={32} />,
      title: "Pasajeros",
      desc: "Reserva tu asiento desde cualquier dispositivo. Usa la App nativa en Android o nuestra plataforma web optimizada para iPhone.",
      color: "text-blue-500",
      features: ['Reserva Web & App', 'Puntos Go por fidelidad', 'Estatus PRO exclusivo'],
      actions: [
        { label: "Android App", type: "primary", link: 'https://play.google.com/store/apps/details?id=com.chopcode.rutago.app' },
        { label: "Versión Web", type: "secondary", action: onRegisterPassenger }
      ]
    },
    {
      icon: <Bus size={32} />,
      title: "Conductores",
      desc: "Optimiza tus ingresos con herramientas digitales. Gestiona tu planilla desde Android o consulta tu ruta desde la web.",
      color: "text-primary-500",
      features: ['Planilla Digital', 'Estatus Estrella', 'Check-in en vivo'],
      actions: [
        { label: "Descargar App", type: "primary", link: 'https://play.google.com/store/apps/details?id=com.chopcode.rutago.app' },
        { label: "Acceso Web", type: "secondary", action: onLogin }
      ]
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Dueños de Flota",
      desc: "Control room total de tus activos. Vigila la ocupación en tiempo real y monitorea ingresos desde tu oficina o celular.",
      color: "text-green-500",
      features: ['Aislamiento de propiedad', 'Métricas en tiempo real', 'Control de flota'],
      actions: [
        { label: "Entrar al Portal", type: "primary", action: onLogin },
        { label: "Afiliar Flota", type: "secondary", action: onRegisterOwner }
      ]
    }
  ];

  // Auto-rotación de soluciones
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % solutions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-white font-sans selection:bg-primary-100 transition-colors duration-300">

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-[#061426]/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <BrandLogo size="w-8 h-8 md:w-10 md:h-10" imgSize="w-5 h-5 md:w-7 md:h-7" animate={false} />
            <span className="text-lg md:text-2xl font-black tracking-tighter text-[#061426] dark:text-white uppercase italic">Ruta-Go</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-4">
            <button
              onClick={onLogin}
              aria-label="Ir a Iniciar Sesión"
              className="px-2 md:px-6 py-2 font-bold text-slate-700 dark:text-white/80 hover:text-primary-500 transition-colors text-xs md:text-sm"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={onRegisterOwner}
              aria-label="Registrarse como Dueño de Flota"
              className="px-3 md:px-6 py-2 bg-[#061426] dark:bg-[#FF7A1A] text-white font-bold rounded-xl shadow-xl hover:bg-black dark:hover:bg-primary-600 transition-all active:scale-95 text-[11px] md:text-sm uppercase tracking-wider"
            >
              Ser Dueño
              <span className="hidden md:inline"> de Flota</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <main id="main-content">
        <header className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden relative text-left">
          <div className="absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-4 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full text-primary-600 dark:text-primary-400 font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-primary-100 dark:border-primary-500/20">
                <Star size={12} className="md:size-[14px]" /> El futuro del transporte huilense
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#061426] dark:text-white leading-[1.1] tracking-tight uppercase italic">
                Conectando <span className="text-primary-500">Nátaga</span> y La Plata con tecnología.
              </h1>
              <p className="text-base md:text-xl text-slate-600 dark:text-white/60 leading-relaxed max-w-lg font-medium">
                Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Descargar App en Android"
                  className="btn-primary px-6 md:px-10 py-3.5 md:py-5 rounded-2xl flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-lg"
                >
                  Android App <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={onRegisterPassenger}
                  aria-label="Abrir versión Web para iPhone"
                  className="px-6 md:px-10 py-3.5 md:py-5 bg-white dark:bg-white/5 text-[#061426] dark:text-white font-black rounded-2xl border-2 border-[#061426] dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all active:scale-95 text-sm md:text-lg shadow-xl shadow-slate-200/50 dark:shadow-none"
                >
                  Versión Web (iPhone)
                </button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-tr from-[#061426] to-[#0B2B3F] rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2 border border-white/5">
                <div className="bg-white dark:bg-secondary-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Interior de un bus moderno de Ruta-Go"
                    width="800"
                    height="600"
                    className="w-full h-64 md:h-96 object-cover opacity-90 dark:opacity-80"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Float Cards */}
              <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white dark:bg-secondary-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 flex items-center gap-3 md:gap-4 animate-bounce-slow">
                <div className="w-10 h-10 md:w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500 shadow-inner"><Star size={22} fill="currentColor" /></div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-white/60 font-bold uppercase tracking-widest leading-none">Calificación</p>
                  <p className="text-base md:text-lg font-black text-[#061426] dark:text-white leading-none mt-1">4.9 / 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 🏛️ VALUE PROPOSITIONS */}
        <section className="py-16 md:py-24 bg-transparent dark:bg-black/10 overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-[#061426] dark:text-white tracking-tight px-4 uppercase italic">Soluciones para todo el ecosistema</h2>
              <p className="text-slate-600 dark:text-white/60 font-medium text-sm md:text-base">Haz clic en tu perfil para comenzar.</p>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-8">
              {solutions.map((sol, index) => (
                <SolutionCard key={index} {...sol} isStatic />
              ))}
            </div>

            <div className="lg:hidden relative max-w-sm mx-auto h-[460px]">
              {solutions.map((sol, index) => {
                const isActive = index === activeSolution;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                      isActive
                        ? 'translate-x-0 opacity-100 scale-100 z-30'
                        : 'translate-x-full opacity-0 scale-95 z-0'
                    }`}
                  >
                    <SolutionCard {...sol} />
                  </div>
                );
              })}

              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                {solutions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    aria-label={`Ver solución ${i + 1}`}
                    className={`h-4 rounded-full transition-all duration-300 p-2 box-content ${
                      i === activeSolution ? 'w-10 bg-primary-500' : 'w-4 bg-slate-300 dark:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 🚌 ROUTES SECTION */}
        <section className="py-16 md:py-24 bg-transparent dark:bg-[#061426] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#061426] dark:text-white tracking-tight max-w-2xl px-4 uppercase italic leading-tight">
              Conectamos el sur del Huila.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <RouteBadge city="Nátaga" />
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-slate-300 dark:text-white/20 transform rotate-90 sm:rotate-0">
                <ChevronRight />
              </div>
              <RouteBadge city="La Plata" />
            </div>
          </div>
        </section>
      </main>

      {/* 🚀 CTA FOOTER */}
      <footer className="bg-[#061426] dark:bg-black/40 py-16 md:py-24 text-white overflow-hidden relative transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase italic">
            ¿Listo para llevar tu flota <br className="hidden md:block" />al siguiente nivel?
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto px-4 font-medium">
            Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0">
             <button onClick={onRegisterOwner} className="px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-primary-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider">
               Quiero ser Socio
             </button>
             <button onClick={onLogin} className="px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider">
               Acceso Administrativo
             </button>
          </div>

          <div className="pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <BrandLogo variant="glass" imgSize="w-7 h-7" animate={false} />
              <span className="text-xl font-black tracking-tighter uppercase italic leading-none">Ruta-Go</span>
            </div>
            <div className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] order-3 md:order-none">
               ChopCode Solutions © 2026 • Huila, CO
            </div>
            <div className="flex justify-center md:justify-end gap-6 text-white/70 text-sm md:text-base order-2 md:order-none font-bold uppercase tracking-widest">
               <span onClick={onViewManual} className="hover:text-primary-500 cursor-pointer transition-colors">Manual</span>
               <span onClick={onViewPrivacy} className="hover:text-primary-500 cursor-pointer transition-colors">Privacidad</span>
               <span onClick={onViewTerms} className="hover:text-primary-500 cursor-pointer transition-colors">Términos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
