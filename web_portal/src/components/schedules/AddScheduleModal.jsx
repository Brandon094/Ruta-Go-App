import React, { useState, useEffect } from 'react';
import { Clock, Route, User, Bus, Plus, DollarSign } from 'lucide-react';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { scheduleService } from '../../services/scheduleService';

/**
 * ⚛️ Component: AddScheduleModal
 * Modal interactivo para que el Admin Root programe nuevos horarios basados en rutas dinámicas.
 */
export function AddScheduleModal({ isOpen, onClose, drivers = [], vehicles = [], onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [form, setForm] = useState({
    route: '',
    time: '08:00 AM',
    price: '12000',
    duration: '60 min',
    driverId: '',
    vehicleId: ''
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchRoutes = async () => {
      try {
        const routesList = [];

        // 1. Obtener rutas registradas desde /routes/
        const routesSnap = await get(ref(db, 'routes'));
        if (routesSnap.exists()) {
          Object.values(routesSnap.val()).forEach(r => {
            if (r.origin && r.destination) {
              routesList.push({
                label: `${r.origin} -> ${r.destination}`,
                price: r.price || 12000,
                duration: r.estimatedDuration || "60 min"
              });
            }
          });
        }

        // 2. Obtener matriz desde /prices/ como respaldo
        const pricesSnap = await get(ref(db, 'prices'));
        if (pricesSnap.exists()) {
          Object.entries(pricesSnap.val()).forEach(([origin, dests]) => {
            Object.entries(dests).forEach(([dest, priceVal]) => {
              const label = `${origin} -> ${dest}`;
              if (!routesList.some(r => r.label === label)) {
                routesList.push({
                  label,
                  price: priceVal,
                  duration: "60 min"
                });
              }
            });
          });
        }

        if (routesList.length === 0) {
          routesList.push({ label: 'Nátaga -> La Plata', price: 12000, duration: '60 min' });
          routesList.push({ label: 'La Plata -> Nátaga', price: 12000, duration: '60 min' });
        }

        setAvailableRoutes(routesList);
        if (routesList.length > 0) {
          setForm(f => ({
            ...f,
            route: routesList[0].label,
            price: String(routesList[0].price),
            duration: routesList[0].duration
          }));
        }
      } catch (err) {
        console.warn("⚠️ Error cargando rutas:", err.message);
      }
    };

    fetchRoutes();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRouteSelect = (selectedLabel) => {
    const routeObj = availableRoutes.find(r => r.label === selectedLabel);
    setForm(f => ({
      ...f,
      route: selectedLabel,
      price: routeObj ? String(routeObj.price) : f.price,
      duration: routeObj ? routeObj.duration : f.duration
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.route.trim() || !form.time.trim()) {
      alert('⚠️ Selecciona una ruta y la hora de salida.');
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
    } catch (err) {
      alert('❌ Error al programar horario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Programar Nuevo Horario de Despacho">
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">

        {/* --- SELECTOR DE RUTA DINÁMICA --- */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
            Ruta Creada
          </label>
          <select
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
            value={form.route}
            onChange={(e) => handleRouteSelect(e.target.value)}
            required
          >
            {availableRoutes.map((r, idx) => (
              <option key={idx} value={r.label}>
                {r.label} - (${Number(r.price).toLocaleString()} COP)
              </option>
            ))}
          </select>
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
              onChange={(val) => setForm(f => ({ ...f, time: val }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Tarifa Pasaje ($ COP)
            </label>
            <Input
              type="number"
              icon={<DollarSign size={18} />}
              placeholder="12000"
              value={form.price}
              onChange={(val) => setForm(f => ({ ...f, price: val }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Conductor Asignado
            </label>
            <select
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
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
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#061426] border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]"
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
          <Button type="submit" variant="primary" loading={loading} className="px-8 shadow-lg shadow-[#FF7A1A]/20">
            <Plus size={18} className="mr-2" />
            Programar Horario
          </Button>
        </div>
      </form>
    </Modal>
  );
}
