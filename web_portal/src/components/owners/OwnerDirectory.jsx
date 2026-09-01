import React, { useState } from 'react';
import { Briefcase, UserPlus } from 'lucide-react';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { OwnerCard } from './OwnerCard';
import { AddOwnerModal } from './AddOwnerModal';
import { Button } from '../ui/Button';

/**
 * 💼 Component: OwnerDirectory
 * Interfaz exclusiva para que el ADMIN gestione a los Socios de Flota.
 */
export function OwnerDirectory({ owners = [], users = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredOwners = owners.filter(owner => {
    const profile = users.find(u => u.id === owner.id) || owner;
    const name = (profile?.name || profile?.nombre || "").toLowerCase();
    const email = (profile?.email || "").toLowerCase();
    const phone = (profile?.phone || profile?.telefono || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || email.includes(search) || phone.includes(search);
  });

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DirectoryHeader
          subtitle="Control de acceso y auditoría de dueños de flota"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-lg shadow-[#FF7A1A]/20 shrink-0"
        >
          <UserPlus size={18} className="mr-2" />
          Ascender Socio por Correo
        </Button>
      </div>

      {/* Grid de Socios */}
      {filteredOwners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOwners.map(owner => (
            <OwnerCard
              key={owner.id}
              owner={owner}
              userProfile={users.find(u => u.id === owner.id) || owner}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
          <Briefcase size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="font-black uppercase tracking-widest text-xs text-slate-500 dark:text-white">No hay socios registrados o que coincidan con la búsqueda</p>
        </div>
      )}

      <AddOwnerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        users={users}
      />
    </div>
  );
}
