import React, { useState, useEffect, Suspense, lazy, useTransition } from 'react';
import { Loader2, LayoutDashboard, History as HistoryIcon, User, XCircle } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

// Components - Common (Landing stays static for speed)
import LandingPage from './LandingPage';
import { SplashScreen } from './components/ui/SplashScreen';

// Lazy Loaded Components (Optimización v1.9.9.2)
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Terms = lazy(() => import('./Terms'));
const Privacy = lazy(() => import('./Privacy'));
const UserManual = lazy(() => import('./UserManual'));
const Sidebar = lazy(() => import('./components/common/Sidebar').then(m => ({ default: m.Sidebar })));
const Header = lazy(() => import('./components/common/Header').then(m => ({ default: m.Header })));

// Dashboards
const AdminOverview = lazy(() => import('./components/dashboard/overviews/AdminOverview').then(m => ({ default: m.AdminOverview })));
const PassengerOverview = lazy(() => import('./components/dashboard/overviews/PassengerOverview').then(m => ({ default: m.PassengerOverview })));
const DriverOverview = lazy(() => import('./components/dashboard/overviews/DriverOverview').then(m => ({ default: m.DriverOverview })));
const OwnerOverview = lazy(() => import('./components/dashboard/overviews/OwnerOverview').then(m => ({ default: m.OwnerOverview })));

// Directories
const UserDirectory = lazy(() => import('./components/users/UserDirectory').then(m => ({ default: m.UserDirectory })));
const DriverDirectory = lazy(() => import('./components/drivers/DriverDirectory').then(m => ({ default: m.DriverDirectory })));
const OwnerDirectory = lazy(() => import('./components/owners/OwnerDirectory').then(m => ({ default: m.OwnerDirectory })));
const VehicleDirectory = lazy(() => import('./components/vehicles/VehicleDirectory').then(m => ({ default: m.VehicleDirectory })));
const PricingDirectory = lazy(() => import('./components/pricing/PricingDirectory').then(m => ({ default: m.PricingDirectory })));
const HistoryDirectory = lazy(() => import('./components/history/HistoryDirectory').then(m => ({ default: m.HistoryDirectory })));
const ScheduleDirectory = lazy(() => import('./components/schedules/ScheduleDirectory').then(m => ({ default: m.ScheduleDirectory })));
const ProfileDirectory = lazy(() => import('./components/profile/ProfileDirectory').then(m => ({ default: m.ProfileDirectory })));

// Modals
const EditDriverModal = lazy(() => import('./components/drivers/EditDriverModal').then(m => ({ default: m.EditDriverModal })));
const AddDriverModal = lazy(() => import('./components/drivers/AddDriverModal').then(m => ({ default: m.AddDriverModal })));
const VehicleModal = lazy(() => import('./components/vehicles/VehicleModal').then(m => ({ default: m.VehicleModal })));
const SeatManagementModal = lazy(() => import('./components/schedules/SeatManagementModal').then(m => ({ default: m.SeatManagementModal })));

// Hooks
import { useRealtimeStats } from './hooks/useRealtimeStats';
import { useNotifications } from './hooks/useNotifications';
import { vehicleService } from './services/vehicleService';

