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
    const nombre = (d.name || d.nombre || '').toLowerCase();
    const placa = (d.vehiclePlate || d.vehicleId || d.placaVehiculo || d.vehiculoId || '').toLowerCase();
    const email = (d.email || '').toLowerCase();
    const phone = (d.phone || d.telefono || '').toLowerCase();
    return nombre.includes(search) || placa.includes(search) || email.includes(search) || phone.includes(search);
  });

  const active = filteredDrivers.filter(d => {
    const schedulesList = d.assignedSchedules || d.horariosAsignados || [];
    return d.status === 'active' && Array.isArray(schedulesList) && schedulesList.length > 0;
  });

  const inactive = filteredDrivers.filter(d => {
    const schedulesList = d.assignedSchedules || d.horariosAsignados || [];
    return d.status !== 'active' || !Array.isArray(schedulesList) || schedulesList.length === 0;
  });

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
          {active.length === 0 && (
            <p className="text-xs text-slate-400 dark:text-white/30 italic ml-4">No hay conductores en ruta activa</p>
          )}
        </div>
        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs text-amber-500 dark:text-amber-400 ml-4 tracking-widest italic">Registrados / Sin Turno ({inactive.length})</h4>
          {inactive.map(d => <DriverCard key={d.id} driver={d} onEdit={onEditDriver} />)}
          {inactive.length === 0 && (
            <p className="text-xs text-slate-400 dark:text-white/30 italic ml-4">No hay conductores fuera de servicio</p>
          )}
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
