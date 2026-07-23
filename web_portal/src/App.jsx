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
  Tag
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

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
    <div className="flex h-screen bg-[#061426] text-white antialiased font-sans overflow-hidden">
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
            'Dashboard'
          }
          userEmail={user.email}
          onMenuClick={() => setIsSidebarOpen(true)}
          role={role}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#061426]">
          {activeTab === 'overview' ? (
            role?.type === 'PASSENGER' ? (
              <PassengerOverview stats={stats} routeStats={routeStats} schedules={schedules} drivers={drivers} role={role} />
            ) : role?.type === 'DRIVER' ? (
              <DriverOverview stats={stats} routeStats={routeStats} schedules={schedules} drivers={drivers} reservations={reservations} role={role} onManage={(s) => setManagingSchedule(s)} />
            ) : (
              <Overview stats={stats} routeStats={routeStats} role={role} />
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
          ) : null}
        </div>

        {/* Bottom Nav Simulation for Mobile */}
        <div className="lg:hidden h-20 bg-[#061929] border-t border-white/5 flex items-center justify-around px-6 shrink-0">
           <BottomNavItem icon={<LayoutDashboard size={22}/>} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
           <BottomNavItem icon={<History size={22}/>} active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
           <BottomNavItem icon={<UserPlus size={22}/>} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
           <button onClick={() => auth.signOut()} className="p-3 text-red-400 opacity-50"><XCircle size={22}/></button>
        </div>
      </main>

      {editingDriver && <EditDriverModal driver={editingDriver} onClose={() => setEditingDriver(null)} onRefresh={() => {}} />}
      {isAddingDriver && <AddDriverModal onClose={() => setIsAddingDriver(false)} users={users} currentUser={user} role={role} />}
      {managingSchedule && <SeatManagementModal schedule={managingSchedule} onClose={() => setManagingSchedule(null)} />}
    </div>
  );
}

function BottomNavItem({ icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`p-4 transition-all ${active ? 'text-primary-500 scale-110' : 'text-white/20 hover:text-white/40'}`}>
      {icon}
    </button>
  );
}

/**
 * 🎒 Sub-vista: PassengerOverview (Clonación de Android)
 */
