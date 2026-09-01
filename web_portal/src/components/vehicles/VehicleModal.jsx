import React, { useState, useEffect, useMemo } from 'react';
import { Car, Save, Hash, Calendar, Settings, Star, Palette, User, Briefcase } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { vehicleService } from '../../services/vehicleService';

export function VehicleModal({ isOpen, onClose, vehicle, role, drivers = [], owners = [], users = [] }) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!vehicle;

  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    color: '',
    ano: new Date().getFullYear().toString(),
    capacidad: 13,
    ownerId: role?.type === 'OWNER' ? role.uid : '',
    driverId: ''
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        placa: vehicle.plate || vehicle.placa || vehicle.id || '',
        modelo: vehicle.model || vehicle.modelo || '',
        marca: vehicle.brand || vehicle.marca || '',
        color: vehicle.color || '',
        ano: vehicle.year || vehicle.ano || vehicle.año || new Date().getFullYear().toString(),
        capacidad: vehicle.capacity || vehicle.capacidad || 13,
        ownerId: vehicle.ownerId || (role?.type === 'OWNER' ? role.uid : ''),
        driverId: vehicle.driverId || vehicle.conductorId || ''
      });
    } else {
      setFormData({
        placa: '',
        modelo: '',
        marca: '',
        color: '',
        ano: new Date().getFullYear().toString(),
        capacidad: 13,
        ownerId: role?.type === 'OWNER' ? role.uid : '',
        driverId: ''
      });
    }
  }, [vehicle, role]);

  // Lista de dueños/socios candidatos
  const availableOwners = useMemo(() => {
    if (owners && owners.length > 0) return owners;
    return users.filter(u => {
      const r = (u.role || u.rol || "").toLowerCase();
      return r === "owner" || r === "dueño" || r === "socio";
    });
  }, [owners, users]);

  // Lista de conductores candidatos
  const availableDrivers = useMemo(() => {
    if (drivers && drivers.length > 0) return drivers;
    return users.filter(u => {
      const r = (u.role || u.rol || "").toLowerCase();
      return r === "driver" || r === "conductor";
    });
  }, [drivers, users]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.placa.trim()) {
      alert("⚠️ Por favor ingresa la placa del vehículo.");
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await vehicleService.updateVehicle(formData.placa.trim(), formData);
      } else {
        await vehicleService.registerVehicle(formData);
      }
      alert(`✅ ¡Vehículo ${formData.placa.toUpperCase()} ${isEdit ? 'actualizado' : 'registrado'} exitosamente!`);
      onClose();
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Gestión de Activo' : 'Nuevo Vehículo'}>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Placa del Bus"
            icon={<Hash size={18}/>}
            placeholder="TBO550"
            value={formData.placa}
            onChange={(val) => setFormData({...formData, placa: val.toUpperCase()})}
            disabled={isEdit}
            required
          />
          <Input
            label="Año"
            icon={<Calendar size={18}/>}
            type="number"
            value={formData.ano}
            onChange={(val) => setFormData({...formData, ano: val})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Marca"
            icon={<Star size={18}/>}
            placeholder="Chevrolet / Nissan"
            value={formData.marca}
            onChange={(val) => setFormData({...formData, marca: val})}
          />
          <Input
            label="Color"
            icon={<Palette size={18}/>}
            placeholder="Blanco / Gris"
            value={formData.color}
            onChange={(val) => setFormData({...formData, color: val})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Modelo"
            icon={<Car size={18}/>}
            placeholder="D-Max / Frontier"
            value={formData.modelo}
            onChange={(val) => setFormData({...formData, modelo: val})}
          />
          <Input
            label="Capacidad Pasajeros"
            icon={<Settings size={18}/>}
            type="number"
            value={formData.capacidad}
            onChange={(val) => setFormData({...formData, capacidad: val})}
          />
        </div>

        {/* SELECTOR DE SOCIO / DUEÑO (Para Admin) */}
        {role?.type === 'ADMIN' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 flex items-center gap-1.5">
              <Briefcase size={14} className="text-amber-500" /> Socio / Dueño de Flota
            </label>
            <select
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
            >
              <option value="">-- Sin Socio Asignado (Opcional) --</option>
              {availableOwners.map(o => (
                <option key={o.id || o.uid} value={o.id || o.uid}>
                  {o.name || o.nombre || 'Socio'} ({o.email || 'Sin correo'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* SELECTOR DE CONDUCTOR ASIGNADO */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 flex items-center gap-1.5">
            <User size={14} className="text-green-500" /> Conductor Asignado
          </label>
          <select
            value={formData.driverId}
            onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
          >
            <option value="">-- Sin Conductor Asignado (Opcional) --</option>
            {availableDrivers.map(d => (
              <option key={d.id || d.uid} value={d.id || d.uid}>
                {d.name || d.nombre || 'Conductor'} ({d.email || 'Sin correo'})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-4">
          <Button type="button" variant="ghost" size="full" onClick={onClose} className="text-slate-400">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="full"
            isLoading={loading}
            icon={Save}
          >
            {isEdit ? 'Guardar Cambios' : 'Registrar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
