import React from 'react';
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
export default function LandingPage({ onLogin, onRegisterOwner }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100">

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/20">R</div>
            <span className="text-2xl font-black tracking-tighter text-secondary-900">Ruta-Go</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="px-6 py-2.5 font-bold text-slate-600 hover:text-primary-500 transition-colors text-sm">
              Iniciar Sesión
            </button>
            <button onClick={onRegisterOwner} className="px-6 py-2.5 bg-secondary-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-sm uppercase tracking-wider">
              Ser Dueño de Flota
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <header className="pt-40 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-black text-[10px] uppercase tracking-widest border border-primary-100">
              <Star size={14} /> El futuro del transporte huilense
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight">
              Conectando <span className="text-primary-500">Natagá</span> y La Plata con tecnología.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3 group text-lg"
              >
                Descargar App <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={onRegisterOwner} className="px-10 py-5 bg-slate-50 text-slate-700 font-black rounded-2xl border border-slate-200 hover:bg-white transition-all active:scale-95 text-lg">
                Afiliar mi vehículo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-tr from-secondary-900 to-slate-800 rounded-[3rem] p-8 shadow-2xl shadow-slate-900/20 transform rotate-2">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-inner">
                <img
                   src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069"
                   alt="Ruta-Go App Preview"
                   className="w-full h-96 object-cover"
                />
              </div>
            </div>
            {/* Float Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600"><CheckCircle2 /></div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Asientos Libres</p>
                <p className="text-lg font-black text-slate-800 leading-none">12 Disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🏛️ VALUE PROPOSITIONS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black text-secondary-900 tracking-tight">Soluciones para todo el ecosistema</h2>
            <p className="text-slate-500 font-medium">Diseñamos una herramienta pensada en la productividad y comodidad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pasajeros */}
            <ValueCard
              icon={<Users size={32} />}
              title="Pasajeros"
              desc="Adiós a la incertidumbre. Reserva tu asiento desde casa, acumula Puntos Go en cada viaje y sube de nivel para desbloquear beneficios exclusivos."
              color="text-blue-500"
              features={['Puntos Go por fidelidad', 'Estatus PRO (Plata/Oro/Diamante)', 'Chat directo con el conductor']}
            />
            {/* Conductores */}
            <ValueCard
              icon={<Bus size={32} />}
              title="Conductores"
              desc="Optimiza tus ingresos con el Estatus Estrella. Gestiona tu planilla digital, visualiza tu rentabilidad diaria y asegura tus cupos antes de salir."
              color="text-primary-500"
              features={['Estatus Estrella de confianza', 'Check-in digital de pasajeros', 'Reporte de rentabilidad diaria']}
            />
            {/* Dueños */}
            <ValueCard
              icon={<TrendingUp size={32} />}
              title="Dueños de Flota"
              desc="Control room total de tus activos. Vigila la ocupación en tiempo real, monitorea ingresos y recibe alertas legales de tu flota desde un solo lugar."
              color="text-green-500"
              features={['Aislamiento de datos de propiedad', 'Seguimiento de buses en vivo', 'Panel financiero centralizado']}
            />
          </div>
        </div>
      </section>

      {/* 🚌 ROUTES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-12">
          <h2 className="text-4xl font-black text-secondary-900 tracking-tight max-w-2xl">
            Conectamos los puntos más importantes del sur del Huila.
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <RouteBadge city="Natagá" />
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
               <ChevronRight />
            </div>
            <RouteBadge city="La Plata" />
          </div>
        </div>
      </section>

      {/* 🚀 CTA FOOTER */}
      <footer className="bg-secondary-900 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10">
          <h2 className="text-5xl font-black tracking-tight leading-tight">
            ¿Listo para llevar tu flota <br />al siguiente nivel?
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
             <button onClick={onRegisterOwner} className="px-12 py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 text-xl uppercase tracking-wider">
               Quiero ser Socio
             </button>
             <button onClick={onLogin} className="px-12 py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-xl uppercase tracking-wider">
               Acceso Administrativo
             </button>
          </div>

          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm">R</div>
              <span className="text-xl font-bold tracking-tighter">Ruta-Go</span>
            </div>
            <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
               ChopCode Solutions © 2026 • Huila, CO
            </div>
            <div className="flex justify-center md:justify-end gap-6 text-white/40">
               <span className="hover:text-primary-500 cursor-pointer transition-colors">Privacidad</span>
               <span className="hover:text-primary-500 cursor-pointer transition-colors">Términos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ValueCard({ icon, title, desc, color, features }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
      <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 ${color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-secondary-900 mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-8">{desc}</p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
            <CheckCircle2 size={16} className="text-green-500" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RouteBadge({ city }) {
  return (
    <div className="px-10 py-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform">
        <MapPin size={24} />
      </div>
      <span className="text-2xl font-black text-slate-800">{city}</span>
    </div>
  );
}
