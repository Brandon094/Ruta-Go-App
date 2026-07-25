import React, { useState } from 'react';
import { Settings, Tag, MapPin } from 'lucide-react';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { InfoTip } from '../InfoTip';
import { PricingCard } from './PricingCard';
import { pricingService } from '../../services/pricingService';

/**
 * 💰 Component: PricingDirectory
 * Permite al Admin Root gestionar las tarifas del holding.
 */
export function PricingDirectory({ prices = {} }) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedPrices, setEditedPrices] = useState({});

  // Convertir el objeto anidado en una lista plana para la UI
  const routes = [];
  const processed = new Set();

  Object.entries(prices).forEach(([origin, destinations]) => {
    Object.entries(destinations).forEach(([dest, price]) => {
      const pair = [origin, dest].sort().join('-');
      if (!processed.has(pair)) {
        const match = searchTerm.toLowerCase();
        if (!searchTerm || origin.toLowerCase().includes(match) || dest.toLowerCase().includes(match)) {
          routes.push({ origin, dest, price });
        }
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
      const next = { ...editedPrices };
      delete next[key];
      setEditedPrices(next);
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20 px-2 animate-in fade-in duration-500">

      <DirectoryHeader
        subtitle="Configuración de precios y cobros del holding"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Grid de Rutas Actuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {routes.length > 0 ? routes.map((route, idx) => {
          const key = `${route.origin}-${route.dest}`;
          const currentVal = editedPrices[key] !== undefined ? editedPrices[key] : route.price;
          const isChanged = editedPrices[key] !== undefined && Number(editedPrices[key]) !== route.price;

          return (
            <PricingCard
              key={idx}
              origin={route.origin}
              dest={route.dest}
              price={route.price}
              currentVal={currentVal}
              isChanged={isChanged}
              loading={loading}
              onPriceChange={(val) => handleChange(route.origin, route.dest, val)}
              onSave={() => handleSave(route.origin, route.dest)}
            />
          );
        }) : (
          <div className="md:col-span-2 py-20 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
            <Tag size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="font-black uppercase tracking-widest text-xs text-[#061426] dark:text-white">No hay rutas configuradas</p>
          </div>
        )}

        {/* ⚛️ Molecule: InfoTip (Atomic Refactor) */}
        <div className="md:col-span-2">
          <InfoTip
            title="Nuevas Rutas en camino"
            message="Estamos trabajando en la infraestructura para permitirte añadir cabeceras municipales y rutas dinámicas al holding muy pronto."
          />
        </div>
      </div>
    </div>
  );
}
