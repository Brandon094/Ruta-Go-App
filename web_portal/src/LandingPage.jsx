import React, { useState, useEffect } from 'react';
import {
  Bus,
  ShieldCheck,
  Clock,
  TrendingUp,
  Users,
  MapPin,
  ChevronRight,
  Star,
  CheckCircle2
} from 'lucide-react';

/**
 * 🚀 Componente: LandingPage
 *
 * Ficha de presentación pública de Ruta-Go.
 * Expone la propuesta de valor para Pasajeros, Conductores y Dueños.
 */
export default function LandingPage({ onLogin, onRegisterOwner, onViewTerms, onViewPrivacy, onViewManual }) {
  const [activeSolution, setActiveCard] = useState(0);

  const solutions = [
    {
      icon: <Users size={32} />,
      title: "Pasajeros",
      desc: "Adiós a la incertidumbre. Reserva tu asiento desde casa, acumula Puntos Go en cada viaje y sube de nivel para desbloquear beneficios exclusivos.",
      color: "text-blue-500",
      features: ['Puntos Go por fidelidad', 'Estatus PRO (Plata/Oro/Diamante)', 'Chat directo con el conductor'],
      action: () => window.open('https://play.google.com/store/apps/details?id=com.chopcode.rutago.app', '_blank')
    },
    {
      icon: <Bus size={32} />,
      title: "Conductores",
      desc: "Optimiza tus ingresos con el Estatus Estrella. Gestiona tu planilla digital, visualiza tu rentabilidad diaria y asegura tus cupos antes de salir.",
      color: "text-primary-500",
      features: ['Estatus Estrella de confianza', 'Check-in digital de pasajeros', 'Reporte de rentabilidad diaria'],
      action: () => window.open('https://play.google.com/store/apps/details?id=com.chopcode.rutago.app', '_blank')
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Dueños de Flota",
      desc: "Control room total de tus activos. Vigila la ocupación en tiempo real, monitorea ingresos y recibe alertas legales de tu flota desde un solo lugar.",
      color: "text-green-500",
      features: ['Aislamiento de datos de propiedad', 'Seguimiento de buses en vivo', 'Panel financiero centralizado'],
      action: onLogin
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100">

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary-900 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <img src="/assets/logo_icon.png" alt="Ruta-Go Logo" className="w-5 h-5 md:w-7 md:h-7 object-contain" />
            </div>
            <span className="text-lg md:text-2xl font-black tracking-tighter text-secondary-900">Ruta-Go</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-4">
            <button onClick={onLogin} className="px-2 md:px-6 py-2 font-bold text-slate-600 hover:text-primary-500 transition-colors text-[10px] md:text-sm">
              Iniciar Sesión
            </button>
            <button onClick={onRegisterOwner} className="px-3 md:px-6 py-2 bg-secondary-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-[9px] md:text-sm uppercase tracking-wider">
              Ser Dueño
              <span className="hidden md:inline"> de Flota</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <header className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden relative">
        <div className="absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-4 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary-50 rounded-full text-primary-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-primary-100 mx-auto lg:mx-0">
              <Star size={12} className="md:size-[14px]" /> El futuro del transporte huilense
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight">
              Conectando <span className="text-primary-500">Nátaga</span> y La Plata con tecnología.
            </h1>
            <p className="text-base md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 md:px-0">
              Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <a
                href="https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-10 py-3.5 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-lg"
              >
                Descargar App <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={onRegisterOwner} className="px-6 md:px-10 py-3.5 md:py-5 bg-slate-50 text-slate-700 font-black rounded-2xl border border-slate-200 hover:bg-white transition-all active:scale-95 text-sm md:text-lg">
                Afiliar mi vehículo
              </button>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="bg-gradient-to-tr from-secondary-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2">
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner">
                <img
                   src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069"
                   alt="Ruta-Go App Preview"
                   className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </div>
            {/* Float Cards */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce-slow">
              <div className="w-10 h-10 md:w-12 h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500"><Star size={22} fill="currentColor" /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Calificación App</p>
                <p className="text-base md:text-lg font-black text-slate-800 leading-none">4.9 / 5.0</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🏛️ VALUE PROPOSITIONS */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-secondary-900 tracking-tight px-4">Soluciones para todo el ecosistema</h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">Haz clic en tu perfil para comenzar.</p>
          </div>

          {/* Versión Desktop: Grid de 3 */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {solutions.map((sol, index) => (
              <ValueCard key={index} {...sol} onClick={sol.action} isStatic />
            ))}
          </div>

          {/* Versión Mobile: Slider Animado */}
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
                   <ValueCard {...sol} onClick={sol.action} />
                 </div>
               );
             })}

             {/* Controles de Navegación (Puntos) */}
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
               {solutions.map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setActiveCard(i)}
                   className={`h-2 rounded-full transition-all duration-300 ${
                     i === activeSolution ? 'w-8 bg-primary-500' : 'w-2 bg-slate-200'
                   }`}
                 />
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 🚌 ROUTES SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-secondary-900 tracking-tight max-w-2xl px-4">
            Conectamos los puntos más importantes del sur del Huila.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <RouteBadge city="Nátaga" />
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 transform rotate-90 sm:rotate-0">
               <ChevronRight />
            </div>
            <RouteBadge city="La Plata" />
          </div>
        </div>
      </section>

      {/* 🚀 CTA FOOTER */}
      <footer className="bg-secondary-900 py-16 md:py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            ¿Listo para llevar tu flota <br className="hidden md:block" />al siguiente nivel?
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto px-4">
            Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0">
             <button onClick={onRegisterOwner} className="px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider">
               Quiero ser Socio
             </button>
             <button onClick={onLogin} className="px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider">
               Acceso Administrativo
             </button>
          </div>

          <div className="pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <img src="/assets/logo_icon.png" alt="Ruta-Go Logo" className="w-7 h-7 object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tighter">Ruta-Go</span>
            </div>
            <div className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] order-3 md:order-none">
               ChopCode Solutions © 2026 • Huila, CO
            </div>
            <div className="flex justify-center md:justify-end gap-6 text-white/40 text-sm md:text-base order-2 md:order-none">
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

function ValueCard({ icon, title, desc, color, features, onClick, isStatic }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group cursor-pointer active:scale-95 ${
        isStatic ? 'hover:shadow-2xl hover:-translate-y-2' : ''
      }`}
    >
      <div className={`mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-slate-50 ${color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-black text-secondary-900 mb-3 md:mb-4">{title}</h3>
      <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-8">{desc}</p>
      <ul className="space-y-2 md:space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">
            <CheckCircle2 size={14} className="text-green-500 md:size-4" /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-primary-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Ir ahora <ChevronRight size={14} />
      </div>
    </div>
  );
}

function RouteBadge({ city }) {
  return (
    <div className="px-6 md:px-10 py-4 md:py-6 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border border-slate-100 flex items-center gap-3 md:gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-md flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform">
        <MapPin size={20} className="md:size-6" />
      </div>
      <span className="text-lg md:text-2xl font-black text-slate-800">{city}</span>
    </div>
  );
}
