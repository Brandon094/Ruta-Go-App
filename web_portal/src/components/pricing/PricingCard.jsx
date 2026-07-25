import React from 'react';
import { Save, Tag, ArrowLeftRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FormatUtils } from '../../utils/FormatUtils';

/**
 * ⚛️ Molecule: PricingCard
 * Permite visualizar y editar la tarifa de una ruta específica.
 * Sigue Atomic Design & DRY.
 */
export function PricingCard({ origin, dest, price, currentVal, isChanged, loading, onPriceChange, onSave }) {
  return (
    <div className="card-base p-8 rounded-[2.5rem] bg-white dark:bg-[#0A1F30] border border-slate-100 dark:border-none shadow-xl group transition-all hover:ring-2 ring-primary-500/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="text-left">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Origen</p>
            <span className="text-base font-black text-slate-800 dark:text-white uppercase italic">{origin}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary-500 group-hover:rotate-180 transition-transform duration-700">
            <ArrowLeftRight size={18} />
          </div>
          <div className="text-left">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Destino</p>
            <span className="text-base font-black text-slate-800 dark:text-white uppercase italic">{dest}</span>
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
          onChange={onPriceChange}
          placeholder="Ej: 12000"
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tarifa Actual</p>
            <span className="text-sm font-black text-primary-500">{FormatUtils.formatPrice(price)}</span>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={Save}
            disabled={!isChanged || loading}
            isLoading={loading}
            onClick={onSave}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
