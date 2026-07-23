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
  Ticket,
  XCircle,
  Clock,
  ChevronRight,
  Settings,
  Mail,
  History,
  Info,
  ChevronDown,
  LayoutDashboard,
  Tag,
  Moon,
  Sun
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
 * 🖥️ Ruta-Go Portal - Componente Principal
 */
function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing');
  const [registerMode, setRegisterMode] = useState('owner');
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [isAddingDriver, setIsAddingDriver] = useState(false);
  const [managingSchedule, setManagingSchedule] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const { role, stats, drivers, users, schedules, reservations, routeStats } = useRealtimeStats(user);

  if (loadingAuth) {
    return (
      <div className="h-screen bg-[#061426] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-16 h-16 object-contain animate-pulse" />
          <Loader2 className="text-primary-500 animate-spin absolute -bottom-2 -right-2" size={24} />
        </div>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">Autenticando...</p>
      </div>
    );
  }

  if (!user) {
    if (view === 'login') return <Login onBack={() => setView('landing')} onShowRegister={() => { setRegisterMode('owner'); setView('register'); }} />;
    if (view === 'register') return <Register onBack={() => setView('landing')} initialMode={registerMode} />;
    if (view === 'terms') return <Terms onBack={() => setView('landing')} />;
    if (view === 'privacy') return <Privacy onBack={() => setView('landing')} />;
    if (view === 'manual') return <UserManual onBack={() => setView('landing')} />;
    return (
      <LandingPage
        onLogin={() => setView('login')}
        onRegisterOwner={() => { setRegisterMode('owner'); setView('register'); }}
        onRegisterPassenger={() => { setRegisterMode('passenger'); setView('register'); }}
        onViewTerms={() => setView('terms')}
        onViewPrivacy={() => setView('privacy')}
        onViewManual={() => setView('manual')}
      />
    );
  }

  return (
    <div className="flex h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-white antialiased font-sans overflow-hidden transition-colors duration-300">
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
            activeTab === 'profile' ? 'Mi Perfil' :
            activeTab === 'drivers' ? 'Conductores' :
            activeTab === 'users' ? 'Pasajeros' :
            activeTab === 'schedules' ? 'Planilla' :
            activeTab === 'manual' ? 'Centro de Ayuda' :
            'Dashboard'
          }
          userEmail={user.email}
          onMenuClick={() => setIsSidebarOpen(true)}
          role={role}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
          {activeTab === 'overview' ? (
            role?.type === 'PASSENGER' ? (
              <PassengerOverview
                stats={stats}
                routeStats={routeStats}
                schedules={schedules}
                drivers={drivers}
                role={role}
                user={user}
                onManage={(s) => setManagingSchedule(s)}
              />
            ) : role?.type === 'DRIVER' ? (
              <DriverOverview stats={stats} routeStats={routeStats} schedules={schedules} drivers={drivers} reservations={reservations} role={role} onManage={(s) => setManagingSchedule(s)} />
            ) : role?.type === 'OWNER' ? (
              <OwnerOverview stats={stats} routeStats={routeStats} role={role} />
            ) : (
              <Overview stats={stats} role={role} />
            )
          ) : activeTab === 'history' ? (
            <HistoryDirectory reservations={reservations} role={role} />
          ) : activeTab === 'profile' ? (
            <ProfileDirectory user={user} role={role} />
          ) : activeTab === 'drivers' ? (
            <DriverDirectory drivers={drivers} onEditDriver={(driver) => setEditingDriver(driver)} onAddDriver={() => setIsAddingDriver(true)} />
          ) : activeTab === 'users' ? (
            <UserDirectory users={users} />
          ) : activeTab === 'schedules' ? (
            <ScheduleDirectory schedules={schedules} drivers={drivers} role={role} onManage={(s) => setManagingSchedule(s)} />
          ) : activeTab === 'manual' ? (
            <UserManual role={role} isTab={true} />
          ) : null}
        </div>

        {/* Bottom Nav Simulation for Mobile */}
        <div className="lg:hidden h-20 bg-white dark:bg-[#061929] border-t border-slate-200 dark:border-white/5 flex items-center justify-around px-6 shrink-0 transition-colors duration-300 shadow-2xl">
           <BottomNavItem icon={<LayoutDashboard size={22}/>} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
           <BottomNavItem icon={<History size={22}/>} active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
           <BottomNavItem icon={<UserPlus size={22}/>} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
           <button onClick={() => auth.signOut()} className="p-3 text-red-500 dark:text-red-400 opacity-80 hover:opacity-100 transition-opacity"><XCircle size={22}/></button>
        </div>
      </main>

      {editingDriver && <EditDriverModal driver={editingDriver} onClose={() => setEditingDriver(null)} onRefresh={() => {}} />}
      {isAddingDriver && <AddDriverModal onClose={() => setIsAddingDriver(false)} users={users} currentUser={user} role={role} />}
      {managingSchedule && <SeatManagementModal schedule={managingSchedule} onClose={() => setManagingSchedule(null)} role={role} />}
    </div>
  );
}

