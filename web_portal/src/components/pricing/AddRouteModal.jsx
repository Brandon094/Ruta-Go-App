import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Plus, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { pricingService } from '../../services/pricingService';

/**
 * ⚛️ Component: AddRouteModal
 * Modal interactivo para que el Admin Root registre nuevas rutas dinámicas.
 */
export function AddRouteModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    price: '12000',
    duration: '60 min'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.origin.trim() || !form.destination.trim() || !form.price) {
      alert('⚠️ Por favor completa los campos de origen, destino y precio.');
      return;
    }

    setLoading(true);
    try {
      await pricingService.createRoute({
        origin: form.origin.trim(),
        destination: form.destination.trim(),
        price: Number(form.price),
        duration: form.duration.trim() || '60 min'
      });

      alert('✅ ¡Ruta creada exitosamente!');
      if (onSuccess) onSuccess();
      onClose();
      setForm({ origin: '', destination: '', price: '12000', duration: '60 min' });
    } catch (err) {
      alert('❌ Error al crear ruta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nueva Ruta de Transporte">
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Origen
            </label>
            <Input
              icon={<MapPin size={18} />}
              placeholder="Ej: Nátaga, Neiva, Paicol"
              value={form.origin}
              onChange={(e) => setForm(f => ({ ...f, origin: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Destino
            </label>
            <Input
              icon={<MapPin size={18} />}
              placeholder="Ej: La Plata, Tesalia"
              value={form.destination}
              onChange={(e) => setForm(f => ({ ...f, destination: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Tarifa / Precio ($)
            </label>
            <Input
              type="number"
              icon={<DollarSign size={18} />}
              placeholder="12000"
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Tiempo Estimado
            </label>
            <Input
              icon={<Clock size={18} />}
              placeholder="Ej: 60 min, 90 min"
              value={form.duration}
              onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={loading} className="px-8">
            <Plus size={18} className="mr-2" />
            Guardar Ruta
          </Button>
        </div>
      </form>
    </Modal>
  );
}
