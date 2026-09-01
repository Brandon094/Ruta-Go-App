import React from 'react';
import {
  ArrowLeft, BookOpen, Users, Bus, Briefcase,
  ShieldQuestion, MapPin, Calendar,
  Smartphone, MousePointer2, Ticket,
  ClipboardCheck, UserPlus, TrendingUp, Trash2,
  ShieldCheck, Zap, Search, Key, Star, CreditCard
} from 'lucide-react';
import { Button } from './components/ui/Button';
import { ManualSection } from './components/manual/ManualSection';

/**
 * 📖 Componente: UserManual (Refactorizado v1.8.2)
 * Guía explícita y detallada siguiendo Atomic Design y DRY.
 */
export default function UserManual({ role, onBack, isTab = false }) {
  const userRole = role?.type || 'PASSENGER';

  const manuals = {
    PASSENGER: {
      title: "Guía Detallada del Pasajero",
      icon: Users,
      color: "blue",
      steps: [
        {
          title: "1. Encontrar tu Viaje",
          icon: Search,
          description: "Entra a la pestaña 'Inicio'. Arriba verás dos botones: 'NATAGÁ ➔ LA PLATA' y 'LA PLATA ➔ NATAGÁ'. Toca el que necesites. Busca el horario que te sirva; si tiene un borde naranja y dice 'SIGUIENTE', es el bus que sale más pronto."
        },
        {
          title: "2. Reservar tu Asiento",
          icon: MousePointer2,
          description: "Toca el botón naranja con el signo (+). Se abrirá el mapa del bus. Los cuadritos con un bus son asientos libres. Toca el que quieras (se pondrá verde) y luego dale al botón 'CONFIRMAR' abajo a la derecha. ¡Listo, tu cupo está separado!"
        },
        {
          title: "3. Tu Tiquete Digital",
          icon: Ticket,
          description: "Ve a la pestaña 'Historial' (el icono del reloj abajo). Busca tu viaje y toca el botón 'TIQUETE'. Ahí verás tu número de asiento, el precio y el nombre del conductor. Puedes mostrarle esta pantalla al conductor al subir al bus."
        },
        {
          title: "4. Hablar con el Conductor",
          icon: Zap,
          description: "Si el conductor ya confirmó tu viaje, en la misma pestaña de 'Historial' aparecerá un botón azul de 'CHAT'. Tócalo para escribirle si vas tarde o para preguntarle por dónde viene el bus."
        },
        {
          title: "5. Puntos y Premios",
          icon: Star,
          description: "Cada vez que viajas, ganas 'Puntos Go'. Puedes ver cuántos tienes entrando a tu 'Perfil'. Entre más viajes, más puntos acumulas para obtener descuentos y beneficios en futuros trayectos."
        },
        {
          title: "6. Ruta-Go en tu iPhone",
          icon: Smartphone,
          description: "Si usas iPhone, abre el portal en Safari. Toca el icono de compartir (un cuadrado con una flecha hacia arriba) y busca la opción 'Añadir a pantalla de inicio'. Así tendrás el icono de Ruta-Go como una App normal."
        }
      ]
    },
    DRIVER: {
      title: "Guía de Operación para Conductores",
      icon: Bus,
      color: "amber",
      steps: [
        {
          title: "1. Ver tus Turnos",
          icon: Calendar,
          description: "Entra a 'Mi Itinerario'. Allí aparecerán los horarios que tienes asignados para hoy. El sistema te avisará cuál es tu próximo despacho para que estés pendiente de la salida."
        },
        {
          title: "2. Confirmar Pasajeros",
          icon: ClipboardCheck,
          description: "Cuando un pasajero suba al bus, búscalo en la lista de 'Check-in' o en el detalle de la ruta. Toca el botón verde 'CONFIRMAR'. Esto es muy importante para que el sistema sepa que el asiento ya está ocupado físicamente."
        },
        {
          title: "3. Vender a Pasajeros de Calle",
          icon: Key,
          description: "Si alguien te pide puesto en el camino, toca el botón naranja (+) para abrir el mapa del bus. Toca el asiento vacío y dale a 'BLOQUEAR'. Esto evita que alguien lo reserve por la App y te ayuda a llevar tus cuentas de dinero claras."
        },
        {
          title: "4. Revisar tus Ganancias",
          icon: TrendingUp,
          description: "En tu panel principal verás un cuadro que dice 'Ingresos'. Allí el sistema te suma automáticamente lo de las reservas de la App y lo que bloqueaste manualmente. ¡Tus cuentas siempre claras!"
        }
      ]
    },
    OWNER: {
      title: "Manual de Gestión para Socios",
      icon: Briefcase,
      color: "amber",
      steps: [
        {
          title: "1. Control de Flota",
          icon: TrendingUp,
          description: "En tu Dashboard verás el resumen de todos tus vehículos. Puedes saber cuántas reservas hay en total y cuánto dinero ha generado tu flota el día de hoy en tiempo real."
        },
        {
          title: "2. Administrar Vehículos",
          icon: Bus,
          description: "En la pestaña 'Vehículos' puedes ver tus buses. Toca uno para ver quién lo está manejando. Si compras un bus nuevo, usa el botón 'Añadir Vehículo' para registrar la placa, modelo y capacidad."
        },
        {
          title: "3. Vincular Conductores",
          icon: UserPlus,
          description: "Para que un chofer maneje uno de tus buses, ve a 'Conductores' y dale a 'Vincular'. Solo necesitas el correo con el que él se registró en la App. El sistema los unirá automáticamente."
        },
        {
          title: "4. Monitor de Despachos",
          icon: MapPin,
          description: "En 'Despachos' puedes ver la lista de todos los viajes que están haciendo tus buses. Puedes entrar a ver quiénes son los pasajeros y si el conductor ya confirmó los abordajes."
        }
      ]
    },
    ADMIN: {
      title: "Manual de Control Maestro (Root)",
      icon: ShieldCheck,
      color: "green",
      steps: [
        {
          title: "1. Panel Maestro & Analítica",
          icon: TrendingUp,
          description: "Desde el 'Panel Maestro' ves las métricas globales en tiempo real: total de usuarios, flota activa, reservas confirmadas y consolidado de ingresos (App + Ventas de Calle)."
        },
        {
          title: "2. Motor de Rutas y Tarifas",
          icon: MapPin,
          description: "En 'Rutas & Tarifas', crea nuevas rutas regionales (ej: Nátaga ➔ Neiva, La Plata ➔ Gallego) con origen, destino, tarifa y tiempo estimado. Las tarifas se actualizan al instante en todo el ecosistema."
        },
        {
          title: "3. Programación de Despachos (Planilla)",
          icon: Calendar,
          description: "En 'Planilla', usa 'Programar Horario' para habilitar salidas de cualquier ruta. Puedes crear turnos incluso sin asignar conductor previo. Usa el botón Lápiz (✏️) para modificar hora, tarifa o bus en tiempo real."
        },
        {
          title: "4. Promoción y Gestión de Socios",
          icon: Briefcase,
          description: "En 'Socios', aprueba cuentas de dueños o usa 'Ascender Socio por Correo' para promover directamente a cualquier usuario registrado al rol de Socio de flota."
        },
        {
          title: "5. Asignación de Conductores por Ruta",
          icon: UserPlus,
          description: "En 'Conductores', selecciona el operador y elige la ruta. Para Nátaga ➔ La Plata, asigna su turno del escalafón de 9 días (se calcula su posición automáticamente). Para otras rutas, elige los horarios específicos dedicados."
        },
        {
          title: "6. Moderación y Cumplimiento",
          icon: Users,
          description: "En 'Pasajeros', gestiona estados de cuentas (activas, bloqueadas). El sistema cumple con la Ley de Habeas Data con proceso de borrado seguro a los 30 días."
        }
      ]
    }
  };

  const currentManual = manuals[userRole] || manuals.PASSENGER;

  const content = (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header del Manual */}
      <header className="flex flex-col md:flex-row items-center gap-8 p-10 bg-white dark:bg-[#0A1F30] rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

        <div className="w-24 h-24 bg-primary-500 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-primary-500/20 transform -rotate-3 shrink-0">
          <BookOpen size={48} />
        </div>

        <div className="text-center md:text-left space-y-2 relative z-10">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-none uppercase italic">Centro de Ayuda</h2>
          <p className="text-slate-500 dark:text-white/40 font-medium text-base">
            Instrucciones sencillas diseñadas para tu rol de <span className="text-primary-500 font-black">{userRole}</span>.
          </p>
        </div>
      </header>

      {/* Sección Dinámica */}
      <ManualSection
        title={currentManual.title}
        icon={currentManual.icon}
        steps={currentManual.steps}
        color={currentManual.color}
      />

      {/* Bloque de Seguridad (Footer Informativo) */}
      <div className="bg-red-50 dark:bg-red-500/5 p-10 md:p-12 rounded-[3rem] border-2 border-dashed border-red-100 dark:border-red-500/10 space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-500 shadow-sm">
            <ShieldQuestion size={28} />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-red-800 dark:text-red-500 uppercase italic leading-none">Seguridad de tus Datos</h3>
            <p className="text-red-700/60 dark:text-red-500/40 text-[10px] font-bold uppercase tracking-widest mt-2">Ley 1581 de Protección de Datos</p>
          </div>
        </div>
        <p className="text-red-700/80 dark:text-red-500/60 text-sm leading-relaxed font-medium text-left">
          En Ruta-Go nos tomamos en serio tu privacidad. Toda tu información personal y financiera está cifrada. Si alguna vez decides dejar de usar el servicio, puedes solicitar el borrado de tu cuenta desde el Perfil. Tendrás 30 días para arrepentirte antes de que borremos todo para siempre.
        </p>
      </div>

      <footer className="text-center pb-12">
        <div className="w-16 h-1 bg-slate-100 dark:bg-white/5 mx-auto mb-8 rounded-full"></div>
        <p className="text-[10px] text-slate-300 dark:text-white/20 font-black uppercase tracking-[0.4em]">
          ChopCode Solutions © 2026 • Tecnología para el Transporte Intermunicipal
        </p>
      </footer>
    </div>
  );

  if (isTab) return content;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-white font-sans overflow-y-auto transition-colors duration-300">
      <nav className="h-20 flex items-center gap-4 px-6 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          icon={ArrowLeft}
          className="!p-3 rounded-2xl"
        >
        </Button>
        <div className="flex items-center gap-3">
          <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">Manual Operativo</h1>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {content}
      </div>
    </div>
  );
}
