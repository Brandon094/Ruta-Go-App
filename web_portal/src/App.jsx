import React, { useState, useEffect } from 'react';
import {
  Users,
  Bus,
  Calendar,
  Activity,
  MapPin,
  Loader2,
  UserPlus,
  CheckCircle2,
  Ticket
} from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

// Components
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Terms from './Terms';
import Privacy from './Privacy';
import UserManual from './UserManual';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { StatCard } from './components/dashboard/StatCard';
import { RouteProgress } from './components/dashboard/RouteProgress';
import { DriverCard } from './components/drivers/DriverCard';
import { EditDriverModal } from './components/drivers/EditDriverModal';
import { AddDriverModal } from './components/drivers/AddDriverModal';
import { UserCard } from './components/users/UserCard';
import { ScheduleTable } from './components/schedules/ScheduleTable';
import { SeatManagementModal } from './components/schedules/SeatManagementModal';

// Hooks
import { useRealtimeStats } from './hooks/useRealtimeStats';

/**
 * 🖥️ Ruta-Go Admin Portal - Componente Principal
 */
function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'register' | 'terms' | 'privacy' | 'manual'
  const [registerMode, setRegisterMode] = useState('owner');
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Estado para el Sidebar responsivo
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Estado para gestión de conductores
  const [editingDriver, setEditingDriver] = useState(null);
  const [isAddingDriver, setIsAddingDriver] = useState(false);
  const [managingSchedule, setManagingSchedule] = useState(null);

  // Sincronización de Sesión
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  // Hook de Datos en Tiempo Real (Con soporte de Roles)
  const { role, stats, drivers, users, schedules, reservations, routeStats } = useRealtimeStats(user);

  if (loadingAuth) {
    return (
      <div className="h-screen bg-secondary-900 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-16 h-16 object-contain animate-pulse" />
          <Loader2 className="text-primary-500 animate-spin absolute -bottom-2 -right-2" size={24} />
        </div>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">Autenticando...</p>
      </div>
    );
  }

  if (!user) {
    if (view === 'login') return (
      <Login
        onBack={() => setView('landing')}
        onShowRegister={() => {
          setRegisterMode('owner');
          setView('register');
        }}
      />
    );
    if (view === 'register') return <Register onBack={() => setView('landing')} initialMode={registerMode} />;
    if (view === 'terms') return <Terms onBack={() => setView('landing')} />;
    if (view === 'privacy') return <Privacy onBack={() => setView('landing')} />;
    if (view === 'manual') return <UserManual onBack={() => setView('landing')} />;
    return (
      <LandingPage
        onLogin={() => setView('login')}
        onRegisterOwner={() => {
          setRegisterMode('owner');
          setView('register');
        }}
        onRegisterPassenger={() => {
          setRegisterMode('passenger');
          setView('register');
        }}
        onViewTerms={() => setView('terms')}
        onViewPrivacy={() => setView('privacy')}
        onViewManual={() => setView('manual')}
      />
    );
  }

  // Si no es admin ni dueño ni conductor ni pasajero (Cargando o Fallo)
  if (!stats.loading && !role?.type) {
    return (
      <div className="h-screen bg-secondary-900 flex flex-col items-center justify-center p-10 text-center gap-6">
        <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center text-red-500">
          <Activity size={40} />
        </div>
        <div>
          <h2 className="text-white text-2xl font-black tracking-tight">Acceso Denegado</h2>
          <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">Tu cuenta no tiene permisos para este portal.</p>
        </div>
        <button onClick={() => auth.signOut()} className="px-8 py-3 bg-white text-secondary-900 font-bold rounded-xl shadow-xl active:scale-95 transition-all">
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 antialiased font-sans overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={role}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          title={
            activeTab === 'overview' ?
              (!role?.type ? 'Cargando...' :
               role.type === 'ADMIN' ? 'Panel Maestro' :
               role.type === 'OWNER' ? 'Dashboard Dueño' :
               role.type === 'DRIVER' ? 'Panel de Conductor' :
               'Centro de Reservas') :
            activeTab === 'history' ? 'Historial de Reservas' :
            activeTab === 'profile' ? 'Mi Perfil de Usuario' :
            activeTab === 'drivers' ? 'Gestión de Conductores' :
            activeTab === 'users' ? 'Base de Clientes (Pasajeros)' :
            activeTab === 'schedules' ? 'Planilla de Despachos' :
            'Dashboard'
          }
          userEmail={user.email}
          onMenuClick={() => setIsSidebarOpen(true)}
          role={role}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50">
          {activeTab === 'overview' ? (
            role?.type === 'PASSENGER' ? (
              <PassengerOverview routeStats={routeStats} schedules={schedules} drivers={drivers} role={role} />
            ) : role?.type === 'DRIVER' ? (
              <DriverOverview
                stats={stats}
                routeStats={routeStats}
                schedules={schedules}
                drivers={drivers}
                reservations={reservations}
                role={role}
                onManage={(s) => setManagingSchedule(s)}
              />
            ) : (
              <Overview stats={stats} routeStats={routeStats} role={role} />
            )
          ) : activeTab === 'history' ? (
            <HistoryDirectory reservations={reservations} role={role} />
          ) : activeTab === 'profile' ? (
            <ProfileDirectory user={user} role={role} />
          ) : activeTab === 'drivers' ? (
            <DriverDirectory
              drivers={drivers}
              onEditDriver={(driver) => setEditingDriver(driver)}
              onAddDriver={() => setIsAddingDriver(true)}
            />
          ) : activeTab === 'users' ? (
            <UserDirectory users={users} />
          ) : activeTab === 'schedules' ? (
            <ScheduleDirectory
              schedules={schedules}
              drivers={drivers}
              role={role}
              onManage={(s) => setManagingSchedule(s)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 font-medium italic">
              Módulo en desarrollo (Fase 2)...
            </div>
          )}
        </div>
      </main>

      {/* Modal Global de Edición */}
      {editingDriver && (
        <EditDriverModal
          driver={editingDriver}
          onClose={() => setEditingDriver(null)}
          onRefresh={() => {}} // Hook onValue refresca automáticamente
        />
      )}

      {/* Modal de Registro de Nuevo Conductor */}
      {isAddingDriver && (
        <AddDriverModal
          onClose={() => setIsAddingDriver(false)}
          users={users}
          currentUser={user}
          role={role}
        />
      )}

      {/* Modal de Gestión de Asientos (Conductor) */}
      {managingSchedule && (
        <SeatManagementModal
          schedule={managingSchedule}
          onClose={() => setManagingSchedule(null)}
        />
      )}
    </div>
  );
}

/**
 * 📊 Sub-vista: Resumen General (Admin/Owner)
 */
function Overview({ stats, routeStats, role }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  };

  const isAdmin = role?.type === 'ADMIN';

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-3'} gap-8 mb-10`}>
        {isAdmin && (
          <>
            <StatCard label="Usuarios Activos" value={stats.totalUsers} icon={<Users className="text-blue-500" />} trend="Habeas Data OK" />
            <StatCard label="Dueños de Flota" value={stats.totalOwners} icon={<Users className="text-amber-500" />} trend="Socios Activos" />
          </>
        )}
        <StatCard label="Conductores en Turno" value={stats.activeDrivers} icon={<Bus className="text-green-500" />} trend="Estado: Active" />
        <StatCard label="Reservas Hoy" value={stats.todayReservations} icon={<Calendar className="text-purple-500" />} trend="Fecha Actual" />
        <StatCard label="Ingresos Generados" value={formatCurrency(stats.totalRevenue)} icon={<Activity className="text-primary-500" />} trend={isAdmin ? "Holding Total" : "Tus Vehículos"} />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl text-slate-800 tracking-tight">Estado por ruta</h3>
            <p className="text-xs text-slate-400 font-medium uppercase mt-1">Tráfico de pasajeros en tiempo real</p>
          </div>
          <div className="px-3 py-1 bg-primary-50 rounded-full text-[10px] font-black text-primary-600 uppercase">Live Feedback</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RouteStatCard
            name="Nátaga → La Plata"
            reservations={routeStats.toLaPlata.reservations}
            available={routeStats.toLaPlata.seats}
            color="bg-orange-500"
          />
          <RouteStatCard
            name="La Plata → Nátaga"
            reservations={routeStats.toNataga.reservations}
            available={routeStats.toNataga.seats}
            color="bg-secondary-900"
          />
        </div>
      </div>
    </>
  );
}

