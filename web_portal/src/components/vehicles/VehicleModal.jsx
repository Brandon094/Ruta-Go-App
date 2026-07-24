import React, { useState, useEffect } from 'react';
import { X, Car, Save, Hash, Calendar, Settings, Star, Palette } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { vehicleService } from '../../services/vehicleService';

export function VehicleModal({ isOpen, onClose, vehicle, role }) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!vehicle;

  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    color: '',
    ano: new Date().getFullYear().toString(),
    capacidad: 13,
    ownerId: role?.uid || ''
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        placa: vehicle.placa || vehicle.id || '',
        modelo: vehicle.modelo || '',
        marca: vehicle.marca || '',
        color: vehicle.color || '',
        ano: vehicle.ano || vehicle.año || '',
        capacidad: vehicle.capacidad || 13,
        ownerId: vehicle.ownerId || role?.uid || ''
      });
    } else {
      setFormData({
        placa: '',
        modelo: '',
        marca: '',
        color: '',
        ano: new Date().getFullYear().toString(),
        capacidad: 13,
        ownerId: role?.uid || ''
      });
    }
  }, [vehicle, role]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await vehicleService.updateVehicle(formData.placa, formData);
        alert("✅ Vehículo actualizado exitosamente.");
      } else {
        await vehicleService.registerVehicle(formData);
        alert("✅ Vehículo registrado exitosamente.");
      }
      onClose();
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-secondary-800 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-white/5 transition-colors duration-300">

        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Car size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{isEdit ? 'Editar Vehículo' : 'Nuevo Vehículo'}</h3>
              <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest mt-1">Activos de la flota</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 dark:text-white/20 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Placa"
              icon={Hash}
              placeholder="ABC-123"
              value={formData.placa}
              onChange={(val) => setFormData({...formData, placa: val.toUpperCase()})}
              disabled={isEdit}
              required
            />
            <Input
              label="Año"
              icon={Calendar}
              type="number"
              value={formData.ano}
              onChange={(val) => setFormData({...formData, ano: val})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Marca"
              icon={Star}
              placeholder="Ej: Nissan"
              value={formData.marca}
              onChange={(val) => setFormData({...formData, marca: val})}
              required
            />
            <Input
              label="Color"
              icon={Palette}
              placeholder="Ej: Blanco"
              value={formData.color}
              onChange={(val) => setFormData({...formData, color: val})}
              required
            />
          </div>

          <Input
            label="Modelo"
            icon={Car}
            placeholder="Ej: Frontier"
            value={formData.modelo}
            onChange={(val) => setFormData({...formData, modelo: val})}
            required
          />

          <Input
            label="Capacidad"
            icon={Settings}
            type="number"
            value={formData.capacidad}
            onChange={(val) => setFormData({...formData, capacidad: val})}
            required
          />

          <div className="pt-4 flex gap-4">
            <Button variant="ghost" size="full" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="full"
              isLoading={loading}
              icon={Save}
            >
              {isEdit ? 'Guardar Cambios' : 'Registrar Vehículo'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
