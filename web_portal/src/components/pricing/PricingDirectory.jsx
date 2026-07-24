import React, { useState } from 'react';
import { Settings, Save, MapPin, Tag, ArrowLeftRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { pricingService } from '../../services/pricingService';

/**
 * 💰 Component: PricingDirectory
 * Permite al Admin Root gestionar las tarifas del holding.
 */
export function PricingDirectory({ prices = {} }) {
  const [loading, setLoading] = useState(false);
  const [editedPrices, setEditedPrices] = useState({});

  // Convertir el objeto anidado en una lista plana para la UI (Evitando duplicados de ida y vuelta)
  const routes = [];
  const processed = new Set();

  Object.entries(prices).forEach(([origin, destinations]) => {
    Object.entries(destinations).forEach(([dest, price]) => {
      const pair = [origin, dest].sort().join('-');
      if (!processed.has(pair)) {
        routes.push({ origin, dest, price });
        processed.add(pair);
      }
    });
  });

  const handleChange = (origin, dest, val) => {
    const key = `${origin}-${dest}`;
    setEditedPrices(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async (origin, dest) => {
    const key = `${origin}-${dest}`;
    const newPrice = editedPrices[key];
    if (!newPrice) return;

    setLoading(true);
    try {
      await pricingService.updatePrice(origin, dest, newPrice);
      // Limpiar estado temporal de edición tras éxito
      const next = { ...editedPrices };
      delete next[key];
      setEditedPrices(next);
    } catch (error) {
      alert("❌ Error actualizando tarifa: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(val);

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">

      {/* Header Informativo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm">
            <Settings size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic">Gestión de Tarifas</h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">Configuración de precios del holding</p>
          </div>
        </div>
      </div>

      {/* Grid de Rutas Actuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {routes.length > 0 ? routes.map((route, idx) => {
          const key = `${route.origin}-${route.dest}`;
          const currentVal = editedPrices[key] !== undefined ? editedPrices[key] : route.price;
          const isChanged = editedPrices[key] !== undefined && Number(editedPrices[key]) !== route.price;

          return (
            <div key={idx} className="card-base p-8 rounded-[2.5rem] bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none shadow-xl group transition-all hover:ring-2 ring-primary-500/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="text-left">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Origen</p>
                    <span className="text-base font-black text-slate-800 dark:text-white uppercase italic">{route.origin}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary-500 group-hover:rotate-180 transition-transform duration-700">
                    <ArrowLeftRight size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Destino</p>
                    <span className="text-base font-black text-slate-800 dark:text-white uppercase italic">{route.dest}</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-500">
                  <Tag size={20} />
                </div>
              </div>

              <div className="space-y-6">
                <Input
                  label="Precio del Pasaje (COP)"
                  type="number"
                  icon={Tag}
                  value={currentVal}
                  onChange={(val) => handleChange(route.origin, route.dest, val)}
                  placeholder="Ej: 12000"
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tarifa Actual</p>
                    <span className="text-sm font-black text-primary-500">{formatCurrency(route.price)}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    icon={Save}
                    disabled={!isChanged || loading}
                    isLoading={loading}
                    onClick={() => handleSave(route.origin, route.dest)}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="md:col-span-2 py-20 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
            <Tag size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="font-black uppercase tracking-widest text-xs">No hay rutas configuradas</p>
          </div>
        )}

        {/* Card Informativa - Futuras Rutas */}
        <div className="md:col-span-2 p-8 bg-slate-50 dark:bg-[#061929] rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center gap-6 opacity-70 group hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
            <MapPin size={32} />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase leading-none italic">Nuevas Rutas en camino</h4>
            <p className="text-slate-500 dark:text-white/40 font-medium text-sm">
              Estamos trabajando en la infraestructura para permitirte añadir cabeceras municipales y rutas dinámicas al holding muy pronto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
