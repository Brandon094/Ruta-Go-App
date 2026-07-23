import React from 'react';
import {
  ArrowLeft, BookOpen, Users, Bus, Briefcase,
  ShieldQuestion, CheckCircle2, MapPin, Calendar,
  Smartphone, MousePointer2, CreditCard, Ticket,
  ClipboardCheck, UserPlus, TrendingUp, Trash2
} from 'lucide-react';

/**
 * 📖 Componente: UserManual
 * Guía detallada y explicativa para todos los actores del ecosistema.
 */
export default function UserManual({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm">R</div>
            <h1 className="text-xl font-black text-secondary-900 tracking-tight">Manual de Usuario</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        <header className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary-500/20 transform -rotate-3">
            <BookOpen size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-none">Centro de Aprendizaje</h2>
            <p className="text-slate-500 font-medium text-lg italic">Domina el ecosistema Ruta-Go en pocos pasos.</p>
          </div>
        </header>

        {/* 🚶 1. PASAJEROS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">1. Guía para Pasajeros (App Móvil)</h3>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Reserva y viaja sin estrés</p>
            </div>
          </div>

          <div className="space-y-6">
            <Step
              num="1"
              title="Registro e Identidad"
              icon={<Smartphone />}
              desc="Descarga la App en la Play Store. Regístrate con tu correo o usa Google para entrar instantáneamente. Tu número de teléfono es vital para que el conductor te contacte si hay algún retraso."
            />
            <Step
              num="2"
              title="Selección de Trayecto"
              icon={<MapPin />}
              desc="En el Dashboard principal, verás las pestañas 'Nátaga -> La Plata' y 'La Plata -> Nátaga'. Elige tu destino y verás la lista de horarios disponibles."
            />
            <Step
              num="3"
              title="Elige tu Asiento"
              icon={<MousePointer2 />}
              desc="Al tocar un horario, se abrirá el mapa del vehículo. Los asientos verdes están libres. Toca el que prefieras y se tornará naranja. ¡Tú tienes el control de tu comodidad!"
            />
            <Step
              num="4"
              title="Confirmación y Tiquete"
              icon={<Ticket />}
              desc="Revisa el resumen de tu reserva y confirma. Se generará un tiquete digital con un código único. No necesitas imprimirlo; muéstralo desde tu celular al abordar."
            />
          </div>
        </section>

        {/* 👨‍✈️ 2. CONDUCTORES */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
              <Bus size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">2. Guía para Conductores (App Móvil)</h3>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Optimización de ruta y ventas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailBox
              title="Gestión de Planilla"
              icon={<Calendar className="text-primary-500" />}
              points={[
                "Visualiza tus horarios asignados en la pantalla de inicio.",
                "Usa el botón (+) para registrar pasajeros que abordan en la calle (Venta Física).",
                "El inventario se sincroniza en milisegundos para evitar sobreventa."
              ]}
            />
            <DetailBox
              title="Validación de Abordaje"
              icon={<ClipboardCheck className="text-green-500" />}
              points={[
                "En 'Reservas Pendientes' verás a quienes reservaron por la App.",
                "Toca 'Confirmar Abordaje' cuando el pasajero suba al bus.",
                "Esto asegura que el cupo se marque como 'Finalizado' y se sume a tus ingresos."
              ]}
            />
          </div>
        </section>

        {/* 💼 3. SOCIOS / DUEÑOS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <div className="w-14 h-14 bg-secondary-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Briefcase size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">3. Guía para Socios (Portal Web)</h3>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Inteligencia de negocios y activos</p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <TrendingUp className="text-primary-500" />
                   <h4 className="font-black text-slate-800 uppercase tracking-tight">Monitoreo Financiero</h4>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Desde tu Dashboard puedes ver el recaudo bruto de toda tu flota en tiempo real.
                  El sistema suma automáticamente los tiquetes confirmados por tus conductores.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <UserPlus className="text-blue-500" />
                   <h4 className="font-black text-slate-800 uppercase tracking-tight">Vinculación de Personal</h4>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Para asignar un conductor a tu bus, usa el buscador por Email.
                  Esto creará una relación atómica que permite al chofer operar el vehículo bajo tu supervisión.
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
               <ShieldQuestion className="text-primary-500 shrink-0" size={24} />
               <p className="text-xs text-slate-600 font-medium leading-relaxed">
                 <strong className="text-secondary-900">Aislamiento Comercial:</strong> Ningún otro socio puede ver tus ingresos o la ubicación de tus conductores. Tu información financiera está cifrada y blindada por tu ID de dueño.
               </p>
            </div>
          </div>
        </section>

        {/* 🛡️ 4. DERECHO AL OLVIDO */}
        <section className="bg-red-50 p-8 md:p-10 rounded-[2.5rem] border border-red-100 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-black text-red-900">Derecho al Olvido (Eliminar Cuenta)</h3>
          </div>
          <div className="space-y-4">
            <p className="text-red-700/80 text-sm leading-relaxed font-medium">
              Si deseas retirar tus datos del ecosistema Ruta-Go, el proceso es autónomo e irreversible tras el plazo de gracia:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50">
                 1. Ve a Perfil > Editar Perfil > Solicitar borrar cuenta.
               </div>
               <div className="bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50">
                 2. Tus datos entran en periodo de gracia por 30 días.
               </div>
            </div>
          </div>
        </section>

        <footer className="text-center pb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border-t border-slate-200 pt-10">
             <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronización Realtime</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Habeas Data OK</span>
             </div>
          </div>
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            ChopCode Solutions © 2026 • Huila, Colombia
          </p>
        </footer>
      </main>
    </div>
  );
}

function Step({ num, title, desc, icon }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:border-primary-500 group-hover:text-primary-500 transition-all shadow-sm">
          {num}
        </div>
        <div className="flex-1 w-0.5 bg-slate-200 my-2 group-last:hidden"></div>
      </div>
      <div className="pb-10 space-y-2">
        <div className="flex items-center gap-3">
          <div className="text-slate-300 group-hover:text-primary-500 transition-colors">{icon}</div>
          <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{title}</h4>
        </div>
        <p className="text-slate-500 leading-relaxed text-sm max-w-2xl">{desc}</p>
      </div>
    </div>
  );
}

function DetailBox({ title, icon, points }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        {icon}
        <h4 className="font-black text-slate-800 uppercase tracking-tight">{title}</h4>
      </div>
      <ul className="space-y-4">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-500 leading-relaxed">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 shrink-0"></span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
