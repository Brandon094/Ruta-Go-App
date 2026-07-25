import React, { useState, useEffect } from 'react';
import { Car, Save, Hash, Calendar, Settings, Star, Palette } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isEdit) {
        await vehicleService.updateVehicle(formData.placa, formData);
      } else {
        await vehicleService.registerVehicle(formData);
      }
      onClose();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Gestión de Activo' : 'Nuevo Vehículo'}>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Placa del Bus"
            icon={<Hash size={18}/>}
            placeholder="ABC-123"
            value={formData.placa}
            onChange={(val) => setFormData({...formData, placa: val.toUpperCase()})}
            disabled={isEdit}
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
            placeholder="Toyota / Chevrolet"
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
            placeholder="D-Max / Hilux"
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

        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-4">
          <Button variant="ghost" size="full" onClick={onClose} className="text-slate-400">
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="full"
            isLoading={loading}
            icon={Save}
            onClick={handleSubmit}
          >
            {isEdit ? 'Guardar Cambios' : 'Registrar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
