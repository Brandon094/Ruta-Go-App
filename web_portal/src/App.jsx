import React, { useState, useEffect } from 'react';
import {
  Users,
  Bus,
  Calendar,
  Activity,
  MapPin,
  Loader2,
  UserPlus
} from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

// Components
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Terms from './Terms';
import Privacy from './Privacy';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { StatCard } from './components/dashboard/StatCard';
import { RouteProgress } from './components/dashboard/RouteProgress';
import { DriverCard } from './components/drivers/DriverCard';
import { EditDriverModal } from './components/drivers/EditDriverModal';
import { AddDriverModal } from './components/drivers/AddDriverModal';
import { UserCard } from './components/users/UserCard';
import { ScheduleTable } from './components/schedules/ScheduleTable';

// Hooks
import { useRealtimeStats } from './hooks/useRealtimeStats';

/**
 * 🖥️ Ruta-Go Admin Portal - Componente Principal
 */
function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'register' | 'terms' | 'privacy'
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Estado para el Sidebar responsivo
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Estado para gestión de conductores
  const [editingDriver, setEditingDriver] = useState(null);
  const [isAddingDriver, setIsAddingDriver] = useState(false);

  // Sincronización de Sesión
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  // Hook de Datos en Tiempo Real (Con soporte de Roles)
  const { role, stats, drivers, users, schedules, routeStats } = useRealtimeStats(user);

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
    if (view === 'login') return <Login onBack={() => setView('landing')} onShowRegister={() => setView('register')} />;
    if (view === 'register') return <Register onBack={() => setView('landing')} />;
    if (view === 'terms') return <Terms onBack={() => setView('landing')} />;
    if (view === 'privacy') return <Privacy onBack={() => setView('landing')} />;
    return (
      <LandingPage
        onLogin={() => setView('login')}
        onRegisterOwner={() => setView('register')}
        onViewTerms={() => setView('terms')}
        onViewPrivacy={() => setView('privacy')}
      />
    );
  }

  // Si no es admin ni dueño, bloquear acceso (Seguridad)
  if (!stats.loading && !role?.type) {
    return (
      <div className="h-screen bg-secondary-900 flex flex-col items-center justify-center p-10 text-center gap-6">
        <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center text-red-500">
          <Activity size={40} />
        </div>
        <div>
          <h2 className="text-white text-2xl font-black tracking-tight">Acceso Denegado</h2>
          <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">Tu cuenta no tiene permisos administrativos para este portal.</p>
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
              (!role?.type ? 'Cargando...' : role.type === 'ADMIN' ? 'Panel Maestro' : 'Dashboard Dueño') :
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
            <Overview stats={stats} routeStats={routeStats} role={role} />
          ) : activeTab === 'drivers' ? (
            <DriverDirectory
              drivers={drivers}
              onEditDriver={(driver) => setEditingDriver(driver)}
              onAddDriver={() => setIsAddingDriver(true)}
            />
          ) : activeTab === 'users' ? (
            <UserDirectory users={users} />
          ) : activeTab === 'schedules' ? (
            <ScheduleDirectory schedules={schedules} drivers={drivers} role={role} />
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
    </div>
  );
}

/**
 * 📊 Sub-vista: Resumen General
 */
function Overview({ stats, routeStats, role }) {
  // Formateador de moneda para los ingresos
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

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-xl text-slate-800 tracking-tight">Monitor de Demanda por Ruta</h3>
            <p className="text-xs text-slate-400 font-medium uppercase mt-1">Tráfico de pasajeros en tiempo real</p>
          </div>
          <div className="px-3 py-1 bg-primary-50 rounded-full text-[10px] font-black text-primary-600 uppercase">Live Feedback</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <RouteProgress label="Natagá → La Plata" value={routeStats.toLaPlata} color="bg-orange-500" icon={<MapPin size={16}/>} />
          <RouteProgress label="La Plata → Natagá" value={routeStats.toNataga} color="bg-secondary-900" icon={<MapPin size={16}/>} />
        </div>
      </div>
    </>
  );
}

/**
 * 🕒 Sub-vista: Planilla de Despachos (Horarios con Pestañas)
 */
function ScheduleDirectory({ schedules, drivers, role }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');

  // Filtrado de horarios por ruta
  const natagaToLaPlata = schedules.filter(s =>
    s.ruta.toLowerCase().includes('natagá -> la plata') ||
    (s.ruta.toLowerCase().includes('nataga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nataga') < s.ruta.toLowerCase().indexOf('plata'))
  );

  const laPlataToNataga = schedules.filter(s =>
    s.ruta.toLowerCase().includes('la plata -> natagá') ||
    (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nataga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nataga'))
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
            Natagá → La Plata
          </button>
          <button
            onClick={() => setActiveRoute('toNataga')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
              activeRoute === 'toNataga' ? 'bg-white text-secondary-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            La Plata → Natagá
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

      <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} />

      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4 mt-8">
        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
          <Activity size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-blue-900 uppercase">Estado de la Operación</h4>
          <p className="text-xs text-blue-700 font-medium">
            Mostrando planilla en tiempo real para la ruta:
            <strong className="ml-1 uppercase">{activeRoute === 'toLaPlata' ? 'Natagá a La Plata' : 'La Plata a Natagá'}</strong>.
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

export default App;
