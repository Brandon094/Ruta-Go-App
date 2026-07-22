import React from 'react';
import { LayoutDashboard, Users, Bus, Calendar, Settings, LogOut, X } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

/**
 * 🟦 Sidebar Component - Navegación Principal Responsiva
 *
 * @param {boolean} isOpen - Estado del menú en móviles
 * @param {function} onClose - Función para cerrar el menú
 * @param {string} activeTab - Tab actual
 * @param {function} setActiveTab - Navegador entre tabs
 */
export function Sidebar({ isOpen, onClose, activeTab, setActiveTab, role }) {
  const handleLogout = () => signOut(auth);

  const menuItems = [
    { id: 'overview', label: 'Vista General', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'OWNER'] },
    { id: 'drivers', label: 'Conductores', icon: <Bus size={20} />, roles: ['ADMIN', 'OWNER'] },
    { id: 'users', label: 'Usuarios', icon: <Users size={20} />, roles: ['ADMIN'] },
    { id: 'schedules', label: 'Horarios', icon: <Calendar size={20} />, roles: ['ADMIN', 'OWNER'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role?.type));

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Aside */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-secondary-900 text-white flex flex-col shadow-2xl transition-transform duration-300
        lg:relative lg:translate-x-0 lg:z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center font-black text-xl transform -rotate-3 shadow-lg">R</div>
            <div className="flex flex-col leading-tight text-left">
              <span className="text-lg font-bold tracking-tight">Ruta-Go</span>
              <span className="text-[10px] text-primary-500 font-bold tracking-widest uppercase opacity-80">
                {role?.type === 'ADMIN' ? 'Admin Maestro' : 'Panel Dueños'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto text-left">
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
        </nav>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-white/5 space-y-1 text-left">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-widest"
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
          ? 'bg-primary-500 text-white shadow-xl shadow-primary-500/20'
          : 'text-white/50 hover:bg-white/5 hover:text-white'
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
