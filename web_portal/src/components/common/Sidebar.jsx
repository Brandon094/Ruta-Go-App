import React from 'react';
import { LayoutDashboard, Users, Bus, Calendar, History, UserCircle, LogOut, X, HelpCircle } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

/**
 * 🟦 Sidebar Component - Navegación Principal Responsiva
 */
export function Sidebar({ isOpen, onClose, activeTab, setActiveTab, role }) {
  const handleLogout = () => signOut(auth);

  const isAdmin = role?.type === 'ADMIN';
  const isOwner = role?.type === 'OWNER';
  const isManagement = isAdmin || isOwner;

  const sections = [
    {
      title: "Principal",
      items: [
        { id: 'overview', label: 'Vista General', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'OWNER', 'DRIVER', 'PASSENGER'] },
      ]
    },
    {
      title: "Gestión Operativa",
      hidden: !isManagement,
      items: [
        { id: 'drivers', label: 'Conductores', icon: <Bus size={20} />, roles: ['ADMIN', 'OWNER'] },
        { id: 'users', label: 'Pasajeros', icon: <Users size={20} />, roles: ['ADMIN'] },
        { id: 'schedules', label: 'Planilla', icon: <Calendar size={20} />, roles: ['ADMIN', 'OWNER'] },
      ]
    },
    {
      title: "Usuario",
      items: [
        { id: 'history', label: 'Historial', icon: <History size={20} />, roles: ['ADMIN', 'OWNER', 'DRIVER', 'PASSENGER'] },
        { id: 'profile', label: 'Mi Perfil', icon: <UserCircle size={20} />, roles: ['ADMIN', 'OWNER', 'DRIVER', 'PASSENGER'] },
      ]
    },
    {
      title: "Soporte",
      items: [
        { id: 'manual', label: 'Ayuda', icon: <HelpCircle size={20} />, roles: ['ADMIN', 'OWNER', 'DRIVER', 'PASSENGER'] },
      ]
    }
  ];

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-secondary-900/60 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Aside */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#061426] flex flex-col shadow-2xl transition-all duration-300 border-r border-slate-100 dark:border-white/5
        lg:relative lg:translate-x-0 lg:z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#061426] dark:bg-primary-500 rounded-xl flex items-center justify-center shadow-lg transition-colors">
              <img src="/assets/logo_icon.png" alt="Ruta-Go" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="text-lg font-black tracking-tight text-[#061426] dark:text-white uppercase italic">Ruta-Go</span>
              <span className="text-[10px] text-primary-500 font-black tracking-widest uppercase opacity-80">
                {role?.type === 'ADMIN' ? 'Admin Maestro' :
                 role?.type === 'OWNER' ? 'Panel Dueños' :
                 role?.type === 'DRIVER' ? 'Panel Conductor' :
                 'Portal Pasajero'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 dark:text-white/50 hover:text-primary-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto scrollbar-hide py-4">
          {sections.map((section, idx) => {
            if (section.hidden) return null;

            const filteredItems = section.items.filter(item => item.roles.includes(role?.type));
            if (filteredItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-2">
                <h4 className="px-5 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {filteredItems.map((item) => (
                    <NavItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      active={activeTab === item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-1 text-left">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut size={18} /> Salir del Portal
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group
        ${active
          ? 'bg-primary-500 text-white shadow-xl shadow-orange-500/30'
          : 'text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#061426] dark:hover:text-white'
        }
      `}
    >
      <span className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
        {icon}
      </span>
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );
}