/**
 * 🖥️ Ruta-Go Portal - Orquestador Principal (v1.1.0 - Atomic Sync)
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
  const [isPending, startTransition] = useTransition();

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

  const { role, stats, drivers, allDrivers, users: usersList, owners, schedules, reservations, personalReservations, prices, routeStats, vehicles } = useRealtimeStats(user);

  // 🔔 Inicializar Motor de Notificaciones (FCM Web)
  useNotifications(user, role);

  // Helper para cambios de vista seguros con transiciones (v1.9.9.5)
  const navigateTo = (nextView) => {
    startTransition(() => {
      setView(nextView);
    });
  };

  const changeTab = (nextTab) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
  };

  if (loadingAuth) {
    return <SplashScreen message="Autenticando..." />;
  }

  if (user && role.loading) {
    return <SplashScreen message="Resolviendo Identidad..." />;
  }

  if (isPending) {
    return <SplashScreen message="Cargando Módulos..." />;
  }

  if (!user) {
    if (view === 'login') return <Login onBack={() => navigateTo('landing')} onShowRegister={() => { setRegisterMode('owner'); navigateTo('register'); }} />;
    if (view === 'register') return <Register onBack={() => navigateTo('landing')} initialMode={registerMode} />;
    if (view === 'terms') return <Terms onBack={() => navigateTo('landing')} />;
    if (view === 'privacy') return <Privacy onBack={() => navigateTo('landing')} />;
    if (view === 'manual') return <UserManual onBack={() => navigateTo('landing')} />;
    return (
      <LandingPage
        onLogin={() => navigateTo('login')}
        onRegisterOwner={() => { setRegisterMode('owner'); navigateTo('register'); }}
        onRegisterPassenger={() => { setRegisterMode('passenger'); navigateTo('register'); }}
        onViewTerms={() => navigateTo('terms')}
        onViewPrivacy={() => navigateTo('privacy')}
        onViewManual={() => navigateTo('manual')}
      />
    );
  }

  const isManagement = role?.type === 'ADMIN' || role?.type === 'OWNER';
  const isLoaded = !role?.loading;

  return (
    <Suspense fallback={<SplashScreen message="Sincronizando..." />}>
      <div className="flex h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-white antialiased font-sans overflow-hidden transition-colors duration-300">
        {isLoaded && isManagement && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            activeTab={activeTab}
            setActiveTab={changeTab}
            role={role}
          />
        )}

        <main id="main-content" className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Header
            title={
              activeTab === 'overview' ?
                (!role?.type ? 'Cargando...' :
                role.type === 'ADMIN' ? 'Panel Maestro' :
                role.type === 'OWNER' ? 'Dashboard Dueño' :
                role.type === 'DRIVER' ? 'Panel de Conductor' :
                'Centro de Reservas') :
              activeTab === 'history' ? 'Mi Historial Personal' :
              activeTab === 'business_history' ? 'Monitor de Despachos' :
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
                  drivers={allDrivers} // lookup full list
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
                  drivers={allDrivers} // lookup full list
                  reservations={reservations}
                  role={role}
                  onManage={(s) => setManagingSchedule(s)}
                  vehicles={vehicles}
                />
              ) : role?.type === 'OWNER' ? (
                <OwnerOverview stats={stats} routeStats={routeStats} role={role} />
              ) : role?.type === 'ADMIN' ? (
                <AdminOverview stats={stats} routeStats={routeStats} role={role} users={usersList} drivers={allDrivers} owners={owners} />
              ) : null
            ) : activeTab === 'history' ? (
              <HistoryDirectory type="personal" reservations={personalReservations} role={role} drivers={allDrivers} onNavigate={() => changeTab(isManagement ? 'passenger_view' : 'overview')} />
            ) : activeTab === 'business_history' ? (
              <HistoryDirectory type="business" reservations={reservations} role={role} drivers={allDrivers} onNavigate={() => changeTab('overview')} />
            ) : activeTab === 'profile' ? (
              <ProfileDirectory user={user} role={role} onNavigate={changeTab} />
            ) : activeTab === 'owners' ? (
              <OwnerDirectory owners={owners} users={usersList} />
            ) : activeTab === 'vehicles' ? (
              <VehicleDirectory
                vehicles={vehicles}
                drivers={allDrivers}
                onAdd={() => setIsAddingVehicle(true)}
                onEdit={(v) => setEditingVehicle(v)}
                onDelete={(placa) => {
                  if(window.confirm('¿Seguro de eliminar este vehículo?')) {
                    vehicleService.deleteVehicle(placa);
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
                drivers={allDrivers}
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
              <ScheduleDirectory schedules={schedules} drivers={allDrivers} role={role} onManage={(s) => setManagingSchedule(s)} vehicles={vehicles} />
            ) : activeTab === 'manual' ? (
              <UserManual role={role} isTab={true} />
            ) : null}
          </div>

          {/* Bottom Nav Simulation - Espejo de App Móvil */}
          {isLoaded && !isManagement && (
            <div className="h-20 bg-white dark:bg-[#061929] border-t border-slate-200 dark:border-white/5 flex items-center justify-around px-6 shrink-0 transition-colors duration-300 shadow-2xl">
              <BottomNavItem
                icon={<LayoutDashboard size={22}/>}
                active={activeTab === 'overview'}
                onClick={() => changeTab('overview')}
                label="Ir a Dashboard"
              />
              <BottomNavItem
                icon={<HistoryIcon size={22}/>}
                active={activeTab === 'history' || activeTab === 'business_history'}
                onClick={() => changeTab(role?.type === 'DRIVER' ? 'business_history' : 'history')}
                label="Ver Historial"
              />
              <BottomNavItem
                icon={<User size={22}/>}
                active={activeTab === 'profile'}
                onClick={() => changeTab('profile')}
                label="Ver mi Perfil"
              />
              <button
                onClick={() => auth.signOut()}
                aria-label="Cerrar Sesión"
                className="p-3 text-red-500 dark:text-red-400 opacity-80 hover:opacity-100 transition-opacity"
              >
                <XCircle size={22}/>
              </button>
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
            user={user}
            drivers={allDrivers} // lookup full list
            vehicles={vehicles}
            activeTab={activeTab} // <-- PASAMOS EL CONTEXTO
          />
        )}
      </div>
    </Suspense>
  );
}

function BottomNavItem({ icon, active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-4 transition-all ${active ? 'text-primary-500 scale-110 drop-shadow-sm' : 'text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40'}`}
    >
      {icon}
    </button>
  );
}

export default App;
