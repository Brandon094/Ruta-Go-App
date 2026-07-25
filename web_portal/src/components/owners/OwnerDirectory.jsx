import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { OwnerCard } from './OwnerCard';

/**
 * 💼 Component: OwnerDirectory
 * Interfaz exclusiva para que el ADMIN gestione a los Socios de Flota.
 */
export function OwnerDirectory({ owners = [], users = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOwners = owners.filter(owner => {
    const profile = users.find(u => u.id === owner.id);
    const name = (profile?.nombre || "").toLowerCase();
    const email = (profile?.email || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || email.includes(search);
  });

  return (
    <div className="space-y-10 pb-20 px-2">

      <DirectoryHeader
        subtitle="Control de acceso y auditoría de dueños de flota"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Grid de Socios */}
      {filteredOwners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOwners.map(owner => (
            <OwnerCard
              key={owner.id}
              owner={owner}
              userProfile={users.find(u => u.id === owner.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center opacity-30">
          <Briefcase size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="font-black uppercase tracking-widest text-xs">No hay socios que coincidan con la búsqueda</p>
        </div>
      )}
    </div>
  );
}
