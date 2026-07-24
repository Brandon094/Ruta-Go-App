import React, { useState } from 'react';
import { Car, Plus, Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { VehicleCard } from './VehicleCard';

export function VehicleDirectory({ vehicles = [], drivers = [], onAdd, onEdit, onDelete, role }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = role?.type === 'ADMIN';
  const ownerId = role?.uid;

  const filteredVehicles = vehicles
    .filter(v => isAdmin || v.ownerId === ownerId)
    .filter(v => {
      const search = searchTerm.toLowerCase();
      return (v.placa || v.id || '').toLowerCase().includes(search) ||
             (v.modelo || '').toLowerCase().includes(search);
    });

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm">
            <Car size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Mi Flota de Vehículos</h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Gestión de activos del holding</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Buscar vehículo..."
              icon={Search}
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </div>
          <Button icon={Plus} onClick={onAdd} className="w-full sm:w-auto">
            Añadir Vehículo
          </Button>
        </div>
      </div>

      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(v => (
            <VehicleCard
              key={v.id || v.placa}
              vehicle={v}
              drivers={drivers}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
          <Car size={64} className="mx-auto text-slate-400 mb-4" />
          <p className="font-black uppercase tracking-widest text-xs">No hay vehículos registrados</p>
        </div>
      )}
    </div>
  );
}
