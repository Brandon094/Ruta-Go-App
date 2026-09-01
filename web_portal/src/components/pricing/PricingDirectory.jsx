import React, { useState } from 'react';
import { Settings, Tag, MapPin, Plus } from 'lucide-react';
import { DirectoryHeader } from '../common/DirectoryHeader';
import { InfoTip } from '../dashboard/InfoTip';
import { PricingCard } from './PricingCard';
import { AddRouteModal } from './AddRouteModal';
import { Button } from '../ui/Button';
import { pricingService } from '../../services/pricingService';

/**
 * 💰 Component: PricingDirectory
 * Permite al Admin Root gestionar tarifas y registrar nuevas rutas dinámicas.
 */
export function PricingDirectory({ prices = {}, routesList = [] }) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedPrices, setEditedPrices] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Unificar las rutas registradas en /routes/ y la matriz en /prices/
  const routes = [];
  const addedKeys = new Set();

  // 1. Cargar rutas explícitas desde /routes/
  if (Array.isArray(routesList)) {
    routesList.forEach(r => {
      if (r.origin && r.destination) {
        const key = `${r.origin}->${r.destination}`;
        if (!addedKeys.has(key)) {
          addedKeys.add(key);
          routes.push({
            origin: r.origin,
            dest: r.destination,
            price: r.price || 12000
          });
        }
      }
    });
  }

  // 2. Unir con la matriz /prices/ para cubrir todas las direcciones
  Object.entries(prices).forEach(([origin, destinations]) => {
    Object.entries(destinations).forEach(([dest, price]) => {
      const key = `${origin}->${dest}`;
      if (!addedKeys.has(key)) {
        addedKeys.add(key);
        routes.push({
          origin,
          dest,
          price
        });
      }
    });
  });

  const filteredRoutes = routes.filter(r => {
    if (!searchTerm) return true;
    const match = searchTerm.toLowerCase();
    return r.origin.toLowerCase().includes(match) || r.dest.toLowerCase().includes(match);
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DirectoryHeader
          subtitle="Configuración de precios, tarifas y rutas dinámicas"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-lg shadow-[#FF7A1A]/20"
        >
          <Plus size={18} className="mr-2" />
          Crear Nueva Ruta
        </Button>
      </div>

      {/* Grid de Rutas Actuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredRoutes.length > 0 ? filteredRoutes.map((route, idx) => {
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

        <div className="md:col-span-2">
          <InfoTip
            title="Gestión de Rutas Dinámicas"
            message="Ahora puedes crear rutas personalizadas con origen, destino y tarifa directamente desde este panel sin necesidad de ingresar a la consola de Firebase."
          />
        </div>
      </div>

      <AddRouteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
