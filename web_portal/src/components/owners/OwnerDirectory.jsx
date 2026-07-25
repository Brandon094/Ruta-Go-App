import React, { useState } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { Input } from '../ui/Input';
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
      {/* Header Informativo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm">
            <Briefcase size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Gestión de Socios</h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Control de acceso y auditoría de dueños</p>
          </div>
        </div>

        {/* Search Bar Atómica */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Buscar socio por nombre o email..."
            icon={Search}
            value={searchTerm}
            onChange={(val) => setSearchTerm(val)}
          />
        </div>
      </div>

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
