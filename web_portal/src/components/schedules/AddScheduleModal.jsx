import React, { useState } from 'react';
import { Clock, Route, User, Bus, Plus } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { scheduleService } from '../../services/scheduleService';

/**
 * ⚛️ Component: AddScheduleModal
 * Modal interactivo para que el Admin Root programe nuevos horarios y despachos.
 */
export function AddScheduleModal({ isOpen, onClose, drivers = [], vehicles = [], onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    route: 'Nátaga -> La Plata',
    time: '08:00 AM',
    price: '12000',
    duration: '60 min',
    driverId: '',
    vehicleId: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.route.trim() || !form.time.trim()) {
      alert('⚠️ Completa la ruta y la hora de salida.');
      return;
    }

    setLoading(true);
    try {
      await scheduleService.createSchedule({
        route: form.route.trim(),
        time: form.time.trim(),
        price: Number(form.price) || 12000,
        duration: form.duration.trim() || '60 min',
        driverId: form.driverId,
        vehicleId: form.vehicleId
      });

      alert('✅ ¡Horario programado exitosamente!');
      if (onSuccess) onSuccess();
      onClose();
      setForm({ route: 'Nátaga -> La Plata', time: '08:00 AM', price: '12000', duration: '60 min', driverId: '', vehicleId: '' });
    } catch (err) {
      alert('❌ Error al programar horario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Programar Nuevo Horario de Despacho">
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
            Ruta del Despacho
          </label>
          <Input
            icon={<Route size={18} />}
            placeholder="Ej: Nátaga -> La Plata o La Plata -> Nátaga"
            value={form.route}
            onChange={(e) => setForm(f => ({ ...f, route: e.target.value }))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Hora de Salida (12h)
            </label>
            <Input
              icon={<Clock size={18} />}
              placeholder="Ej: 08:30 AM, 02:15 PM"
              value={form.time}
              onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Tarifa Pasaje ($)
            </label>
            <Input
              type="number"
              placeholder="12000"
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Conductor Asignado
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
              value={form.driverId}
              onChange={(e) => setForm(f => ({ ...f, driverId: e.target.value }))}
            >
              <option value="">-- Asignar Conductor --</option>
              {drivers.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name || d.nombre || 'Sin Nombre'} ({d.vehiclePlate || d.placaVehiculo || 'Sin Placa'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Vehículo / Bus
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
              value={form.vehicleId}
              onChange={(e) => setForm(f => ({ ...f, vehicleId: e.target.value }))}
            >
              <option value="">-- Seleccionar Placa --</option>
              {vehicles.map(v => (
                <option key={v.id || v.plate || v.placa} value={v.id || v.plate || v.placa}>
                  {v.plate || v.placa || v.id} - {v.model || v.modelo} ({v.brand || v.marca})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={loading} className="px-8">
            <Plus size={18} className="mr-2" />
            Programar Horario
          </Button>
        </div>
      </form>
    </Modal>
  );
}
