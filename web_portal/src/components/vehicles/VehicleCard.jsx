import React from 'react';
import { Car, Hash, Calendar, Users, Edit3, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function VehicleCard({ vehicle, onEdit, onDelete, isAdmin }) {
  return (
    <div className="card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none relative">

      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner">
            <Car size={28} />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate uppercase italic leading-tight">
              {vehicle.modelo || 'Modelo Desconocido'}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <Hash size={12} className="text-primary-500" />
              <p className="text-[11px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">
                {vehicle.placa || vehicle.id}
              </p>
            </div>
          </div>
        </div>
        <Badge variant={vehicle.estado === 'activo' ? 'success' : 'warning'}>
          {vehicle.estado || 'Activo'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-slate-50 dark:border-white/5 pt-4">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-primary-500" />
          <div>
            <p className="text-[8px] text-slate-400 dark:text-white/20 uppercase font-black">Año</p>
            <p className="text-xs font-bold text-slate-700 dark:text-white">{vehicle.ano || vehicle.año || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users size={16} className="text-primary-500" />
          <div>
            <p className="text-[8px] text-slate-400 dark:text-white/20 uppercase font-black">Capacidad</p>
            <p className="text-xs font-bold text-slate-700 dark:text-white">{vehicle.capacidad || 13} puestos</p>
          </div>
        </div>
      </div>

      {vehicle.driverId && (
        <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-between">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Conductor Asignado</span>
           <Badge variant="info" className="text-[8px]">En Uso</Badge>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" size="full" icon={Edit3} onClick={() => onEdit(vehicle)}>
          Editar
        </Button>
        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500" icon={Trash2} onClick={() => onDelete(vehicle.id || vehicle.placa)}>
        </Button>
      </div>
    </div>
  );
}