function BottomNavItem({ icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`p-4 transition-all ${active ? 'text-primary-500 scale-110 drop-shadow-sm' : 'text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40'}`}>
      {icon}
    </button>
  );
}

/**
 * 🎒 Sub-vista: PassengerOverview (Clonación de Android)
 */
function PassengerOverview({ stats, routeStats, schedules, drivers, role, user, onManage }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🟠 HEADER NARANJA */}
      <div className="bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 flex items-center justify-center shadow-inner">
               <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-[#061426] font-black text-xl lg:text-2xl shadow-sm">
                 {role?.uid?.substring(0, 1).toUpperCase() || 'P'}
               </div>
            </div>
            <div className="text-white">
              <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-80">Welcome!</p>
              <h2 className="text-xl lg:text-2xl font-black tracking-tight uppercase italic">{role?.name || 'Pasajero Ruta-Go'}</h2>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10">
             Pasajero Activo
          </div>
        </div>

        {/* 🌑 STATS CARD (Android Style) */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-base rounded-[2.5rem] p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <SummaryMetric label="Confirmadas" value={stats.confirmedReservations} icon={<CheckCircle2 size={16} className="text-orange-500 mb-1"/>} />
              <SummaryMetric label="Canceladas" value={stats.canceledReservations} icon={<XCircle size={16} className="text-red-500 mb-1"/>} />
              <SummaryMetric label="Total" value={stats.totalUserReservations} icon={<CheckCircle2 size={16} className="text-green-500 mb-1"/>} />
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-slate-400 dark:text-white/40 cursor-pointer hover:text-slate-600 dark:hover:text-white/60 transition-colors">
               <span className="text-[10px] font-bold uppercase tracking-widest">Significado de cada contador</span>
               <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-4 space-y-12">

        {/* 🕒 TITULO Y TABS */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Clock className="text-primary-500" size={24} />
            <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-[#061426] dark:text-white italic">Horarios disponibles</h3>
          </div>

          <div className="flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors duration-300">
            <button
              onClick={() => setActiveRoute('toLaPlata')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${
                activeRoute === 'toLaPlata' ? 'bg-primary-500 text-white shadow-xl' : 'text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white'
              }`}
            >
              NATAGÁ -> LA PLATA
            </button>
            <button
              onClick={() => setActiveRoute('toNataga')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${
                activeRoute === 'toNataga' ? 'bg-primary-500 text-white shadow-xl' : 'text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white'
              }`}
            >
              LA PLATA -> NATAGÁ
            </button>
          </div>
        </div>

        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} />

        {/* CARTA DE ESTADO POR RUTA */}
        <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
               <Activity className="text-primary-500" size={18} />
               <h3 className="text-sm font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Estado por ruta</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
              <RouteStatCard
                name="Nátaga → La Plata"
                reservations={routeStats.toLaPlata.reservations}
                available={routeStats.toLaPlata.seats}
                color="border-orange-500"
              />
              <RouteStatCard
                name="La Plata → Nátaga"
                reservations={routeStats.toNataga.reservations}
                available={routeStats.toNataga.seats}
                color="border-secondary-400"
              />
            </div>
         </div>

        <div className="p-8 bg-white dark:bg-[#061929] rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-6 shadow-sm mx-2 group">
          <div className="w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
             <Info size={32} />
          </div>
          <div className="text-center md:text-left space-y-1">
             <h4 className="text-lg font-black text-[#061426] dark:text-white uppercase leading-none italic">Reserva Web en desarrollo</h4>
             <p className="text-slate-500 dark:text-white/40 font-medium text-sm">Estamos trabajando para habilitar el motor de reservas en iPhone muy pronto.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 👨‍✈️ Sub-vista: DriverOverview (Clonación de Android)
 */
function DriverOverview({ stats, routeStats, schedules, drivers, reservations = [], role, onManage }) {
  const currentDriverData = drivers.find(d => d.id === role.uid) || {};
  const myName = currentDriverData.nombre || 'Cargando...';
  const myPlate = currentDriverData.placaVehiculo || currentDriverData.vehiculoId || '---';
  const mySchedules = schedules.filter(s => s.conductorId === role.uid);
  const pendingReservations = reservations.filter(r => (r.estadoReserva === 'Pendiente' || r.reservationStatus === 'Pendiente'));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <div className="bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10 text-white">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 shadow-inner">
               <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center font-black text-xl lg:text-2xl text-[#061426]">
                 {myName.substring(0, 1)}
               </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase italic">{myName}</h2>
              <p className="text-white/80 font-bold text-sm uppercase tracking-wider">Placa: {myPlate}</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10">
             Conductor Activo
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-base rounded-[2.5rem] p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Resumen del día</h4>
               <Activity size={16} className="text-primary-500" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <span className="text-xl lg:text-2xl font-black text-green-500">{stats?.todayReservations || 0}</span>
                <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Reservas</p>
              </div>
              <div className="space-y-1 border-x border-slate-100 dark:border-white/5">
                <span className="text-xl lg:text-2xl font-black text-primary-500">{currentDriverData.asientosLibres || 13}</span>
                <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Libres</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl lg:text-2xl font-black text-amber-500">{formatCurrency(stats?.totalRevenue || 0)}</span>
                <p className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Ingresos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 pb-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3 text-[#061426] dark:text-white">
                <CheckCircle2 className="text-primary-500" size={18} />
                <h3 className="text-lg font-black uppercase tracking-tight leading-none italic">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-primary-500/20">{pendingReservations.length}</span>
          </div>
          {pendingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              {pendingReservations.map(res => (
                <div key={res.id} className="card-base p-6 rounded-[2rem] flex items-center justify-between group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:text-primary-500 transition-colors">
                      <Ticket size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#061426] dark:text-white">Asiento #{res.asientoReservado}</p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Pasajero: {res.nombreUsuario || 'User'}</p>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                    Confirmar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-base p-12 rounded-[2.5rem] flex items-center justify-center text-center mx-2 opacity-60">
               <p className="text-slate-400 dark:text-white/40 text-xs font-bold uppercase italic tracking-widest">Sin reservas activas</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-3 px-2 text-[#061426] dark:text-white">
              <Calendar className="text-primary-500" size={18} />
              <h3 className="text-lg font-black uppercase tracking-tight italic">Mi Itinerario</h3>
           </div>
           <ScheduleTable schedules={mySchedules} drivers={drivers} role={role} onManage={onManage} />
        </div>
      </div>
    </div>
  );
}

function SummaryMetric({ label, value, icon, color }) {
  return (
    <div className="flex flex-col items-center text-center space-y-1">
      {icon}
      <span className={`text-xl lg:text-2xl font-black ${color}`}>{value}</span>
      <span className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Overview({ stats, role }) {
  const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard label="Usuarios Activos" value={stats.totalUsers} icon={<Users className="text-blue-500" />} />
        <StatCard label="Dueños de Flota" value={stats.totalOwners} icon={<Users className="text-amber-500" />} />
        <StatCard label="En Turno" value={stats.activeDrivers} icon={<Bus className="text-green-500" />} />
        <StatCard label="Reservas Hoy" value={stats.todayReservations} icon={<Calendar className="text-purple-500" />} />
        <StatCard label="Ingresos" value={formatCurrency(stats.totalRevenue)} icon={<Activity className="text-primary-500" />} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card-base p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
          <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500">
            <Activity size={32} />
          </div>
          <div>
            <h4 className="text-lg font-black text-[#061426] dark:text-white uppercase italic">Análisis de Rendimiento</h4>
            <p className="text-sm font-medium text-slate-400 dark:text-white/20">Módulo de gráficas avanzadas en desarrollo para el Panel Maestro.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 💼 Sub-vista: OwnerOverview (Dashboard del Socio)
 */
function OwnerOverview({ stats, routeStats, role }) {
  const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🏙️ HEADER EJECUTIVO (Adaptativo) */}
      <div className="bg-white dark:bg-[#061426] -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-500/20 rounded-[2rem] border-2 border-primary-500/30 p-1 flex items-center justify-center shadow-inner">
               <div className="w-full h-full bg-primary-500 rounded-[1.8rem] flex items-center justify-center text-white font-black text-xl lg:text-2xl shadow-sm">
                 {role?.uid?.substring(0, 1).toUpperCase() || 'S'}
               </div>
            </div>
            <div className="text-[#061426] dark:text-white">
              <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-60 italic">Socio de Flota</p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase italic">Dashboard Corporativo</h2>
            </div>
          </div>
          <div className="hidden sm:block px-5 py-2 bg-slate-100 dark:bg-white/5 backdrop-blur-md text-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-slate-200 dark:border-white/10">
             Sesión Premium
          </div>
        </div>

        {/* 📊 KPI BAR (Glassmorphism Adaptativo) */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 lg:p-8 shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="grid grid-cols-3 gap-4">
              <SummaryMetric label="Vehículos" value={stats.totalVehicles} icon={<Bus size={18} className="text-primary-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="Reservas" value={stats.todayReservations} icon={<Calendar size={18} className="text-purple-500 mb-1"/>} color="text-[#061426] dark:text-white" />
              <SummaryMetric label="Ganancias" value={formatCurrency(stats.totalRevenue)} icon={<Activity size={18} className="text-green-500 mb-1"/>} color="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-6 space-y-12 pb-10">
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <Activity className="text-primary-500" size={20} />
                  <h3 className="text-lg font-black text-[#061426] dark:text-white uppercase italic tracking-tight">Ocupación por Ruta</h3>
               </div>
               <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">En tiempo real</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
              <OwnerRouteProgressCard
                name="Nátaga → La Plata"
                reservations={routeStats.toLaPlata.reservations}
                available={routeStats.toLaPlata.seats}
                icon={<MapPin className="text-orange-500" size={20} />}
                color="bg-orange-500"
              />
              <OwnerRouteProgressCard
                name="La Plata → Nátaga"
                reservations={routeStats.toNataga.reservations}
                available={routeStats.toNataga.seats}
                icon={<MapPin className="text-blue-500" size={20} />}
                color="bg-blue-500"
              />
            </div>
         </div>

         {/* Tip de Valor para el Owner */}
         <div className="mx-2 p-6 bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/10 dark:border-primary-500/20 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shrink-0">
               <Info size={24} />
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-white/60">
               <span className="font-black text-primary-500 uppercase mr-1">Sugerencia Operativa:</span>
               Monitorea el porcentaje de ocupación para ajustar tus despachos. Una ocupación superior al <span className="font-bold text-[#061426] dark:text-white">80%</span> indica necesidad de reforzar la ruta.
            </p>
         </div>
      </div>
    </div>
  );
}

function OwnerRouteProgressCard({ name, reservations, available, icon, color }) {
  const total = reservations + available;
  const percentage = total > 0 ? Math.round((reservations / total) * 100) : 0;

  return (
    <div className="card-base p-8 rounded-[2.5rem] space-y-6 group hover:scale-[1.02] transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h4 className="font-black text-sm text-[#061426] dark:text-white uppercase italic">{name}</h4>
        </div>
        <div className="text-right">
           <span className="text-2xl font-black text-[#061426] dark:text-white">{percentage}%</span>
           <p className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">Ocupación</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200/50 dark:border-white/5">
          <div
            className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-tighter">Reservas</span>
            <span className="text-sm font-black text-[#061426] dark:text-white">{reservations}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-tighter">Disponibles</span>
            <span className="text-sm font-black text-green-500">{available}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteStatCard({ name, reservations, available, color }) {
  return (
    <div className={`card-base p-6 rounded-[2.5rem] border-l-4 ${color} space-y-6 group hover:scale-[1.02] transition-transform`}>
      <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-white/40 tracking-widest">{name}</h4>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <span className="text-2xl font-black text-[#061426] dark:text-white">{reservations}</span>
          <p className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase">Reservas</p>
        </div>
        <div className="w-px h-8 bg-slate-100 dark:bg-white/5"></div>
        <div className="text-center">
          <span className="text-2xl font-black text-green-500">{available}</span>
          <p className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase">Libres</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 👨‍✈️ Sub-vistas de Directorio (Admin Only)
 */
function UserDirectory({ users = [] }) {
  const activeUsers = users.filter(u => !u.solicitudBorrado);
  const deletionPending = users.filter(u => u.solicitudBorrado === true);

  return (
    <div className="space-y-12 pb-20 px-2">
      <div className="space-y-6">
        <h3 className="text-xl font-black uppercase tracking-tighter ml-2 text-[#061426] dark:text-white italic">Pasajeros Activos ({activeUsers.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeUsers.map(u => <UserCard key={u.id} user={u} />)}
        </div>
      </div>
      {deletionPending.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tighter text-red-500 ml-2 italic">Solicitudes de Borrado ({deletionPending.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {deletionPending.map(u => <UserCard key={u.id} user={u} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function DriverDirectory({ drivers, onEditDriver, onAddDriver }) {
  const active = drivers.filter(d => d.status === 'active' && d.horariosAsignados?.length > 0);
  const inactive = drivers.filter(d => d.status !== 'active' || !d.horariosAsignados?.length);

  return (
    <div className="space-y-10 pb-20 px-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between card-base p-6 rounded-[2.5rem] gap-4">
        <h3 className="text-xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Gestión de Operadores</h3>
        <button onClick={onAddDriver} className="px-6 py-4 bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary-500/20 active:scale-95 transition-all">Registrar Conductor</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-green-500 ml-2 tracking-widest">En Ruta ({active.length})</h4>
          {active.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-slate-400 dark:text-white/20 ml-2 tracking-widest">Fuera de Servicio ({inactive.length})</h4>
          {inactive.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
      </div>
    </div>
  );
}

function ProfileDirectory({ user, role }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="card-base p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10">
        <div className="w-32 h-32 bg-slate-100 dark:bg-white/10 rounded-[3rem] flex items-center justify-center text-[#061426] dark:text-white font-black text-5xl shadow-2xl border-4 border-white/10">
          {user.email?.substring(0, 1).toUpperCase()}
        </div>
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-[#061426] dark:text-white uppercase italic">{user.displayName || 'Usuario Ruta-Go'}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
             <span className="px-6 py-2 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-slate-100 dark:border-white/5 shadow-sm"><Mail size={14} /> {user.email}</span>
             <span className="px-6 py-2 bg-primary-500/10 text-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-primary-500/20 shadow-sm">Rango: {role?.type}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:px-0">
        <div className="card-base p-8 rounded-[2.5rem] space-y-6">
           <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-3 text-[#061426] dark:text-white"><Settings className="text-primary-500" size={18} /> Seguridad</h3>
           <button className="w-full text-left p-6 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-[2rem] transition-all flex items-center justify-between group shadow-inner">
              <div><p className="text-sm font-black text-[#061426] dark:text-white">Cambiar Contraseña</p><p className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-tighter">Actualiza tus credenciales</p></div>
              <ChevronRight size={18} className="text-slate-300 dark:text-white/20 group-hover:text-primary-500" />
           </button>
        </div>
        <div className="bg-red-50 dark:bg-red-500/5 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-500/10 space-y-6 text-center md:text-left">
           <h3 className="font-black text-red-600 dark:text-red-500 uppercase text-xs tracking-widest">Borrar Cuenta</h3>
           <p className="text-[11px] text-red-700/60 dark:text-red-500/40 font-medium">Todos tus datos entrarán en periodo de gracia de 30 días.</p>
           <button className="w-full py-5 bg-red-100 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500 font-black rounded-[2rem] text-[10px] uppercase hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-all shadow-sm">Eliminar permanentemente</button>
        </div>
      </div>
    </div>
  );
}

function HistoryDirectory({ reservations, role }) {
  const list = reservations.sort((a, b) => (b.reservationDate || 0) - (a.reservationDate || 0));
  return (
    <div className="space-y-10 pb-20 px-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6">
        <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Historial de Reservas</h3>
        <span className="px-4 py-1.5 bg-white dark:bg-white/5 text-slate-400 dark:text-white/40 rounded-full text-[10px] font-black uppercase shadow-sm border border-slate-100 dark:border-none">{list.length} Registros</span>
      </div>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(res => (
            <div key={res.id} className="card-base p-8 rounded-[2.5rem] hover:ring-2 ring-primary-500/30 group relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-300 dark:text-white/20 group-hover:text-primary-500 transition-colors shadow-inner"><Ticket size={28} /></div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${ (res.estadoReserva || res.reservationStatus) === 'Confirmada' ? 'badge-success' : 'badge-error' }`}>
                    {res.estadoReserva || res.reservationStatus}
                  </span>
               </div>
               <div className="space-y-6">
                  <div><p className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-1">Ruta</p><p className="text-lg font-black text-[#061426] dark:text-white italic truncate">{res.origen || 'La Plata'} ➔ {res.destino || 'Nátaga'}</p></div>
                  <div className="grid grid-cols-2">
                     <div><p className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-1">Asiento</p><p className="text-xl font-black text-[#061426] dark:text-white">#{res.asientoReservado}</p></div>
                     <div className="text-right"><p className="text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-1">Fecha</p><p className="text-sm font-black text-[#061426] dark:text-white">{res.travelDate ? new Date(res.travelDate).toLocaleDateString() : '--/--/--'}</p></div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 flex flex-col items-center justify-center text-slate-300 dark:text-white/10 italic"><History size={64} className="mb-4 opacity-50" /><p>No hay actividad registrada</p></div>
      )}
    </div>
  );
}

function ScheduleDirectory({ schedules, drivers, role, onManage }) {
  const [activeRoute, setActiveRoute] = useState('toLaPlata');
  const natagaToLaPlata = schedules.filter(s => s.ruta.toLowerCase().includes('nátaga -> la plata') || (s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().indexOf('nátaga') < s.ruta.toLowerCase().indexOf('plata')));
  const laPlataToNataga = schedules.filter(s => s.ruta.toLowerCase().includes('la plata -> nátaga') || (s.ruta.toLowerCase().includes('plata') && s.ruta.toLowerCase().includes('nátaga') && s.ruta.toLowerCase().indexOf('plata') < s.ruta.toLowerCase().indexOf('nátaga')));
  const currentSchedules = activeRoute === 'toLaPlata' ? natagaToLaPlata : laPlataToNataga;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm"><Clock size={28} /></div>
          <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Planilla de Despachos</h3>
        </div>
        <div className="flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
          <button onClick={() => setActiveRoute('toLaPlata')} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${activeRoute === 'toLaPlata' ? 'bg-primary-500 text-white shadow-2xl' : 'text-slate-400 dark:text-white/40 hover:text-slate-600'}`}>Nátaga ➔ LP</button>
          <button onClick={() => setActiveRoute('toNataga')} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${activeRoute === 'toNataga' ? 'bg-primary-500 text-white shadow-2xl' : 'text-slate-400 dark:text-white/40 hover:text-slate-600'}`}>LP ➔ Nátaga</button>
        </div>
      </div>
      <div className="px-2">
        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} />
      </div>
    </div>
  );
}

export default App;
