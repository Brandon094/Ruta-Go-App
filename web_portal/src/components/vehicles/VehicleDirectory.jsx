import React, { useState } from 'react';
import { Car, Plus } from 'lucide-react';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { VehicleCard } from './VehicleCard';

/**
 * 🏛️ Organism: VehicleDirectory
 * Gestión centralizada de la flota para Root y Dueños.
 */
export function VehicleDirectory({ vehicles = [], drivers = [], owners = [], onAdd, onEdit, onDelete, role }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = role?.type === 'ADMIN';
  const ownerId = role?.uid;

  const filteredVehicles = vehicles
    .filter(v => isAdmin || v.ownerId === ownerId)
    .filter(v => {
      const search = searchTerm.toLowerCase();
      const placa = (v.plate || v.placa || v.id || '').toLowerCase();
      const modelo = (v.model || v.modelo || '').toLowerCase();
      const marca = (v.brand || v.marca || '').toLowerCase();
      return placa.includes(search) || modelo.includes(search) || marca.includes(search);
    });

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">

      <DirectoryHeader
        subtitle="Control de activos y vinculación de conductores"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAction={onAdd}
        actionLabel="Añadir Vehículo"
        actionIcon={Plus}
      />

      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(v => (
            <VehicleCard
              key={v.id || v.plate || v.placa}
              vehicle={v}
              drivers={drivers}
              owners={owners}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
          <Car size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="font-black uppercase tracking-widest text-xs text-[#061426] dark:text-white">No hay vehículos registrados</p>
        </div>
      )}
    </div>
  );
}
