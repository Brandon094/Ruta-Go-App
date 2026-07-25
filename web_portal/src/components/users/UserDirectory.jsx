import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { UserCard } from './UserCard';
import { DirectoryHeader } from '../common/DirectoryHeader';

/**
 * 👥 Component: UserDirectory
 * Gestión de pasajeros para el Administrador Maestro.
 */
export function UserDirectory({ users = [], role }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => {
    const search = searchTerm.toLowerCase();
    const nombre = (u.nombre || u.name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    return nombre.includes(search) || email.includes(search);
  });

  const activeUsers = filteredUsers.filter(u => !u.solicitudBorrado);
  const deletionPending = filteredUsers.filter(u => u.solicitudBorrado === true);

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">

      <DirectoryHeader
        subtitle="Control y moderación de cuentas de pasajeros"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest ml-4 text-primary-500 italic">
          Pasajeros Activos ({activeUsers.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeUsers.map(u => <UserCard key={u.id} user={u} adminRole={role} />)}
        </div>
      </div>

      {deletionPending.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest ml-4 text-red-500 italic">
            Solicitudes de Borrado ({deletionPending.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {deletionPending.map(u => <UserCard key={u.id} user={u} adminRole={role} />)}
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="py-32 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
          <Users size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="font-black uppercase tracking-widest text-xs text-[#061426] dark:text-white">No se encontraron pasajeros</p>
        </div>
      )}
    </div>
  );
}
