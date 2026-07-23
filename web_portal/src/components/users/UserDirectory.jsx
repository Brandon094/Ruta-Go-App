import React from 'react';
import { UserCard } from './UserCard';

export function UserDirectory({ users = [] }) {
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