function RouteStatCard({ name, reservations, available, color }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
      <div className="space-y-1">
        <h4 className={`text-[10px] font-black uppercase tracking-tight ${color === 'bg-orange-500' ? 'text-primary-500' : 'text-secondary-900'}`}>
          {name}
        </h4>
        <div className={`w-6 h-0.5 rounded-full ${color}`}></div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex-1 flex flex-col items-center text-center space-y-1">
          <Activity size={18} className="text-slate-300" />
          <span className="text-lg font-black text-slate-800 leading-none">{reservations}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Reservas</span>
        </div>
        <div className="w-px h-10 bg-slate-100"></div>
        <div className="flex-1 flex flex-col items-center text-center space-y-1">
          <Bus size={18} className="text-green-500" />
          <span className="text-lg font-black text-green-500 leading-none">{available}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Libres</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 🎒 Sub-vista: Dashboard del Pasajero (iPhone/Web)
 */
function PassengerOverview({ routeStats, schedules, drivers, role }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gradient-to-br from-primary-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-500/20 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl font-black tracking-tight">¡Hola Pasajero! 🎒</h2>
          <p className="text-white/80 font-medium max-w-md">Bienvenido a la Web App de Ruta-Go. Reserva tu próximo viaje de forma rápida y segura.</p>
        </div>
        <img src="/assets/logo_icon.png" className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12" alt="bg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
               <MapPin className="text-primary-500" /> Estado por ruta
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RouteStatCard
                name="Nátaga → La Plata"
                reservations={routeStats.toLaPlata.reservations}
                available={routeStats.toLaPlata.seats}
                color="bg-orange-500"
              />
              <RouteStatCard
                name="La Plata → Nátaga"
                reservations={routeStats.toNataga.reservations}
                available={routeStats.toNataga.seats}
                color="bg-secondary-900"
              />
            </div>
         </div>

         <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl flex flex-col justify-center items-center text-center space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400">
               <Bus size={32} />
            </div>
            <div className="space-y-2">
               <h4 className="text-xl font-black">Reserva en Línea</h4>
               <p className="text-white/40 text-sm">El motor de reservas web está en mantenimiento técnico. Por favor consulta la planilla abajo.</p>
            </div>
            <button className="px-8 py-3 bg-primary-500 text-white font-black rounded-xl text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">
               Próximamente
            </button>
         </div>
      </div>

      <div className="space-y-6 pt-4">
         <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-primary-500 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Planilla de Horarios Realtime</h3>
         </div>
         <ScheduleTable schedules={schedules} drivers={drivers} role={role} />
      </div>
    </div>
  );
}

