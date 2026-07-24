import React, { useState, useEffect } from 'react';
import { Loader2, LayoutDashboard, History as HistoryIcon, User, XCircle } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

// Components - Common
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Terms from './Terms';
import Privacy from './Privacy';
import UserManual from './UserManual';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';

// Components - Dashboard Overviews
import { AdminOverview } from './components/dashboard/overviews/AdminOverview';
import { PassengerOverview } from './components/dashboard/overviews/PassengerOverview';
import { DriverOverview } from './components/dashboard/overviews/DriverOverview';
import { OwnerOverview } from './components/dashboard/overviews/OwnerOverview';

// Components - Directories
import { UserDirectory } from './components/users/UserDirectory';
import { DriverDirectory } from './components/drivers/DriverDirectory';
import { OwnerDirectory } from './components/owners/OwnerDirectory';
import { VehicleDirectory } from './components/vehicles/VehicleDirectory';
import { PricingDirectory } from './components/pricing/PricingDirectory';
import { DriverItinerary } from './components/itinerary/DriverItinerary';
import { HistoryDirectory } from './components/history/HistoryDirectory';
import { ScheduleDirectory } from './components/schedules/ScheduleDirectory';
import { ProfileDirectory } from './components/profile/ProfileDirectory';

// Modals
import { EditDriverModal } from './components/drivers/EditDriverModal';
import { AddDriverModal } from './components/drivers/AddDriverModal';
import { VehicleModal } from './components/vehicles/VehicleModal';
import { SeatManagementModal } from './components/schedules/SeatManagementModal';

// Hooks
import { useRealtimeStats } from './hooks/useRealtimeStats';

/**
 * 🖥️ Ruta-Go Portal - Orquestador Principal (Modularizado v1.5.1)
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
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
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

  const { role, stats, drivers, users: usersList, owners, schedules, reservations, prices, routeStats, vehicles } = useRealtimeStats(user);

  if (loadingAuth) {
    return (
      <div className="h-screen bg-secondary-50 dark:bg-[#061426] flex flex-col items-center justify-center gap-6 transition-colors duration-500">
        <div className="relative">
          <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-16 h-16 object-contain animate-pulse" />
          <Loader2 className="text-primary-500 animate-spin absolute -bottom-2 -right-2" size={24} />
        </div>
        <p className="text-slate-400 dark:text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">Autenticando...</p>
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

  const isManagement = role?.type === 'ADMIN' || role?.type === 'OWNER';
  const isLoaded = !role?.loading;

  return (
    <div className="flex h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-white antialiased font-sans overflow-hidden transition-colors duration-300">
      {isLoaded && isManagement && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={role}
        />
      )}

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
            activeTab === 'owners' ? 'Gestión de Socios' :
            activeTab === 'vehicles' ? 'Mi Flota' :
            activeTab === 'pricing' ? 'Configuración de Tarifas' :
            activeTab === 'passenger_view' ? 'Centro de Reservas' :
            activeTab === 'itinerary' ? 'Mi Itinerario' :
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
                vehicles={vehicles}
              />
            ) : role?.type === 'DRIVER' ? (
              <DriverOverview
                stats={stats}
                routeStats={routeStats}
                schedules={schedules}
                drivers={drivers}
                reservations={reservations}
                role={role}
                onManage={(s) => setManagingSchedule(s)}
                vehicles={vehicles}
              />
            ) : role?.type === 'OWNER' ? (
              <OwnerOverview stats={stats} routeStats={routeStats} role={role} />
            ) : (
              <AdminOverview stats={stats} role={role} users={usersList} drivers={drivers} owners={owners} />
            )
          ) : activeTab === 'history' ? (
            <HistoryDirectory reservations={reservations} role={role} onNavigate={() => setActiveTab('overview')} />
          ) : activeTab === 'profile' ? (
            <ProfileDirectory user={user} role={role} />
          ) : activeTab === 'owners' ? (
            <OwnerDirectory owners={owners} users={usersList} />
          ) : activeTab === 'vehicles' ? (
            <VehicleDirectory
              vehicles={vehicles}
              drivers={drivers}
              onAdd={() => setIsAddingVehicle(true)}
              onEdit={(v) => setEditingVehicle(v)}
              onDelete={(placa) => {
                if(window.confirm('¿Seguro de eliminar este vehículo?')) {
                  import('./services/vehicleService').then(m => m.vehicleService.deleteVehicle(placa));
                }
              }}
              role={role}
            />
          ) : activeTab === 'pricing' ? (
            <PricingDirectory prices={prices || {}} />
          ) : activeTab === 'passenger_view' ? (
            <PassengerOverview
              stats={stats}
              routeStats={routeStats}
              schedules={schedules}
              drivers={drivers}
              role={role}
              user={user}
              onManage={(s) => setManagingSchedule(s)}
              vehicles={vehicles}
            />
          ) : activeTab === 'drivers' ? (
            <DriverDirectory drivers={drivers} onEditDriver={(driver) => setEditingDriver(driver)} onAddDriver={() => setIsAddingDriver(true)} />
          ) : activeTab === 'users' ? (
            <UserDirectory users={usersList} role={role} />
          ) : activeTab === 'schedules' ? (
            <ScheduleDirectory schedules={schedules} drivers={drivers} role={role} onManage={(s) => setManagingSchedule(s)} vehicles={vehicles} />
          ) : activeTab === 'manual' ? (
            <UserManual role={role} isTab={true} />
          ) : null}
        </div>

        {/* Bottom Nav Simulation - Espejo de App Móvil */}
        {isLoaded && !isManagement && (
          <div className="h-20 bg-white dark:bg-[#061929] border-t border-slate-200 dark:border-white/5 flex items-center justify-around px-6 shrink-0 transition-colors duration-300 shadow-2xl">
             <BottomNavItem icon={<LayoutDashboard size={22}/>} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
             <BottomNavItem icon={<HistoryIcon size={22}/>} active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
             <BottomNavItem icon={<User size={22}/>} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
             <button onClick={() => auth.signOut()} className="p-3 text-red-500 dark:text-red-400 opacity-80 hover:opacity-100 transition-opacity"><XCircle size={22}/></button>
          </div>
        )}
      </main>

      {editingDriver && <EditDriverModal driver={editingDriver} onClose={() => setEditingDriver(null)} onRefresh={() => {}} role={role} owners={owners} users={usersList} vehicles={vehicles} />}
      {isAddingDriver && <AddDriverModal onClose={() => setIsAddingDriver(false)} users={usersList} owners={owners} vehicles={vehicles} currentUser={user} role={role} />}
      {isAddingVehicle && <VehicleModal isOpen={true} onClose={() => setIsAddingVehicle(false)} role={role} />}
      {editingVehicle && <VehicleModal isOpen={true} onClose={() => setEditingVehicle(null)} vehicle={editingVehicle} role={role} />}
      {managingSchedule && (
        <SeatManagementModal
          schedule={managingSchedule}
          onClose={() => setManagingSchedule(null)}
          role={role}
          drivers={drivers}
          vehicles={vehicles}
          activeTab={activeTab} // <-- PASAMOS EL CONTEXTO
        />
      )}
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

export default App;