function PassengerOverview({ stats, routeStats, schedules, drivers, role }) {
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
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-secondary-900 p-1 flex items-center justify-center">
               <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-secondary-900 font-black text-xl lg:text-2xl shadow-inner">
                 {role?.uid?.substring(0, 1).toUpperCase() || 'P'}
               </div>
            </div>
            <div className="text-secondary-900">
              <p className="font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-60">Welcome!</p>
              <h2 className="text-xl lg:text-2xl font-black tracking-tight">Brandon Daza Cerq...</h2>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-secondary-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
             Pasajero Activo
          </div>
        </div>

        {/* 🌑 STATS CARD (Android Style) */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-navy rounded-[2.5rem] p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <SummaryMetric label="Confirmadas" value={stats.confirmedReservations} icon={<CheckCircle2 size={16} className="text-orange-500 mb-1"/>} />
              <SummaryMetric label="Canceladas" value={stats.canceledReservations} icon={<XCircle size={16} className="text-red-500 mb-1"/>} />
              <SummaryMetric label="Total" value={stats.totalUserReservations} icon={<CheckCircle2 size={16} className="text-green-500 mb-1"/>} />
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-white/40 cursor-pointer hover:text-white/60 transition-colors">
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
            <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-white">Horarios disponibles</h3>
          </div>

          <div className="flex bg-[#061929] p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => setActiveRoute('toLaPlata')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${
                activeRoute === 'toLaPlata' ? 'bg-primary-500 text-white shadow-xl' : 'text-white/40 hover:text-white'
              }`}
            >
              NATAGÁ -> LA PLATA
            </button>
            <button
              onClick={() => setActiveRoute('toNataga')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${
                activeRoute === 'toNataga' ? 'bg-primary-500 text-white shadow-xl' : 'text-white/40 hover:text-white'
              }`}
            >
              LA PLATA -> NATAGÁ
            </button>
          </div>
        </div>

        <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} />

        {/* CARTA DE ESTADO POR RUTA (Como en la foto) */}
        <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
               <Activity className="text-primary-500" size={18} />
               <h3 className="text-sm font-black text-white/40 uppercase tracking-widest">Estado por ruta</h3>
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

        <div className="p-8 bg-[#061929] rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-6 opacity-60 mx-2">
          <div className="w-16 h-16 bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shrink-0">
             <Info size={32} />
          </div>
          <div className="text-center md:text-left space-y-1">
             <h4 className="text-lg font-black text-white uppercase leading-none">Reserva Web en desarrollo</h4>
             <p className="text-white/40 font-medium text-sm italic">Estamos trabajando para habilitar el motor de reservas en iPhone muy pronto.</p>
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
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10 text-secondary-900">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-secondary-900 p-1">
               <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center font-black text-xl lg:text-2xl shadow-inner">
                 {myName.substring(0, 1)}
               </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight">{myName}</h2>
              <p className="text-secondary-900/60 font-bold text-sm uppercase tracking-wider">Placa: {myPlate}</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-secondary-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
             Conductor Activo
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-navy rounded-[2.5rem] p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Resumen del día</h4>
               <Activity size={16} className="text-primary-500" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <span className="text-xl lg:text-2xl font-black text-green-500">{stats?.todayReservations || 0}</span>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Reservas</p>
              </div>
              <div className="space-y-1 border-x border-white/5">
                <span className="text-xl lg:text-2xl font-black text-primary-500">{currentDriverData.asientosLibres || 13}</span>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Libres</p>
              </div>
              <div className="space-y-1">
                <span className="text-xl lg:text-2xl font-black text-amber-500">{formatCurrency(stats?.totalRevenue || 0)}</span>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Ingresos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 pb-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3 text-white">
                <CheckCircle2 className="text-primary-500" size={18} />
                <h3 className="text-lg font-black uppercase tracking-tight leading-none">Confirmar Reservas</h3>
             </div>
             <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-primary-500/20">{pendingReservations.length}</span>
          </div>
          {pendingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              {pendingReservations.map(res => (
                <div key={res.id} className="card-navy p-6 rounded-[2rem] flex items-center justify-between group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-primary-500 transition-colors">
                      <Ticket size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">Asiento #{res.asientoReservado}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase">Pasajero: {res.nombreUsuario || 'User'}</p>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                    Confirmar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-navy p-12 rounded-[2.5rem] flex items-center justify-center text-center mx-2 opacity-50">
               <p className="text-white/40 text-xs font-bold uppercase italic tracking-widest">Sin reservas activas</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-3 px-2 text-white">
              <Calendar className="text-primary-500" size={18} />
              <h3 className="text-lg font-black uppercase tracking-tight">Mi Itinerario</h3>
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
      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Overview({ stats, routeStats, role }) {
  const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  const isAdmin = role?.type === 'ADMIN';

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-3'} gap-6`}>
        {isAdmin && (
          <>
            <StatCard label="Usuarios Activos" value={stats.totalUsers} icon={<Users className="text-blue-400" />} />
            <StatCard label="Dueños de Flota" value={stats.totalOwners} icon={<Users className="text-amber-400" />} />
          </>
        )}
        <StatCard label="En Turno" value={stats.activeDrivers} icon={<Bus className="text-green-400" />} />
        <StatCard label="Reservas Hoy" value={stats.todayReservations} icon={<Calendar className="text-purple-400" />} />
        <StatCard label="Ingresos" value={formatCurrency(stats.totalRevenue)} icon={<Activity className="text-primary-400" />} />
      </div>

      <div className="space-y-6">
        <h3 className="font-black text-xl uppercase tracking-tighter ml-2">Estado por ruta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RouteStatCard name="Nátaga → La Plata" reservations={routeStats.toLaPlata.reservations} available={routeStats.toLaPlata.seats} color="border-orange-500" />
          <RouteStatCard name="La Plata → Nátaga" reservations={routeStats.toNataga.reservations} available={routeStats.toNataga.seats} color="border-secondary-400" />
        </div>
      </div>
    </div>
  );
}

function RouteStatCard({ name, reservations, available, color }) {
  return (
    <div className={`card-navy p-6 rounded-[2.5rem] border-l-4 ${color} space-y-6`}>
      <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest">{name}</h4>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <span className="text-2xl font-black text-white">{reservations}</span>
          <p className="text-[9px] font-bold text-white/20 uppercase">Reservas</p>
        </div>
        <div className="w-px h-8 bg-white/5"></div>
        <div className="text-center">
          <span className="text-2xl font-black text-green-500">{available}</span>
          <p className="text-[9px] font-bold text-white/20 uppercase">Libres</p>
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
    <div className="space-y-12 pb-20">
      <div className="space-y-6">
        <h3 className="text-xl font-black uppercase tracking-tighter ml-2">Pasajeros Activos ({activeUsers.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeUsers.map(u => <UserCard key={u.id} user={u} />)}
        </div>
      </div>
      {deletionPending.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tighter text-red-500 ml-2">Solicitudes de Borrado ({deletionPending.length})</h3>
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
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between bg-[#061929] p-6 rounded-[2.5rem] border border-white/5">
        <h3 className="text-xl font-black uppercase tracking-tighter">Gestión de Operadores</h3>
        <button onClick={onAddDriver} className="px-6 py-4 bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary-500/20">Registrar Conductor</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-green-500 ml-2">En Ruta ({active.length})</h4>
          {active.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-white/20 ml-2">Fuera de Servicio ({inactive.length})</h4>
          {inactive.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
      </div>
    </div>
  );
}

function ProfileDirectory({ user, role }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="card-navy p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10">
        <div className="w-32 h-32 bg-slate-100 rounded-[3rem] flex items-center justify-center text-secondary-900 font-black text-5xl shadow-2xl border-4 border-white/10">
          {user.email?.substring(0, 1).toUpperCase()}
        </div>
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-4xl font-black tracking-tight">{user.displayName || 'Usuario Ruta-Go'}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
             <span className="px-6 py-2 bg-white/5 text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/5"><Mail size={14} /> {user.email}</span>
             <span className="px-6 py-2 bg-primary-500/10 text-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-primary-500/20">Rango: {role?.type}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-navy p-8 rounded-[2.5rem] space-y-6">
           <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-3"><Settings className="text-primary-500" size={18} /> Seguridad</h3>
           <button className="w-full text-left p-6 bg-white/5 hover:bg-white/10 rounded-[2rem] transition-all flex items-center justify-between group">
              <div><p className="text-sm font-black">Cambiar Contraseña</p><p className="text-[10px] text-white/40">Actualiza tus credenciales</p></div>
              <ChevronRight size={18} className="text-white/20 group-hover:text-primary-500" />
           </button>
        </div>
        <div className="bg-red-500/5 p-8 rounded-[2.5rem] border border-red-500/10 space-y-6 text-center md:text-left">
           <h3 className="font-black text-red-500 uppercase text-xs tracking-widest">Borrar Cuenta</h3>
           <p className="text-[11px] text-red-500/40 font-medium">Todos tus datos entrarán en periodo de gracia de 30 días.</p>
           <button className="w-full py-5 bg-red-500/10 border-2 border-red-500/20 text-red-500 font-black rounded-[2rem] text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all">Eliminar permanentemente</button>
        </div>
      </div>
    </div>
  );
}

function HistoryDirectory({ reservations, role }) {
  const list = reservations.sort((a, b) => (b.reservationDate || 0) - (a.reservationDate || 0));
  return (
    <div className="space-y-10 pb-20 px-2">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <h3 className="text-2xl font-black uppercase tracking-tighter">Historial de Reservas</h3>
        <span className="px-4 py-1.5 bg-white/5 text-white/40 rounded-full text-[10px] font-black uppercase">{list.length} Registros</span>
      </div>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(res => (
            <div key={res.id} className="card-navy p-8 rounded-[2.5rem] hover:ring-2 ring-primary-500/30 transition-all group relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl text-white/20 group-hover:text-primary-500 transition-colors"><Ticket size={28} /></div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${ (res.estadoReserva || res.reservationStatus) === 'Confirmada' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500' }`}>
                    {res.estadoReserva || res.reservationStatus}
                  </span>
               </div>
               <div className="space-y-6">
                  <div><p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Ruta</p><p className="text-lg font-black">{res.origen || 'La Plata'} ➔ {res.destino || 'Nátaga'}</p></div>
                  <div className="grid grid-cols-2">
                     <div><p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Asiento</p><p className="text-xl font-black">#{res.asientoReservado}</p></div>
                     <div className="text-right"><p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Fecha</p><p className="text-sm font-black">{res.travelDate ? new Date(res.travelDate).toLocaleDateString() : '--/--/--'}</p></div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 flex flex-col items-center justify-center text-white/10 italic"><History size={64} className="mb-4 opacity-50" /><p>No hay actividad registrada</p></div>
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500"><Clock size={28} /></div>
          <h3 className="text-2xl font-black uppercase tracking-tighter">Planilla de Despachos</h3>
        </div>
        <div className="flex bg-[#061929] p-1 rounded-2xl border border-white/5">
          <button onClick={() => setActiveRoute('toLaPlata')} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${activeRoute === 'toLaPlata' ? 'bg-primary-500 text-white shadow-2xl' : 'text-white/40'}`}>Nátaga ➔ LP</button>
          <button onClick={() => setActiveRoute('toNataga')} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${activeRoute === 'toNataga' ? 'bg-primary-500 text-white shadow-2xl' : 'text-white/40'}`}>LP ➔ Nátaga</button>
        </div>
      </div>
      <ScheduleTable schedules={currentSchedules} drivers={drivers} role={role} onManage={onManage} />
    </div>
  );
}

export default App;
