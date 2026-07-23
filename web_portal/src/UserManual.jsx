import React from 'react';
import {
  ArrowLeft, BookOpen, Users, Bus, Briefcase,
  ShieldQuestion, CheckCircle2, MapPin, Calendar,
  Smartphone, MousePointer2, CreditCard, Ticket,
  ClipboardCheck, UserPlus, TrendingUp, Trash2,
  HelpCircle, Info, ShieldCheck, Zap
} from 'lucide-react';

/**
 * 📖 Componente: UserManual
 * Guía detallada adaptada al rol del usuario logueado.
 */
export default function UserManual({ role, onBack, isTab = false }) {
  const userRole = role?.type || 'PASSENGER';

  const sections = {
    PASSENGER: {
      title: "Guía del Pasajero",
      icon: <Users className="text-blue-400" />,
      color: "blue",
      steps: [
        { title: "Búsqueda de Horarios", desc: "Usa las pestañas en el Dashboard para alternar entre rutas. El sistema marcará automáticamente el próximo viaje disponible con un borde naranja brillante.", icon: <Calendar /> },
        { title: "Reserva de Asiento", desc: "Haz clic en 'Reservar' en el horario deseado. Se abrirá el mapa del bus; toca un asiento libre (blanco) para seleccionarlo.", icon: <MousePointer2 /> },
        { title: "Confirmación", desc: "Verifica el precio y confirma tu reserva. Tu asiento quedará bloqueado instantáneamente para los demás.", icon: <Ticket /> },
        { title: "Instalación en iPhone", desc: "En Safari, toca 'Compartir' > 'Añadir a pantalla de inicio'. Así tendrás acceso rápido como si fuera una App nativa.", icon: <Zap /> }
      ]
    },
    DRIVER: {
      title: "Guía del Conductor",
      icon: <Bus className="text-primary-500" />,
      color: "orange",
      steps: [
        { title: "Tu Itinerario", desc: "En 'Mi Itinerario' verás tus turnos asignados. El sistema resalta el viaje que te corresponde realizar a continuación.", icon: <Calendar /> },
        { title: "Ventas de Calle", desc: "Usa el botón naranja (+) para abrir el mapa del bus y marcar asientos vendidos a pasajeros que abordan sin reserva previa.", icon: <PlusCircle /> },
        { title: "Confirmar Reservas", desc: "En la sección 'Confirmar Reservas', toca el botón verde al lado de cada pasajero cuando suban al bus para formalizar el ingreso.", icon: <ClipboardCheck /> },
        { title: "Sincronización", desc: "Todos tus cambios se reflejan en tiempo real para los pasajeros y el dueño de la flota.", icon: <ShieldCheck /> }
      ]
    },
    OWNER: {
      title: "Guía del Socio/Dueño",
      icon: <Briefcase className="text-amber-400" />,
      color: "amber",
      steps: [
        { title: "Dashboard de Flota", desc: "Monitorea en tiempo real cuántos de tus vehículos están en ruta y el recaudo bruto acumulado del día.", icon: <TrendingUp /> },
        { title: "Gestión de Operadores", desc: "Usa la sección 'Conductores' para vincular nuevos choferes a tus activos usando su correo electrónico.", icon: <UserPlus /> },
        { title: "Privacidad de Datos", desc: "Tu información financiera está aislada; ningún otro dueño puede ver tus ingresos o telemetría.", icon: <ShieldQuestion /> },
        { title: "Planilla Maestra", desc: "Consulta los despachos globales para coordinar la logística de tus buses con el resto del holding.", icon: <MapPin /> }
      ]
    },
    ADMIN: {
      title: "Guía de Administrador",
      icon: <ShieldCheck className="text-green-400" />,
      color: "green",
      steps: [
        { title: "Control Maestro", desc: "Tienes visibilidad total sobre todos los dueños, conductores y pasajeros del sistema.", icon: <TrendingUp /> },
        { title: "Gobernanza", desc: "Puedes gestionar solicitudes de borrado de cuenta y verificar la integridad de los datos en tiempo real.", icon: <ShieldCheck /> },
        { title: "Configuración Global", desc: "Acceso a la planilla de despachos para ajustar horarios y rutas base.", icon: <MapPin /> }
      ]
    }
  };

  const currentSection = sections[userRole] || sections.PASSENGER;

  const content = (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
        <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/20 transform -rotate-3">
          <BookOpen size={40} />
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase italic">Centro de Ayuda</h2>
          <p className="text-white/40 font-medium text-sm">Explora las funcionalidades clave para tu rol de <span className="text-primary-500 font-bold">{userRole}</span>.</p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4 px-2">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
            {currentSection.icon}
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{currentSection.title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSection.steps.map((step, i) => (
            <div key={i} className="card-navy p-8 rounded-[2.5rem] hover:ring-2 ring-primary-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-primary-500 group-hover:scale-110 transition-transform">
                  {step.icon || <Info size={20} />}
                </div>
                <h4 className="font-black text-white uppercase text-sm tracking-widest">{step.title}</h4>
              </div>
              <p className="text-white/40 text-sm leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-red-500/5 p-8 md:p-10 rounded-[2.5rem] border border-red-500/10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
            <Trash2 size={24} />
          </div>
          <h3 className="text-xl font-black text-red-500 uppercase italic">Seguridad y Privacidad</h3>
        </div>
        <p className="text-red-500/60 text-sm leading-relaxed font-medium">
          Tus datos están protegidos bajo la ley de Habeas Data. Si deseas retirarte de la plataforma, solicita el borrado desde tu Perfil. Tendrás un periodo de gracia de 30 días antes de la eliminación definitiva.
        </p>
      </section>

      <footer className="text-center pb-10">
        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
          ChopCode Solutions © 2026 • Soporte: dazace94@gmail.com
        </p>
      </footer>
    </div>
  );

  if (isTab) return content;

  return (
    <div className="min-h-screen bg-[#061426] text-white font-sans overflow-y-auto">
      <nav className="h-20 flex items-center gap-4 px-6 border-b border-white/5 sticky top-0 bg-[#061426]/80 backdrop-blur-md z-50">
        <button onClick={onBack} className="p-3 text-white/40 hover:text-primary-500 hover:bg-white/5 rounded-2xl transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">Manual de Usuario</h1>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {content}
      </div>
    </div>
  );
}

function PlusCircle() {
  return <Zap size={20} />;
}
