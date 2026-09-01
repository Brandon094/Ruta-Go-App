import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Plus, Navigation } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { pricingService } from '../../services/pricingService';
import { COLOMBIAN_MUNICIPALITIES, POPULAR_HUILA_HUBS } from '../../constants/municipalities';

/**
 * ⚛️ Component: AddRouteModal
 * Modal interactivo con autocompletado y atajos de municipios de Colombia para Admin Root.
 */
export function AddRouteModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    origin: 'Nátaga',
    destination: 'La Plata',
    price: '12000',
    duration: '60 min'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.origin.trim() || !form.destination.trim() || !form.price) {
      alert('⚠️ Por favor selecciona o escribe el origen, destino y precio.');
      return;
    }

    if (form.origin.trim().toLowerCase() === form.destination.trim().toLowerCase()) {
      alert('⚠️ El origen y el destino no pueden ser el mismo municipio.');
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
      setForm({ origin: 'Nátaga', destination: 'La Plata', price: '12000', duration: '60 min' });
    } catch (err) {
      alert('❌ Error al crear ruta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nueva Ruta de Transporte">
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">

        {/* --- 📍 ORIGEN & DESTINO CON AUTOCOMPLETADO COLOMBIA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ORIGEN */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60">
              Municipio de Origen
            </label>
            <Input
              icon={<MapPin size={18} className="text-primary-500" />}
              placeholder="Selecciona o escribe origen..."
              value={form.origin}
              onChange={(e) => setForm(f => ({ ...f, origin: e.target.value }))}
              list="origin-list"
              required
            />
            <datalist id="origin-list">
              {COLOMBIAN_MUNICIPALITIES.map((mun, idx) => (
                <option key={idx} value={mun} />
              ))}
            </datalist>

            {/* Atajos Rápidos de Huila */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {POPULAR_HUILA_HUBS.map((hub, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, origin: hub }))}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    form.origin === hub
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {hub}
                </button>
              ))}
            </div>
          </div>

          {/* DESTINO */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60">
              Municipio de Destino
            </label>
            <Input
              icon={<Navigation size={18} className="text-primary-500" />}
              placeholder="Selecciona o escribe destino..."
              value={form.destination}
              onChange={(e) => setForm(f => ({ ...f, destination: e.target.value }))}
              list="destination-list"
              required
            />
            <datalist id="destination-list">
              {COLOMBIAN_MUNICIPALITIES.map((mun, idx) => (
                <option key={idx} value={mun} />
              ))}
            </datalist>

            {/* Atajos Rápidos de Huila */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {POPULAR_HUILA_HUBS.map((hub, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, destination: hub }))}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    form.destination === hub
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {hub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- 💰 TARIFA & TIEMPO --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/60 mb-2">
              Tarifa Pasaje ($ COP)
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
              Tiempo Estimado del Trayecto
            </label>
            <Input
              icon={<Clock size={18} />}
              placeholder="Ej: 60 min, 90 min, 2 hrs"
              value={form.duration}
              onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={loading} className="px-8 shadow-lg shadow-[#FF7A1A]/20">
            <Plus size={18} className="mr-2" />
            Guardar Ruta
          </Button>
        </div>
      </form>
    </Modal>
  );
}