/**
 * 👨‍✈️ Sub-vista: Dashboard del Conductor (iPhone/Web)
 */
function DriverOverview({ stats, routeStats, schedules, drivers, reservations = [], role, onManage }) {
  // Encontrar la data del conductor actual en la lista global
  const currentDriverData = drivers.find(d => d.id === role.uid) || {};
  const myName = currentDriverData.nombre || 'Cargando...';
  const myPlate = currentDriverData.placaVehiculo || currentDriverData.vehiculoId || '---';

  // Filtrar solo los horarios del conductor actual para el itinerario
  const mySchedules = schedules.filter(s => s.conductorId === role.uid);

  // Filtrar reservas pendientes para este conductor
  const pendingReservations = reservations.filter(r =>
    (r.estadoReserva === 'Pendiente' || r.reservationStatus === 'Pendiente')
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🟠 HEADER NARANJA ESTILO ANDROID */}
      <div className="bg-primary-500 -mt-4 lg:-mt-10 -mx-4 lg:-mx-10 p-6 lg:p-10 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-secondary-900 p-1">
              <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-secondary-900 font-black text-xl lg:text-2xl">
                {myName.substring(0, 1)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black text-secondary-900 tracking-tight">{myName}</h2>
              <p className="text-secondary-900/60 font-bold text-sm lg:text-base uppercase tracking-wider">Placa: {myPlate}</p>
            </div>
          </div>

          <div className="inline-flex items-center px-4 py-2 bg-secondary-900 text-white rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest self-start md:self-auto">
             Conductor Activo
          </div>
        </div>

        {/* 🌑 CARD RESUMEN DEL DÍA (Dentro del área naranja) */}
        <div className="max-w-5xl mx-auto mt-8 lg:mt-12">
          <div className="bg-secondary-900 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/20 border border-white/5">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Resumen del día</h4>
               <button className="text-primary-500 hover:rotate-180 transition-transform duration-500">
                  <Activity size={16} />
               </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <SummaryMetric label="Reservas" value={stats?.todayReservations || 0} color="text-green-500" />
              <SummaryMetric label="Libres" value={currentDriverData.asientosLibres || 26} color="text-primary-500" />
              <SummaryMetric label="Ingresos" value={formatCurrency(stats?.totalRevenue || 0)} color="text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 🚌 SECCIONES DE CONTENIDO (ESTILO ANDROID) */}
      <div className="max-w-5xl mx-auto space-y-10 pb-10">

        {/* ✅ CONFIRMAR RESERVAS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary-500" size={18} />
                <h3 className="text-sm lg:text-base font-black text-slate-800 uppercase tracking-tight">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black">{pendingReservations.length}</span>
          </div>

          {pendingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingReservations.map(res => (
                <div key={res.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                      <Ticket size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">Asiento #{res.asientoReservado || res.reservedSeat}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Pasajero: {res.nombreUsuario || 'App User'}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                    Confirmar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-center text-center">
               <p className="text-slate-400 text-xs font-bold uppercase italic">No hay reservas activas en este momento</p>
            </div>
          )}
        </div>

        {/* 🛣️ ESTADO POR RUTA */}
        <div className="space-y-4">
          <h3 className="text-sm lg:text-base font-black text-slate-800 uppercase tracking-tight px-2">Estado por ruta</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AndroidRouteCard
              name="Nátaga → La Plata"
              reservations={routeStats.toLaPlata.reservations}
              available={routeStats.toLaPlata.seats}
              color="border-orange-500"
            />
            <AndroidRouteCard
              name="La Plata → Nátaga"
              reservations={routeStats.toNataga.reservations}
              available={routeStats.toNataga.seats}
              color="border-secondary-900"
            />
          </div>
        </div>

        {/* 🗓️ MI ITINERARIO */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                 <Calendar className="text-primary-500" size={18} />
                 <h3 className="text-sm lg:text-base font-black text-slate-800 uppercase tracking-tight">Mi Itinerario</h3>
              </div>
              <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black">{mySchedules.length}</span>
           </div>
           <ScheduleTable schedules={mySchedules} drivers={drivers} role={role} onManage={onManage} />
        </div>
      </div>
    </div>
  );
}

function SummaryMetric({ label, value, color }) {
  return (
    <div className="flex flex-col items-center text-center space-y-1">
      <span className={`text-xl lg:text-2xl font-black ${color}`}>{value}</span>
      <span className="text-[9px] lg:text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function AndroidRouteCard({ name, reservations, available, color }) {
  return (
    <div className={`bg-white p-6 rounded-[2rem] border-l-4 ${color} shadow-xl shadow-slate-200/50 space-y-5`}>
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{name}</h4>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-1">
           <CheckCircle2 size={16} className="text-slate-300" />
           <span className="text-lg font-black text-slate-800">{reservations}</span>
           <span className="text-[9px] font-bold text-slate-400 uppercase">Reservas</span>
        </div>
        <div className="flex flex-col items-center gap-1">
           <Bus size={16} className="text-green-500" />
           <span className="text-lg font-black text-green-500">{available}</span>
           <span className="text-[9px] font-bold text-slate-400 uppercase">Libres</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 🕒 Sub-vista: Planilla de Despachos (Horarios con Pestañas)
 */
function ScheduleDirectory({ schedules, drivers, role, onManage }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');

  // Filtrado de horarios por ruta
  const natagaToLaPlata = schedules.filter(s =>
    s.ruta.toLowerCase().includes('nátaga -> la plata') ||
    (s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nátaga') < s.ruta.toLowerCase().indexOf('plata'))
  );

  const laPlataToNataga = schedules.filter(s =>
    s.ruta.toLowerCase().includes('la plata -> nátaga') ||
    (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nátaga'))
  );

  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-primary-500 rounded-full"></div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Planilla de Despachos</h3>
        </div>

        {/* Selector de Ruta (Tabs) */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveRoute('toLaPlata')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
              activeRoute === 'toLaPlata' ? 'bg-white text-primary-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Nátaga → La Plata
          </button>
          <button
            onClick={() => setActiveRoute('toNataga')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
              activeRoute === 'toNataga' ? 'bg-white text-secondary-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            La Plata → Nátaga
          </button>
        </div>
      </div>

      {/* Resumen de la Ruta Seleccionada */}
      <div className="flex items-center gap-4 mb-2">
        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase">
          {currentSchedules.length} Salidas Programadas
        </span>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
          activeRoute === 'toLaPlata' ? 'bg-orange-50 text-orange-600' : 'bg-secondary-50 text-secondary-900'
        }`}>
          {activeRoute === 'toLaPlata' ? 'Sentido Occidente' : 'Sentido Oriente'}
        </span>
      </div>

      <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} />

      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4 mt-8">
        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
          <Activity size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-blue-900 uppercase">Estado de la Operación</h4>
          <p className="text-xs text-blue-700 font-medium">
            Mostrando planilla en tiempo real para la ruta:
            <strong className="ml-1 uppercase">{activeRoute === 'toLaPlata' ? 'Nátaga a La Plata' : 'La Plata a Nátaga'}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 👥 Sub-vista: Base de Usuarios (Pasajeros)
 */
function UserDirectory({ users = [] }) {
  const activeUsers = (users || []).filter(u => !u.solicitudBorrado);
  const deletionPending = (users || []).filter(u => u.solicitudBorrado === true);

  return (
    <div className="space-y-12">
      {/* SECCIÓN 1: USUARIOS ACTIVOS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Pasajeros Activos</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold">
            {activeUsers.length} TOTAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeUsers.length > 0 ? (
            activeUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-slate-400 italic">No hay usuarios registrados aún</p>
          )}
        </div>
      </div>

      {/* SECCIÓN 2: HABEAS DATA (BORRADO PENDIENTE) */}
      {deletionPending.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-2 h-6 bg-red-500 rounded-full"></div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight text-red-600">Solicitudes de Borrado</h3>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold">
              {deletionPending.length} PENDIENTES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {deletionPending.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-[10px] text-red-700 font-bold uppercase leading-relaxed">
              ⚠️ Nota Legal: Estas cuentas han solicitado el ejercicio de su Derecho al Olvido.
              Serán eliminadas permanentemente por la Cloud Function tras cumplirse el periodo de gracia de 30 días.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 👨‍✈️ Sub-vista: Directorio de Conductores
 */
function DriverDirectory({ drivers, onEditDriver, onAddDriver }) {
  const activeDrivers = drivers.filter(d =>
    d.status === 'active' && d.horariosAsignados && d.horariosAsignados.length > 0
  );

  const inactiveDrivers = drivers.filter(d =>
    d.status !== 'active' || !d.horariosAsignados || d.horariosAsignados.length === 0
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Gestión de Operadores</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Control de flota y personal</p>
        </div>
        <button
          onClick={onAddDriver}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase"
        >
          <UserPlus size={18} /> Registrar Nuevo Conductor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Operando Hoy</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black">
              {activeDrivers.length} ACTIVOS
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {activeDrivers.length > 0 ? (
              activeDrivers.map(driver => (
                <DriverCard key={driver.id} driver={driver} onEdit={onEditDriver} />
              ))
            ) : (
              <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <Bus size={32} className="mb-2 opacity-20" />
                <p className="text-xs font-bold uppercase italic">Sin actividad en ruta</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-slate-300 rounded-full"></div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Fuera de Servicio</h3>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black">
              {inactiveDrivers.length} TOTAL
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 opacity-90 grayscale-[0.3]">
            {inactiveDrivers.length > 0 ? (
              inactiveDrivers.map(driver => (
                <DriverCard key={driver.id} driver={driver} onEdit={onEditDriver} />
              ))
            ) : (
              <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <p className="text-xs font-bold uppercase italic">Personal completo en ruta</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileDirectory({ user, role }) {
  const isDriver = role?.type === 'DRIVER';
  const isOwner = role?.type === 'OWNER';
  const isAdmin = role?.type === 'ADMIN';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-secondary-900 font-black text-4xl border-4 border-white shadow-xl">
            {user.email?.substring(0, 1).toUpperCase()}
          </div>

          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user.displayName || 'Usuario de Ruta-Go'}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} /> {user.email}
               </span>
               <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                 isAdmin ? 'bg-orange-100 text-orange-600' :
                 isOwner ? 'bg-blue-100 text-blue-600' :
                 isDriver ? 'bg-amber-100 text-amber-600' :
                 'bg-green-100 text-green-600'
               }`}>
                  <Activity size={12} /> Rango: {role?.type}
               </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg space-y-6">
           <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-3">
              <Settings className="text-primary-500" size={18} /> Ajustes de Seguridad
           </h3>
           <div className="space-y-4">
              <button className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group flex items-center justify-between">
                 <div>
                    <p className="text-sm font-bold text-slate-700">Cambiar Contraseña</p>
                    <p className="text-[10px] text-slate-400 font-medium">Actualiza tu clave de acceso</p>
                 </div>
                 <ChevronRight size={16} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
              </button>
           </div>
        </div>

        <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 shadow-sm space-y-6">
           <h3 className="font-black text-red-600 uppercase text-xs tracking-widest">Zona de Peligro</h3>
           <p className="text-[11px] text-red-700/60 font-medium leading-relaxed">
             Si decides eliminar tu cuenta, todos tus datos y transacciones entrarán en un periodo de gracia de 30 días antes del borrado definitivo (Habeas Data).
           </p>
           <button className="w-full py-4 bg-white border-2 border-red-100 text-red-500 font-black rounded-2xl text-[10px] uppercase hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95">
              Solicitar Borrado de Cuenta
           </button>
        </div>
      </div>
    </div>
  );
}

function HistoryDirectory({ reservations, role }) {
  const isPassenger = role?.type === 'PASSENGER';
  const isDriver = role?.type === 'DRIVER';

  // En historial web, si es pasajero o conductor, ya vienen filtradas desde el hook useRealtimeStats
  const list = reservations.sort((a, b) => (b.reservationDate || 0) - (a.reservationDate || 0));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-secondary-900 rounded-full"></div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Cronología de Reservas</h3>
        </div>
        <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest">
           {list.length} Registros Encontrados
        </span>
      </div>

      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {list.map(res => (
            <div key={res.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-primary-500 transition-colors">
                     <Ticket size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    (res.estadoReserva || res.reservationStatus) === 'Confirmada' || (res.estadoReserva || res.reservationStatus) === 'Completada'
                      ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {res.estadoReserva || res.reservationStatus}
                  </span>
               </div>

               <div className="space-y-4">
                  <div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Trayecto</p>
                     <p className="text-sm font-black text-slate-800">{res.origen || 'La Plata'} ➔ {res.destino || 'Nátaga'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Asiento</p>
                        <p className="text-sm font-black text-slate-800">#{res.asientoReservado || res.reservedSeat}</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fecha</p>
                        <p className="text-sm font-black text-slate-800">
                          {res.travelDate || res.reservationDate ? new Date(res.travelDate || res.reservationDate).toLocaleDateString() : '---'}
                        </p>
                     </div>
                  </div>
               </div>

               <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-primary-500/5 rounded-full group-hover:bg-primary-500/10 transition-colors"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400 space-y-4">
           <History size={48} className="opacity-10" />
           <p className="text-sm font-bold uppercase italic">No hay actividad registrada en el historial</p>
        </div>
      )}
    </div>
  );
}

export default App;
