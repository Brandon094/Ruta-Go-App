import React from 'react';
import { Car, Hash, Calendar, Users, Edit3, Trash2, Palette, User } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function VehicleCard({ vehicle, drivers = [], onEdit, onDelete, isAdmin }) {
  const driverId = vehicle.driverId || vehicle.conductorId;
  const assignedDriver = drivers.find(d => d.id === driverId);

  return (
    <div className="card-base p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none relative">

      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Car size={28} />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-slate-800 dark:text-white text-base truncate uppercase italic leading-tight">
              {vehicle.marca ? `${vehicle.marca} ${vehicle.modelo}` : (vehicle.modelo || 'Modelo Desconocido')}
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

      <div className="grid grid-cols-3 gap-2 border-t border-slate-50 dark:border-white/5 pt-4">
        <div className="flex flex-col items-center text-center gap-1">
          <Calendar size={14} className="text-primary-500" />
          <p className="text-[10px] font-bold text-slate-700 dark:text-white leading-none">{vehicle.ano || vehicle.año || 'N/A'}</p>
          <p className="text-[7px] text-slate-400 dark:text-white/20 uppercase font-black tracking-tighter">Año</p>
        </div>
        <div className="flex flex-col items-center text-center gap-1 border-x border-slate-50 dark:border-white/5 px-2">
          <Palette size={14} className="text-primary-500" />
          <p className="text-[10px] font-bold text-slate-700 dark:text-white leading-none truncate w-full">{vehicle.color || 'N/A'}</p>
          <p className="text-[7px] text-slate-400 dark:text-white/20 uppercase font-black tracking-tighter">Color</p>
        </div>
        <div className="flex flex-col items-center text-center gap-1">
          <Users size={14} className="text-primary-500" />
          <p className="text-[10px] font-bold text-slate-700 dark:text-white leading-none">{vehicle.capacidad || 13}</p>
          <p className="text-[7px] text-slate-400 dark:text-white/20 uppercase font-black tracking-tighter">Cupos</p>
        </div>
      </div>

      <div className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
        assignedDriver
          ? 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20'
          : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 opacity-60'
      }`}>
        <div className={`p-2 rounded-xl ${assignedDriver ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}>
          <User size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Conductor Asignado</p>
          <p className={`text-xs font-bold truncate ${assignedDriver ? 'text-slate-800 dark:text-white' : 'text-slate-400 italic'}`}>
            {assignedDriver ? assignedDriver.nombre : 'Sin operador vinculado'}
          </p>
        </div>
        {assignedDriver && <Badge variant="info" className="text-[8px] scale-90">Operando</Badge>}
      </div>

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
