import React, { useState } from 'react';
import { Bus, Plus } from 'lucide-react';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { DriverCard } from './DriverCard';

/**
 * 🏛️ Organism: DriverDirectory
 * Gestión centralizada de conductores para Root y Dueños.
 */
export function DriverDirectory({ drivers = [], onEditDriver, onAddDriver }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(d => {
    const search = searchTerm.toLowerCase();
    const nombre = (d.nombre || '').toLowerCase();
    const placa = (d.placaVehiculo || '').toLowerCase();
    return nombre.includes(search) || placa.includes(search);
  });

  const active = filteredDrivers.filter(d => d.status === 'active' && d.horariosAsignados?.length > 0);
  const inactive = filteredDrivers.filter(d => d.status !== 'active' || !d.horariosAsignados?.length);

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">

      <DirectoryHeader
        subtitle="Administración de conductores y asignación de turnos"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAction={onAddDriver}
        actionLabel="Registrar Conductor"
        actionIcon={Plus}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-green-500 ml-4 tracking-widest italic">En Ruta ({active.length})</h4>
          {active.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-slate-400 dark:text-white/20 ml-4 tracking-widest italic">Fuera de Servicio ({inactive.length})</h4>
          {inactive.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
        </div>
      </div>

      {filteredDrivers.length === 0 && (
        <div className="py-32 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
          <Bus size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="font-black uppercase tracking-widest text-xs text-[#061426] dark:text-white">No se encontraron conductores</p>
        </div>
      )}
    </div>
  );
}
